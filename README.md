# nodejs-api

Recuerda ejecutar ```npm install``` para las librerias

luego lanzar la api
```
node server
```
puedes hacerlas siguientes peticiones:
```
http://localhost:3000/api/anuario Get para obtener los anuarios de la db o Post para crear nuevos pasandole en el body: 
ID_Anuario_Escolar
Descripcion 
Datos_Centro

http://localhost:3000/api/anuario/:id Put Para actulizar editar o actulizar la descripcion del anuario pasando por la peticion url el id y por el body la Descripcion


/asigCursoSeccion Get para obtener las secciones cursos asignados por año de la db o Post para crear nuevos pasandole en el body:
IDAsigCursoSeccionAnio
Curso
Seccion
AnuarioEscolar
SalidasObtativas
DatosCentro
CapacidadAula
CapacidadLimAula

/asigCursoSeccion/:id Put para actualizar la capacidad del aula pasando por la Url el id y por el body CapacidadAula

/asigCursoSeccion/:id Delete para eliminar la asignacion de un curso solo pasando el id por la url
```