<?php

namespace App\Http\Controllers;

use App\Http\Services\DeathService;
use App\Models\Death;
use Illuminate\Http\Request;

class DeathController extends Controller
{
    public function __construct(protected DeathService $service)
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
        $this->validate($request, [
            "name" => "required|string",
            "poster" => "required|string",
            "announcement" => "required|string",
            "eulogy" => "required|string",
            "locale" => "required|string",
            "burialDate" => "required|string",
        ]);

        [$saved, $message, $death] = $this->service->store($request);

        return response([
            "status" => $saved,
            "message" => $message,
            "data" => $death,
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Death  $death
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return $this->service->show($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Death  $death
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            "name" => "nullable|string",
            "poster" => "nullable|string",
            "announcement" => "nullable|string",
            "eulogy" => "nullable|string",
            "locale" => "nullable|string",
            "burialDate" => "nullable|string",
        ]);

        [$saved, $message, $death] = $this->service->update($request, $id);

        return response([
            "status" => $saved,
            "message" => $message,
            "data" => $death,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Death  $death
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        [$deleted, $message] = $this->service->destroy($id);

        return response([
            "status" => $deleted,
            "message" => $message,
        ], 200);
    }
}