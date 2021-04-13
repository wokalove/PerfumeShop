<?php

namespace App\Repository;

use App\Entity\Transaction;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Transaction|null find($id, $lockMode = null, $lockVersion = null)
 * @method Transaction|null findOneBy(array $criteria, array $orderBy = null)
 * @method Transaction[]    findAll()
 * @method Transaction[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TransactionRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Transaction::class);
    }

    public function addTransaction(Transaction $transaction)
    {
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($transaction);
        $entityManager->flush;
    }

    public function deleteTransaction(Transaction $transaction)
    {
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->remove($transaction);
        $entityManager->flush();
    }

    public function getTransactionById(int $id): ?Transaction
    {
        $transaction = $this->getDoctrine()->getRepository(Transaction::class)->find($id);
        return $transaction;
    }

    public function getTransactions(int $limit): Array
    {
        $conn = $this->getEntityManager()->getConnection();

        // TODO: add limit to query
        $sql = '
            SELECT DISTINCT * FROM transaction
            ';
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAllAssociative();
    }

    public function getAllTransactions(): Array
    {
        $transaction = $this->getDoctrine()->getRepository(Transaction::class)->findAll();
        return $transaction;
    }

    // /**
    //  * @return Transaction[] Returns an array of Transaction objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('t.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Transaction
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
