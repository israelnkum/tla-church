<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMemberRequest;
use App\Http\Requests\UpdateMemberRequest;
use App\Http\Resources\MembersResource;
use App\Models\Member;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class MemberController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index(): Response|AnonymousResourceCollection
    {
        return MembersResource::collection(Member::paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreMemberRequest $request
     * @return Response
     */
    public function store(StoreMemberRequest $request):JsonResponse|MembersResource
    {
        DB::beginTransaction();
        try{
            $request['user_id'] = 1;
            $member = Member::create($request->all());
            DB::commit();
            return new MembersResource($member);
        }
        catch(Exception $exception){
            DB::rollBack();
            return response()->json([
                'message' => $exception->getMessage()
            ], 400);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateMemberRequest $request
     * @param Member $member
     * @return JsonResponse|MembersResource
     */
    public function update(UpdateMemberRequest $request, Member $member):JsonResponse|MembersResource
    {
        DB::beginTransaction();
        try{
            $member->update($request->all());
            DB::commit();
            return new MembersResource($member);
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
     * @param Member $member
     * @return Response
     */
    public function destroy(Member $member):JsonResponse
    {
        DB::beginTransaction();
        try{
            $member->delete();
            DB::commit();
            return \response()->json([
                'message' => 'Member deleted'
            ]);
        }
        catch(Exception $exception){
            DB::rollBack();
            return response()->json([
                'message' => 'Something went wrong'
            ], 400);
        }
    }
}
