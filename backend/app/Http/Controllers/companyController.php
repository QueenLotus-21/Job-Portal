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
use lists;

class companyController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['companySignup','postJob','jobs','jobfind','applyApplicant','applicants','updatePost','deletePost','jobfindList','jobsList']]);

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

      public function jobsList(){
        return job_detail::all();
    }

    public function jobfind($id){
            return job_detail::findorFail($id);

    }
    public function jobfindList($id){
        return job_detail::findorFail($id);

}

    public function updatePost(Request $request, $id)
    {
    if(job_detail::where('id',$id)->exists()){
        $job =job_detail::find($id);
        $job->title = $request->title;
        $job->role = $request->role;
        $job->gender = $request->gender;
        $job->status = $request->status;
        $job->skill = $request->skill;
        $job->workhour = $request->workhour;
        $job->person = $request->person;
        $job->description = $request->description;
        $job->responsibility = $request->responsibility;
        $job->name = $request->name;
        $job->location = $request->location;
        $job->contact_info = $request->contact_info;


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
   return $applicant=DB::table('applicants')->select('name','email','image','jobTitle','userName','role','id')->orderBy('id','desc')->get();
// $user=applicant::all();
// foreach($user as $u){
//     $u=$u->name;
    // dd($u);
// $applicant=applicant::where('name',$u)->orderBy('id','desc')->get();
//  dd($applicant);
// }
//  $applicant=applicant::where('name',$user->name)->orderBy('id','desc')->get();
//  dd($applicant);
// return $applicant=DB::table('applicants')
//                 ->join('user_details','user_details.name','=','applicants.name')
//                  ->select('applicants.name','applicants.email','applicants.CV','applicants.jobTitle','applicants.userName','applicants.role')
//                  ->where('applicants.id',$user->id)
//                  ->get();
}

    public function applyApplicant(Request $request){
        $applicant=new applicant;
        $applicant->userName=$request->input('userName');
        $applicant->email=$request->input('userEmail');
        $applicant->jobTitle=$request->input('title');
        $applicant->role=$request->input('role');
        $applicant->name=$request->input('name');

        if($request->hasFile('image')){
            $completefilename=$request->file('image')->getClientOriginalName();
            $fileNameonly=pathinfo( $completefilename,PATHINFO_FILENAME);
            $extension=$request->file('image')->getClientOriginalExtension();
            $name=time().'-'.$extension;
            $completePic=str_replace(' ','_', $fileNameonly).'-'.rand() .'_'.time(). '.'. $extension;
            $path=$request->file('image')->storeAs('public/applicant',  $completePic);
            $applicant->image=$completePic;
        }
      //  $applicant->image=$request->input('image');

         if($applicant->save()){
             return ['status'=>true, 'message'=>'Applied successfully'];
        }
        else{
            return ['status'=>false, 'message'=>'something went wrong'];
        }
    }

}
