<?php

namespace App\Http\Controllers;

use App\Http\Services\CelebrationCommentService;
use Illuminate\Http\Request;

class CelebrationCommentController extends Controller
{
    public function __construct(protected CelebrationCommentService $service)
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

        [$canDispatch, $message, $celebrationComment] = $this->service->store($request);

        CelebrationCommentedEvent::dispatchIf(
            $canDispatch,
            $celebrationComment->celebration,
            $celebrationComment->user
        );

        return response([
            "message" => $message,
            "data" => $celebrationComment,
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\CelebrationComment  $celebrationComment
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
     * @param  \App\Models\CelebrationComment  $celebrationComment
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\CelebrationComment  $celebrationComment
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
