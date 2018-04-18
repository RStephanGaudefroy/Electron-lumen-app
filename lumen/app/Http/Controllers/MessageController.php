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
use App\Task;
use App\Priority;
use App\Frequency;

Class messageController extends BaseController {

    public function getMessage($idTask)
    {
        $message = Message::where("taches_id", "=", $idTask)->all();
        
    }

} // end class

