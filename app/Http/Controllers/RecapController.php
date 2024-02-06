<?php

namespace App\Http\Controllers;

use App\Http\Services\RecapService;
use Illuminate\Http\Request;

class RecapController extends Controller
{
	public function __construct(protected RecapService $service)
	{
		// 
	}

    /*
	* Get Recaps
	*/
	public function index()
	{
		return $this->service->index();
	}

	/*
	* Get By User ID
	*/ 
	public function byUserId($id)
	{
		return $this->service->byUserId($id);
	}
}