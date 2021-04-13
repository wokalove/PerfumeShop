<?php
namespace App\Service;

use App\Repository\UserRepository;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;

class AuthorizationService
{
    protected UserRepository $userRepository;

    /**
     * AuthorizationService constructor.
     */
    public function __construct()
    {
        $this->userRepository=new UserRepository();
    }

    public function login(string $email, string $password):boolean
    {
        $user=$this->userRepository->getUserByEmail($email);
        if(!$user)return false;
        else {
            $password===$user->getPassword();
            return true;
        }
        return false;

    }

    public function checkIfUserExists(string $email): boolean
    {
        $user=$this->userRepository->getUserByEmail($email);
        if(!$user)return true;
        else return false;
    }

    public function addUser(string $name,string $surname, string $email, string $password, boolean $is_admin):boolean
    {
        $user = new User();
        $user->setName($name)
                ->setSurname($surname)
                ->setEmail($email)
                ->setPassword($password)
                ->setIsAdmin($is_admin)
                ->setCreatedAt(date("Y-m-d H:i:s"));
        $this->userRepository->addUser($user);
        return true;
    }

    public function deleteUserById(int $id): boolean
    {
        $user=$this->userRepository->getUserById($id);
        if($user==NULL){
            return false;
        }
        $this->userRepository->deleteUser($user);
        return true;
    }
}