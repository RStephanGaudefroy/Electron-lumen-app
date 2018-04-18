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
use App\Lists;
use App\Tasks;

Class listController extends BaseController {

    /**
     * 
     */
    public function getList(Request $request)
    {
        $task = Tasks::where("LISTS_id", "=", $request->input('id'))->get();
        $list = Lists::find($request->input('id'));
        $lists = ['task' => $task, 'list' => $list];
        return $lists;
    }

    /**
     * create List
     */
    public function createList(Request $request)
    {
        if ($request->isMethod('post'))
        {
            $this->validate($request, [
                'name' => 'required'
            ]);

            $list = Lists::create([
                'USERS_id' => $request->input('USERS_id'),
                'FOLDERS_id' => $request->input('FOLDERS_id'),
                'PRIORITIES_id' => $request->input('PRIORITIES_id'),
                'name' => $request->input('name'),
                'date_start' => $request->input('date_start'),
                'date_end' => $request->input('date_end'),
                'color' => $request->input('color')
            ]);
        }
        
        if ($list)
        {
            return $list;
        }
        else
        {
            return response()->json(['msg' => 'list is not create']);
        }

    }
}