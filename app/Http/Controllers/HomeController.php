<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use App\Models\Member;
use App\Models\MemberClass;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index(): Factory|View|Application
    {
        return view('home');
    }

    public function getCount($model): int
    {
        return $model->query()->count();
    }

    public function getDashboardData(): JsonResponse
    {

        $classes = MemberClass::query()->count();
        $members = Member::query()->count();
        $status = Member::query()->get()->groupBy('status')->map(function ($item) {
            return $item->count();
        });

        $me = MemberClass::query()->with('members')->get()->groupBy('name')->map(function ($item) {
            return $item[0]->members->count();
        });
        return response()->json([
            'classes' => $classes,
            'members' => $members,
            'status' => $status->all(),
            'classGroups' => $me
        ]);
    }

}
