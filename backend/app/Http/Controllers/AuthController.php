<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use App\Models\Admin;
use App\Models\User_detail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\companyController;
use App\Http\Controllers\AdminController;
use JWTAuth;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
         $this->middleware('auth:api', ['except' => ['login','signup','adminSignup','registerUser']]);
        // $this->middleware(function ($request, $next) {

        //     $this->user = Auth::user();

        //     return $next($request);
        // });


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

           $user=Auth::user();
           // $token=$user->createToken('API TOKEN')->plainTextToken;
            //$cookie=Cookie('jwt',$token,minutes:60*24);
            // return  response([
            //     'message'=> $token,
            // ])->withCookie($cookie);
           //return response(['user'=>$user, $this->respondWithToken($token)]);
           return $this->respondWithToken($token);

    }

    public function currentUser()
      {
        return Auth::user();
      }

    public function signup(SignupRequest $request){

        $post=new User;
        $post->name=$request->input('name');
        $post->email=$request->input('email');
        $post->password=Hash::make($request->string('password'));
        $post->role=$request->input('role');
       $post->save();

       $user=new User_detail;
       $user->name=$request->input('name');
    //    $user->role=$request->input('role');
       $user->age=$request->input('age');
       $user->gender=$request->input('gender');
       $user->level_of_education=$request->input('level_of_education');
       $user->proffession=$request->input('profession');
       $user->email=$request->input('email');
       $user->password=Hash::make($request->string('password'));

        if($user->save()){
           // $token= $this->respondWithToken($token);
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


      public function users(){
        return User::all();
    }


    public function userfind($id){
        return User::findorFail($id);
    }

    public function updateUser(Request $request, $id)
    {
        if(User::where('id',$id)->exists()){
            $user = User::find($id);
            $user->name = $request->name;
            $user->email = $request->email;
            $user->role = $request->role;
            $user->approved = $request->approved;


            $user->save();
            return response()->json([
                "message"=> "User updated successfully"
            ], 200);

        }
        else{
            return response()->json([
                "message"=>"user not found"
            ],404);
        }
    }
    public function deleteUser($id)
    {
        if(User::where('id',$id)->exists()){
            $user = User::find($id);
            $user->delete();

            return response()->json([
                "message"=> "User successfully deleted"
            ],200);

        }
        else{
            return response()->json([
                "message"=>"user not found"
            ],404);
        }
    }


//     public function  changeUserPassword(Request $request){
//         validation
//       $request->validate([
//           'oldpassword'=>'required',
//           'password'=>'required|confirmed'
//       ]);


//       match old password
//       if(!Hash::check($request->oldpassword,auth()->user()?->password)){
//           return 'old password does\'t match';
//       }
//       return ($request->all());
//       update new password
//   }




    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return $this->guard()->user();
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
            'role'=>auth()->user()->role,
            'email'=>auth()->user()->email,
            'approved'=>auth()->user()->approved,
            'name'=>auth()->user()->name,
            'Authorization'=>$token,
        ]);
    }
}
