<?php

namespace App\Controller;

use App\Entity\Etablissement;
use App\Repository\EtablissementRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Http\Attribute\IsGranted;

class EtablissementController extends AbstractController
{
    // Renvoie la liste des établissements sous une forme JSON stable.
    #[Route('/api/etablissements', name: 'api_etablissements', methods: ['GET'])]
    public function index(EtablissementRepository $repository): JsonResponse
    {
        $etablissements = $repository->findAll();

        // Transforme les entités Doctrine en tableaux adaptés à la réponse API.
        $data = [];

        foreach ($etablissements as $etablissement) {
            $data[] = [
                'id' => $etablissement->getId(),
                'nom' => $etablissement->getNom(),
                'ville' => $etablissement->getVille(),
                'adresse' => $etablissement->getAdresse(),
                'latitude' => $etablissement->getLatitude(),
                'longitude' => $etablissement->getLongitude(),
                'niveauOccupation' => $etablissement->getNiveauOccupation(),
            ];
        }

        return $this->json($data);
    }

    // Renvoie un établissement précis ou une réponse 404 s'il n'existe pas.
    #[Route('/api/etablissements/{id}', name: 'api_etablissement_show', methods: ['GET'])]
    public function show(int $id, EtablissementRepository $repository): JsonResponse
    {
        $etablissement = $repository->find($id);

        if (!$etablissement) {
            return $this->json([
                'message' => 'Établissement introuvable'
            ], 404);
        }

        return $this->json([
            'id' => $etablissement->getId(),
            'nom' => $etablissement->getNom(),
            'ville' => $etablissement->getVille(),
            'adresse' => $etablissement->getAdresse(),
            'latitude' => $etablissement->getLatitude(),
            'longitude' => $etablissement->getLongitude(),
            'niveauOccupation' => $etablissement->getNiveauOccupation(),
        ]);
    }

    // Réserve la création aux administrateurs.
    #[IsGranted('ROLE_ADMIN')]
    #[Route('/api/etablissements', methods: ['POST'])]
    public function create(
        Request $request,
        EntityManagerInterface $em
    ): JsonResponse
    {
        // Décode les données envoyées par le client.
        $data = json_decode(
            $request->getContent(),
            true
        );

        $etablissement = new Etablissement();

        $etablissement->setNom(
            $data['nom']
        );

        $etablissement->setVille(
            $data['ville']
        );

        $etablissement->setAdresse(
            $data['adresse']
        );

        $etablissement->setLatitude(
            $data['latitude']
        );

        $etablissement->setLongitude(
            $data['longitude']
        );

        $etablissement->setNiveauOccupation(
            $data['niveauOccupation']
        );

        // Enregistre la nouvelle entité et renvoie le statut HTTP de création.
        $em->persist($etablissement);
        $em->flush();

        return $this->json([
            'message' => 'Établissement créé'
        ], 201);
    }


    // Réserve la suppression aux administrateurs.
    #[IsGranted('ROLE_ADMIN')]
    #[Route('/api/etablissements/{id}', methods: ['DELETE'])]
    public function delete(
        int $id,
        EtablissementRepository $repository,
        EntityManagerInterface $em
        ): JsonResponse
    {
        // Recherche la ligne ciblée avant d'essayer de la supprimer.
        $etablissement = $repository->find($id);

        if (!$etablissement) {
            return $this->json([
                'message' => 'Établissement introuvable'
            ], 404);
        }

        // Supprime l'entité trouvée puis valide la transaction Doctrine.
        $em->remove($etablissement);
        $em->flush();

        return $this->json([
            'message' => 'Établissement supprimé'
        ]);
    }
    
    // Réserve la modification aux administrateurs.
    #[IsGranted('ROLE_ADMIN')]
    #[Route('/api/etablissements/{id}', methods: ['PUT'])]
    public function update(
        int $id,
        Request $request,
        EtablissementRepository $repository,
        EntityManagerInterface $em
    ): JsonResponse
    {
        // Charge l'entité existante afin de pouvoir modifier ses champs.
        $etablissement = $repository->find($id);

        if (!$etablissement) {
            return $this->json([
                'message' => 'Établissement introuvable'
            ], 404);
        }

        // Décode les nouvelles valeurs fournies dans le corps de la requête.
        $data = json_decode(
            $request->getContent(),
            true
        );

        $etablissement->setNom($data['nom']);
        $etablissement->setVille($data['ville']);
        $etablissement->setAdresse($data['adresse']);
        $etablissement->setLatitude($data['latitude']);
        $etablissement->setLongitude($data['longitude']);
        $etablissement->setNiveauOccupation(
            $data['niveauOccupation']
        );

        // Enregistre les changements puis confirme la modification au client.
        $em->flush();

        return $this->json([
            'message' => 'Établissement modifié'
        ]);
    }
}