<?php
namespace App\Service;

use App\Entity\Product;
use App\Entity\ProductBase;
use App\Entity\ProductImage;
use Doctrine\ORM\EntityManagerInterface;

class ProductService
{
    private EntityManagerInterface $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    public function addProduct(Product $product)
    {
        $this->em->persist($product);
        $this->em->flush();
    }

    public function addProductBase(ProductBase $productBase)
    {
        $this->em->persist($productBase);
        $this->em->flush();
    }

    public function addProductByDetails(string $name, string $description, string $brand,
                                        bool $forWomen, int $price, int $volume, int $imageId,
                                        string $baseNote=null): bool
    {
        $image = $this->getProductImageById($imageId);
        if ($image == null)
            return false;

        $productBase = new ProductBase();
        $productBase->setName($name)
            ->setDescription($description)
            ->setBrand($brand)
            ->setForWomen($forWomen)
            ->setBaseNote($baseNote)
            ->setImage($image);
        $this->addProductBase($productBase);

        $product = new Product();
        $product->setProductBase($productBase)
            ->setPrice($price)
            ->setVolume($volume)
            ->setAddedAt(new \DateTime("now", new \DateTimeZone("Europe/Warsaw")));
        $this->addProduct($product);

        return true;
    }

    public function addProductBaseByDetails(string $name, string $description, string $brand,
                                            bool $forWomen, string $baseNote=null)
    {
        $productBase = new ProductBase();
        $productBase->setName($name)
            ->setDescription($description)
            ->setBrand($brand)
            ->setForWomen($forWomen)
            ->setBrand($baseNote);
        $this->addProductBase($productBase);
    }

    public function updateProduct(Product $product)
    {
        $this->em->merge($product);
        $this->em->flush();
    }

    public function updateProductByDetails(int $productId, string $name, string $description,
                                           string $brand, bool $forWomen, int $price,
                                           int $volume, int $imageId, string $baseNote=null): bool
    {
        if (($product = $this->getProductById($productId)) == null)
            return false;
        if (($productBase = $product->getProductBase()) == null)
            return false;
        if (($image = $this->getProductImageById($imageId)) == null)
            return false;

        $productBase->setName($name)
            ->setDescription($description)
            ->setBrand($brand)
            ->setForWomen($forWomen)
            ->setBaseNote($baseNote)
            ->setImage($image);
        $this->addProductBase($productBase);

        $product->setProductBase($productBase)
            ->setPrice($price)
            ->setVolume($volume);

        $this->updateProduct($product);
        return true;
    }

    public function deleteProduct(Product $product): bool
    {
        if ($this->checkIfProductExistsById($product->getId()) ||
            $this->checkIfProductBaseExistsById($product->getProductBase()->getId()))
        {
            $this->em->remove($product->getProductBase());
            $this->em->remove($product);
            $this->em->flush();
            return true;
        }
        return false;
    }

    public function deleteProductById(int $id): bool
    {
        $product = $this->getProductById($id);
        if ($product == null || $product->getProductBase() == null) return false;
        $this->em->remove($product->getProductBase());
        $this->em->remove($product);
        $this->em->flush();
        return true;
    }

    public function deleteProductBase(ProductBase $productBase): bool
    {
        if ($this->checkIfProductExistsById($productBase->getId()))
        {
            $this->em->remove($productBase);
            $this->em->flush();
            return true;
        }
        return false;
    }

    public function deleteProductBaseById(int $id): bool
    {
        $productBase = $this->getProductBaseById($id);
        if ($productBase == null) return false;
        $this->em->remove($productBase);
        $this->em->flush();
        return true;
    }

    public function checkIfProductExistsById(int $id): bool
    {
        $product = $this->getProductById($id);
        return $product == null ? false : true;
    }

    public function checkIfProductBaseExistsById(int $id): bool
    {
        $productBase = $this->getProductBaseById($id);
        return $productBase == null ? false : true;
    }

    public function getProductById(int $id): ?Product
    {
        return $this->em->getRepository(Product::class)->find($id);
    }

    public function getProductBaseById(int $id): ?ProductBase
    {
        return $this->em->getRepository(ProductBase::class)->find($id);
    }

    public function getProductImageById(int $id): ?ProductImage
    {
        return $this->em->getRepository(ProductImage::class)->find($id);
    }

    public function getProductsByLimit(int $limit): array
    {
        return $this->em->getRepository(Product::class)->findBy(array(), null, $limit);
    }

    public function getProductsByFilters($brand, $name, $priceBottom,
                                           $priceTop, $volumeBottom, $volumeTop,
                                           $forWomen, $baseNote, $offerId): array
    {
        $qb = $this->em->createQueryBuilder();
        if ($offerId != null) $qb->select('o', 'p', 'pb', 'pi')
            ->from('App:Offer', 'o')
            ->join('App:Product', 'p', 'WITH', 'o.product = p')
            ->join('App:ProductBase', 'pb', 'WITH', 'p.product_base = pb')
            ->join('App:ProductImage', 'pi', 'WITH', 'pb.image = pi')
            ->where('o.id = :offerId')
            ->setParameter('offerId', $offerId);
        else $qb->select('p', 'pb', 'pi')
            ->from('App:Product', 'p')
            ->join('App:ProductBase', 'pb', 'WITH', 'p.product_base = pb')
            ->join('App:ProductImage', 'pi', 'WITH', 'pb.image = pi');


        if ($brand != null) $qb->andWhere('pb.brand = :brand')->setParameter('brand', $brand);
        if ($name != null) $qb->andWhere('pb.name = :name')->setParameter('name', $name);
        if ($priceBottom != null && $priceTop != null)
            $qb->andWhere('p.price >= :priceBottom')->setParameter('priceBottom', $priceBottom)
                ->andWhere('p.price <= :priceTop')->setParameter('priceTop', $priceTop);
        if ($volumeBottom != null && $volumeTop != null)
            $qb->andWhere('p.volume >= :volumeBottom')->setParameter('volumeBottom', $volumeBottom)
                ->andWhere('p.volume <= :volumeTop')->setParameter('volumeTop', $volumeTop);
        if ($forWomen != null) $qb->andWhere('pb.for_women = :forWomen')->setParameter('forWomen', $forWomen);
        if ($baseNote != null) $qb->andWhere('pb.base_note = :baseNote')->setParameter('baseNote', $baseNote);

        return $qb->getQuery()->getScalarResult();
    }

    public function getAllProducts(): array
    {
        return $this->em->getRepository(Product::class)->findAll();
    }
}
