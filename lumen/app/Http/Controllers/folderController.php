<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Validator;
use App\User;
use App\Folders;
use App\Lists;
use DB;
use Auth;

Class folderController extends BaseController
{
    /**
     * Return all result from Folder table
     */
    public function getFolder()
    {
        $folder = Folders::all();
        return response()->json(['folder' => $folder]);
    }

    /**
     * Create / Add folder
     */
    public function createFolder(Request $request)
    {
        if ($request->isMethod('post')){
            // Validate input data from request
            $this->validate($request, [
                'name' => 'required'
            ]);

            $folder = Folders::create([
                'USERS_id' => $request->input('USERS_id'),
                'name' => $request->input('name')
            ]);
        }

        if ($folder)
        {
            return $folder;
        }
        else
        {
            return response()->json(['msg' => 'Folder is not create']);
        }
    }

} // end class