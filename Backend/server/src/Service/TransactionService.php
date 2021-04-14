<?php
namespace App\Service;

use App\Entity\Transaction;
use Doctrine\ORM\EntityManagerInterface;

class TransactionService
{
    private EntityManagerInterface $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    public function addTransaction(Transaction $transaction)
    {
        $this->em->persist($transaction);
        $this->em->flush();
    }

    public function deleteTransaction(Transaction $transaction)
    {
        $this->em->remove($transaction);
        $this->em->flush();
    }

    public function getTransactionById(int $id): ?Transaction
    {
        return $this->em->getRepository(Transaction::class)->find($id);
    }

    public function getTransactions(int $limit)
    {
        return $this->em->getRepository(Transaction::class)->findBy(null, null, $limit);
    }

    public function getAllTransactions()
    {
        return $this->em->getRepository(Transaction::class)->findAll();
    }
}
