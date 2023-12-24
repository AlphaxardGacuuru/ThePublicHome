<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CelebrationLike extends Model
{
    use HasFactory;

	/*
	* Relationships
	*/ 

	public function user()
	{
		return $this->belongsTo(User::class);
	}

	public function celebration()
	{
		return $this->belongsTo(Celebration::class);
	}
}
