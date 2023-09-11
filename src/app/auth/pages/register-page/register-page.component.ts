import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/service/validators.service';
import { EmailValidator } from 'src/app/shared/validators/email-validator.service';
// import * as customValidators from 'src/app/shared/validators/validators';

@Component({
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(this.validatorsService.firstNameAndLastnamePattern) ] ],
    // email: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)], [new EmailValidator()]  ],
    email: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)], [this.emailValidator]  ],
    username: ['', [Validators.required, this.validatorsService.cantBeStrider] ],
    password: ['', [Validators.required, Validators.minLength(6)] ],
    passwordValidation: ['', [Validators.required] ],
  },{
    validators: [
      this.validatorsService.isFieldOneEqualFieldTwo('password', 'passwordValidation')
    ]
  });

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private emailValidator: EmailValidator,
     ){}

  isValidField( field: string ) {
    return this.validatorsService.isValidField( this.myForm, field )
  }

  onSubmit(): void{
    if ( this.myForm.invalid ){
      this.myForm.markAllAsTouched();
      return;
    };

    console.log(this.myForm.value);

    this.myForm.reset();
  }

}


// public myForm: FormGroup = this.fb.group({
//   name: ['', [Validators.required, Validators.pattern(customValidators.firstNameAndLastnamePattern) ] ],
//   email: ['', [Validators.required, Validators.pattern(customValidators.emailPattern)]  ],
//   username: ['', [Validators.required, customValidators.cantBeStrider] ],
//   password: ['', [Validators.required, Validators.minLength(6)] ],
//   passwordValidation: ['', [Validators.required] ],
// });
