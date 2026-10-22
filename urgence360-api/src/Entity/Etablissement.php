<?php

namespace App\Entity;

use App\Repository\EtablissementRepository;
use Doctrine\ORM\Mapping as ORM;

// Modèle Doctrine des établissements affichés sur la carte.
#[ORM\Entity(repositoryClass: EtablissementRepository::class)]
class Etablissement
{
    // Identifiant généré à l'insertion en base.
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    // Nom, ville et adresse décrivent l'établissement.
    private ?string $nom = null;

    #[ORM\Column(length: 255)]
    private ?string $ville = null;

    #[ORM\Column(length: 255)]
    private ?string $adresse = null;

    #[ORM\Column]
    // Coordonnées utilisées pour positionner le marqueur sur la carte.
    private ?float $latitude = null;

    #[ORM\Column]
    private ?float $longitude = null;

    #[ORM\Column(length: 255)]
    // Niveau utilisé pour informer les visiteurs et colorer le marqueur.
    private ?string $niveauOccupation = null;

    // Retourne l'identifiant de l'entité.
    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): static
    {
        $this->nom = $nom;

        return $this;
    }

    public function getVille(): ?string
    {
        return $this->ville;
    }

    public function setVille(string $ville): static
    {
        $this->ville = $ville;

        return $this;
    }

    public function getAdresse(): ?string
    {
        return $this->adresse;
    }

    public function setAdresse(string $adresse): static
    {
        $this->adresse = $adresse;

        return $this;
    }

    public function getLatitude(): ?float
    {
        return $this->latitude;
    }

    public function setLatitude(float $latitude): static
    {
        $this->latitude = $latitude;

        return $this;
    }

    public function getLongitude(): ?float
    {
        return $this->longitude;
    }

    public function setLongitude(float $longitude): static
    {
        $this->longitude = $longitude;

        return $this;
    }

    public function getNiveauOccupation(): ?string
    {
        return $this->niveauOccupation;
    }

    public function setNiveauOccupation(string $niveauOccupation): static
    {
        $this->niveauOccupation = $niveauOccupation;

        return $this;
    }
}
