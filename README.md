# Team01
Repositorio para el equipo 1:
Nuestra idea consiste en realizar un juego de conocimientos matematicos para ayudar a los estudiantes en algunas materias relacionadas a fines de la matematica y el calculo. Esta divide cada 'test' por materias y dificultad, tambien existe un sistema de ranking para los mas habiles que respondan estas preguntas, lo que permite a los jugadores crear un ambiente competitivo amigable.
El juego se diferencia con su principal competencia (https://www.mathgames.com/) en el hecho de que esta disponible para idiomas en español, ademas de que permite preguntas mas complejas.


# Instrucciones para el despliegue:
1. npm install
2. Es necesario instalar algunas depedencias que pueda pedir el archivo de configuración packages.json (Mongoose, passport, entre otros)
3. npm start
4. Si se inicio de forma correcta la conexion con el servidor, obtendra un mensaje de confirmación "Server started at port : 3000" y otro si se logro una conexion correcta con la base de datos MongoDB: "MongoDB conexion satisfactoria"
4,5. Es posible observar los datos de la persistencia en la base de datos de MongoDB utilizando la siguiente URI: mongodb://admin:password1@ds159025.mlab.com:59025/team1web y accediendo a través de MongoDB
5. Las colecciones postman se encuentran en la carpeta "colecciones postman con test", importarlas a postman y correr el archivo.
Existe la posibilidad de correr algunos test de forma automatica al estar en la coleccion, pero otros deben correrse de forma manual.




