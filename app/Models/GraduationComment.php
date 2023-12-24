<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GraduationComment extends Model
{
    use HasFactory;

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'updated_at' => 'datetime:d M Y',
        'created_at' => 'datetime:d M Y',
    ];

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

    public function graduation()
    {
        return $this->belongsTo(Graduation::class);
    }

    public function commentLikes()
    {
        return $this->hasMany(GraduationCommentLike::class);
    }

    /*
     * Custom functions
     */

    /*
     * Check if user has liked post */
    public function hasLiked($id)
    {
        return $this->commentLikes
            ->where('user_id', $id)
            ->count() > 0 ? true : false;
    }
}
