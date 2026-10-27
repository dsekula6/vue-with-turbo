<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class ColorsController extends AbstractController
{
    #[Route('/colors', name: 'playground_colors', methods: ['GET'])]
    public function index(): Response
    {
        return $this->render('playground/colors.html.twig');
    }
}
