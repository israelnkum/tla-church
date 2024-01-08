<?php

namespace App\Http\Controllers;

use App\Exports\MemberExport;
use App\Helpers\HelperFunctions;
use App\Http\Requests\StoreMemberRequest;
use App\Http\Requests\UpdateMemberRequest;
use App\Http\Resources\MembersResource;
use App\Models\Member;
use App\Models\MemberClass;
use App\Traits\UsePrint;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Facades\Excel;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class MemberController extends Controller
{
    use UsePrint;

    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return AnonymousResourceCollection|Response|BinaryFileResponse
     */
    public function index(Request $request): Response|BinaryFileResponse|AnonymousResourceCollection
    {
        $membersQuery = Member::query();

        $membersQuery->when($request->has('name') &&
            $request->name !== null, function ($q) use ($request) {
            Log::info('d', $request->all());
            return $q->where('last_name', 'like', '%' . $request->name . '%')
                ->orWhere('other_names', 'like', '%' . $request->name . '%')
                ->orWhere('first_name', 'like', '%' . $request->name . '%');
        });

        $membersQuery->when($request->has('class_id') &&
            $request->class_id !== 'all', function ($q) use ($request) {
            return $q->where('member_class_id', $request->class_id);
        });

        $membersQuery->when($request->has('status') &&
            $request->status !== 'all', function ($q) use ($request) {
            return $q->where('status', $request->status);
        });


        if ($request->has('export') && $request->export === 'true') {
            return Excel::download(new MemberExport(MembersResource::collection($membersQuery->get())),
                'Members.xlsx');
        }

        if ($request->has('print') && $request->print === 'true') {
            return $this->pdf('print.member.all', MembersResource::collection($membersQuery->get()), 'Members',
                'landscape');
        }

        return MembersResource::collection($membersQuery->paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreMemberRequest $request
     * @return JsonResponse|MembersResource
     */
    public function store(StoreMemberRequest $request): JsonResponse|MembersResource
    {
        DB::beginTransaction();
        try {
            $request['user_id'] = Auth::id();
            $request['member_class_id'] = $request->member_class_id ?: null;
            $member = Member::create($request->all());
            if ($request->has('create_account') && $request->create_account === 'true') {
                $data = [
                    'id' => $member->id,
                    'first_name' => $request->other_names,
                    'last_name' => $request->surname,
                    'email' => $request->email
                ];
                HelperFunctions::createUserAccount($member, $data);
            }

            // upload picture if picture is part of request
            if ($request->has('file') && $request->file !== "null") {
                HelperFunctions::saveImage($member, $request->file('file'), 'members');
            }

            DB::commit();
            return new MembersResource($member);
        } catch (Exception $exception) {
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
    public function update(UpdateMemberRequest $request, Member $member): JsonResponse|MembersResource
    {
        DB::beginTransaction();
        try {
            $member->update($request->all());

            if ($request->has('file') && $request->file !== "null") {
                HelperFunctions::saveImage($member, $request->file('file'), 'members');
            }

            DB::commit();
            return new MembersResource($member);
        } catch (Exception $exception) {
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
    public function destroy(Member $member): JsonResponse
    {
        DB::beginTransaction();
        try {
            $member->delete();
            DB::commit();
            return \response()->json([
                'message' => 'Member deleted'
            ]);
        } catch (Exception $exception) {
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

    public function printMember(Member $member): Response
    {
        $data = new MembersResource($member);
        return $this->pdf('print.member', $data , 'Member');
    }

    public function searchMembers($query): AnonymousResourceCollection
    {
        $products = Member::query()
            ->where('last_name', 'like', '%' . $query . '%')
            ->orWhere('other_names', 'like', '%' . $query . '%')
            ->orWhere('first_name', 'like', '%' . $query . '%')
            ->orWhere('email', 'like', '%' . $query . '%')->get();
        return MembersResource::collection($products);
    }
}
