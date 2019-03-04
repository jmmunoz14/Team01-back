# Team01
## Repositorio para el Equipo 1:
##### Nuestra idea consiste en realizar un juego de conocimientos matemáticos para ayudar a los estudiantes en algunas materias relacionadas a fines de la matemática y el cálculo especialmente enfocado a la Universidad de los Andes. Esta divide cada 'test' por materias y dificultad, también existe un sistema de ranking para los más hábiles que respondan estas preguntas, lo que permite a los jugadores crear un ambiente competitivo amigable.
--
##### El juego se diferencia con su principal competencia [www.mathgames.com](https://www.mathgames.com/) en el hecho de que está disponible para idiomas en español, además de que permite preguntas más complejas y especializadas para materias Universitarias y no solo para educación básica.
--
##### Para el modelado de la página creamos los siguientes 9 recursos:
--
##### •	Usuarios
##### •	Partidas
##### •	Respuestas
##### •	Preguntas
##### •	Materias
##### •	Habilidades
##### •	Juegos
##### •	Chats
##### •	Blogs
---
## La persistencia de estos recursos se realiza a traves de la base de datos de MongoDB

# Instrucciones para el despliegue:
##### 1. Instalar/Actualizar.
-->
```sh
$ npm update
$ npm install
```
##### 2. Es necesario instalar algunas dependencias que pueda pedir el archivo de configuración packages.json (Mongoose, passport, entre otros).
##### 3. Ejecución.
-->
```sh
$ npm start
```
##### 4. Si se inició de forma correcta la conexión con el servidor, obtendrá un mensaje de confirmación:
-->
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
##### 6. Las colecciones postman se encuentran en la carpeta "colecciones postman con test", importarlas a postman y correr el archivo. Existe la posibilidad de correr algunos test de forma automática al estar en la colección, pero otros deben correrse de forma manual.
---
