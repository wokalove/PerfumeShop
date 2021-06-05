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
     * @Route("admin/products", name="add_product", methods={"POST"})
     */
    public function addProduct(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $name = $data["name"];
        $description = $data["description"];
        $brand = $data["brand"];
        $baseNote = $data["base_note"];
        $forWomen = $data["for_women"] == "true";
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
     * @Route("/admin/products/{id}", name="update_product", methods={"PUT"})
     */
    public function updateProduct(Request $request, int $id): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $name = $data["name"];
        $description = $data["description"];
        $brand = $data["brand"];
        $baseNote = $data["base_note"];
        $forWomen = $data["for_women"];
        $price = $data["price"];
        $volume = $data["volume"];

        if (!$this->productService->updateProductByDetails(
            $id, $name, $description,
            $brand, $forWomen, $price,
            $volume, $baseNote
        ))
            return $this->json(["message" => "Wrong product id or image id"], Response::HTTP_BAD_REQUEST);

        return $this->json(["message" => "Product updated"], Response::HTTP_CREATED);
    }

    /**
     * @Route("/admin/products/{id}", name="get_product", methods={"DELETE"})
     */
    public function deleteProduct(int $id): JsonResponse
    {
        // service returns false if product don't exist
        if (!$this->productService->deleteProductById($id))
        {
            return $this->json(['message' => 'No product with such id'], Response::HTTP_NOT_FOUND);
        }

        return $this->json(['message' => 'Product deleted'], Response::HTTP_OK);
    }

    /**
     * @Route("/api/products/{id}", name="get_product", methods={"GET"})
     */
    public function getProduct(int $id): JsonResponse
    {
        $product = $this->productService->getProductById($id);
        $productBase = $product->getProductBase();
        $image = $productBase->getImage();
        $newPrice = $product->getOffer() ? $product->getOffer()->getNewPrice() : null;
        $offerId = $product->getOffer() != null ? $product->getOffer()->getId() : null;

        $response = new JsonResponse([
            'id' => $product->getId(),
            'name' => $productBase->getName(),
            'description' => $productBase->getDescription(),
            'brand' => $productBase->getBrand(),
            'base_note' => $productBase->getBaseNote(),
            'for_women' => $productBase->getForWomen(),
            'price' => $product->getPrice(),
            'new_price' => $newPrice,
            'volume' => $product->getVolume(),
            'added_at' => $product->getAddedAt(),
            'image' => '/images/'.$image->filePath,
            'offer_id' => $offerId
        ]);

        $response->setEncodingOptions($response->getEncodingOptions() | JSON_PRETTY_PRINT);

        return $response;
    }

    /**
     * @Route("/api/products", name="get_products", methods={"GET"})
     */
    public function getProducts(Request $request): JsonResponse
    {
        $brand = $request->query->get("brand");
        $name = $request->query->get("name");
        $priceBottom = $request->query->get("price-bottom");
        $priceTop = $request->query->get("price-top");
        $volumeBottom = $request->query->get("volume-bottom");
        $volumeTop = $request->query->get("volume-top");
        $forWomen = $request->query->get("for-women");
        $baseNote = $request->query->get("base-note");
        $offer = $request->query->get("offer");

        $products = $this->productService->getProductsByFilters($brand, $name, $priceBottom, $priceTop,
                                                                $volumeBottom, $volumeTop, $forWomen,
                                                                $baseNote, $offer);
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
                'new_price' => $sr["o_new_price"],
                'volume' => $sr["p_volume"],
                'added_at' => $sr["p_added_at"],
                'image' => '/image/'.$sr["pi_filePath"]
            );
        }
        return $response;
    }
}
