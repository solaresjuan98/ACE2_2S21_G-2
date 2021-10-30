class Humedad {
  float x;
  float y;
  float easing = random(0.005, 0.008);
  int actuales;
  ArrayList<Humedad> humedades;

  Humedad() {
    this.x = 0;
    this.y = 0;
    this.actuales = 0;
    this.humedades = new ArrayList<Humedad>();
  }

  void actualizar(int n) {
    this.actuales = n;
    for (int i = this.humedades.size() - 1; i >= 0; i--) {
      this.humedades.remove(i);
    }
    for (int i = 0; i < this.actuales; i++) {
      this.humedades.add(new Humedad());
    }
    for (Humedad h : this.humedades) {
      h.x = random(30, 610);
      h.y = 410;
    }
  }

  boolean estanCompletas(int n) {
    if (this.actuales == n) {
      return true;
    } else {
      return false;
    }
  }

  void mover() {
    this.y += (this.y + 1) * easing;
    if ( this.y > 690) {
      this.y = 410;
      this.x = random(30, 610);
    }
  }
}
