<?php


namespace App\Service;

use App\Repository\ProductBaseRepository;
use App\Entity\ProductBase;
use Doctrine\ORM\EntityManagerInterface;

class ProductService
{
    public function ProductDetails($id)
    {
        $repository = $this->getDoctrine()->getRepository(ProductBase::class);
        $productBase=$repository->find($id);
        return $productBase->getProduct();
    }
    //TODO multiple products without details
    public function Brands($string)
    {
        $entityManager = $this->getDoctrine()->getManager();

        return $entityManager
            ->createQuery('SELECT DISTINCT pb.brand FROM ProductBase pb')
            ->getResult();
    }

}