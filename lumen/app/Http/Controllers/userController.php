<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Validator;
use App\User;
use App\Adress;
use App\People;
use App\Folders;
use App\Lists;
use App\Status;
use App\States;
use App\Priorities;
use App\Frequency;
use App\Tags;
use App\Tasks;
use App\Tasksusers;
use DB;
use Auth;

Class userController extends BaseController
{
    /**
     * @param Request  $request
     */
    public function userLogin(request $request) 
    {
        // Validate input data from request
        $this->validate($request, [
            'email' => 'required',
            'password' => 'required' 
        ]);
                     
        // search user in database
        $user = User::where("email", "=", $request->input('email'))->first();
        if(Hash::check($request->input('password'), $user->password))
        {
            // update or create a token
            $apikey = base64_encode(str_random(40));  
            User::where('email', "=", $request->input('email'))->update(['token' => "$apikey"]);  
        }

        // if user login is true then execute request folder and list and then return data of user in json response
        if ($user)
        {
            $people = People::where("id", "=", $user->PEOPLE_id)->first();

            $adress = Adress::where("id", "=", $people->ADRESS_id)->first();

            $folder = Folders::all();

            $list = Lists::where("USERS_id", "=", $user->id)->get();

            $users = People::all();

            $status = Status::all();

            $states = States::all();

            $priority = Priorities::all();
            $frequency = Frequency::all();;
            $tags = Tags::all();

            $result = Tasksusers::where('USERS_id', '=', $user->id)->get();
            if ($result)
            {
                $query = array();
                for ($i=0; $i<count($result); $i++)
                {
                    $queryResult = Tasks::where('id', "=", $result[$i]->TASKS_id)->get();
                    array_push($query, $queryResult);
                }
            }

            $return = [
                'user' => $user,
                'people' => $people,
                'adress' => $adress,
                'folder' => $folder,
                'list' => $list, /*'taskUser'=> $tk,*/
                'users' =>$users,
                'status' => $status,
                'states' => $states,
                'priority' => $priority,
                'frequency' => $frequency,
                'tags' => $tags,
                'task'=> $query // faire attention pour la creation de tache si pas proprio
            ];

            return response()->json($return);
        }
        else
        {
            return response()->json([$user, 'error' => 'Connection is not successfull']);
        }
    }
    
    /**
     * Log the user out of the application.
     *
     * @return json Response
     */
    public function userLogout()
    {
        //$this->auth->logout();

        return response()->json(['msg' => 'Logout sucess']);
    }

    
    /**
     * @param Request $request
     * @param $id -> id of user is connected
     * Update data of user 
     */
    public function userUpdate(Request $request)
    {
        if ($request->isMethod('post')){
            $apikey = base64_encode(str_random(40));
            $id = $request->input('id');
            $user = User::find($id);

            $user = User::update([
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'password' => Hash::make($request->input('password')),
                'token' => "$apikey",
                'profil' => '2'
            ]);

        }
        if ($user) {

            return response()->json($user);
        } else {

            return response()->json(['msg' => 'update is not successful because error are find']);
        }
    }
    
    /**
     * @param Request $request
     * Register a new user in DB
     */
    public function userRegister(Request $request){
        
        // Validate input data from request
        $this->validate($request, [
            'email' => 'required|email',
            'password' => 'required|min:7',
            'name' => 'required',
            'surname' => 'required',
        ]);
            
        // if method = post add user in DB
        if ($request->isMethod('post')){
            $apikey = base64_encode(str_random(40));

            // Decomment this section when add info in user Register AJAX request
            /*$adress = Adress::create([
                'pathway_number' => $apikey,
                'pathway_type' => $apikey,
                'pathway_name' => $apikey,
                'complement' => $apikey,
                'code' => $apikey,
                'city' => $apikey,
                'country' => $apikey,
            ]);*/
            $adress = Adress::create([]);


            $people = People::create([
                'name' => $request->input('name'),
                'surname' => $request->input('surname'),
                'ADRESS_id' => $adress->id,
            ]);

            $user = User::create([
                'email' => $request->input('email'),
                'password' => Hash::make($request->input('password')),
                'PEOPLE_id' => $people->id,
                //'date_creation' => date_timestamp_get(),
                'token' => $apikey
            ]);

            $return = ['user' => $user, 'people' => $people, 'adress' => $adress];
        }

        return response()->json($return);
    }
} //end class
