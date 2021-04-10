<?php
namespace App/Service;

use App\Repository\UserRepository;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use http\Env\Response;

class AuthorizationService
{
    public function checkEmail(string $email): boolean
    {
        $user = $this->getDoctrine()->getRepository(User::class)->find($email);
        if(!user)return true;
        else return false;
    }

    public function addUser(string $name,string $surname, string $email, string $password, boolean $is_admin):Response
    {
        $entityManager = $this->getDoctrine()->getManager();

        $user = new User();
        $user->setName($name)
                ->setSurname($surname)
                ->setEmail($email)
                ->setPassword($password)
                ->setIsAdmin($is_admin)
                ->setCreatedAt(date("Y-m-d H:i:s"));

        $entityManager->persist($user);
        $entityManager->flush;

        return new Response('User saved');
    }

    public function deleteUserById(int $id): Response
    {
        $user = $this->getDoctrine()->getRepository(User::class)->find($id);
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->remove($user);
        $entityManager->flush();
    }
}