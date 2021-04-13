<?php


namespace App\Service;

use App\Repository\ProductBaseRepository;
use App\Entity\ProductBase;
use Doctrine\ORM\EntityManagerInterface;

class ProductBaseService
{
    protected ProductBaseRepository $productBaseRepository;

    /**
     * ProductBaseService constructor.
     */
    public function __construct()
    {
        $this->productBaseRepository = new ProductBaseRepository();
    }


    public function ProductDetails($id)
    {
        $productBase=$this->productBaseRepository->getProductById($id);
        if($productBase==NULL)return null;
        else
        {
            return $productBase->getProduct();
        }
    }
    //TODO multiple products without details
    public function Brands(): Array
    {
        return $this->productBaseRepository->getBrands();
    }

}