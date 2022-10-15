<h1 class="nombre-pagina">Olvide Mi Password</h1>
<p class="descripcion-pagina">Reestablece tu password escribiendo tu email a continuación</p>

<?php include_once __DIR__ . "/../templates/alertas.php"; ?>

<form action="/olvide" class="formulario" method="POST">
    <div class="campo">
        <label for="email">Email</label>
        <input 
            type="email"
            id="email"
            placeholder="Tu Email"
            name="email"
        />
    </div>

    <input type="submit" class="boton" value="Enviar Instrucciones">
</form>

<div class="acciones">
    <a href="/">¿Ya tienes una cuenta? Inicia Sesión</a>
    <a href="/crear-cuenta">¿Aún no tiene un cuenta? Crea una</a>
</div>