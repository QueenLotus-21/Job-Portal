<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\companyController;
use App\Models\User;
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



// Route::group([

//     'middleware' => 'api',

// ], function () {


    Route::post('signup', [AuthController::class,'signup'])->name('signup');
    Route::post('login', [AuthController::class,'login'])->name('login');
    Route::post('adminSignup', [AuthController::class,'adminSignup'])->name('adminSignup');
    Route::post('companySignup', [companyController::class,'companySignup'])->name('companySignup');

    // Route::prefix('user')->name('user')->group(function() {
    //     Route::middleware(['guest'])->group(function () {
    //         Route::post('signup', [AuthController::class,'signup'])->name('signup');
    //         Route::post('login', [AuthController::class,'login'])->name('login');

    //     });
    //     Route::middleware(['auth'])->group(function () {

    //     });
    // });
//});
