<?php

namespace App\Http\Controllers;

use App\Events\WeddingCommentedEvent;
use App\Http\Services\WeddingCommentService;
use App\Models\WeddingComment;
use Illuminate\Http\Request;

class WeddingCommentController extends Controller
{
    public function __construct(protected WeddingCommentService $service)
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

        [$canDispatch, $message, $weddingComment] = $this->service->store($request);

        WeddingCommentedEvent::dispatchIf(
            $canDispatch,
            $weddingComment->wedding,
            $weddingComment->user
        );

        return response([
            "message" => $message,
            "data" => $weddingComment,
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\WeddingComment  $weddingComment
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
     * @param  \App\Models\WeddingComment  $weddingComment
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, WeddingComment $weddingComment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\WeddingComment  $weddingComment
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
