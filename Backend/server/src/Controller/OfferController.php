<?php

namespace App\Controller;

use App\Service\OfferService;
use App\Service\ProductService;
use FOS\RestBundle\Controller\Annotations\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class OfferController extends AbstractController
{
    private OfferService $offerService;
    private ProductService $productService;

    public function __construct(OfferService $offerService, ProductService $productService)
    {
        $this->offerService = $offerService;
        $this->productService = $productService;
    }

    /**
     * @Route("/admin/offers", name="add_offer", methods={"POST"})
     */
    public function addOffer(Request $request): JsonResponse
    {
        $offer = json_decode($request->getContent(), true);

        $productId = $offer["product_id"];
        $newPrice = $offer["price"];

        if (($product = $this->productService->getProductById($productId)) == null)
            return $this->json(["message" => 'Wrong product id'], Response::HTTP_BAD_REQUEST);

        $this->offerService->addOfferByDetails($product, $newPrice);
        return $this->json(["message" => 'Offer added successfully'], Response::HTTP_CREATED);
    }

    /**
     * @Route("/admin/offers/{id}", name="delete_offer", methods={"DELETE"})
     */
    public function deleteOffer(int $id): JsonResponse
    {
        // service returns false if offer don't exist
        if (!$this->offerService->deleteOfferById($id))
        {
            return $this->json(['message' => 'No offer with such id'], Response::HTTP_NOT_FOUND);
        }

        return $this->json(['message' => 'Offer deleted'], Response::HTTP_OK);
    }
}
