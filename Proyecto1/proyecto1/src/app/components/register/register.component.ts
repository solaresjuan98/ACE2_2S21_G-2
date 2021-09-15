import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  passwordType: string = 'password'
  private emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

  constructor(private fb: FormBuilder, private spinner: SpinnerService,
    private usuarioService: UserService, private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }
  validField(fieldName: string): string {
    const validatedField = this.registerForm.get(fieldName);
    return (!validatedField?.valid && validatedField?.touched)
      ? 'is-invalid' : validatedField?.touched ? 'is-valid' : '';
  }

  onRegister() {
    if (this.registerForm.valid) {
      const { email, password } = this.registerForm.value;
      try {
        this.spinner.getSpinner();
        this.authService.register(email, password).then(() => {
          this.usuarioService.register({ email, password }).toPromise()
            .then(() => {
              Swal.fire('Usuario registrado', `<strong>
         Su usuario fue registrado correctamente
        </strong>`, 'success');
              this.spinner.stopSpinner();
              this.router.navigate(['/login']);
            })
        }).catch((error) => {
          console.log(error)
          Swal.fire('Error de registro', `<strong>
         Ocurrio un error al intentar registrar el usuario <br>
         ${error}
        </strong>`, 'error');
          this.spinner.stopSpinner()
          this.spinner.stopSpinner();
        });

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

  isValid(): Boolean {
    if (this.registerForm.valid) {
      return true;
    }
    else {
      return false;
    }
  }

  private initForm(): void {
    this.registerForm = this.fb.group({
      // Estructura [valor inicial, validaciones  ]
      email: ['', [Validators.required]],
      name: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

}
