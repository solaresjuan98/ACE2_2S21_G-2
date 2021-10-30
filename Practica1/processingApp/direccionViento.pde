class direccionViento {
  char direccion;
  float x;
  float y;
  float easingY = random(0.01, 0.03);
  float easingX = random(0.001, 0.01);

  direccionViento() {
    this.x = 0;
    this.y = 0;
    this.direccion = 'A';
  }

  boolean mismaDireccion(char n) {
    if (n == this.direccion) {
      return true;
    } else {
      return false;
    }
  }

  void cambiarDireccion(char n) {
    this.direccion = n;
    switch (n) {
    case 'N':
      this.x = random(670, 1250);
      this.y = 330;
      break;
    case 'S':
      this.x = random(670, 1250);
      this.y = 50;
      break;
    case 'E':
      this.x = 670;
      this.y = random(50, 330);
      break;
    case 'O':
      this.x = 1250;
      this.y = random(50, 330);
      break;
    }
  }

  void mover() {
    if (this.direccion == 'N') {
      this.y -= (this.y - 1) * easingY;
      if (this.y < 50) {
        this.y = 330;
        this.x = random(670, 1250);
      }
    } else if (this.direccion == 'S') {
      this.y += (this.y + 1) * easingY;
      if (this.y > 330) {
        this.y = 50;
        this.x = random(670, 1250);
      }
    } else if (this.direccion == 'E') {
      this.x += (this.x + 0.5) * easingX;
      if (this.x > 1250) {
        this.x = 670;
        this.y = random(50, 330);
      }
    } else if (this.direccion == 'O') {
      this.x -= (this.x - 1) * easingX;
      if (this.x < 670) { 
        this.x = 1250;
        this.y = random(50, 330);
      }
    }
  }
}
