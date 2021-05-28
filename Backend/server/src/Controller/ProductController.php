<?php

namespace App\Controller;

use App\Service\ProductService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class ProductController extends AbstractController
{
    private ProductService $productService;

    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }

    /**
     * @Route("/api/products/{id}", name="product", methods={"GET"})
     */
    public function product(int $id): JsonResponse
    {
        $product = $this->productService->getProductById($id);
        $productBase = $product->getProductBase();

        $response = new JsonResponse([
            'name' => $productBase->getName(),
            'description' => $productBase->getDescription(),
            'brand' => $productBase->getBrand(),
            'base_note' => $productBase->getBaseNote(),
            'for_women' => $productBase->getForWomen(),
            'price' => $product->getPrice(),
            'volume' => $product->getVolume(),
            'added_at' => $product->getAddedAt()
        ]);

        $response->setEncodingOptions($response->getEncodingOptions() | JSON_PRETTY_PRINT);

        return $response;
    }

    /**
     * @Route("/api/products", name="products", methods={"GET"})
     */
    public function products(Request $request): JsonResponse
    {
        $brand = $request->query->get("brand");
        $name = $request->query->get("name");
        $priceBottom = $request->query->get("price-bottom");
        $priceTop = $request->query->get("price-top");
        $volumeBottom = $request->query->get("volume-bottom");
        $volumeTop = $request->query->get("volume-top");
        $forWomen = $request->query->get("for-women");
        $baseNote = $request->query->get("base-note");
        $offerId = $request->query->get("offer");

        $products = $this->productService->getProductsByFilters($brand, $name, $priceBottom, $priceTop,
                                                                $volumeBottom, $volumeTop, $forWomen,
                                                                $baseNote, $offerId);

        $response = new JsonResponse($this->arrayToJson($products));
        $response->setEncodingOptions($response->getEncodingOptions() | JSON_PRETTY_PRINT);
        
        return $response;
    }

    function arrayToJson(Array $serverResponse): array
    {
        $response = array();
        foreach ($serverResponse as $sr)
        {
            $response[] = array(
                'name' => $sr["pb_name"],
                'description' => $sr["pb_description"],
                'brand' => $sr["pb_brand"],
                'base_note' => $sr["pb_base_note"],
                'for_women' => $sr["pb_for_women"],
                'price' => $sr["p_price"],
                'volume' => $sr["p_volume"],
                'added_at' => $sr["p_added_at"]
            );
        }
        return $response;
    }
}
