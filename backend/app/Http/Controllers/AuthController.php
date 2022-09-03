<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\SignupRequest;
use App\Http\Requests\AdminSignupRequest;
use App\Models\User;
use App\Models\Admin;
use App\Models\User_detail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use JWTAuth;
use App\Http\Controllers\companyController;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login','signup','adminSignup']]);

    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        $credentials = request(['email', 'password']);
        if (! $token = auth()->attempt($credentials)) {
                    return response()->json(['error' => 'email or password does\'t exist'], 401);
               }
        //    elseif(Auth::guard('company')->attempt($credentials)){
            // return redirect()->route('signup');

        //     return response()->json(['success' => 'wellcome']);
        //     }

            return $this->respondWithToken($token);
    }

    public function signup(SignupRequest $request){

        $post=new User_detail;
        $post->name=$request->input('name');
        $post->email=$request->input('email');
        $post->password=Hash::make($request->string('password'));
        $post->role=$request->input('role');
       $post->save();

       $user=new User;
       $user->name=$request->input('name');
       $user->role=$request->input('role');
       $user->age=$request->input('age');
       $user->gender=$request->input('gender');
       $user->level_of_education=$request->input('level_of_education');
       $user->profession=$request->input('profession');
       $user->email=$request->input('email');
       $user->password=Hash::make($request->string('password'));

        if($user->save()){
            return ['status'=>true, 'message'=>'user register successfully'];
       }
       else{
           return ['status'=>false, 'message'=>'something went wrong'];
       }
    //     $user= User::create([
    //       'name'=>$request->name,
    //       'age'=>$request->age,
    //       'gender'=>$request->gender,
    //       'level_of_education'=>$request->level_of_education,
    //       'profession'=>$request->profession,
    //       'email'=>$request->email,
    //       'password'=>Hash::make($request->password)
    //     ]);
         return $this->login($request);
      }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth()->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
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
