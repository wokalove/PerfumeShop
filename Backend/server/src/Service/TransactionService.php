<?php
namespace App\Service;

use App\Repository\TransactionRepository;
use App\Entity\Transaction;
use Doctrine\ORM\EntityManagerInterface;

class TransactionService
{
    protected TransactionRepository $transactionRepository;

    /**
     * AuthorizationService constructor.
     */
    public function __construct()
    {
        $this->transactionRepository = new TransactionRepository();
    }

    public function getTransactions(int $limit): Array
    {
        return $this->transactionRepository->getTransactions($limit);
    }

    public function getAllTransactions(): Array
    {
        return $this->transactionRepository->getAllTransactions();
    }
}
