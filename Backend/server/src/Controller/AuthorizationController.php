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
     * @Route("/register", name="register", methods={"POST"})
     * @param Request $request
     * @return JsonResponse
     */
    public function register(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $email = isset($data['email']) ? $data['email'] : null;
        $password = isset($data['password']) ? $data['password'] : null;
        $name = isset($data['name']) ? $data['name'] : null;
        $surname = isset($data['surname']) ? $data['surname'] : null;

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
     * @Route("/user/{id}", name="delete_user", methods={"DELETE"})
     */
    public function deleteUser(int $id): JsonResponse
    {
        if (!$this->userService->deleteUserById($id)) {
            return $this->json(['message' => 'No user with such id'], Response::HTTP_NOT_FOUND);
        }

        return $this->json(['message' => 'User deleted'], Response::HTTP_OK);
    }
}
