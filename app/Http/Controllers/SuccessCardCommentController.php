<?php

namespace App\Http\Controllers;

use App\Events\SuccessCardCommentedEvent;
use App\Http\Services\SuccessCardCommentService;
use App\Models\SuccessCardComment;
use Illuminate\Http\Request;

class SuccessCardCommentController extends Controller
{
    public function __construct(protected SuccessCardCommentService $service)
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

        [$canDispatch, $message, $successCardComment] = $this->service->store($request);

        SuccessCardCommentedEvent::dispatchIf(
            $canDispatch,
            $successCardComment->successCard,
            $successCardComment->user
        );

        return response([
            "message" => $message,
            "data" => $successCardComment,
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\SuccessCardComment  $successCardComment
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
     * @param  \App\Models\SuccessCardComment  $successCardComment
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, SuccessCardComment $successCardComment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\SuccessCardComment  $successCardComment
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
