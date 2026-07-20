<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AuthController extends AbstractController
{
    #[Route('/api/login', methods: ['POST'])]
    public function login(
        Request $request,
        UserRepository $repository,
        UserPasswordHasherInterface $passwordHasher
    ): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $user = $repository->findOneBy([
            'email' => $data['email']
        ]);

        if (!$user) {
            return $this->json([
                'success' => false,
                'message' => 'Utilisateur introuvable'
            ], 401);
        }

        if (
            !$passwordHasher->isPasswordValid(
                $user,
                $data['password']
            )
        ) {
            return $this->json([
                'success' => false,
                'message' => 'Mot de passe incorrect'
            ], 401);
        }

        return $this->json([
            'success' => true,
            'email' => $user->getEmail()
        ]);
    }
}