<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DeathAnnouncementCommentLike extends Model
{
    use HasFactory;

	/*
	* Relationships
	*/ 

	public function user()
	{
		return $this->belongsTo(User::class);
	} 

	public function comment()
	{
		return $this->belongsTo(DeathAnnouncementComment::class, "death_announcement_comment_id");
	}
}
