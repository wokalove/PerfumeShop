<?php

namespace App\Controller;

use App\Service\UserService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AuthorizationController extends AbstractController
{
    private UserService $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    /**
     * @Route("/api/register", name="register", methods={"POST"})
     */
    public function register(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        // received incomplete data
        if (!isset($data['email']) || !isset($data['password']) || !isset($data['name']) || !isset($data['surname']))
        {
            return $this->json(["message" => 'Missing data'], Response::HTTP_CONFLICT);
        }

        $email = $data['email'];
        $password = $data['password'];
        $name = $data['name'];
        $surname = $data['surname'];

        // service returns false if user don't exist
        if (!$this->userService->addUserByDetails($name, $surname, $email, $password, []))
        {
            return $this->json(["message" => 'Email already occupied'], Response::HTTP_CONFLICT);
        }

        $user = $this->userService->getUserByEmail($email);

        return $this->json(["message" => 'User created',
                            "id" => $user->getId(),
                            "email" => $user->getEmail()],
                            Response::HTTP_CREATED);
    }

    /**
     * @Route("/api/user/{id}", name="delete_user", methods={"DELETE"})
     */
    public function deleteUser(int $id): JsonResponse
    {
        // service returns false if user don't exist
        if (!$this->userService->deleteUserById($id))
        {
            return $this->json(['message' => 'No user with such id'], Response::HTTP_NOT_FOUND);
        }

        return $this->json(['message' => 'User deleted'], Response::HTTP_OK);
    }

    /**
     * @Route("/admin/users", name="get_users", methods={"GET"})
     */
    public function getUsers(Request $request): JsonResponse
    {
        $limit = $request->query->get("limit");
        $name = $request->query->get("name");
        $surname = $request->query->get("surname");
        $email = $request->query->get("email");

        $users = $this->userService->getUsersByFiltersLimitAndSort($limit, $name, $surname, $email);

        return $this->json($this->arrayToJson($users));
    }

    function arrayToJson(Array $users): array
    {
        $response = array();
        foreach ($users as $user)
        {
            $response[] = array(
                'id' => $user->getId(),
                'email' => $user->getEmail(),
                'roles' => $user->getRoles(),
                'password' => $user->getPassword(),
                'name' => $user->getName(),
                'surname' => $user->getSurname(),
                'created_at' => $user->getCreatedAt()
            );
        }
        return $response;
    }
}
