import { Component, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { LavaderoService } from '../services/lavadero.service';
import { FormsModule, NgModel } from '@angular/forms';
import { subscribeOn } from 'rxjs';
import { FooterComponent } from '../footer/footer.component';
import { MenuComponent } from '../components/menu/menu.component';

@Component({
  selector: 'app-registrovehiculo',
  standalone: true,
  imports: [RouterModule, FormsModule, FooterComponent, MenuComponent],
  templateUrl: './registrovehiculo.component.html',
  styleUrl: './registrovehiculo.component.css'
})


export class RegistrarVehiculoComponent {
  RegisVehiculo = {
    placa: '',
    tipo: 'Automóvil',
    usuario_id: 1 // Se debería cambiar dinámicamente según el usuario autenticado
  };

  constructor(private lavaderoService: LavaderoService, private router: Router) {}

  registrarVehiculo() {
    this.lavaderoService.registrarVehiculo(this.RegisVehiculo).subscribe({
      next: () => {
        Swal.fire('Éxito', 'Vehículo registrado correctamente', 'success');
        this.router.navigate(['/precio-servicio']);
      },
      error: (err) => {
        Swal.fire('Error', err.error.message || 'No se pudo registrar el vehículo', 'error');
      }
    });
  }
}

