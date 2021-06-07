<?php

namespace App\Controller;

use App\Service\BaseNoteService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class BaseNoteController extends AbstractController
{
    private BaseNoteService $baseNoteService;

    public function __construct(BaseNoteService $baseNoteService)
    {
        $this->baseNoteService = $baseNoteService;
    }

    /**
     * @Route("/api/base-notes", name="base_notes", methods={"GET"})
     */
    public function baseNotes(): JsonResponse
    {
        $brands = $this->baseNoteService->getAllBaseNotes();

        return $this->json($this->arrayToJson($brands));
    }

    function arrayToJson(array $baseNotes): array
    {
        $response = array();
        foreach ($baseNotes as $baseNote)
        {
            $response[] = array(
                'name' => $baseNote["base_note"]
            );
        }
        return $response;
    }
}
