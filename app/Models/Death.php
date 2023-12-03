<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Death extends Model
{
    use HasFactory;

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

    public function deathLikes()
    {
        return $this->hasMany(DeathLike::class);
    }

    /*
     *    Custom Functions
     */

    // Check if user has liked video
    public function hasLiked($id)
    {
        return $this->deathLikes
            ->where("user_id", $id)
            ->count() > 0 ? true : false;
    }
}
