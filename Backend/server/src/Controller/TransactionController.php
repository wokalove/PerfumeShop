<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class TransactionController extends AbstractController
{
    /**
     * @Route("/transactions", name="all_transactions")
     */
    public function allTransactions(): JsonResponse
    {
        return new JsonResponse("all transaction controller");
    }

    /**
     * @Route("/transactions/{limit}", name="transactions")
     */
    public function transactions(int $limit): JsonResponse
    {
        return new JsonResponse("transactions with limit controller");
    }
}
