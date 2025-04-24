import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';
import { MenuComponent } from '../components/menu/menu.component';

@Component({
  selector: 'app-precio-servicio',
  standalone: true,
  imports: [RouterModule, FooterComponent, MenuComponent],
  templateUrl: './precio-servicio.component.html',
  styleUrl: './precio-servicio.component.css',
})
export class PrecioServicioComponent {}
