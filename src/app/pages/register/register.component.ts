import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PasswordValidation} from '../../forms/validationforms/password-validator.component';
import {MyErrorStateMatcher} from '../../forms/validationforms/validationforms.component';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {error} from '@angular/compiler/src/util';
import {NgxSpinnerService} from 'ngx-spinner';
import {NotificationService} from '../../notification.service';

@Component({
    selector: 'app-register-cmp',
    templateUrl: './register.component.html'
})

export class RegisterComponent implements OnInit, OnDestroy {
    test: Date = new Date();
    register: FormGroup;
    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.email,
    ]);
    matcher = new MyErrorStateMatcher();

    validEmailRegister: boolean = false;
    validConfirmPasswordRegister: boolean = false;
    validPasswordRegister: boolean = false;
    private validTextType: boolean;
    type: FormGroup;

    constructor(private formBuilder: FormBuilder,
                private afs:AngularFirestore,
                private notification:NotificationService,
                private spinner: NgxSpinnerService,

                private afAuth:AngularFireAuth) {}

    ngOnInit() {
        this.register = this.formBuilder.group({
            // To add a validator, we must first convert the string value into an array. The first item in the array is the default value if any, then the next item in the array is the validator. Here we are adding a required validator meaning that the firstName attribute must have a value in it.
            email: [null, [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
            // We can use more than one validator per field. If we want to use more than one validator we have to wrap our array of validators with a Validators.compose function. Here we are using a required, minimum length and maximum length validator.
           // optionsCheckboxes: ['', Validators.required],
            firstname: [null, Validators.required],
            lastname: [null, Validators.required],
            bio: [null, Validators.required],
            categories: [null, Validators.required],
            password: ['',  Validators.compose([Validators.required, Validators.minLength(6)])],
            confirmPassword: ['', Validators.required],
        }, {
            validator: PasswordValidation.MatchPassword // your validation method
        });
      const body = document.getElementsByTagName('body')[0];
      body.classList.add('register-page');
      body.classList.add('off-canvas-sidebar');
    }
    ngOnDestroy(){
      const body = document.getElementsByTagName('body')[0];
      body.classList.remove('register-page');
      body.classList.remove('off-canvas-sidebar');
    }

    validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }
        });
    }
    isFieldValid(form: FormGroup, field: string) {
        return !form.get(field).valid && form.get(field).touched;
    }

    displayFieldCss(form: FormGroup, field: string) {
        return {
            'has-error': this.isFieldValid(form, field),
            'has-feedback': this.isFieldValid(form, field)
        };
    }

    emailValidationRegister(e){
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(e).toLowerCase())) {
            this.validEmailRegister = true;
        } else {
            this.validEmailRegister = false;
        }
    }
    passwordValidationRegister(e){
        if (e.length > 5) {
            this.validPasswordRegister = true;
        }else{
            this.validPasswordRegister = false;
        }
    }
    confirmPasswordValidationRegister(e){
        if (this.register.controls['password'].value === e) {
            this.validConfirmPasswordRegister = true;
        }else{
            this.validConfirmPasswordRegister = false;
        }
    }

    textValidationType(e){
        if (e) {
            this.validTextType = true;
        }else{
            this.validTextType = false;
        }
    }


    onRegister() {

        if (this.register.valid) {
this.spinner.show()
            this.afAuth.auth.createUserWithEmailAndPassword
            (this.register.get('email').value,this.register.get('password').value).then((res=>{
                let data = {
                    name:this.register.get('firstname').value,
                    last_name:this.register.get('lastname').value,
                    category:this.register.get('category').value,
                    trainer:res.user.uid,
                    bio:this.register.get('bio').value,


                }
                this.afs.collection('Users').doc(res.user.uid).set(data).then((res=>{
                    this.spinner.hide()

                })).catch(error=>{
this.spinner.hide()
                })
            })).catch(error=>{
                console.log(error)
                this.spinner.hide()

            })
            alert('done')
            console.log('dhjhjhj')
        } else {
            this.validateAllFormFields(this.register);
            alert('not done')
        }
    }
}
