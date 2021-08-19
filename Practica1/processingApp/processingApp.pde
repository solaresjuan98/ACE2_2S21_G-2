import processing.serial.*; //<>//

Serial puerto;

PFont font;
PFont font2;
ArrayList<direccionViento> dirViento = new ArrayList<direccionViento>();
Humedad porHumedad = new Humedad();
PShape emoji;
Temperatura tempe = new Temperatura();
velocidadViento velViento = new velocidadViento();

//Variables para recibir los valores de Arduino
float medVelViento=0;
char medDirViento='a';
float medHumedad=0;
float medTemperatura=0;
JSONObject json;

void setup() {
  size(1280, 720);
  for (int i = 0; i < 150; i++) {
    dirViento.add(new direccionViento());
  }
  actualizarDatos();
/*  println(Serial.list());
  puerto= new Serial(this,Serial.list()[0],9600);
  puerto.bufferUntil('\n');*/
  
}
/*
void serialEvent(Serial puerto) {
  String dato = puerto.readStringUntil('\n');
  if (dato != null) {
    String [] a = dato.split(",");
    medVelViento = float(a[1]);
    medDirViento = a[0].charAt(0);
    medHumedad = float(a[3]);
    medTemperatura = float(a[2]);
  }
}*/

int p=0;
void draw() {
  //Variables que reciben los datos de Arduino
  p++;
  if(p>=50){
    actualizarDatos();
    p=0;
  }
  divisiones();
  encabezados();
  veloViento(medVelViento);
  direViento(medDirViento);
  nivelHumedad(medHumedad);
  nivelTemp(medTemperatura);
  
}
void actualizarDatos(){
  String []texto=loadStrings("http://localhost:4000/ultimoRegistro");
  json=parseJSONObject(texto[0]);
  medTemperatura=json.getFloat("t");
  medVelViento=json.getFloat("v");
  medDirViento=json.getString("d").charAt(0);
  medHumedad=json.getFloat("h");
}

void veloViento(float vel) {
  //x = 30 - 610; y = 50 - 330
  if (velViento.esIgual(vel)) {
    noStroke();
    fill(0);
    rect(30, 50, 580, 280);
    velViento.dibujar();
    fill(#32A9D6);
    text(str(vel), 240, 310, 100, 50);
    textSize(14);
    text(" km/h", 325, 315, 100, 50);
  } else {
    velViento.actualizar(vel);
  }
}

void direViento(char dir) {
  //x = 670 - 1250; y = 50 - 330
  stroke(255);
  strokeWeight(4);
  line(960, 110, 960, 270);
  line(880, 190, 1040, 190);
  fill(#DBD112);
  textSize(24);
  text('N', 952, 100);
  text('S', 952, 300);
  text('E', 1050, 202);
  text('O', 855, 202);
  strokeWeight(2);
  for (direccionViento dv : dirViento) {
    if (dv.mismaDireccion(dir)) {
      dv.mover();
      fill(255);
      if (dv.direccion == 'N') {
        beginShape();
        vertex(dv.x, dv.y);
        vertex(dv.x - 3, dv.y + 5);
        vertex(dv.x, dv.y + 3);
        vertex(dv.x + 3, dv.y + 5);
        endShape(CLOSE);
      } else if (dv.direccion == 'S') {
        beginShape();
        vertex(dv.x, dv.y);
        vertex(dv.x - 3, dv.y - 5);
        vertex(dv.x, dv.y - 3);
        vertex(dv.x + 3, dv.y - 5);
        endShape(CLOSE);
      } else if (dv.direccion == 'E') {
        beginShape();
        vertex(dv.x, dv.y);
        vertex(dv.x - 5, dv.y - 3);
        vertex(dv.x - 3, dv.y);
        vertex(dv.x - 5, dv.y + 3);
        endShape(CLOSE);
      } else if (dv.direccion == 'O') {
        beginShape();
        vertex(dv.x, dv.y);
        vertex(dv.x + 5, dv.y - 3);
        vertex(dv.x + 3, dv.y);
        vertex(dv.x + 5, dv.y + 3);
        endShape(CLOSE);
      }
    } else {
      dv.cambiarDireccion(dir);
    }
  }
}

void nivelHumedad(float por) {
  //x = 30 - 610; y = 410 - 690
  noStroke();
  if (porHumedad.estanCompletas(int(por))) {
    fill(#32A9D6);
    textSize(36);
    text(str(por), 260, 515, 200, 50);
    textSize(14);
    text("por ciento", 260, 550, 100, 50);
    for (Humedad h : porHumedad.humedades) {
      h.mover();
      fill(#1687F5);
      ellipse(h.x, h.y, 5, 5);
    }
  } else {
    porHumedad.actualizar(int(por));
  }
}

void nivelTemp(float temp) {
  //x = 670 - 1250; y = 410 - 690
  fill(#BCBCBA, 80);
  noStroke();
  rect(670, 460, 580, 20);
  if (tempe.tempActual(temp)) {
    tempe.dibujar();
    emoji = loadShape(tempe.devolverEmoji(int(temp)));
    shapeMode(CORNER);
    shape(emoji, 870, 510, 160, 160);
  } else {
    tempe.actualizar(temp);
  }
}

void divisiones() {
  background(0);
  stroke(255);
  strokeWeight(4);
  line(width/2, 0, width/2, height);
  line(0, height/2, width, height/2);
}

void encabezados() {
  String s1 = "Velocidad del viento";
  String s2 = "Direccion del viento";
  String s3 = "Humedad";
  String s4 = "Temperatura";
  font = loadFont("Gameplay-100.vlw");
  textFont(font);
  textSize(24);
  fill(#94E89C);
  text(s1, 150, 5, 400, 50);
  text(s2, 800, 5, 400, 50);
  fill(#AAECF7);
  text(s3, 250, 370, 150, 50);
  text(s4, 860, 370, 250, 50);
}
