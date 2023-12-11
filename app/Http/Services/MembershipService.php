<?php

namespace App\Http\Services;

use App\Models\Membership;

class MembershipService extends Service
{
    /*
     * List All Memberships
     */
    public function index()
    {
        $memberships = Membership::all()
            ->groupBy("name");

        return response(["data" => $memberships], 200);
    }
}
