<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class AdminController extends AbstractController
{
    /**
     * @Route("/admin/products", name="admin_products")
     */
    public function adminProducts(): JsonResponse
    {
        return new JsonResponse("admin products controller");
    }

    /**
     * @Route("/admin/products/{id}", name="admin_product")
     */
    public function adminProduct(int $id): JsonResponse
    {
        return new JsonResponse("admin product controller");
    }

    /**
     * @Route("/admin/offers", name="admin_offers")
     */
    public function adminOffers(): JsonResponse
    {
        return new JsonResponse("admin offers controller");
    }

    /**
     * @Route("/admin/offers/{id}", name="admin_delete_offer")
     */
    public function adminDeleteOffer(int $id): JsonResponse
    {
        return new JsonResponse("admin delete offer controller");
    }

    /**
     * @Route("/admin/transactions/{id}", name="admin_transaction")
     */
    public function adminTransaction(): JsonResponse
    {
        return new JsonResponse("admin transaction controller");
    }
}
