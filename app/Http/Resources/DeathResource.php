<?php

namespace App\Http\Resources;

use Carbon\Carbon;
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
            "sunriseFormated" => Carbon::parse($this->sunrise)->format("d M Y"),
            "sunset" => $this->sunset,
            "sunsetFormated" => Carbon::parse($this->sunset)->format("d M Y"),
            "burialDate" => $this->burial_date,
            "burialDateFormated" => Carbon::parse($this->burial_date)->format("d M Y"),
            "announcement" => $this->announcement,
            "poster" => $this->poster,
            "photos" => $this->photos,
            "videos" => $this->videos,
            "eulogy" => $this->eulogy,
            "likes" => $this->likes,
            "hasLiked" => $this->hasLiked($id),
            "wordLimit" => $this->membership->features["announcement"],
            "photoLimit" => $this->membership->features["photos"],
            "videoLimit" => $this->membership->features["videos"],
            "eulogyLimit" => $this->membership->features["eulogy"],
            "updatedAt" => $this->updated_at,
            "createdAt" => $this->created_at,
        ];
    }
}
