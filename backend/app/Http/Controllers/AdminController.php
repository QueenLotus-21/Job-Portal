<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\AdminSignupRequest;
use App\Models\Admin;
use App\Models\User_detail;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{


    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['adminSignup']]);

    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */

  public function adminSignup(AdminSignupRequest $request){
    $post=new User_detail;
    $post->name=$request->input('name');
    $post->email=$request->input('email');
    $post->password=Hash::make($request->string('password'));
    $post->role=$request->input('role');
   $post->save();

   $admin=new Admin;
   $admin->name=$request->input('name');
   $admin->role=$request->input('role');
   $admin->gender=$request->input('gender');
   $admin->email=$request->input('email');
   $admin->password=Hash::make($request->string('password'));

    if($admin->save()){
        return ['status'=>true, 'message'=>'Admin register successfully'];
   }
   else{
       return ['status'=>false, 'message'=>'something went wrong'];
   }

        // $admin= Admin::create([
        //   'name'=>$request->name,
        //   'gender'=>$request->gender,
        //   'email'=>$request->email,
        //   'password'=>Hash::make($request->password)
        // ]);

      }
}
