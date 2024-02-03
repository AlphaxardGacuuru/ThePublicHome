<?php

namespace App\Http\Services;

use App\Http\Resources\AnniversaryResource;
use App\Http\Resources\CelebrationResource;
use App\Http\Resources\DeathResource;
use App\Http\Resources\GraduationResource;
use App\Http\Resources\SuccessCardResource;
use App\Http\Resources\WeddingResource;
use App\Models\Anniversary;
use App\Models\Celebration;
use App\Models\Death;
use App\Models\Graduation;
use App\Models\SuccessCard;
use App\Models\Wedding;

class RecapService extends Service
{
    /*
     * Get Recaps
     */
    public function index()
    {
        $deaths = Death::whereNotNull("recap")->get();
        $weddings = Wedding::whereNotNull("recap")->get();
        $graduations = Graduation::whereNotNull("recap")->get();
        $successCards = SuccessCard::whereNotNull("recap")->get();
        $anniversaries = Anniversary::whereNotNull("recap")->get();
        $celebrations = Celebration::whereNotNull("recap")->get();

        $deaths = DeathResource::collection($deaths);
        $weddings = WeddingResource::collection($weddings);
        $graduations = GraduationResource::collection($graduations);
        $successCards = SuccessCardResource::collection($successCards);
        $anniversaries = AnniversaryResource::collection($anniversaries);
        $celebrations = CelebrationResource::collection($celebrations);

        return response([
            "data" => [
                ...$deaths,
                ...$weddings,
                ...$graduations,
                ...$successCards,
                ...$anniversaries,
                ...$celebrations,
            ],
        ], 200);
    }
}
