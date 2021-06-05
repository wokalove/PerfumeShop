<?php

namespace App\Controller;

use App\Service\OfferService;
use App\Service\ProductService;
use App\Service\TransactionService;
use App\Service\UserService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
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

            $offer = $product->getOffer();
            if ($offer != null)
                $price = $offer->getNewPrice();
            else
                $price = $product->getPrice();

            $this->transactionService->addTransactionByDetails($user, $product, $productName,
                                                               $price, false, $quantity);
        }
        return $this->json(["message" => 'Transactions added successfully']);
    }

    /**
     * @Route("/api/transactions", name="get_transactions_limit", methods={"GET"})
     */
    public function getTransactionsAndLimit(Request $request): JsonResponse
    {
        $limit = $request->query->get("limit");

        $token = $this->tokenStorage->getToken();
        $userEmail = $token->getUsername();
        $user = $this->userService->getUserByEmail($userEmail);

        $transactions = $this->transactionService->getTransactionsForUserAndLimit($user, $limit);

        return $this->json($this->arrayToJson($transactions));
    }

    /**
     * @Route("/admin/transactions", name="get_transactions_filters_limit", methods={"GET"})
     */
    public function getTransactionsByFiltersAndLimit(Request $request): JsonResponse
    {
        $limit = $request->query->get("limit");
        $isCompleted = $request->query->get("completed") == "true";
        $userId = $request->query->get("user-id");

        $transactions = $this->transactionService->getTransactionsByFiltersAndLimit($limit, $isCompleted, $userId);

        return $this->json($this->arrayToJson($transactions));
    }

    /**
     * @Route("/admin/transactions/{id}", name="update_transactions", methods={"PATCH"})
     */
    public function updateTransaction(Request $request, int $id): JsonResponse
    {
        $isCompleted = $request->query->get("value") == "true";

        if (!$this->transactionService->updateTransactionByDetails($id, $isCompleted))
            return $this->json(['message' => 'No transaction with such id'], Response::HTTP_CONFLICT);

        return $this->json(['message' => 'Transaction updated'], Response::HTTP_OK);

    }

    function arrayToJson(Array $transactions): array
    {
        $response = array();
        foreach ($transactions as $transaction)
        {
            $response[] = array(
                'user_id' => $transaction->getUsr()->getId(), // TODO: TODO: difference in naming between databases!!!
                'product_id' => $transaction->getProduct()->getId(),
                'product_name' => $transaction->getProductName(),
                'price' => $transaction->getPrice(),
                'is_completed' => $transaction->getIsCompleted(),
                'quantity' => $transaction->getQuantity(),
                'date' => $transaction->getDate()
            );
        }
        return $response;
    }
}
