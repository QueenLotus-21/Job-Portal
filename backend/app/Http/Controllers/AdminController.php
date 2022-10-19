<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\AdminSignupRequest;
use App\Models\Admin;
use App\Models\Company;
use App\Models\Applicant;
use App\Models\job_detail;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use JWTAuth;
use DB;

class AdminController extends Controller
{


    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    protected $user,$admin;
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['adminSignup','deleteAdmin','admins','adminfind','updateAdmin','applicants','companys','companyfind','deleteCompany','updateCompany']]);

            $this->user=new User();
            $this->admin=new Admin();
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */

  public function adminSignup(AdminSignupRequest $request){
    DB::beginTransaction();
    try{
      $user=$this->user->create([
          'name'=>$request->name,
          'email'=>$request->email,
          'password'=>Hash::make($request->string('password')),
          'role'=>$request->role,
      ]);

      $admin=$this->admin->create([
          'user_id'=>$user->id,
          'name'=>$user->name,
          'gender'=>$request->gender,
          'email'=>$user->email,
          'password'=>$user->password,
      ]);


      if($user && $admin){
          DB::commit();
          return ['status'=>true, 'message'=>'Admin register successfully'];
      }
      else{
          return ['status'=>false, 'message'=>'something went wrong'];
      }

    }
    catch(Exception $ex){
      DB::rollback();
      return ['status'=>false, 'message'=>'something went wrong'];
  }


//     $post=new User;
//     $post->name=$request->input('name');
//     $post->email=$request->input('email');
//     $post->password=Hash::make($request->string('password'));
//     $post->role=$request->input('role');
//    $post->save();



      }



 public function admins(){
    return Admin::all();
}


public function adminfind($id){
    return Admin::findorFail($id);
}

public function updateAdmin(Request $request, $id)
{
    // if(User_detail::where('id',$id)->exists()){
    //     $user = User_detail::find($id);
    //     $user->name = $request->name;
    //     $user->email = $request->email;
    //     $user->role = $request->role;
    //     $user->approved = $request->approved;

        if(Admin::where('id',$id)->exists()){
            $user =Admin::find($id);
            $user->name = $request->name;
            $user->gender = $request->gender;
            $user->email = $request->email;
            $user->role = $request->role;

            $user->save();
        return response()->json([
            "message"=> "Admin updated successfully"
        ], 200);

    }
    else{
        return response()->json([
            "message"=>"Admin not found"
        ],404);
    }
}
public function deleteAdmin($id)
{
    if(Admin::where('id',$id)->exists()){
        $user = Admin::find($id);
        $user->delete();

        return response()->json([
            "message"=> "ADMIN successfully deleted"
        ],200);

    }
    else{
        return response()->json([
            "message"=>"ADMIN not found"
        ],404);
    }
}

//manage company

public function companys(){
    return Company::all();
}
public function companyfind($id){
    return Company::findorFail($id);

}

public function deleteCompany($id)
{
    if(Company::where('id',$id)->exists()){
        $user = Company::find($id);
        $user->delete();

        return response()->json([
            "message"=> "company successfully deleted"
        ],200);

    }
    else{
        return response()->json([
            "message"=>"company not found"
        ],404);
    }
}

public function updateCompany(Request $request, $id)
{
    // if(User_detail::where('id',$id)->exists()){
    //     $user = User_detail::find($id);
    //     $user->name = $request->name;
    //     $user->email = $request->email;
    //     $user->role = $request->role;
    //     $user->approved = $request->approved;

        if(Company::where('id',$id)->exists()){
            $company =Company::find($id);
            $company->name = $request->name;
            $company->email = $request->email;
            $company->description = $request->description;
            $company->contact_info = $request->contact_info;

            $company->save();
        return response()->json([
            "message"=> "company updated successfully"
        ], 200);

    }
    else{
        return response()->json([
            "message"=>"company not found"
        ],404);
    }
}

public function applicants(){
    //return $applicant=DB::table('applicants')->select('name','email','image','jobTitle','userName','role','id')->orderBy('id','desc')->get();
 // $user=applicant::all();
 // foreach($user as $u){
 //     $u=$u->name;
     // dd($u);

     //$user = auth('api')->user();
    // $user = Auth::guard('api')->user()->name;
    //$user=Auth::id();
    $user=auth()->user();
    $applicant=applicant::where('name',$user->name)->orderBy('id','desc')->get();
    return $applicant;

    //$user=User_detail::all();
//$user=User_detail::with('posts')->get();
//$user = auth()->user();
//$user=Auth::id();
//   $users=user_detail::find(1);
//   foreach($users->posts as $user){
//     return $user->name;
//   }
//
// return $applicant;
// return $users->posts->role;
    //$user = Auth::user()->name;
     //$user = Auth::guest()->name;


 // $user=JWTAuth::user()->name;


 }

//manage jobs
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


 protected function respondWithToken($token)
 {
     return response()->json([
         'access_token' => $token,
         'token_type' => 'bearer',
         'expires_in' => auth()->factory()->getTTL() * 60,
         'user'=>auth()->user()->name,
         'role'=>auth()->user()->role,
         'email'=>auth()->user()->email,
         'approved'=>auth()->user()->approved,
         'name'=>auth()->user()->name,
     ]);
 }


}
