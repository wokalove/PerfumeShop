<?php

namespace App\Controller;

use App\Service\UserService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;


/**
 * Class AuthorizationController
 * @package App\Controller
 * @Route("api", name="api_")
 */
class AuthorizationController extends AbstractController
{
    /**
     * @var UserService
     */
    private UserService $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    /**
     * @Route("/login", name="login")
     */
    public function login(): JsonResponse
    {
        return new JsonResponse("login controller");
    }

    /**
     * @Route("/register", name="register")
     * @param Request $request
     * @return JsonResponse
     */
    public function register(Request $request): JsonResponse
    {
        $email = $request->get('email');
        $password = $request->get('password');
        $name = $request->get('name');
        $surname = $request->get('surname');

        if ($this->userService->checkIfUserExistsByEmail($email)) {
            return $this->json(["message" => 'User with this email already exists'],
                Response::HTTP_CONFLICT);
        }

        $this->userService->addUserByDetails(
            $name,
            $surname,
            $email,
            $password,
            []
        );

        $user = $this->userService->getUserByEmail($email);

        return $this->json(["message" => 'User created',
            "id" => $user->getId(),
            "email" => $user->getEmail()],
            Response::HTTP_CREATED);
    }

    /**
     * @Route("/auth/user/{id}", name="delete_user")
     */
    public function deleteUser(int $id): JsonResponse
    {
        return new JsonResponse("delete user controller");
    }
}
