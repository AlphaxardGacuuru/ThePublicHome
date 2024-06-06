<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class RecapResource extends JsonResource
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
            "userId" => $this->user_id,
            "userName" => $this->user->name,
            "userAvatar" => $this->user->avatar,
            "deathId" => $this->death_id,
            "weddingId" => $this->wedding_id,
            "graduationId" => $this->graduation_id,
            "successCardId" => $this->successCard_id,
            "anniversaryId" => $this->anniversary_id,
            "celebrationId" => $this->celebration_id,
            "video" => $this->video,
            "updatedAt" => $this->updated_at,
            "createdAt" => $this->created_at,
        ];
    }
}
