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
    // Reçoit les identifiants JSON et vérifie le compte correspondant.
    #[Route('/api/login', methods: ['POST'])]
    public function login(
        Request $request,
        UserRepository $repository,
        UserPasswordHasherInterface $passwordHasher
    ): JsonResponse
    {
        // Décode le corps de la requête afin d'en extraire les identifiants.
        $data = json_decode($request->getContent(), true);

        $user = $repository->findOneBy([
            'email' => $data['email']
        ]);

        // Renvoie une réponse 401 si aucun compte ne correspond à l'adresse.
        if (!$user) {
            return $this->json([
                'success' => false,
                'message' => 'Utilisateur introuvable'
            ], 401);
        }

        // Compare le mot de passe fourni à son empreinte stockée.
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

        // Confirme l'authentification et renvoie l'adresse du compte.
        return $this->json([
            'success' => true,
            'email' => $user->getEmail()
        ]);
    }
}