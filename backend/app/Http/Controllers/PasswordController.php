<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\User_detail;
use Illuminate\Support\Facades\Mail;
use App\Mail\ResetPasswordMail;
use App\Http\Requests\changePasswordRequest;
use App\Http\Requests\changeUserPasswordRequest;
use Illuminate\Support\str;
use Illuminate\Support\carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use validator;

class PasswordController extends Controller
{
    public function passwordReset(Request $request){
        //return $request->all();
        if(!$this->validateEmail($request->email)){
            return $this->failedResponse();
        }
        $this->send($request->email);
        return $this->successResponse();
       }

      public function send($email){
        $token=$this->createToken($email);
       Mail::to($email)->send(new ResetPasswordMail($token));
      }

      public function createToken($email){
        $oldToken=DB::table('password_resets')->where('email',$email)->first();
        if($oldToken){
            return $oldToken;
        }
        $token =str::random(60);
        $this->saveToken($token,$email);
        return $token;
      }

      public function saveToken($token,$email){
      DB::table('password_resets')->insert([
        'email'=>$email,
        'token'=>$token,
        'created_at'=>carbon::now()
      ]);
      }

       public function validateEmail($email){
        return !!User_detail::where('email',$email)->first();
       }
       public function failedResponse(){
        return response()->json([
            'error'=>'Email does\'t exit'
            ],Response::HTTP_NOT_FOUND);
       }

       public function successResponse(){
        return response()->json([
            'data'=>'Reset email send successfully,please check inbox'
            ],Response::HTTP_OK);
       }


       public function process(changePasswordRequest $request){
        return $this->getPasswordResetTableRow($request)->count()>0 ? $this->changePassword($request) : $this->tokenNotFound();
        }


        public function getPasswordResetTableRow($request){
           return $token=DB::table('password_resets')->where(['email'=>$request->email,'token'=>$request->resetToken]);
        }


        public function tokenNotFound(){
            return response()->json(['error'=>'email or token is incorrect'],Response::HTTP_UNPROCESSABLE_ENTITY);

        }

        public function changePassword($request){
           $user=User_detail::whereEmail($request->email)->first();
           $user->update(['password'=>bcrypt($request->password)]);
          $this->getPasswordResetTableRow($request)->delete();
           return response()->json(['data'=>'password successfullychanged'],Response::HTTP_CREATED);

        }


        //change password
        public function  changeUserPassword(Request $request){
              //validation
            $request->validate([
                'oldpassword'=>'required',
                'password'=>'required|confirmed'
            ]);


            //match old password
          // $user=$request->user();
            $user=auth()->user();
            if(!Hash::check($request->oldpassword,$request->user()->password)){
                return 'old password does\'t match';
            }
            return ($request->all());

            //update new password
        }
}
