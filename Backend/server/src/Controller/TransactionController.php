<?php

namespace App\Controller;

use App\Service\ProductService;
use App\Service\TransactionService;
use App\Service\UserService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class TransactionController extends AbstractController
{
    private TransactionService $transactionService;
    private ProductService $productService;
    private UserService $userService;
    private TokenStorageInterface $tokenStorage;

    public function __construct(TransactionService $transactionService,
                                ProductService $productService,
                                UserService $userService,
                                TokenStorageInterface $tokenStorage)
    {
        $this->transactionService = $transactionService;
        $this->productService = $productService;
        $this->userService = $userService;
        $this->tokenStorage = $tokenStorage;
    }

    /**
     * @Route("/api/transactions", name="add_transactions", methods={"POST"})
     */
    public function addTransactions(Request $request): JsonResponse
    {
        $transactions = json_decode($request->getContent(), true);

        $token = $this->tokenStorage->getToken();
        $userEmail = $token->getUsername();
        $user = $this->userService->getUserByEmail($userEmail);

        foreach ($transactions as $transaction)
        {
            $quantity = $transaction["quantity"];
            $productId = $transaction["product_id"];

            $product = $this->productService->getProductById($productId);
            $productName = $product->getProductBase()->getName();
            $price = $product->getPrice();

            $this->transactionService->addTransactionByDetails($user, $product, $productName,
                                                               $price, false, $quantity);
        }
        return $this->json(["message" => 'Transactions added successfully']);
    }

    /**
     * @Route("/api/transactions", name="transactions", methods={"GET"})
     */
    public function transactions(Request $request): JsonResponse
    {
        $limit = $request->query->get("limit");
        $transactions = $this->transactionService->getTransactions($limit);

        return $this->json($this->arrayToJson($transactions));
    }

    function arrayToJson(Array $transactions): array
    {
        $response = array();
        foreach ($transactions as $transaction)
        {
            $response[] = array(
                'product_id' => $transaction->getProduct()->getId(),
                'quantity' => $transaction->getQuantity()
            );
        }
        return $response;
    }
}
