<?php

namespace App\Http\Controllers;

use App\Events\GraduationCommentedEvent;
use App\Http\Services\GraduationCommentService;
use App\Models\GraduationComment;
use Illuminate\Http\Request;

class GraduationCommentController extends Controller
{
    public function __construct(protected GraduationCommentService $service)
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

        [$canDispatch, $message, $graduationComment] = $this->service->store($request);

        GraduationCommentedEvent::dispatchIf(
            $canDispatch,
            $graduationComment->graduation,
            $graduationComment->user
        );

        return response([
            "message" => $message,
            "data" => $graduationComment,
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\GraduationComment  $graduationComment
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
     * @param  \App\Models\GraduationComment  $graduationComment
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, GraduationComment $graduationComment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\GraduationComment  $graduationComment
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
