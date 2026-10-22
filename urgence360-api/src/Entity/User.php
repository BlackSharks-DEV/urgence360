<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;

// Représente un compte authentifiable et les rôles associés.
#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\UniqueConstraint(name: 'UNIQ_IDENTIFIER_EMAIL', fields: ['email'])]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    // Identifiant généré par la base de données.
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    // Adresse email unique utilisée comme identifiant de connexion.
    #[ORM\Column(length: 180)]
    private ?string $email = null;

    /**
     * @var list<string> The user roles
     */
    // Rôles Symfony attribués à ce compte.
    #[ORM\Column]
    private array $roles = [];

    /**
     * @var string The hashed password
     */
    // Empreinte du mot de passe utilisée pour authentifier l'utilisateur.
    #[ORM\Column]
    private ?string $password = null;

    // Retourne l'identifiant généré de l'utilisateur.
    public function getId(): ?int
    {
        return $this->id;
    }

    // Retourne l'adresse email du compte.
    public function getEmail(): ?string
    {
        return $this->email;
    }

    // Définit l'adresse email et permet de chaîner les appels.
    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    // Garantit que chaque utilisateur possède au minimum le rôle standard.
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    /**
     * @param list<string> $roles
     */
    // Remplace la liste des rôles attribués au compte.
    public function setRoles(array $roles): static
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    // Retourne l'empreinte du mot de passe pour le système de sécurité.
    public function getPassword(): ?string
    {
        return $this->password;
    }

    // Enregistre l'empreinte fournie par le service de hachage.
    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Ensure the session doesn't contain actual password hashes by CRC32C-hashing them, as supported since Symfony 7.3.
     */
    // Évite de conserver l'empreinte réelle du mot de passe dans la session sérialisée.
    public function __serialize(): array
    {
        $data = (array) $this;
        $data["\0".self::class."\0password"] = hash('crc32c', $this->password);

        return $data;
    }

    #[\Deprecated]
    public function eraseCredentials(): void
    {
        // @deprecated, to be removed when upgrading to Symfony 8
    }
}
