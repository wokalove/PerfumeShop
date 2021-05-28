<?php

namespace App\Controller;

use App\Service\ProductService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ProductController extends AbstractController
{
    private ProductService $productService;

    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }

    /**
     * @param Request $request
     * @return JsonResponse
     * @Route("admin/products", name="add_product", methods={"POST"})
     */
    public function addProduct(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $name = $data["name"];
        $description = $data["description"];
        $brand = $data["brand"];
        $baseNote = $data["base_note"];
        $forWomen = $data["for_women"];
        $price = $data["price"];
        $volume = $data["volume"];
        $iriSplit = explode("/", $data["image"]);
        $imageId = end($iriSplit);

        if (!$this->productService->addProductByDetails(
            $name,
            $description,
            $brand,
            $forWomen,
            $price,
            $volume,
            $imageId,
            $baseNote
        ))
            return $this->json(["message" => "Can't link an image to the product: No such image"],
            Response::HTTP_BAD_REQUEST);

        return $this->json(["message" => "New product added"], Response::HTTP_CREATED);
    }

    /**
     * @Route("/api/products/{id}", name="product", methods={"GET"})
     */
    public function product(int $id): JsonResponse
    {
        $product = $this->productService->getProductById($id);
        $productBase = $product->getProductBase();
        $image = $productBase->getImage();

        $response = new JsonResponse([
            'id' => $product->getId(),
            'name' => $productBase->getName(),
            'description' => $productBase->getDescription(),
            'brand' => $productBase->getBrand(),
            'base_note' => $productBase->getBaseNote(),
            'for_women' => $productBase->getForWomen(),
            'price' => $product->getPrice(),
            'volume' => $product->getVolume(),
            'added_at' => $product->getAddedAt(),
            'image' => '/images/'.$image->filePath
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
                'id' => $sr["p_id"],
                'name' => $sr["pb_name"],
                'description' => $sr["pb_description"],
                'brand' => $sr["pb_brand"],
                'base_note' => $sr["pb_base_note"],
                'for_women' => $sr["pb_for_women"],
                'price' => $sr["p_price"],
                'volume' => $sr["p_volume"],
                'added_at' => $sr["p_added_at"],
                'image' => '/image/'.$sr["pi_filePath"]
            );
        }
        return $response;
    }
}
