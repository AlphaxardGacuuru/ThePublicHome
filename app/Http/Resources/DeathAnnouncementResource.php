<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class DeathAnnouncementResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        // Current User ID
        $auth = auth('sanctum')->user();

        $id = $auth ? $auth->id : 0;

        return [
            "id" => $this->id,
            "userId" => $this->user_id,
            "userName" => $this->user->name,
            "userAvatar" => $this->user->avatar,
            "name" => $this->name,
            "poster" => $this->poster,
            "eulogy" => $this->eulogy,
            "location" => $this->location,
            "updatedAt" => $this->updated_at,
            "createdAt" => $this->created_at,
        ];
    }
}
