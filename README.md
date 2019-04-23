# Team01
## Repositorio para el Equipo 1:
##### Nuestra idea consiste en realizar juegos que pretenden reforzar y estimular las habilidades matemáticas. Esto con el fin de ayudar a los estudiantes de la Universidad de los Andes en las materias relacionadas a las matemáticas. 
##### Cada juego está relacionado con unas materias y unas habilidades, y para cada partida existe un ranking para los participanes, lo cual permite crear un ambiente competitivo amigable, que así mismo estimule el aprendizaje.
--
##### La página se diferencia de su principal competencia, [www.mathgames.com](https://www.mathgames.com/) en que está especializada para materias Universitarias y no solo para educación básica (de colegio). Además, está disponible en español, a diferencia de la otra, que está sólo en inglés.
--
##### Para el modelado de la página creamos los siguientes 9 recursos:
--
##### •	Usuarios
##### •	Partidas
##### •	Preguntas
##### •	Respuestas
##### •	Materias
##### •	Habilidades
##### •	Juegos
##### •	Chats
##### •	Blogs
-
---
# Instrucciones para el despliegue:
Descargue/clone el repositorio del back-end [Team01-back](https://github.com/isis3710-uniandes/Team01-back)

Instale las dependencias
### `npm install`
Actualice npm
### `npm update`
Si es necesario, realice los fixes pertinentes
### `npm audit fix`
Ejecute el proyecto
### `npm start`

Ahora, debería tener corriendo el back-end en localhost:3000
```sh
$ Server started at port : 3000
``` 
##### Si se logró una conexión correcta con la base de datos MongoDB:
-->
```sh
$ MongoDB conexión satisfactoria
``` 
##### 5. Es posible observar los datos de la persistencia en la base de datos de MongoDB utilizando la siguiente URI: [mongodb://admin:password1@ds159025.mlab.com:59025/team1web](mongodb://admin:password1@ds159025.mlab.com:59025/team1web) y accediendo a través de MongoDB.
--*--
##### 6. Las colecciones postman se encuentran en la carpeta "colecciones postman con test", importarlas a postman y correr el archivo. Existe la posibilidad de correr algunos test de forma automática al estar en la colección, pero otros deben correrse de forma manual debido al funcionamiento de la asignación de ids de MongoDB que se realiza automáticamente.
---
