import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
 
 
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html'
 
})
export class RegistrationComponent {
 
  itemForm: FormGroup;
  formModel:any={role:null,email:'',password:'',username:''};
  showMessage:boolean=false;
 
  responseMessage: any;
  constructor(public router:Router, private bookService:HttpService, private formBuilder: FormBuilder) {
   
      this.itemForm = this.formBuilder.group({
        email: [this.formModel.email,[ Validators.required, Validators.email]],
        password: [this.formModel.password,[ Validators.required,this.passwordValidator]],
        role: [this.formModel.role,[ Validators.required]],
        username: [this.formModel.username,[ Validators.required]],
       
    });
  }
 
  ngOnInit(): void {
  }
  onRegister()
  {
    if(this.itemForm.valid)
    {
      this.showMessage=false;
      this.bookService.registerUser(this.itemForm.value).subscribe(data=>{    
        debugger;
        this.showMessage=true;
        this.responseMessage='Welcome '+data.username+" you are successfully registered";
        this.itemForm.reset();
       
      },error=>{ })
    }
    else{
      this.itemForm.markAllAsTouched();
    }
  }
  passwordValidator(control:AbstractControl):ValidationErrors|null
  {
    const pattern=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if(!pattern.test(control.value))
    {
      return{InvalidPassword:true};
    }
    return null;

  }
 
 
}
 