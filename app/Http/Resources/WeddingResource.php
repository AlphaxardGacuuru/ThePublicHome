<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class WeddingResource extends JsonResource
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
            "model" => "Wedding",
            "userId" => $this->user_id,
            "userName" => $this->user->name,
            "userAvatar" => $this->user->avatar,
            "locale" => $this->locale,
            "tier" => $this->membership->tier,
            "title" => $this->title,
            "announcement" => $this->announcement,
            "poster" => $this->poster,
            "photos" => $this->photos,
            "videos" => $this->videos,
            "venue" => $this->venue,
            "weddingDateFormated" => $this->wedding_date,
            "weddingDate" => Carbon::parse($this->wedding_date)->format("Y-m-d"),
            "recap" => $this->recap,
            "likes" => $this->likes,
            "comments" => $this->comments,
            "hasLiked" => $this->hasLiked($id),
            "wordLimit" => $this->membership->features["announcement"],
            "photoLimit" => $this->membership->features["photos"],
            "videoLimit" => $this->membership->features["videos"],
            "updatedAt" => $this->updated_at,
            "createdAt" => $this->created_at,
        ];
    }
}
