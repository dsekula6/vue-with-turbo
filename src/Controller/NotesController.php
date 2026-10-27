<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class NotesController extends AbstractController
{
    #[Route('/notes', name: 'playground_notes', methods: ['GET'])]
    public function index(): Response
    {
        return $this->render('playground/notes.html.twig');
    }
}
