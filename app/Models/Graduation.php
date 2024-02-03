<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Graduation extends Model
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
    protected function recap(): Attribute
    {
        return Attribute::make(
            get: fn($value) => $value ? "/storage/" . $value : null
        );
    }
	
    protected function poster(): Attribute
    {
        return Attribute::make(
            get: fn($value) => "/storage/" . $value
        );
    }

    protected function graduationDate(): Attribute
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

    public function graduationLikes()
    {
        return $this->hasMany(GraduationLike::class);
    }

    public function graduationComments()
    {
        return $this->hasMany(GraduationComment::class);
    }

    /*
     *    Custom Functions
     */

    // Check if user has liked video
    public function hasLiked($id)
    {
        return $this->graduationLikes
            ->where("user_id", $id)
            ->count() > 0 ? true : false;
    }
}
