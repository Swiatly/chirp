import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { IftaLabelModule } from 'primeng/iftalabel';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';

@Component({
    imports: [
        ReactiveFormsModule,
        NgIf,
        InputTextModule,
        IftaLabelModule,
        ButtonModule,
        MessageModule,
        PasswordModule
    ],
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss'
})
export class RegisterComponent {
    registrationForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.registrationForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6), this.strongPasswordValidator]],
            confirmPassword: ['', Validators.required]
        });

        this.registrationForm.get('confirmPassword')?.setValidators([
            Validators.required,
            this.passwordMatchValidator.bind(this)
        ]);
    }

    strongPasswordValidator(control: AbstractControl): ValidationErrors {
        const value = control.value;
        const hasUpperCase = /[A-Z]/.test(value);
        const hasNumber = /\d/.test(value);

        if (!hasUpperCase || !hasNumber) {
            return { weakPassword: true };
        }
        return null;
    }

    passwordMatchValidator(control: any) {
        if (control.value !== this.registrationForm.get('password')?.value) {
            return { passwordMismatch: true };
        }
        return null;
    }

    onSubmit(): void {
        if (this.registrationForm.valid) {
            console.log('Form submitted:', this.registrationForm.value);
        }
    }

    get email() {
        return this.registrationForm.get('email');
    }

    get username() {
        return this.registrationForm.get('username');
    }

    get password() {
        return this.registrationForm.get('password');
    }

    get confirmPassword() {
        return this.registrationForm.get('confirmPassword');
    }
}
