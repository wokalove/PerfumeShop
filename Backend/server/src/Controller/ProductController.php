<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;



class ProductController extends AbstractController
{
    /**
     * @Route("/products/{id}", name="products")
     */
    public function products(int $id): JsonResponse
    {
        return new JsonResponse("product controller");
    }
}
