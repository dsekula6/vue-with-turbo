<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class PlaygroundController extends AbstractController
{
    #[Route('/', name: 'playground_counter', defaults: ['page' => 'Counter'], methods: ['GET'])]
    #[Route('/notes', name: 'playground_notes', defaults: ['page' => 'Notes'], methods: ['GET'])]
    #[Route('/colors', name: 'playground_colors', defaults: ['page' => 'Colors'], methods: ['GET'])]
    public function index(string $page): Response
    {
        return $this->render('playground/index.html.twig', ['page' => $page]);
    }
}
