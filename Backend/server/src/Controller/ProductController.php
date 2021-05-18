<?php

namespace App\Controller;

use App\Service\ProductService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class ProductController extends AbstractController
{
    private ProductService $productService;

    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }

    /**
     * @Route("/products/{id}", name="products")
     */
    public function product(int $id): JsonResponse
    {
        $product = $this->productService->getProductById($id);
        $productBase = $product->getProductBase();
        return new JsonResponse([
            'name' => $productBase->getName(),
            'description' => $productBase->getDescription(),
            'brand' => $productBase->getBrand(),
            'base_note' => $productBase->getBaseNote(),
            'for_women' => $productBase->getForWomen(),
            'price' => $product->getPrice(),
            'volume' => $product->getVolume(),
            'added_at' => $product->getAddedAt()
        ]);
    }
}
