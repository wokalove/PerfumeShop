<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class BaseNoteController extends AbstractController
{
    /**
     * @Route("/base-notes", name="base_notes")
     */
    public function baseNotes(): JsonResponse
    {
        return new JsonResponse("base-notes controller");
    }
}
