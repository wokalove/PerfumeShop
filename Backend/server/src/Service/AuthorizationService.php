<?php
namespace App\Service;

use App\Repository\UserRepository;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;

class AuthorizationService
{
    public function checkIfUserExists(string $email): boolean
    {
        $user = $this->getDoctrine()->getRepository(User::class)->createQueryBuilder('u')
                ->where('u.email=:email')
                ->setParameter('email',$email)
                ->getQuery()
                ->getOneOrNullResult();
        if(!user)return true;
        else return false;
    }

    public function addUser(string $name,string $surname, string $email, string $password, boolean $is_admin):boolean
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

        return true;
    }

    public function deleteUserById(int $id): boolean
    {
        $user = $this->getDoctrine()->getRepository(User::class)->find($id);
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->remove($user);
        $entityManager->flush();
        return true;
    }
}