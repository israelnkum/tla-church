<?php

namespace App\Http\Controllers;

use App\Helpers\HelperFunctions;
use App\Http\Requests\StoreMemberRequest;
use App\Http\Requests\UpdateMemberRequest;
use App\Http\Resources\MembersResource;
use App\Models\Member;
use App\Models\MemberClass;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class MemberController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response|AnonymousResourceCollection
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
            $request['user_id'] = Auth::id();
            $request['member_class_id'] = $request->member_class_id ?: NULL;
            $member = Member::create($request->all());
            if ($request->has('create_account') && $request->create_account === 'true'){
                $data = [
                    'id' => $member->id,
                    'first_name' => $request->other_names,
                    'last_name' => $request->surname,
                    'email' => $request->email
                ];
                HelperFunctions::createUserAccount($member, $data);
            }

            // upload picture if picture is part of request
            if ($request->has('file') && $request->file !== "null"){
                HelperFunctions::saveImage($member, $request->file('file'), 'members');
            }

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

    public function getClasses(): Collection
    {
        return MemberClass::all();
    }

}
