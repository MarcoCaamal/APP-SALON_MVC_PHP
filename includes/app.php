<?php

require __DIR__ . '/../vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->safeLoad();

require 'funciones.php';
require 'database.php';

// Conectarnos a la base de datos
use Model\ActiveRecord;
ActiveRecord::setDB($db);

// $password = password_hash("password", PASSWORD_BCRYPT);

// $query = "UPDATE usuarios SET password = '${password}'";

// $db->query($query);