<?php

namespace App;

use Symfony\Bundle\FrameworkBundle\Kernel\MicroKernelTrait;
use Symfony\Component\HttpKernel\Kernel as BaseKernel;

// Définit le noyau Symfony et active la configuration compacte par attributs.
class Kernel extends BaseKernel
{
    use MicroKernelTrait;
}
