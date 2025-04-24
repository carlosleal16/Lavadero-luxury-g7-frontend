import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { MenuComponent } from '../components/menu/menu.component';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [RouterModule, FooterComponent, MenuComponent],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
})
export class PerfilComponent {}
