<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::group(['middleware' => ['auth:sanctum']], static function () {
    Route::get('dashboard', [HomeController::class, 'getDashboardData']);
    Route::prefix('user')->group(function () {
        Route::get('/{id}/roles/active', [UserController::class, 'getActiveRoles']);
        Route::get('/{id}/roles', [UserController::class, 'getUserRoles']);
        Route::post('/{id}/delete', [UserController::class, 'deleteUser']);
        Route::post('/roles/add', [UserController::class, 'addUserRoles']);
        Route::post('/roles/actions', [UserController::class, 'enableOrDisableRole']);
        Route::post('/change-password',[UserController::class, 'changePassword']);
    });

    Route::apiResource('/users', UserController::class);

    Route::prefix('employees')->group(function () {
        Route::get('/search/{query}', [EmployeeController::class, 'searchEmployees']);
    });
    Route::apiResource('/employees', EmployeeController::class);


    Route::apiResource('accounts', AccountController::class);

    Route::apiResource('members', MemberController::class);
    Route::get('member-classes', [MemberController::class, 'getClasses']);
});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

