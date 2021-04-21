<?php
namespace App\Service;

use App\Entity\User;
use App\Entity\Product;
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

    public function addTransactionByDetails(User $user, Product $product, string $productName,
                                            int $price, bool $isCompleted, int $quantity)
    {
        $transaction = new Transaction();
        $transaction->setUsers($user)
            ->setProduct($product)
            ->setProductName($productName)
            ->setPrice($price)
            ->setIsCompleted($isCompleted)
            ->setQuantity($quantity);
        $this->addTransaction($transaction);
    }

    public function deleteTransaction(Transaction $transaction): bool
    {
        if ($this->checkIfTransactionExistsById($transaction->getId()))
        {
            $this->em->remove($transaction);
            $this->em->flush();
            return true;
        }
        return false;
    }

    public function deleteTransactionById(int $id): bool
    {
        $user = $this->getTransactionById($id);
        if ($user == null) return false;
        $this->deleteTransaction($user);
        return true;
    }

    public function checkIfTransactionExistsById(int $id): bool
    {
        $transaction = $this->getTransactionById($id);
        return $transaction == null ? false : true;
    }

    public function getTransactionById(int $id): ?Transaction
    {
        return $this->em->getRepository(Transaction::class)->find($id);
    }

    public function getTransactions(int $limit, bool $isCompleted=null, int $userId=null): array
    {
        $criteria = array();
        if ($userId != null && $isCompleted != null) $criteria = array('users' => $userId, 'is_completed' => $isCompleted);
        return $this->em->getRepository(Transaction::class)->findBy($criteria, null, $limit);
    }

    public function getAllTransactions(): array
    {
        return $this->em->getRepository(Transaction::class)->findAll();
    }
}
