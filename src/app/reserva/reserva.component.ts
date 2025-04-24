import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { Router, RouterModule } from '@angular/router';
import { MenuComponent } from '../components/menu/menu.component';
import { LavaderoService } from '../services/lavadero.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reserva',
  standalone: true,
  imports: [RouterModule, FormsModule, FooterComponent, MenuComponent],
  templateUrl: './reserva.component.html',
  styleUrl: './reserva.component.css',
})
export class ReservaComponent {
  RegisVehiculo = {
    vehiculo: {
      id: 4,
      placa: 'emz840',
      modelo: 'Sedan',
    },
    tipo: 'Servicio 1',
    user: {
      id: 1, // ID del usuario
      nombre: 'John Doe', // Otros campos necesarios
      correo: 'john.doe@example.com',
    },
  };

  constructor(
    private lavaderoService: LavaderoService,
    private router: Router
  ) {}

  registrarReserva() {
    this.lavaderoService.crearReserva(this.RegisVehiculo).subscribe({
      next: () => {
        Swal.fire('Éxito', 'Reserva registrada correctamente', 'success');
        this.router.navigate(['/precio-servicio']);
      },
      error: (err) => {
        Swal.fire(
          'Error',
          err.error.message || 'No se pudo registrar la reserva',
          'error'
        );
      },
    });
  }
}
