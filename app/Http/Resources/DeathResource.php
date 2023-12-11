<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class DeathResource extends JsonResource
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
            "locale" => $this->locale,
			"tier" => $this->membership->tier,
            "name" => $this->name,
            "sunrise" => $this->sunrise,
            "sunset" => $this->sunset,
            "burialDate" => $this->burial_date,
            "announcement" => $this->announcement,
            "poster" => $this->poster,
            "photos" => $this->photos,
            "eulogy" => $this->eulogy,
            "likes" => $this->likes,
            "hasLiked" => $this->hasLiked($id),
            "updatedAt" => $this->updated_at,
            "createdAt" => $this->created_at,
        ];
    }
}
