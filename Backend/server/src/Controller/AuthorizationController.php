<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class AuthorizationController extends AbstractController
{
    /**
     * @Route("/auth/login", name="login")
     */
    public function login(): JsonResponse
    {
        return new JsonResponse("login controller");
    }

    /**
     * @Route("/auth/register", name="register")
     */
    public function register(): JsonResponse
    {
        return new JsonResponse("register controller");
    }

    /**
     * @Route("/auth/user/{id}", name="delete_user")
     */
    public function deleteUser(int $id): JsonResponse
    {
        return new JsonResponse("delete user controller");
    }
}
