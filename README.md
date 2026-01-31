1. Configuración del Backend (VS Code)
Para que la base de datos sea accesible, el "puente" (tu servidor Node.js) debe estar configurado y activo.

Estructura de Archivos
backend/: Carpeta principal que contiene la lógica.
.env: Archivo secreto con las credenciales SUPABASE_URL y SUPABASE_KEY.
index.js: El corazón del servidor donde residen las rutas CRUD.

Cómo encender el motor
Abre la terminal en VS Code.
Entra a la carpeta del servidor con el comando: cd backend.
Arranca el servidor con: node index.js.
Confirmación: Debes ver el mensaje 🚀 Servidor en http://localhost:3000.

2. Manual de Funciones en Postman
Una vez el servidor está encendido, usas Postman para enviar órdenes a Supabase.

A. Listar Inventario (GET)
Método: GET.
URL: http://localhost:3000/velas.
Body: none.
Uso: Sirve para ver qué velas tienes y conocer sus IDs (necesarios para editar o borrar).

B. Crear Nueva Vela (POST)
Método: POST.
URL: http://localhost:3000/velas.
Body: Selecciona raw y formato JSON.
Formato de datos:
JSON
{
    "nombre": "Vela Canela Artesanal",
    "descripcion": "Cera de soja natural",
    "precio": 35000,
    "imagen_url": "https://link.com/foto.jpg",
    "stock": 15
}
Confirmación: Recibirás un estado 201 Created y el mensaje "Vela creada con éxito".

C. Editar una Vela (PUT)
Método: PUT.
URL: http://localhost:3000/velas/ID_DE_LA_VELA (Ejemplo: .../velas/4).
Body: Envía solo los campos que quieres actualizar (ej. precio o stock).
Importante: Si no pones el ID al final de la URL, recibirás un error 404 Not Found.

D. Eliminar una Vela (DELETE)
Método: DELETE.
URL: http://localhost:3000/velas/ID_DE_LA_VELA.
Body: none.
Efecto: Borra permanentemente el registro de Supabase.
