# Aplicación de tareas con el stack MEVN

Creación de un API Rest en node.js con el framework Express, con conexión a base de datos mongo y un frontal con Vue.js.
Se puede partir de esta base para realizar aplicaciones mas complejas o perfeccionar esta. 

## Instalación:
- Clonar o descargar el repositorio 
- Instalar las dependencias con el comando **npm install**
- Instalar MongoDB en local o en servidor y modificar si fuese necesario la variable del fichero index.js
- Ejecutar el comando **npm run dev** para arrancar el servidor. 
- Acceder a http://localhost:3000 o el nombre de tu servidor. 

## Documentación del API Rest
Resumen de las peticiones que acepta el API para su testeo con herramientas tipo [Postman](https://www.getpostman.com)
#### Peticiones GET
- /tasks/ Recupera todas las tareas de la base de datos
- /task/:id Recupera una unica pasandole un id 
 
#### Peticiones POST
- /task/ Guarda una tarea con los campos title y description.

#### Peticiones PUT
- /task/:id Recupera una tarea con el id pasado y se modifica.

#### Peticiones DELETE
- /task/:id Recupera una tarea con el id pasado y la borra.

Proyecto realizado con fines de aprendizaje, puede servir de base para aplicaciones mas complejas, libre de licencias.