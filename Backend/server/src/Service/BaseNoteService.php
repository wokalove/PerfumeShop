<?php

namespace App\Service;

use Doctrine\ORM\EntityManagerInterface;

class BaseNoteService
{
    private EntityManagerInterface $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    public function getAllBaseNotes(): array
    {
        return $this->em
            ->createQueryBuilder()
            ->select('pb.base_note')
            ->from('App:ProductBase', 'pb')
            ->groupBy('pb.base_note')
            ->getQuery()
            ->getResult();
    }
}
