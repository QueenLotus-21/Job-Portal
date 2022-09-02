<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Company;
use App\Http\Requests\companySignupRequest;
use Illuminate\Support\Facades\Hash;

class companyController extends Controller
{
    public function companySignup(companySignupRequest $request){
        $admin= Company::create([
          'name'=>$request->name,
          'address'=>$request->address,
          'description'=>$request->description,
          'contact_info'=>$request->contact_info,
          'email'=>$request->email,
          'password'=>Hash::make($request->password)
        ]);

      }
}
