<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recap extends Model
{
    use HasFactory;

    /**
     * Accesors.
     *
     * @return \Illuminate\Database\Eloquent\Casts\Attribute
     */
    protected function video(): Attribute
    {
        return Attribute::make(
            get: fn($value) => $value ? "/storage/" . $value : null
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

    public function death()
    {
        return $this->belongsTo(Death::class);
    }

    public function wedding()
    {
        return $this->belongsTo(Wedding::class);
    }

    public function graduation()
    {
        return $this->belongsTo(Graduation::class);
    }

    public function successCard()
    {
        return $this->belongsTo(SuccessCard::class);
    }

    public function anniversary()
    {
        return $this->belongsTo(Anniversary::class);
    }

    public function celebration()
    {
        return $this->belongsTo(Celebration::class);
    }
}
