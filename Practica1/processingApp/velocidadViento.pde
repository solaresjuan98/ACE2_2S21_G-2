class velocidadViento {

  float actual;
  float easing;
  float x = 0;
  int angulo1;
  int angulo2;
  int angulo3;
  int angulo4;

  velocidadViento() {
    this.actual = 0;
    this.easing = 0;
    this.angulo1 = 0;
    this.angulo2 = 90;
    this.angulo3 = 180;
    this.angulo4 = 270;
  }

  boolean esIgual(float n) {
    if (this.actual == n) {
      return true;
    } else {
      return false;
    }
  }

  void actualizar(float n) {
    this.actual = n;
    this.easing = this.actual / 100;
  }

  void dibujar() {
    strokeWeight(6);
    stroke(255);
    fill(255);
    line(319, 172, 320, 358);
    noStroke();
    fill(#0DBC29); //verde
    arc(320, 170, 260, 260, radians(angulo1) + x, radians(angulo1 + 45) + x);
    this.angulo1++;
    fill(#FCF638); //amarillo
    arc(320, 170, 260, 260, radians(angulo2) + x, radians(angulo2 + 45) + x);
    this.angulo2++;
    fill(#EA1509); //rojo
    arc(320, 170, 260, 260, radians(angulo3) + x, radians(angulo3 + 45) + x);
    this.angulo3++;
    fill(#0C5AF2); //azul
    arc(320, 170, 260, 260, radians(angulo4) + x, radians(angulo4 + 45) + x);
    this.angulo4++;
    x += this.easing;
    if (this.angulo1 > 359) { 
      this.angulo1 = 0;
    }
    if (this.angulo2 > 359) {
      this.angulo2 = 0;
    }
    if (this.angulo3 > 359) {
      this.angulo3 = 0;
    }
    if (this.angulo4 > 359) {
      this.angulo4 = 0;
    }
    strokeWeight(6);
    stroke(255);
    fill(255);
    ellipse(319, 170, 10, 10);
  }
}
