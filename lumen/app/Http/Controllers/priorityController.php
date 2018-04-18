<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Validator;
use Auth;
use DB;

// SQL TABLES RELATIONS
use App\User;

Class priorityController extends BaseController {

    /**
     * create Priority
     */
    public function createPriority(Request $request)
    {
        if ($request->isMethod('post')){

            // Validate input data from request
            $this->validate($request, [
                'name' => 'required'
                //'color' => 'required' 
            ]);
            
            $priority = Priority::create([
                'name' => $request->input('priority')
                //'color' => $request->input('color')
            ]);
        }
        
        if ($priority) {
            
            return response()->json(['msg' => 'create Priority with sucess']);
        } else {

            return response()->json(['msg' => 'Priority is not create']);
        }

    }
}