<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AuthorizationController extends AbstractController
{
    /**
     * @Route("/authorization", name="authorization")
     */
    public function index(): Response
    {
        return $this->render('authorization/index.html.twig', [
            'controller_name' => 'AuthorizationController',
        ]);
    }
}
