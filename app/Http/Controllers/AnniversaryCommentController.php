<?php

namespace App\Http\Controllers;

use App\Http\Services\AnniversaryCommentService;
use Illuminate\Http\Request;

class AnniversaryCommentController extends Controller
{
    public function __construct(protected AnniversaryCommentService $service)
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
        //
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
            'text' => 'required',
        ]);

        [$canDispatch, $message, $anniversaryComment] = $this->service->store($request);

        AnniversaryCommentedEvent::dispatchIf(
            $canDispatch,
            $anniversaryComment->anniversary,
            $anniversaryComment->user
        );

        return response([
            "message" => $message,
            "data" => $anniversaryComment,
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\AnniversaryComment  $anniversaryComment
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
     * @param  \App\Models\AnniversaryComment  $anniversaryComment
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\AnniversaryComment  $anniversaryComment
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
