<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            "id" => $this->id,
            "name" => $this->name,
            "email" => $this->email,
            "phone" => $this->phone,
            "avatar" => $this->avatar,
            "membershipId" => $this->membership()?->id,
            "membershipName" => $this->membership()?->name,
            "membershipTier" => $this->membership()?->tier,
            "membershipFeatures" => $this->membership()?->features,
            "createdAt" => $this->created_at,
        ];
    }
}
