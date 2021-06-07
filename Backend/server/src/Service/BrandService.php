<?php

namespace App\Service;

use Doctrine\ORM\EntityManagerInterface;

class BrandService
{
    private EntityManagerInterface $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    public function getAllBrands(): array
    {
        return $this->em
            ->createQueryBuilder()
            ->select('pb.brand')
            ->from('App:ProductBase', 'pb')
            ->groupBy('pb.brand')
            ->getQuery()
            ->getResult();
    }
}
