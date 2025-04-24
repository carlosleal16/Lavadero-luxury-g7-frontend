import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LavaderoService } from '../services/lavadero.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrarse',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './registrarse.component.html',
  styleUrl: './registrarse.component.css'
})
export class RegisterComponent {
  usuario = {
    nombre: '',
    correo: '',
    password: '',
    celular: '',
    cedula: '',
    tipoCedula: 'CC' // Valor por defecto
  };

  

  constructor(private lavaderoService: LavaderoService, private router: Router) {}

  register() {
    this.lavaderoService.registrarUsuario(this.usuario).subscribe({
      next: () => {
        Swal.fire({
          title: '¡Registro exitoso!',
          text: 'Tu cuenta ha sido creada correctamente.',
          icon: 'success',
          confirmButtonText: 'Ir a Iniciar Sesión',
          confirmButtonColor: '#3085d6',
        }).then((result: any) => {
          if (result.isConfirmed) {
            this.router.navigate(['/inicio-sesion']); // Redirige a la pestaña de inicio de sesión
          }
        });
      },
      error: (err) => {
        let errorMessage = 'No se pudo completar el registro. Intenta de nuevo.';

        // Manejo específico de errores según código de estado HTTP
        if (err.status === 400) {
          if (err.error.includes('correo')) {
            errorMessage = 'El correo ya está en uso.';
          } else if (err.error.includes('celular')) {
            errorMessage = 'El número de celular ya está en uso.';
          } else if (err.error.includes('cédula y tipo de cédula')) {
            errorMessage = 'Ya existe un usuario con esta cédula y este tipo de cédula.';
          }
        } else if (err.status === 500) {
          errorMessage = 'Error en el servidor. Intente más tarde.';
        }

        Swal.fire({
          title: 'Error',
          text: errorMessage,
          icon: 'error',
          confirmButtonText: 'Cerrar',
          confirmButtonColor: '#d33',
        });

        console.error(err);
      }
    });
  }
}
