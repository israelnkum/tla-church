<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAccountRecordRequest;
use App\Http\Requests\UpdateAccountRecordRequest;
use App\Models\AccountRecord;

class AccountRecordController extends Controller
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
     * @param  \App\Http\Requests\StoreAccountRecordRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreAccountRecordRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\AccountRecord  $accountRecord
     * @return \Illuminate\Http\Response
     */
    public function show(AccountRecord $accountRecord)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\AccountRecord  $accountRecord
     * @return \Illuminate\Http\Response
     */
    public function edit(AccountRecord $accountRecord)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateAccountRecordRequest  $request
     * @param  \App\Models\AccountRecord  $accountRecord
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateAccountRecordRequest $request, AccountRecord $accountRecord)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\AccountRecord  $accountRecord
     * @return \Illuminate\Http\Response
     */
    public function destroy(AccountRecord $accountRecord)
    {
        //
    }
}
