<?php

namespace App\Repository;

use App\Entity\ProductBase;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method ProductBase|null find($id, $lockMode = null, $lockVersion = null)
 * @method ProductBase|null findOneBy(array $criteria, array $orderBy = null)
 * @method ProductBase[]    findAll()
 * @method ProductBase[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ProductBaseRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ProductBase::class);
    }

    public function getProductBaseById(int $id): ?ProductBase
    {
        $productBase = $this->getDoctrine()
                ->getRepository(ProductBase::class)
                ->find($id);
        return $productBase;
    }

    public function getBrands(): Array
    {
        $conn = $this->getEntityManager()->getConnection();

        $sql = '
            SELECT DISTINCT brands FROM productBase
            ';
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAllAssociative();
    }

    
    // /**
    //  * @return ProductBase[] Returns an array of ProductBase objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('p.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?ProductBase
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
