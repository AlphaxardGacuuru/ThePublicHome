<?php

namespace App\Http\Services;

use App\Models\UserMembership;

class UserMembershipService extends Service
{
    /*
     * Store User Membership
     */
    public function store($request)
    {
        $userMembership = new UserMembership;
        $userMembership->user_id = $this->id;
        $userMembership->membership_id = $request->membershipId;
        $userMembership->save();

        $saved = $userMembership->save();

        $message = "Membership Acquired";

        $userMembershipWithMembership = UserMembership::with('membership')
            ->find($userMembership->id);

        return [$saved, $message, $userMembershipWithMembership];
    }
}
