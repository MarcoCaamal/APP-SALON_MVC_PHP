<?php

namespace Controllers;

use Model\Cita;
use Model\CitaServicio;
use Model\Servicio;
use MVC\Router;

class APIController {
    public static function index() {
        $servicios = Servicio::all();
        header('Content-Type: application/json');
        echo json_encode($servicios);
    }

    public static function guardar() {
        header('Content-Type: application/json');

        // Almacena la cita
        $cita = new Cita($_POST);
        $resultado = $cita->guardar();

        $citaId = $resultado['id'];

        $serviciosIds = explode(',', $_POST['servicios']);

        foreach($serviciosIds as $servicioId) {
            $args = [
                'citaId' => $citaId,
                'servicioId' => filter_var($servicioId, FILTER_SANITIZE_NUMBER_INT)
            ];
            $citaServicio = new CitaServicio($args);
            $citaServicio->guardar();
        }

        echo json_encode(['resultado' => $resultado]);
    }

    public static function eliminar() {
        if($_SERVER['REQUEST_METHOD'] === 'POST') {
            $id = $_POST['id'];

            $cita = Cita::find($id);
            if(!$cita) {
                header("Location: /404");
            }

            $resultado = $cita->eliminar();

            if($resultado) {
                header('Location:' . $_SERVER['HTTP_REFERER']);
            }

            header('Location: /admin?mensaje=0');
        }
    }
}