<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Company;
use App\Models\job_detail;
use App\Models\User_detail;
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
use App\Models\User;
use App\Models\Applicant;
use lists;

class companyController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    protected $user,$company,$applicant;
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['companySignup','jobs','jobfind']]);

        $this->user=new User();
        $this->company=new Company();
        $this->applicant=new Applicant();
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */

    public function companySignup(companySignupRequest $request){
        DB::beginTransaction();
        try{
          $user=$this->user->create([
              'name'=>$request->name,
              'email'=>$request->email,
              'password'=>Hash::make($request->string('password')),
              'role'=>$request->role,
          ]);

          if($request->input('role')=='company'){
          $company=$this->company->create([
              'user_id'=>$user->id,
              'name'=>$user->name,
              'address'=>$request->address,
              'description'=>$request->description,
              'contact_info'=>$request->contact_info,
              'email'=>$user->email,
              'password'=>$user->password,
          ]);
          }
          else{
            return ['status'=>false, 'message'=>'you are not company',401];
        }

          if($user && $company){
              DB::commit();
             return ['status'=>true, 'message'=>'company register successfully'];
          }
          else{
              return ['status'=>false, 'message'=>'something went wrong'];
          }


        }
        catch(Exception $ex){
          DB::rollback();
          return ['status'=>false, 'message'=>'something went wrong'];
      }

    }


      public function postJob(PostRequest $request){
        $job_detail=new job_detail;
        $job_detail->CompanyName=$request->input('CompanyName');
        $job_detail->JobRole=$request->input('JobRole');
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
        $job_detail->salary=$request->string('salary');



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

    public function updatePost(Request $request, $id)
    {
    if(job_detail::where('id',$id)->exists()){
        $job =job_detail::find($id);
        $job->title = $request->title;
        $job->JobRole = $request->JobRole;
        $job->gender = $request->gender;
        $job->status = $request->status;
        $job->skill = $request->skill;
        $job->workhour = $request->workhour;
        $job->person = $request->person;
        $job->description = $request->description;
        $job->responsibility = $request->responsibility;
        $job->CompanyName = $request->CompanyName;
        $job->location = $request->location;
        $job->contact_info = $request->contact_info;
        $job->salary = $request->salary;


        $job->save();
    return response()->json([
        "message"=> "Post updated successfully"
    ], 200);

}
else{
    return response()->json([
        "message"=>"post not found"
    ],404);
}
}


public function deletePost($id)
{
if(job_detail::where('id',$id)->exists()){
    $post = job_detail::find($id);
    $post->delete();

    return response()->json([
        "message"=> "job successfully deleted"
    ],200);

}
else{
    return response()->json([
        "message"=>"job not found"
    ],404);
}
}


    public function applicantList(){
        return applicant::all();
    }
    public function applicantfind($id){
        return applicant::findorFail($id);

}

public function applicants(){
   //return $applicant=DB::table('applicants')->select('name','email','image','jobTitle','userName','role','id')->orderBy('id','desc')->get();
// $user=applicant::all();
// foreach($user as $u){
//     $u=$u->name;
    // dd($u);


 $user=auth()->user()->name;
// $user=User_detail::all();
 //$user=User_detail::with('posts')->get();
 //$user=user_detail::find(2)->posts;
 //$user=Auth::user()->name;
 //$applicant=applicant::where('name',$user->name)->orderBy('id','desc')->get();
 return $user;
// }
//  $applicant=applicant::where('name',$user->name)->orderBy('id','desc')->get();
//  dd($applicant);
// return $applicant=DB::table('applicants')
//                 ->join('user_details','user_details.name','=','applicants.name')
//                  ->select('applicants.name','applicants.email','applicants.CV','applicants.jobTitle','applicants.userName','applicants.role')
//                  ->where('applicants.id',$user->id)
//                  ->get();
}

//apllicants


public function showApllicant(){
    // if(job_detail::where('id',$id)->exists()){
    //     $post = job_detail::find($id);
    // $job=job_detail::all();
    // $applicant=applicant::where('job_id',$post->id)->orderBy('id','desc')->get();
    // return $applicant;
    $job=DB::table('applicants')
                ->join('job_details','job_details.id','=','applicants.job_id')
                ->where('applicants.job_id','=','2')
                 ->select('applicants.userName','applicants.email','applicants.CV','job_details.id','applicants.job_id')
                 ->get()->toArray();
 return $job;
}



public function appliedJob(){
// $posts = Applicant::whereUserId(Auth::id())->get();
// return $posts;

 $user=auth()->user();
    //$applicant=applicant::where('user_id',$user->users->id)->orderBy('id','desc')->get();
    $applicant=job_detail::where('id',$user->users->applicant->job_id)->orderBy('id','desc')->get();
    return  $applicant;
}

    public function applyApplicant(Request $request){
        $user= Auth::user();
       // $user=User_detail::where('email',$users->email)->get();
        DB::beginTransaction();
        try{
        if(Applicant::where('user_id',$user->users->id)->where('job_id',$request->id)->exists()){
           // return ['status'=>false, 'message'=>'You are already Apllied for this job',401];
            return response()->json([
                "message"=>"You are already Apllied for this job"
            ],404);
        }
        else{
          $applicant=$this->applicant->create([
              'user_id'=>$user->users->id,
              'job_id'=>$request->id,
              'userName'=>$user->name,
              'email'=>$user->email,
              'CV'=>$request->CV,
              'jobTitle'=>$request->title,
              'JobRole'=>$request->JobRole,
              'CompanyName'=>$request->CompanyName,
          ]);


          if($applicant){
              DB::commit();
             return ['status'=>true, 'message'=>'you are apply successfully'];
          }
          else{
              return ['status'=>false, 'message'=>'something went wrong',401];
        }
    }
    }
     catch(Exception $ex){
          DB::rollback();
          return ['status'=>false, 'message'=>'something went wrong'];
      }
    }
}

    //     $applicant=new applicant;
    //     $applicant->userName=$request->input('userName');
    //     $applicant->email=$request->input('userEmail');
    //     $applicant->jobTitle=$request->input('title');
    //     $applicant->role=$request->input('role');
    //     $applicant->name=$request->input('name');

    //     if($request->hasFile('image')){
    //         $completefilename=$request->file('image')->getClientOriginalName();
    //         $fileNameonly=pathinfo( $completefilename,PATHINFO_FILENAME);
    //         $extension=$request->file('image')->getClientOriginalExtension();
    //         $name=time().'-'.$extension;
    //         $completePic=str_replace(' ','_', $fileNameonly).'-'.rand() .'_'.time(). '.'. $extension;
    //         $path=$request->file('image')->storeAs('public/applicant',  $completePic);
    //         $applicant->image=$completePic;
    //     }
    //    $applicant->image=$request->input('image');

    //      if($applicant->save()){
    //          return ['status'=>true, 'message'=>'Applied successfully'];
    //     }
    //     else{
    //         return ['status'=>false, 'message'=>'something went wrong'];
    //     }



