<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AnniversaryCommentLike extends Model
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
		return $this->belongsTo(AnniversaryComment::class, "anniversary_comment_id");
	}
}
