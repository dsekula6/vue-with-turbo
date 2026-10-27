<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class CounterController extends AbstractController
{
    #[Route('/', name: 'playground_counter', methods: ['GET'])]
    public function index(): Response
    {
        return $this->render('playground/counter.html.twig');
    }
}
