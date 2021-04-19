<?php
namespace App\Service;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;

class UserService
{
    private EntityManagerInterface $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    public function addUser(User $user): bool
    {
        if (!$this->checkIfUserExistsByEmail($user->getEmail())) // blocks creating users with same email
        {
            $this->em->persist($user);
            $this->em->flush();
            return true;
        }
        return false;
    }

    public function addUserByDetails(string $name, string $surname, string $email,
                                     string $password, bool $isAdmin): bool
    {
        if (!$this->checkIfUserExistsByEmail($email)) // blocks creating users with same email
        {
            $user = new User();
            $user->setName($name)
                ->setSurname($surname)
                ->setEmail($email)
                ->setPassword($password)
                ->setIsAdmin($isAdmin)
                ->setCreatedAt(new \DateTime());
            $this->addUser($user);
            return true;
        }
        return false;
    }

    public function deleteUser(User $user): bool
    {
        if ($this->checkIfUserExistsById($user->getId()))
        {
            $this->em->remove($user);
            $this->em->flush();
            return true;
        }
        return false;
    }

    public function deleteUserById(int $id): bool
    {
        $user = $this->getUserById($id);
        if ($user == null) return false;
        $this->deleteUser($user);
        return true;
    }

    public function deleteUserByEmail(string $email): bool
    {
        $user = $this->getUserByEmail($email);
        if ($user == null) return false;
        $this->deleteUser($user);
        return true;
    }

    public function checkIfAdmin(int $id)
    {
        $isAdmin = $this->getUserById($id)->getIsAdmin();
        return $isAdmin ? true : false;
    }

    public function checkLoginData(string $email, string $password): bool
    {
        $user = $this->getUserByEmailAndPassword($email, $password);
        return $user == null ? false : true;
    }

    public function checkIfUserExistsById(int $id): bool
    {
        $user = $this->getUserById($id);
        return $user == null ? false : true;
    }

    public function checkIfUserExistsByEmail(string $email): bool
    {
        $user = $this->getUserByEmail($email);
        return $user == null ? false : true;
    }

    public function getUserById(int $id): ?User
    {
        return $this->em->getRepository(User::class)->find($id);
    }

    public function getUserByEmail(string $email): ?User
    {
        return $this->em->getRepository(User::class)->findOneBy(array('email'=>$email));
    }

    public function getUserByEmailAndPassword(string $email, string $password): ?User
    {
        return $this->em->getRepository(User::class)->findOneBy(array('email'=>$email, 'password'=>$password));
    }

    public function getUsers(int $limit): array
    {
        return $this->em->getRepository(User::class)->findBy(null, null, $limit);
    }

    public function getAllUsers(): array
    {
        return $this->em->getRepository(User::class)->findAll();
    }
}
