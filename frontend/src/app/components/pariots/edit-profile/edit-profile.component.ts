import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  userId:any;
  users:any;
  files:any;
  submitted=false;
  form:FormGroup;
  data:any
  err:any
  url="assets/images/default-img.png";
  imagePath:any='http://127.0.0.1:8000/storage/user/';
    constructor( private route: ActivatedRoute,
      private router: Router,
      private user: UserServiceService ,
      private formBuilder:FormBuilder,
      private notify:SnotifyService
      ) { }

    ngOnInit(): void {
    this.createForm();
    const routeParams=this.route.snapshot.paramMap;
    this.userId=Number(routeParams.get('userId'));
    //console.log(this.userId);
    this.user.findUserProfile(this.userId).subscribe((data:any)=>{
      this.users=data;
      console.log(this.users);
    })
    }

    createForm(){
      this.form=this.formBuilder.group({
        name:[null,Validators.required],
        email :[null,Validators.required],
        phone :[null,Validators.required],
        age:[null,Validators.required],
        gender:[null,Validators.required],
        country:[null,Validators.required],
        city :[null,Validators.required],
        level_of_education:[null,Validators.required],
        univercity:[null,Validators.required],
        department:[null,Validators.required],
        employement_status :[null,Validators.required],
        CV :[null,Validators.required],
        photo :[null,Validators.required],
        profession :[null,Validators.required],

      })
    }

    uploadImage(event){
      if(event.target.files){
        this.files=event.target.files[0];
        var reader=new FileReader();
        reader.readAsDataURL(event.target.files[0])
        reader.onload=(event1:any)=>{
         this.url=event1.target.result;
        }
      }
     console.log(this.files);
    }


   get f(){
   return this.form.controls;
  }
  update(name:string,email:string,CV:string,age:string,gender:string,phone:string,photo:string,profession:string,country:string,city:string,level_of_education:string,univercity:string,department:string,employement_status:string){

      this.submitted=true;
      if(this.form.invalid){
        return;
      }
      const formdata=new FormData();

      formdata.append('name',name)
       formdata.append('email',email)
       formdata.append('CV',CV)
       formdata.append('age',age)
       formdata.append('gender',gender)
       formdata.append('phone',phone)
       formdata.append('profession',profession)
       formdata.append('country',country)
       formdata.append('univercity',univercity)
       formdata.append('city',city)
       formdata.append('level_of_education',level_of_education)
       formdata.append('employement_status',employement_status)
       formdata.append('department',department)
      formdata.append('photo',this.files,this.files.name)


  this.user.updateProfile(this.userId,formdata).subscribe((res)=>{
    this.data=res
    if(this.data.status=true){
    this.notify.success( this.data.message,{timeout:2000})
    this.router.navigateByUrl('/profile');
    }
    this.submitted=false;
  })
  }

}
