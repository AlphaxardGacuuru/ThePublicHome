<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserMembership extends Model
{
    use HasFactory;

	/*
	* Relationships
	*/ 

	public function membership()
	{
		return $this->belongsTo(Membership::class);
	}
}
