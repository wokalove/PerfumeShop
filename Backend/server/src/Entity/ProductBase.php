<?php

namespace App\Entity;

use App\Repository\ProductBaseRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ProductBaseRepository::class)
 */
class ProductBase
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=100)
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=200)
     */
    private $description;

    /**
     * @ORM\Column(type="string", length=100)
     */
    private $brand;

    /**
     * @ORM\Column(type="string", length=100, nullable=true)
     */
    private $base_note;

    /**
     * @ORM\Column(type="boolean")
     */
    private $for_women;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getBrand(): ?string
    {
        return $this->brand;
    }

    public function setBrand(string $brand): self
    {
        $this->brand = $brand;

        return $this;
    }

    public function getBaseNote(): ?string
    {
        return $this->base_note;
    }

    public function setBaseNote(?string $base_note): self
    {
        $this->base_note = $base_note;

        return $this;
    }

    public function getForWomen(): ?bool
    {
        return $this->for_women;
    }

    public function setForWomen(bool $for_women): self
    {
        $this->for_women = $for_women;

        return $this;
    }
}
