import { NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { IftaLabelModule } from 'primeng/iftalabel';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

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
export class RegisterComponent implements OnInit, OnDestroy {
    
    registrationForm: FormGroup;
    private authStatusSub: Subscription;

    constructor(private fb: FormBuilder, private authService: AuthService) {
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

    public ngOnInit(): void {
        this.authStatusSub = this.authService.getAuthStatusListener()
        .subscribe(authStatus => {
            console.error('not created')
        })
    }

    public ngOnDestroy(): void {
        this.authStatusSub.unsubscribe();
    }

    public onSubmit(): void {
        if (this.registrationForm.valid) {
            this.authService.createUser(this.email.value, this.username.value, this.password.value);
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

    private strongPasswordValidator(control: AbstractControl): ValidationErrors {
        const value = control.value;
        const hasUpperCase = /[A-Z]/.test(value);
        const hasNumber = /\d/.test(value);

        if (!hasUpperCase || !hasNumber) {
            return { weakPassword: true };
        }
        return null;
    }

    private passwordMatchValidator(control: any) {
        if (control.value !== this.registrationForm.get('password')?.value) {
            return { passwordMismatch: true };
        }
        return null;
    }
}
