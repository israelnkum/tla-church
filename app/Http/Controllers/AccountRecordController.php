<?php

namespace App\Http\Controllers;

use App\Enums\AccountRecordType;
use App\Http\Requests\StoreAccountRecordRequest;
use App\Http\Requests\UpdateAccountRecordRequest;
use App\Http\Resources\AccountRecordResource;
use App\Models\AccountRecord;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AccountRecordController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return AnonymousResourceCollection
     */
    public function index(): AnonymousResourceCollection
    {
        return AccountRecordResource::collection(AccountRecord::paginate(10));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreAccountRecordRequest $request
     * @return AccountRecordResource|JsonResponse
     */
    public function store(StoreAccountRecordRequest $request): JsonResponse|AccountRecordResource
    {

        DB::beginTransaction();
        try{
            $request['user_id'] = Auth::id();
            $account = AccountRecord::create($request->all());
            DB::commit();
            return new AccountRecordResource($account);
        }
        catch(Exception $exception){
            return response()->json([
                'message' => $exception->getMessage()
            ], 400);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param AccountRecord $accountRecord
     * @return AnonymousResourceCollection|Response
     */
    public function show(AccountRecord $accountRecord)
    {
        return AccountRecordResource::collection(AccountRecord::paginate(10));
    }


    /**
     * Update the specified resource in storage.
     *
     * @param UpdateAccountRecordRequest $request
     * @param AccountRecord $accountRecord
     * @return AccountRecordResource|JsonResponse
     */
    public function update(UpdateAccountRecordRequest $request, AccountRecord $accountRecord): JsonResponse|AccountRecordResource
    {
        DB::beginTransaction();
        try{
            $accountRecord->update($request->all());
            DB::commit();
            return new AccountRecordResource($accountRecord);
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
     * @param AccountRecord $accountRecord
     * @return JsonResponse
     */
    public function destroy(AccountRecord $accountRecord): JsonResponse
    {
        DB::beginTransaction();
        try{
            $accountRecord->delete();
            DB::commit();
            return response()->json([
                'message' => 'Record Deleted'
            ]);
        }
        catch(Exception $exception){
            return response()->json([
                'message' => $exception->getMessage()
            ], 400);
        }
    }
}
