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
        $transaction->setUsr($user)
            ->setProduct($product)
            ->setProductName($productName)
            ->setPrice($price)
            ->setIsCompleted($isCompleted)
            ->setQuantity($quantity)
            ->setDate(new \DateTime("now", new \DateTimeZone("Europe/Warsaw")));
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

    public function getTransactionsAndLimit($limit): array
    {
        $orderBy = array('date' => 'DESC');

        return $this->em->getRepository(Transaction::class)->findBy(array(), $orderBy, $limit);
    }

    public function getTransactionsByFiltersAndLimit(?int $limit, ?bool $isCompleted, ?int $userId): array
    {
        $criteria = array();
        if ($isCompleted != null) $criteria += array('is_completed' => $isCompleted);
        if ($userId != null) $criteria += array('usr' => $userId); // TODO: difference in naming between databases!!!

        $orderBy = array('date' => 'DESC');

        return $this->em->getRepository(Transaction::class)->findBy($criteria, $orderBy, $limit);
    }

    public function getAllTransactions(): array
    {
        return $this->em->getRepository(Transaction::class)->findAll();
    }
}
