<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\companyController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\PasswordController;
use App\Models\User;
use App\Models\job_detail;
use App\Models\user_detail;
use App\Models\Admin;
use App\Models\Company;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::middleware('auth:sanctum')->group(function(){
    Route::get('currentUser',[AuthController::class,'currentUser'])->name('currentUser');
  });

Route::group([
    'prefix'=>'auth',
    'middleware' =>'api',
    //'as'=>'api.',
], function ($router) {

    Route::post('signup', [AuthController::class,'signup'])->name('signup');
    Route::post('login', [AuthController::class,'login'])->name('login');

    Route::post('adminSignup', [AdminController::class,'adminSignup'])->name('adminSignup');
    Route::post('companySignup', [companyController::class,'companySignup'])->name('companySignup');

    //manage user
    Route::get('user',[AuthController::class,'users']);
    Route::get('userList',[AuthController::class,'users']);
    Route::delete('user/{id}',[AuthController::class,'deleteUser']);
    Route::get('user/{id}',[AuthController::class,'userfind']);
    Route::put('user/{id}',[AuthController::class,'updateUser']);
    Route::post('registeruser',[AuthController::class,'registerUser']);
    Route::get('me',[AuthController::class,'me'])->name('me');
    Route::get('logout',[AuthController::class,'logout'])->name('logout');
  //  Route::post('logout',[AuthController::class,'logout'])->name('logout');

 Route::get('profile',[AuthController::class,'profile'])->name('profile');
 Route::get('profile/{id}',[AuthController::class,'userfindProfile'])->name('userfindProfile');
 Route::put('profile/{id}',[AuthController::class,'updateProfile']);
 Route::get('showApllicant',[companyController::class,'showApllicant'])->name('showApllicant');


    //manage admin
    Route::get('admin',[AdminController::class,'admins']);
    Route::delete('admin/{id}',[AdminController::class,'deleteAdmin']);
    Route::get('admin/{id}',[AdminController::class,'adminfind']);
    Route::put('admin/{id}',[AdminController::class,'updateAdmin']);
    Route::post('adminSignup',[AdminController::class,'adminSignup']);

    //manage post
    Route::delete('job/{id}',[companyController::class,'deletePost']);
    Route::put('job/{id}',[companyController::class,'updatePost']);
    Route::get('job',[companyController::class,'jobs']);
    Route::get('job/{id}',[companyController::class,'jobfind']);
    //Route::get('jobList',[companyController::class,'jobsList']);
     //Route::get('jobList/{id}',[companyController::class,'jobfindList']);


    Route::post('post',[companyController::class,'postJob']);
    Route::get('applicant',[AdminController::class,'applicants'])->name('applicant');
    // Route::middleware(['auth:api'])->get('applicant',[AdminController::class,'applicants'])->name('applicant');
    Route::get('applicant/{id}',[companyController::class,'applicantfind']);
    Route::post('applicant',[companyController::class,'applyApplicant']);
    //Route::apiResource('applicant', [AdminController::class,'applicants']);
    // Route::middleware('auth:api')->group(function () {
    //     Route::get('applicant',[AdminController::class,'applicants']);
    // });


    //manage company
    Route::get('company',[AdminController::class,'companys']);
    Route::get('company/{id}',[AdminController::class,'companyfind']);
    Route::delete('company/{id}',[AdminController::class,'deleteCompany']);
    Route::put('company/{id}',[AdminController::class,'updateCompany']);


    route::get("/send",function(){
        // $user=user_detail::find(1)->posts()
        //       ->where('title','web')
        //       ->first();
        $user=user_detail::find(1);
              foreach ($user->posts as $u){
                $u;
              }
        return $u->title;
    });
    //password
    route::post("sendEmail",[PasswordController::class,'passwordReset']);
    Route::post('resetPassword',[PasswordController::class,'process']);
    Route::post('changeUserPassword',[PasswordController::class,'changeUserPassword']);

    Route::group(['middleware' => ['auth.optional:api']],function(){
       // Route::get('applicant',[AdminController::class,'applicants'])->name('applicant');
    });



    //Route::delete('post/{id}',[companyController::class,'jobfind']);



    // Route::prefix('user')->name('user')->group(function() {
    //     Route::middleware(['guest'])->group(function () {
    //         Route::post('signup', [AuthController::class,'signup'])->name('signup');
    //         Route::post('login', [AuthController::class,'login'])->name('login');

    //     });
    //     Route::middleware(['auth'])->group(function () {

    //     });
    // });
});
