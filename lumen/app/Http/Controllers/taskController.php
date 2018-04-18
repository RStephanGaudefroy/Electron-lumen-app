<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Validator;
use Auth;
use DB;

// SQL TABLES RELATIONS
use App\User;
use App\Tasks;
use App\Priorities;
use App\Frequency;
use App\People;
use App\States;
use App\Status;
use App\Tags;
use App\Tasksusers;

Class taskController extends BaseController {

    /**
     * 
     */
    public function getTask(Request $request)
    {
        $task = Tasks::where('USERS_id', "=", $request->input('id'))->get();
        return response()->json(['task' => $task]);
    }

    public function getTaskChild(Request $request)
    {
        $task = Tasks::where("id_parent", "=", $request->input('id'))->get();
        //$list = Lists::find($request->input('id'));
        //$lists = ['task' => $task, 'list' => $list];
        // retourner les participant de la tache parent
        $team = Tasksusers::where("TASKS_id", "=", $request->input('id'))->get();
        //$tasks = Tasks::all();
        $response = ['taskschild' => $task, 'team' => $team/*, 'tasks' => $tasks*/];
        return $response;
    }

    /**
     * Return priorities, frequencies and parent task
     */
    public function getTaskInfo(Request $request)
    {
        //$taskParent = Task::whereNull('parent_id')->all();

        $priority = Priorities::all();
        $frequency = Frequency::all();
        $state = States::all();
        $status = Status::all();
        $tags = Tags::all();
        //$task = Task::where('LISTS_id', "=", $request->input('LISTS_id'))->first();
        //$task = Tasks::all();
        $allTaskUser = $this->searchTablePivot($data);


        return response()->json([
            'priority' => $priority,
            'frequency' => $frequency,
            'states' => $state,
            'status' => $status,
            'tags' => $tags,
            'task' => $allTaskUser

        ]);

    }

    /**
     * Create task
     * @param Request $request
     */
    public function createTask(Request $request) 
    {
        // Validate input data from request
        $this->validate($request, [
            'name' => 'required',
            'description' => 'required',
        ]);

        if ($request->isMethod('post'))
        {
            /*// search parent_id
            //if ($request->input('parent_id') != '')
            //{
                $parent = $request->input('parent_id');
            //}

            // search frequency id
            //if ($request->input('frequency_id') != '')
            //{
                $frequency = $request->input('frequency_id');
            //}

            // search priority id
            //if ($request->input('priority_id') != '')
            //{
                $priority = $request->input('priority_id');
            //}*/
            $date_start = null;
            $date_end = null;

            if($request->input('startDate') != '')
            {
                $date_start = $request->input('startDate');
            }
            else{
                $date_start = null;
            }

            if($request->input('endDate') != '')
            {
                $date_end = $request->input('endDate');
            }
            else{
                $date_end = null;
            }

            // define data with id of collaborate
            if ($request->input('associate') != "")
            {
                $data = $request->input('associate');
            }
            else{
                $data = null;
            }

            $task = Tasks::create([
                'LISTS_id' => $request->input('LISTS_id'),
                'USERS_id' => $request->input('USERS_id'),
                'PRIORITIES_id' => $request->input('priority_id'),
                'FREQUENCY_id' => $request->input('frequency_id'),
                'id_parent' => $request->input('id_parent'),
                'name' => $request->input('name'),
                //'order' => $request->input('order'),
                'date_start' => $date_start,
                'date_end' => $date_end,
                'description' => $request->input('description'),

            ]);

            $tasksusers = Tasksusers::create([
                'USERS_id' => $request->input('USERS_id'),
                'TASKS_id' => $task->id
            ]);

            //decomment this block when receive $request->input('associate') from AJAX request add task

            if($data != "" && $data != null && $data != 0)
           {
               // id of new task create
               $idTask = $task->id;
               // add record in pivot table USERS_TASKS
               $this->addPivotTable($data, $idTask);

           }

            if ($task)
            {
                return $task;
            }
            /*
            else
            {
                return response()->json(['msg' => 'Your task is not created']);
            }*/
        }
    }

    /**
     * 
     */
    public function updateTask(Request $request)
    {

    }

    /**
     * Find a task by name of this
     */
    public function findOneTask(Request $request) 
    {
        $task = Tasks::where("name", "=", $request->input("name"))->first();

        if ($task) 
        {
            if ($task->parent_id != '') 
            {
                $parent = $this->findParentTask($task->parent_id);
            }
            
            if ($task->priority_id != '') 
            {
                $priority = $this->findPriority($task->priority_id);
            }

            if ($task->frequency_id != '') 
            {
                $frequency = $this->findFrequency($task->frequency_id);
            }
            
            return response()->json([
                'name' => $task->name,
                'author' => $task->author,
                'order' => $task->order,
                'description' => $task->description,
                'created' => $task->created_at,
                'dateDebut' => $task->start_date,
                'dateFin' => $task->end_date,
                // contains parent name of this current task
                'parent' => $parent,
                // contains an array with name of category and this associate color
                'frequency_id' => $frequency,
                'priority_id' => $priority,
            ]);
        }
        else {
            return response()->json(['msg' => 'Aucune tache n\'a été trouvée']);
        }
    }

    /**
     * 
     */
    public function removeTask($id)
    {

    }


    /**
     * @param array $data = request Object
     * @param $idTask
     * add task and user in pivot table USERS_TASK
     */
    public function addPivotTable($data,  $idTask)
    {

        for ($i=0; $i<count($data); $i++ )
        {
            $idUser = $data[$i];

            $taskUser = Tasksusers::create([
                'TASKS_id' => $idTask,
                'USERS_id' => $idUser
            ]);

        }

        //return;
    }

    /**
     * @param array $data = request Object
     * request in table pivot
     */
    public function searchTablePivot($data)
    {
        $id = $data['id'];
        $result = Tasksusers::where('USERS_id', '=', $id)->get();
        if ($result)
        {
            $query = array();
            for ($i=0; $i<count($result); $i++)
            {
                $queryResult = Tasks::where('id', "=", $result[$i]->TASKS_id)->get();
                array_push($query, $queryResult);
            }
        }

        return $query;
    }

    /**
     * Find parent of the current task
     * @param $parentId
     */
    protected function findParentTask($parentId)
    {
        $parent = Tasks::where("id", "=", $parentId)->first();
        return $parent->name;
    }

    /**
     * Find priority name and color in table Priorities
     * @param $priorityId
     * @return array $priority
     */
    protected function findPriority($priorityId)
    {
        $priority = Priorities::where("id_priority", "=", $priorityId)->first();
        return $priority;
    }

    /**
     * find frequency name in table Frequency
     * @param $frequencyId
     */
    protected function findFrequencyId($frequencyId)
    {
        $frequency = Frequency::where("id_frequency", "=", $frequencyId)->first();
        return $frequency;
    }

    /**
     * Find id task parent by name
     * @param $parentName
     */
    protected function findParentTaskId($parentName)
    {
        $parent = Tasks::where("name", "=", $parentName)->first();
        return $parent->id;
    }

    /**
     * Find id priority by name
     * @param $priorityName
     */
    protected function findPriorityId($priorityName)
    {
        $priority = Priorities::where("name", "=", $priorityName)->first();
        return $priority;
    }
    public function findTeam(Request $request)
    {

        //$frequency = $this->findTeamMate($request->input('search'));

        $name = People::where("name", "LIKE", $request->input('search').'%')->get();

        $surname = People::where("surname", "LIKE", $request->input('search').'%')->get();
        //$teszt = People::all('name'=$request->input('search'));
        //$people = People::where("id", "LIKE", "1")->first();

        //$people = (object) array_merge(( array ) $name, ( array ) $surname);
        $people = ['name' => $name, 'surname' => $surname];



        //var_dump($people);


        return response()->json($people);
        //return $people;

    }

    public function findUser(Request $request)
    {
        $people = People::where("id", "=", $request->input('search'))->first();

        return response()->json($people);
        //return $people;
    }

} //end class