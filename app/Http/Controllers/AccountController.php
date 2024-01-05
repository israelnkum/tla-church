<?php

namespace App\Http\Controllers;

use App\Exports\AccountRecordExport;
use App\Exports\MemberExport;
use App\Http\Resources\AccountRecordResource;
use App\Http\Resources\MembersResource;
use App\Models\Account;
use App\Http\Requests\StoreAccountRequest;
use App\Http\Requests\UpdateAccountRequest;
use App\Http\Resources\AccountResource;
use App\Models\Member;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Response;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Facades\Excel;

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


    public function show(Request $request, Account $account)
    {

        $records = $account->accountRecords();

        $records->when($request->has('type') &&
            $request->type !== 'all', function ($q) use ($request) {
            return $q->where('type', $request->type);
        });

        if ($request->has('export') && $request->export === 'true') {
            return Excel::download(new AccountRecordExport(AccountRecordResource::collection($records->get())),
                'AccountRecords.xlsx');
        }
//
//        if ($request->has('print') && $request->print === 'true') {
//            return $this->pdf('print.member.all', MembersResource::collection($membersQuery->get()), 'Members',
//                'landscape');
//        }

        return AccountRecordResource::collection($records->paginate(10));
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param StoreAccountRequest $request
     * @return JsonResponse|AccountResource
     */
    public function store(StoreAccountRequest $request): JsonResponse|AccountResource
    {
        DB::beginTransaction();
        try{
            $request['user_id'] = Auth::id();
            $request['date'] = Carbon::parse($request->date)->format('Y-m-d');
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
     * @param UpdateAccountRequest $request
     * @param Account $account
     * @return JsonResponse|AccountResource
     */
    public function update(UpdateAccountRequest $request, Account $account):JsonResponse|AccountResource
    {
        DB::beginTransaction();
        try{
            $request['date'] = Carbon::parse($request->date)->format('Y-m-d');
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
