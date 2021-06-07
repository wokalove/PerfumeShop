<?php

namespace App\Controller;

use App\Service\BrandService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class BrandController extends AbstractController
{
    private BrandService $brandService;

    public function __construct(BrandService $brandService)
    {
        $this->brandService = $brandService;
    }

    /**
     * @Route("/api/brands", name="brands", methods={"GET"})
     */
    public function brands(): JsonResponse
    {
        $brands = $this->brandService->getAllBrands();

        return $this->json($this->arrayToJson($brands));
    }

    function arrayToJson(array $brands): array
    {
        $response = array();
        foreach ($brands as $brand)
        {
            $response[] = array(
                'name' => $brand["brand"]
            );
        }
        return $response;
    }
}
