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
            "model" => "Death",
            "userId" => $this->user_id,
            "userName" => $this->user->name,
            "userAvatar" => $this->user->avatar,
            "locale" => $this->locale,
            "tier" => $this->membership->tier,
            "name" => $this->name,
            "sunriseFormated" => $this->sunrise,
            "sunrise" => Carbon::parse($this->sunrise)->format("Y-m-d"),
            "sunsetFormated" => $this->sunset,
            "sunset" => Carbon::parse($this->sunset)->format("Y-m-d"),
            "burialDateFormated" => $this->burial_date,
            "burialDate" => Carbon::parse($this->burial_date)->format("Y-m-d"),
            "announcement" => $this->announcement,
            "poster" => $this->poster,
            "photos" => $this->photos,
            "videos" => $this->videos,
            "eulogy" => $this->eulogy,
            "eulogyWords" => $this->eulogy_words,
            "hasRecap" => $this->recap()->exists() ? "Yes" : "No",
            "likes" => $this->likes,
            "comments" => $this->comments,
            "hasLiked" => $this->hasLiked($id),
            "wordLimit" => $this->membership->features["announcement"],
            "photoLimit" => $this->membership->features["photos"],
            "videoLimit" => $this->membership->features["videos"],
            "eulogyLimit" => $this->membership->features["eulogy"][0],
            "eulogyWordLimit" => $this->membership->features["eulogy"][1],
            "updatedAt" => $this->updated_at,
            "createdAt" => $this->created_at,
        ];
    }
}
