<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Company;
use App\Http\Requests\companySignupRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use App\Models\User_detail;

class companyController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['companySignup']]);

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
       $post->save();

       $company=new Company;
       $company->name=$request->input('name');
       $company->role=$request->input('role');
       $company->address=$request->input('address');
       $company->description=$request->input('description');
       $company->contact_info=$request->input('contact_info');
       $company->email=$request->input('email');
       $company->password=Hash::make($request->string('password'));

        if($company->save()){
            return ['status'=>true, 'message'=>'user register successfully'];
       }
       else{
           return ['status'=>false, 'message'=>'something went wrong'];
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


      protected function respondWithToken($token)
      {
          return response()->json([
              'access_token' => $token,
              'token_type' => 'bearer',
              'expires_in' => auth()->factory()->getTTL() * 60,
              'user'=>auth()->user()->name,
              'role'=>auth()->user()->role
          ]);
      }
}
