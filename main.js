
img = "";
objects = [];
var estatus = "hola";

function preload(){
  img = loadImage('unnamed.jpg');
}



function setup() {
  //33333333333333
  //reducir el tamaño del lienzo para que se vea bien en un dispositivo movil
  canvas = createCanvas(380, 380);
  canvas.center();
  //444444444
  //Agregar la vista de la camara Web
  //se crea una variable para guardar la vista de la camara web
  //si solo agregamos la primeera linea, el video se pondrá del lado izquierdo, pero lo queremos en el canvas
  video= createCapture(VIDEO);
  //para que sea un poco más preciso la construccion del rectángulo
  video.size(380,380);
  video.hide();
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Estatus: detectando objetos";
}

function modelLoaded() {
  console.log("¡Modelo cargado!")
  estatus = "true";
  //7777777777
  //cambiar para que ahora se haga la deteccion en la vista de la camara web

  //8888888
  //también moveremos esta línea para que se haga la verificacion constantemente
  //la llevaremos a la funcion DRAW
  objectDetector.detect(video, gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}


function draw() {
  //55555555555555
  //para agregar la vista de la camara web al canvas
  //solo hay que cambiar la variale que se muestra

  /////6666666666666
  //tambien hay que cambiar el tamaño de la vista de la camara
  image(video, 0, 0, 380, 380);

      if(estatus != "")
      {
        //8888888
        //aqui se moverá para que constantemente haga la verificacion de imagenes
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
          document.getElementById("status").innerHTML = "Estatus: objeto detectado";
          //999999999999
          //actualizaremos el contenido del h3 para mostrar la cantidad de objetos que hay en pantalla
          document.getElementById("numeroObjetos").innerHTML= "Número de objetos: " + objects.length
          fill("#FF0000");
          percent = floor(objects[i].confidence * 100);
          text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
          noFill();
          stroke("#FF0000");
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
      }
}
