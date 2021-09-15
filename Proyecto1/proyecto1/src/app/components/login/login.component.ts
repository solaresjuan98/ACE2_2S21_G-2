import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  passwordType: string = 'password'
  private emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

  constructor(private fb: FormBuilder, private spinner: SpinnerService,
    private usuarioService: UserService, private authService: AuthService) { }

  ngOnInit(): void {
    this.initForm();
  }
  validField(fieldName: string): string {
    const validatedField = this.loginForm.get(fieldName);
    return (!validatedField?.valid && validatedField?.touched)
      ? 'is-invalid' : validatedField?.touched ? 'is-valid' : '';
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      try {
        this.spinner.getSpinner();
        this.authService.onLogin(email, password).then(() => {
          Swal.fire('Bienvenido', `<strong>
          Logeado exitosamente
          </strong>`, 'success');
          this.spinner.stopSpinner();
          /* SE REDIRIGE AL USUARIO A LA VENTANA PRINCIPAL*/
          location.pathname = '/home';
        }).catch(() => {
          Swal.fire('Credenciales incorrectas', `<strong>
          Las credenciales que ingreso son incorrectas.
         </strong>`, 'error');
         this.spinner.stopSpinner();
        })
      } catch (error) {
        Swal.fire('Ocurrio un error', `<strong>
         Error al comunicarse con el servidor.
        </strong>`, 'error');
      }
    }
    else {
      Swal.fire('Campos incorrectos', `<strong>
      Por favor, llene todos los campos de manera correcta.
      </strong>`, 'error');
    }
  }

  logInwithGoogle() {
    this.spinner.getSpinner();
    this.authService.loginWithGoogle().then(() => {
      Swal.fire('Bienvenido', `<strong>
          Logeado exitosamente
          </strong>`, 'success');
          this.spinner.stopSpinner();
          location.pathname = '/home';
    }).catch((error) => {
      Swal.fire('Credenciales incorrectas', `<strong>
          Las credenciales que ingreso son incorrectas.
         </strong>`, 'error');
         this.spinner.stopSpinner();
      this.spinner.stopSpinner();
    }).catch(() => {
      this.spinner.stopSpinner();
    })
  }
  isValidData(): String {
    if (this.loginForm.valid) {
      return 'btn-success';
    }
    else {
      return 'btn-danger';
    }
  }

  isValid(): Boolean {
    if (this.loginForm.valid) {
      return true;
    }
    else {
      return false;
    }
  }

  private initForm(): void {
    this.loginForm = this.fb.group({
      // Estructura [valor inicial, validaciones  ]
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }



}
