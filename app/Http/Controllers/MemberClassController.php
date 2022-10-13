<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMemberClassRequest;
use App\Http\Requests\UpdateMemberClassRequest;
use App\Models\MemberClass;

class MemberClassController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreMemberClassRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreMemberClassRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MemberClass  $memberClass
     * @return \Illuminate\Http\Response
     */
    public function show(MemberClass $memberClass)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\MemberClass  $memberClass
     * @return \Illuminate\Http\Response
     */
    public function edit(MemberClass $memberClass)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateMemberClassRequest  $request
     * @param  \App\Models\MemberClass  $memberClass
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateMemberClassRequest $request, MemberClass $memberClass)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MemberClass  $memberClass
     * @return \Illuminate\Http\Response
     */
    public function destroy(MemberClass $memberClass)
    {
        //
    }
}
