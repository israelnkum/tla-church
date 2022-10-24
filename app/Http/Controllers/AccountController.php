<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Http\Requests\StoreAccountRequest;
use App\Http\Requests\UpdateAccountRequest;
use App\Http\Resources\AccountResource;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class AccountController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(): Response|AnonymousResourceCollection
    {
        return AccountResource::collection(Account::paginate(10));
    }

   
    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreAccountRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreAccountRequest $request): JsonResponse|AccountResource
    {
        DB::beginTransaction();
        try{
            $request['user_id'] = 1;
            $account = Account::create($request->all());
            DB::commit();
            return new AccountResource($account);
        }
        catch(Exception $exception){
            return response()->json([
                'message' => $exception->getMessage()
            ], 400);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateAccountRequest  $request
     * @param  \App\Models\Account  $account
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateAccountRequest $request, Account $account):JsonResponse|AccountResource
    {
        DB::beginTransaction();
        try{
            $account->update($request->all());
            DB::commit();
            return new AccountResource($account);
        }
        catch(Exception $exception){
            return response()->json([
                'message' => $exception->getMessage()
            ], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Account  $account
     * @return \Illuminate\Http\Response
     */
    public function destroy(Account $account): JsonResponse
    {
        DB::beginTransaction();
        try{
            $account->delete();
            DB::commit();
            return response()->json([
                'message' => 'Account deleted'
            ]);
        }
        catch(Exception $exception){
            DB::rollBack();
            return response()->json([
                'message' => 'Something went wrong'
            ]);
        }
    }
}
