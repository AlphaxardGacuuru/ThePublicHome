<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Wedding extends Model
{
    use HasFactory;

	// Casts
	protected $casts = [
		"photos" => "array",
		"videos" => "array",
	];

    /**
     * Accesors.
     *
     * @return \Illuminate\Database\Eloquent\Casts\Attribute
     */
	
    protected function poster(): Attribute
    {
        return Attribute::make(
            get: fn($value) => "/storage/" . $value
        );
    }

    protected function weddingDate(): Attribute
    {
        return Attribute::make(
            get: fn($value) => Carbon::parse($value)->format('d M Y'),
        );
    }

    protected function updatedAt(): Attribute
    {
        return Attribute::make(
            get: fn($value) => Carbon::parse($value)->format('d M Y'),
        );
    }

    protected function createdAt(): Attribute
    {
        return Attribute::make(
            get: fn($value) => Carbon::parse($value)->format('d M Y'),
        );
    }

    /*
     * Relationships
     */

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function membership()
    {
        return $this->belongsTo(Membership::class);
    }

    public function weddingLikes()
    {
        return $this->hasMany(WeddingLike::class);
    }

    public function weddingComments()
    {
        return $this->hasMany(WeddingComment::class);
    }

	public function recap()
	{
		return $this->hasMany(Recap::class);
	}

    /*
     *    Custom Functions
     */

    // Check if user has liked video
    public function hasLiked($id)
    {
        return $this->weddingLikes
            ->where("user_id", $id)
            ->count() > 0 ? true : false;
    }
}

