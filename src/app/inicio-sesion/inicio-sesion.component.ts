import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LavaderoService } from '../services/lavadero.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inicio-sesion',
  standalone: true,
  imports: [RouterModule,FormsModule],
  templateUrl: './inicio-sesion.component.html',
  styleUrl: './inicio-sesion.component.css'
})
export class InicioSesionComponent {
  usuario = {
    correo: '',
    password: ''
    
  };

  constructor(private lavaderoService: LavaderoService, private router: Router) {}

  iniciarSesion() {

    console.log('Enviando:', JSON.stringify(this.usuario)); // Verifica los datos antes de enviarlos
    
    this.lavaderoService.login(this.usuario).subscribe({
      next: (response: string) => {
        console.log('Respuesta del backend:', response);
        Swal.fire({
          title: 'Bienvenido',
          text: response, // 👈 Muestra la respuesta del backend
          icon: 'success',
          confirmButtonText: 'Continuar'
        }).then(() => {
          this.router.navigate(['/precio-servicio']);
        });
      },
      error: (err) => {
        console.error('Error en el login:', err);
        Swal.fire({
          title: 'Error',
          text: err.error || 'Correo o contraseña incorrectos.',
          icon: 'error',
          confirmButtonText: 'Intentar de nuevo'
        });
      }
    });

  }
  
   // Método para abrir la alerta de recuperación de contraseña
   abrirRecuperacion() {
    Swal.fire({
      title: 'Recuperar Contraseña',
      input: 'email',
      inputLabel: 'Ingresa tu correo electrónico',
      inputPlaceholder: 'correo@example.com',
      showCancelButton: true,
      confirmButtonText: 'Recuperar',
      preConfirm: (correo) => {
        if (!correo) {
          Swal.showValidationMessage('El correo es obligatorio');
          return false;
        }
        return correo;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.lavaderoService.recuperarContrasena({ correo: result.value }).subscribe({
          next: (response: string) => {
            Swal.fire('Éxito', response, 'success');
          },
          error: (err) => {
            console.error('Error en recuperación:', err);
  
            let mensajeError = 'No se pudo recuperar la contraseña. Inténtalo nuevamente.';
            if (err.status === 404) {
              mensajeError = 'El correo ingresado no está registrado.';
            } else if (err.status === 500) {
              mensajeError = 'Hubo un error en el servidor. Inténtalo más tarde.';
            }
  
            Swal.fire({
              title: 'Error',
              text: mensajeError,
              icon: 'error',
              confirmButtonText: 'Intentar de nuevo'
            });
          }
        });
      }
    });
  }
  

  // Método para enviar la solicitud de recuperación de contraseña al backend
  recuperarContrasena(correo: string) {
    this.lavaderoService.recuperarContrasena({ correo }).subscribe({
      next: () => {
        Swal.fire({
          title: 'Éxito',
          text: 'Se ha enviado una nueva contraseña a tu correo.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
      },
      error: () => {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo recuperar la contraseña. Verifica el correo ingresado.',
          icon: 'error',
          confirmButtonText: 'Intentar de nuevo'
        });
      }
    });
  }
}