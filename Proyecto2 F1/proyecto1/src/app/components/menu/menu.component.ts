import { Component } from '@angular/core';

interface MenuItem {
  ruta: string;
  texto: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
  ]
})
export class MenuComponent {

  menu: MenuItem[] = [
    {
      ruta: 'menorUso',
      texto: 'Menor uso'
    },
    {
      ruta: 'mayorUso',
      texto: 'Mayor uso'
    }
  ]


}
