import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-update-company',
  templateUrl: './update-company.component.html',
  styleUrls: ['./update-company.component.css']
})
export class UpdateCompanyComponent implements OnInit {

  companyId:any;
  companys:any;
  submitted=false;
  form:FormGroup;
  data:any
  err:any
    constructor( private route: ActivatedRoute,
      private router: Router,
      private user: UserServiceService ,
      private formBuilder:FormBuilder,
      private notify:SnotifyService
      ) { }

    ngOnInit(): void {
    this.createForm();
    const routeParams=this.route.snapshot.paramMap;
    this.companyId=Number(routeParams.get('companyId'));
    console.log(this.companyId);
    this.user.findCompany(this.companyId).subscribe((data:any)=>{
      this.companys=data;
      console.log(this.companys);
    })
    }

    createForm(){
      this.form=this.formBuilder.group({
        name:[null,Validators.required],
        email :[null,Validators.required],
        description:[null,Validators.required],
        contact_info:[null,Validators.required],
      })
    }
   get f(){
   return this.form.controls;
  }
    update1(userName:string,email:string,description:string,contact_info:string){

  this.user.updateCompany(this.companyId,this.companys).subscribe((res)=>{
    this.data=res
    this.notify.success( this.data.message,{timeout:2000})
    this.router.navigateByUrl('/admin/manageCompany');
  })
  }

}
