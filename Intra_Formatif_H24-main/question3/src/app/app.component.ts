import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
interface FormData {
  name? : string | null;
  roadnumber? : string | null;
  rue? : string | null;
  postalcode? : string | null;
  comments? : string | null;

}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  form:FormGroup<any>;
  formData : FormData = {};

  constructor(fb : FormBuilder){
    this.form = fb.group({
      name : ['',[Validators.required]],
      roadnumber : ['',[Validators.required,Validators.min(1000),Validators.max(9999)]],
      rue : ['',[Validators.required]],
      postalcode : ['',[Validators.pattern("^[A-Z][0-9][A-Z][ ]?[0-9][A-Z][0-9]$")]],
      comments : ['',[this.myValidator]],

    }, {validators : this.nameInCommentValidator},);

    this.form.valueChanges.subscribe(()=>{
      this.formData = this.form.value
      console.log(this.form.value);
    });
  }
  title = 'reactive.form';

  myValidator(control : AbstractControl) : ValidationErrors | null {

    const comment = control.value;
    console.log(comment);
    if(!comment){
      return null;
    }
    const count : number= comment.split(' ').length;
    console.log('num of words : ' , count);

    if(count < 10){
      return {notEnoughWords : true};
    }
    else{
      return null;
    }


  }
  nameInCommentValidator (control : AbstractControl) : ValidationErrors | null {
    const comment : string |null = control.get('comments')?.value;
    const name :string |null= control.get('name')?.value;
    if(!comment || !name ){
      return null;
    }

    console.log('current comment ',comment);
    console.log('current name ',name);
    let bool : boolean = comment.includes(name);
    if(bool){
      return {containsName : true}
    }else
    {
      return null
    }


  }





}


