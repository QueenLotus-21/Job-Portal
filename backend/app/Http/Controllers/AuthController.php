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
    protected $user, $user_detail;
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {

         $this->middleware('auth:api', ['except' => ['login','signup','adminSignup','registerUser']]);
            $this->user=new User();
            $this->user_detail=new User_detail();
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
      DB::beginTransaction();
      try{
        $user=$this->user->create([
            'name'=>$request->name,
            'email'=>$request->email,
            'password'=>Hash::make($request->string('password')),
            'role'=>$request->role,
        ]);

        $user_detail=$this->user_detail->create([
            'user_id'=>$user->id,
            'name'=>$user->name,
            'age'=>$request->age,
            'gender'=>$request->gender,
            'phone'=>$request->phone,
            'country'=>$request->country,
            'city'=>$request->city,
            'employement_status'=>$request->employement_status,
            'level_of_education'=>$request->level_of_education,
            'profession'=>$request->profession,
            'email'=>$user->email,
            'password'=>$user->password,
        ]);


        if($user && $user_detail){
            DB::commit();
            return ['status'=>true, 'message'=>'user register successfully'];
        }
        else{
            return ['status'=>false, 'message'=>'something went wrong'];
        }
        return $this->login($request);

      }
      catch(Exception $ex){
        DB::rollback();
        return ['status'=>false, 'message'=>'something went wrong'];
    }

      }


      //profile
   public function profile(){

        $user= Auth::user();
        $users=User_detail::where('email',$user->email)->get();
        return $users;
     }

     public function userfindProfile($id){
        return User_detail::findorFail($id);
    }


    public function updateProfile(Request $request,$id){

        if(User_detail::where('id',$id)->exists()){
            $user = User_detail::find($id);
            $user->name = $request->name;
            $user->email = $request->email;
            $user->age = $request->age;
            $user->gender = $request->gender;
            $user->employement_status = $request->employement_status;
            $user->profession = $request->profession;
            $user->level_of_education = $request->level_of_education;
            $user->phone = $request->phone;
            $user->department = $request->department;
            $user->country = $request->country;
            $user->city = $request->city;
            $user->CV = $request->CV;
            $user->photo = $request->photo;

            if($request->hasFile('photo')){
                $completefilename=$request->file('photo')->getClientOriginalName();
                $fileNameonly=pathinfo( $completefilename,PATHINFO_FILENAME);
                $extension=$request->file('photo')->getClientOriginalExtension();
                $name=time().'-'.$extension;
                $completePic=str_replace(' ','_', $fileNameonly).'-'.rand() .'_'.time(). '.'. $extension;
                $path=$request->file('photo')->storeAs('public/user',  $completePic);
                $user->photo=$completePic;
            }

            $user ->save();
            return response()->json([
                "message"=> "profile updated successfully"
            ], 200);

        }
        else{
            return response()->json([
                "message"=>"user not found"
            ],404);
        }

    }

      public function users(){
       return User::all();
       // $user=User::with('users')->get();
        //return $user->users->age;
    }


    public function userfind($id){
        return User::findorFail($id);
    }

    public function updateUser(Request $request,$id)
    {

    //     DB::beginTransaction();

    //         try{
    //         if(User::where('id',$id)->exists()){
    //            $updateUser = User::find($id);
    //           $updateUser_detail= User_detail::find($id)

    //       $updateUser=[
    //           'id'=>$request->id,
    //           'name'=>$request->name,
    //           'email'=>$request->email,
    //           'password'=>Hash::make($request->string('password')),
    //           'role'=>$request->role,
    //       ];

    //       $updateUser_detail=[
    //           'user_id'=>$request->id,
    //           'name'=>$request->name,
    //           'age'=>$request->age,
    //           'gender'=>$request->gender,
    //           'level_of_education'=>$request->level_of_education,
    //           'proffession'=>$request->profession,
    //           'email'=>$request->email,
    //           'password'=>$request->password,
    //       ];

    //       $user= User::where('email', $request->email,)->update($updateUser);
    //       $user_detail= User_detail::where('email',$request->email)->update($updateUser_detail);
    //       if($user && $user_detail){
    //           DB::commit();
    //           return ['status'=>true, 'message'=>'user register successfully'];
    //       }
    //       else{
    //           return ['status'=>false, 'message'=>'user not found'];
    //       }


    // }
    //     catch(Exception $ex){
    //       DB::rollback();
    //       return ['status'=>false, 'message'=>'something went wrong'];
    //   }

    //     }

        if(User::where('id',$id)->exists()){
            $user = User::find($id);
            $user->name = $request->name;
            $user->email = $request->email;
            $user->role = $request->role;
            $user->approved = $request->approved;

            // $user_detail =  $user->users()->name = $user->name;
            // $user_detail =  $user->users()->email = $user->email;
            // $user->users()->role = $user->role;
            // $user_detail =  $user->users()->age = $request->age;
            // $user_detail =  $user->users()->gender = $request->gender;
            // $user_detail =  $user->users()->level_of_education = $request->level_of_education;
            // $user_detail =  $user->users()->proffession = $request->profession;



            $user ->save();
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
