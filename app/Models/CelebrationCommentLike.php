<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CelebrationCommentLike extends Model
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
		return $this->belongsTo(CelebrationComment::class, "celebration_comment_id");
	}
}
