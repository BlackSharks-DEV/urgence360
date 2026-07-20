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
    #[Route('/api/etablissements', name: 'api_etablissements', methods: ['GET'])]
    public function index(EtablissementRepository $repository): JsonResponse
    {
        $etablissements = $repository->findAll();

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

    #[IsGranted('ROLE_ADMIN')]
    #[Route('/api/etablissements', methods: ['POST'])]
    public function create(
        Request $request,
        EntityManagerInterface $em
    ): JsonResponse
    {
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

        $em->persist($etablissement);
        $em->flush();

        return $this->json([
            'message' => 'Établissement créé'
        ], 201);
    }


    #[IsGranted('ROLE_ADMIN')]
    #[Route('/api/etablissements/{id}', methods: ['DELETE'])]
    public function delete(
        int $id,
        EtablissementRepository $repository,
        EntityManagerInterface $em
        ): JsonResponse
    {
        $etablissement = $repository->find($id);

        if (!$etablissement) {
            return $this->json([
                'message' => 'Établissement introuvable'
            ], 404);
        }

        $em->remove($etablissement);
        $em->flush();

        return $this->json([
            'message' => 'Établissement supprimé'
        ]);
    }
    
    #[IsGranted('ROLE_ADMIN')]
    #[Route('/api/etablissements/{id}', methods: ['PUT'])]
    public function update(
        int $id,
        Request $request,
        EtablissementRepository $repository,
        EntityManagerInterface $em
    ): JsonResponse
    {
        $etablissement = $repository->find($id);

        if (!$etablissement) {
            return $this->json([
                'message' => 'Établissement introuvable'
            ], 404);
        }

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

        $em->flush();

        return $this->json([
            'message' => 'Établissement modifié'
        ]);
    }
}