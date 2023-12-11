<?php

namespace App\Http\Controllers;

use App\Http\Services\UserMembershipService;
use App\Models\UserMembership;
use Illuminate\Http\Request;

class UserMembershipController extends Controller
{
    public function __construct(protected UserMembershipService $service)
    {
        //
    }

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
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            "membershipId" => "required",
        ]);

        [$saved, $message, $userMembership] = $this->service->store($request);

        return response([
            "status" => $saved,
            "message" => $message,
            "data" => $userMembership,
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\UserMembership  $userMembership
     * @return \Illuminate\Http\Response
     */
    public function show(UserMembership $userMembership)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\UserMembership  $userMembership
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, UserMembership $userMembership)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\UserMembership  $userMembership
     * @return \Illuminate\Http\Response
     */
    public function destroy(UserMembership $userMembership)
    {
        //
    }
}
