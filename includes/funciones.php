<?php

function debuguear($variable) : string {
    echo "<pre>";
    var_dump($variable);
    echo "</pre>";
    exit;
}

// Escapa / Sanitizar el HTML
function s($html) : string {
    $s = htmlspecialchars($html);
    return $s;
}

// Función que revisa que el usuario este autenticado
function isAuth(): void {
    if(!isset($_SESSION['login'])) {
        header('Location: /');
    }
}

function isAdmin() {
    if(!isset($_SESSION['login'])) {
        header('Location: /');
        return;
    }

    if(!$_SESSION['admin']) {
        header('Location: /cita');
        return;
    }
}

function esUltimo(string $actual, string $proximo): bool {
    return $actual !== $proximo;
}