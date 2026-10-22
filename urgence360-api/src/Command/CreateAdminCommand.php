<?php

namespace App\Command;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

#[AsCommand(
    name: 'app:create-admin',
    description: 'Créer un administrateur'
)]
class CreateAdminCommand extends Command
{
    // Injecte l'accès à la base de données et le service de hachage des mots de passe.
    public function __construct(
        private EntityManagerInterface $em,
        private UserPasswordHasherInterface $passwordHasher
    )
    {
        parent::__construct();
    }

    protected function execute(
        InputInterface $input,
        OutputInterface $output
    ): int
    {
        // Crée le compte avec un rôle administrateur.
        $user = new User();

        $user->setEmail('admin@urgence360.fr');

        $user->setRoles([
            'ROLE_ADMIN'
        ]);

        // Enregistre uniquement le mot de passe haché, jamais sa valeur en clair.
        $user->setPassword(
            $this->passwordHasher->hashPassword(
                $user,
                'admin123'
            )
        );

        // Persiste le compte puis confirme la réussite dans la console.
        $this->em->persist($user);
        $this->em->flush();

        $output->writeln('Administrateur créé avec succès.');

        return Command::SUCCESS;
    }
}