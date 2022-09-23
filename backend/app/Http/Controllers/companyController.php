<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Company;
use App\Models\job_detail;
use App\Http\Requests\companySignupRequest;
use App\Http\Requests\PostRequest;
use App\Http\Requests\ApplicantRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use App\Models\User_detail;
use App\Models\Applicant;

class companyController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['companySignup','postJob','jobs','jobfind','applyApplicant']]);

    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */

    public function companySignup(companySignupRequest $request){
        $post=new User_detail;
        $post->name=$request->input('name');
        $post->email=$request->input('email');
        $post->password=Hash::make($request->string('password'));
        $post->role=$request->input('role');

if($request->input('role')=='company'){
       $company=new Company;
       $company->name=$request->input('name');
       $company->role=$request->input('role');
       $company->address=$request->input('address');
       $company->description=$request->input('description');
       $company->contact_info=$request->input('contact_info');
       $company->email=$request->input('email');
       $company->password=Hash::make($request->string('password'));
       $post->save();

        if($company->save()){
            return ['status'=>true, 'message'=>'user register successfully'];
       }
       else{
           return ['status'=>false, 'message'=>'something went wrong'];
       }
    }
    else{
        return ['status'=>false, 'message'=>'you are not company'];
    }
        // $admin= Company::create([
        //   'name'=>$request->name,
        //   'address'=>$request->address,
        //   'description'=>$request->description,
        //   'contact_info'=>$request->contact_info,
        //   'email'=>$request->email,
        //   'password'=>Hash::make($request->password)
        // ]);

      }


      public function postJob(PostRequest $request){
        $job_detail=new job_detail;
        $job_detail->name=$request->input('name');
        $job_detail->role=$request->input('role');
        $job_detail->location=$request->input('location');
        $job_detail->description=$request->input('description');
        $job_detail->contact_info=$request->input('contact_info');
        $job_detail->gender=$request->input('gender');
        $job_detail->skill=$request->string('skill');
        $job_detail->workhour=$request->string('workhour');
        $job_detail->responsibility=$request->string('responsibility');
        $job_detail->person=$request->string('person');
        $job_detail->title=$request->string('title');
        $job_detail->status=$request->string('status');


         if($job_detail->save()){
             return ['status'=>true, 'message'=>'Posted successfully'];
        }
        else{
            return ['status'=>false, 'message'=>'something went wrong'];
        }

      }

      public function jobs(){
        return job_detail::all();
    }

    public function jobfind($id){
            return job_detail::findorFail($id);

    }


    public function applicants(){
        return applicants::all();
    }
    public function applicantfind($id){
        return applicants::findorFail($id);

}

    public function applyApplicant(Request $request){
        $applicant=new applicant;
        $applicant->userName=$request->input('userName');
        $applicant->email=$request->input('userEmail');
        $applicant->jobTitle=$request->input('title');
        $applicant->role=$request->input('role');
        $applicant->name=$request->input('name');
        $applicant->CV=$request->input('CV');



         if($applicant->save()){
             return ['status'=>true, 'message'=>'Applied successfully'];
        }
        else{
            return ['status'=>false, 'message'=>'something went wrong'];
        }
    }

}
