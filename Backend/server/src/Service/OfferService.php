<?php
namespace App\Service;

use App\Entity\Offer;
use App\Entity\Product;
use Doctrine\ORM\EntityManagerInterface;

class OfferService
{
    private EntityManagerInterface $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    public function addOffer(Offer $offer) {
        $this->em->persist($offer);
        $this->em->flush();
    }

    public function addOfferByDetails(Product $product, int $newPrice): Offer {
        $offer = new Offer();
        $offer->setProduct($product)
            ->setNewPrice($newPrice);
        $this->addOffer($offer);

        return $offer;
    }

    public function deleteOffer(Offer $offer): bool {
        if ($this->checkIfOfferExistsById($offer->getId()))
        {
            $this->em->remove($offer);
            $this->em->flush();
            return true;
        }
        return false;
    }

    public function deleteOfferById(int $id): bool {
        $offer = $this->getOfferById($id);
        if ($offer == null) return false;
        $this->em->remove($offer);
        $this->em->flush();
        return true;
    }

    public function checkIfOfferExistsById(int $id): bool {
        $offer = $this->getOfferById($id);
        return $offer == null ? false : true;
    }

    public function getOfferById(int $id): ?Offer {
        return $this->em->getRepository(Offer::class)->find($id);
    }

    public function getOffers(int $limit): array {
        return $this->em->getRepository(Offer::class)->findBy(array(), null, $limit);
    }

    public function getAllOffers(): array {
        return $this->em->getRepository(Offer::class)->findAll();
    }
}
