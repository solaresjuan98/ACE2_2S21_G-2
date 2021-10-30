class Temperatura {

  float actual;
  float x;
  float xaux = 670;
  float pos = 0;
  float y;
  ArrayList<Temperatura> cuadros;
  int contador;

  Temperatura() {
    this.actual = 0;
    this.x = 0;
    this.y = 0;
    this.contador = 0;
    this.cuadros = new ArrayList<Temperatura>();
  }

  void actualizar(float t) {
    this.actual = t;
    for (int i = this.cuadros.size() - 1; i >= 0; i--) {
      this.cuadros.remove(i);
    }
    for (int i = 0; i < this.actual; i++) {
      this.cuadros.add(new Temperatura());
    }
    for (Temperatura te : this.cuadros) {
      te.x = this.xaux;
      te.y = 460;
      xaux += 11.6;
    }
    this.contador = 0;
  }

  boolean tempActual(float t) {
    if (this.actual == t) {
      return true;
    } else {
      xaux = 670;
      return false;
    }
  }

  void dibujar() {
    this.contador = 0;
    for (Temperatura t : this.cuadros) {
      if (this.contador < 20) {
        fill(#BFEDFF);
        pos = t.x;
        rect(t.x, 460, 11.6, 20);
      } else if (this.contador >= 20 && this.contador < 35) {
        fill(#FFB40F);
        pos = t.x;
        rect(t.x, 460, 11.6, 20);
      } else if (this.contador >= 35 && this.contador <= 50) {
        fill(#EA332D);
        pos = t.x;
        rect(t.x, 460, 11.6, 20);
      }
      this.contador++;
    }
    if (this.actual <= 0) {
      fill(#BFEDFF);
      textSize(24);
      text(str(this.actual) + " C", 670, 430, 200, 50);
    } else if (this.actual > 50) {
      fill(#EA332D);
      textSize(24);
      text(str(this.actual) + " C", 1180, 430, 200, 50);
    } else {
      textSize(24);
      text(str(this.actual) + " C", pos - 20, 430, 200, 50);
    }
  }

  String devolverEmoji(int n) {
    if (n < 0) {
      return "calavera.svg";
    } else if (n >= 0 && n <= 8) {
      return "congelado.svg";
    } else if (n > 8 && n <= 15) {
      return "mocos.svg";
    } else if (n > 15 && n <= 20) {
      return "cringe.svg";
    } else if (n > 20 && n <= 25) {
      return "tibio.svg";
    } else if (n > 25 && n <= 30) {
      return "calentito.svg";
    } else if (n > 30 && n <= 35) {
      return "caliente.svg";
    } else {
      return "hot.svg";
    }
  }
}
