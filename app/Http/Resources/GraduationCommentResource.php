<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class GraduationCommentResource extends JsonResource
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
            "graduationCommentId" => $this->graduation_comment_id,
            "text" => $this->text,
            "userId" => $this->user->id,
            "name" => $this->user->name,
            "avatar" => $this->user->avatar,
            "hasLiked" => $this->hasLiked($id),
            "likes" => $this->likes,
            "updatedAt" => $this->updated_at,
            "createdAt" => $this->created_at,
        ];
    }
}

