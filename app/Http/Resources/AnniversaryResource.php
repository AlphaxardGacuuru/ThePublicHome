<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class AnniversaryResource extends JsonResource
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
            "title" => $this->title,
            "poster" => $this->poster,
            "announcement" => $this->announcement,
            "venue" => $this->venue,
            "anniversaryDate" => $this->anniversary_date,
            "anniversaryFormated" => Carbon::parse($this->anniversary_date)->format("d M Y"),
            "likes" => $this->likes,
            "hasLiked" => $this->hasLiked($id),
            "updatedAt" => $this->updated_at,
            "createdAt" => $this->created_at,
        ];
    }
}
