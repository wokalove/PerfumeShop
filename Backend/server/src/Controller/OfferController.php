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

        $addedOffer = $this->offerService->addOfferByDetails($product, $newPrice);
        return $this->json(["message" => 'Offer added successfully', 'id' => $addedOffer->getId()], Response::HTTP_CREATED);
    }

    /**
     * @Route("/admin/offers/{id}", name="update_offer", methods={"PUT"})
     */
    public function updateOffer(Request $request, int $id): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $productId = $data["product_id"];
        $newPrice = $data["new_price"];

        if (!$this->offerService->updateOfferByDetails($id, $productId, $newPrice))
        {
            return $this->json(['message' => 'Wrong offer id or product id'], Response::HTTP_NOT_FOUND);
        }

        return $this->json(['message' => 'Offer updated'], Response::HTTP_OK);
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
