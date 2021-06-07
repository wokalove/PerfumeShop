<?php

namespace App\Entity;

use App\Repository\ProductRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ProductRepository::class)
 */
class Product
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=ProductBase::class, inversedBy="product")
     * @ORM\JoinColumn(nullable=false)
     */
    private $product_base;

    /**
     * @ORM\Column(type="integer")
     */
    private $price;

    /**
     * @ORM\Column(type="integer")
     */
    private $volume;

    /**
     * @ORM\Column(type="datetime")
     */
    private $added_at;

    /**
     * @ORM\OneToOne(targetEntity=Offer::class, mappedBy="product", cascade={"persist", "remove"})
     */
    private $offer;

    /**
     * @ORM\OneToMany(targetEntity=Transaction::class, mappedBy="product", orphanRemoval=true)
     */
    private $transaction;

    public function __construct()
    {
        $this->transaction = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getProductBase(): ?ProductBase
    {
        return $this->product_base;
    }

    public function setProductBase(?ProductBase $product_base): self
    {
        $this->product_base = $product_base;

        return $this;
    }

    public function getPrice(): ?int
    {
        return $this->price;
    }

    public function setPrice(int $price): self
    {
        $this->price = $price;

        return $this;
    }

    public function getVolume(): ?int
    {
        return $this->volume;
    }

    public function setVolume(int $volume): self
    {
        $this->volume = $volume;

        return $this;
    }

    public function getAddedAt(): ?\DateTimeInterface
    {
        return $this->added_at;
    }

    public function setAddedAt(\DateTimeInterface $added_at): self
    {
        $this->added_at = $added_at;

        return $this;
    }

    public function getOffer(): ?Offer
    {
        return $this->offer;
    }

    public function setOffer(Offer $offer): self
    {
        // set the owning side of the relation if necessary
        if ($offer->getProduct() !== $this) {
            $offer->setProduct($this);
        }

        $this->offer = $offer;

        return $this;
    }

    /**
     * @return Collection|Transaction[]
     */
    public function getTransaction(): Collection
    {
        return $this->transaction;
    }

    public function addTransaction(Transaction $transaction): self
    {
        if (!$this->transaction->contains($transaction)) {
            $this->transaction[] = $transaction;
            $transaction->setProduct($this);
        }

        return $this;
    }

    public function removeTransaction(Transaction $transaction): self
    {
        if ($this->transaction->removeElement($transaction)) {
            // set the owning side to null (unless already changed)
            if ($transaction->getProduct() === $this) {
                $transaction->setProduct(null);
            }
        }

        return $this;
    }

    public function __toString()
    {
        return $this->getProductBase()." ".
            $this->getPrice()." ".
            $this->getVolume()." ".
            $this->getAddedAt()->format("Y-m-d H:i:s");
    }
}
