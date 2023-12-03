<?php

namespace App\Http\Controllers;

use App\Http\Services\GraduationService;
use App\Models\Graduation;
use Illuminate\Http\Request;

class GraduationController extends Controller
{
	public function __construct(protected GraduationService $service)
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
     * @param  \App\Models\Graduation  $graduation
     * @return \Illuminate\Http\Response
     */
    public function show(Graduation $graduation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Graduation  $graduation
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Graduation $graduation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Graduation  $graduation
     * @return \Illuminate\Http\Response
     */
    public function destroy(Graduation $graduation)
    {
        //
    }
}
