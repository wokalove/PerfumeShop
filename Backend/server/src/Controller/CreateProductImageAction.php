<?php

namespace App\Controller;

use App\Entity\ProductImage;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

final class CreateProductImageAction
{
    public function __invoke(Request $request): ProductImage
    {
        $uploadedFile = $request->files->get('file');
        if (!$uploadedFile) {
            throw new BadRequestHttpException('"file" is required');
        }

        $productImage = new ProductImage();
        $productImage->file = $uploadedFile;

        return $productImage;
    }
}