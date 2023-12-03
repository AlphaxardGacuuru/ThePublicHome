<?php

namespace App\Http\Controllers;

use App\Http\Services\SuccessCardService;
use App\Models\SuccessCard;
use Illuminate\Http\Request;

class SuccessCardController extends Controller
{
	public function __construct(protected SuccessCardService $service)
	{
		// 
	}

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return $this->service->index();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\SuccessCard  $successCard
     * @return \Illuminate\Http\Response
     */
    public function show(SuccessCard $successCard)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\SuccessCard  $successCard
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, SuccessCard $successCard)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\SuccessCard  $successCard
     * @return \Illuminate\Http\Response
     */
    public function destroy(SuccessCard $successCard)
    {
        //
    }
}
