<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class BaseNoteController extends AbstractController
{
    /**
     * @Route("/base/note", name="base_note")
     */
    public function index(): Response
    {
        return $this->render('base_note/index.html.twig', [
            'controller_name' => 'BaseNoteController',
        ]);
    }
}
