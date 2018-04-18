<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return app()->version();
});

$router->get('/user/test', function () {
    return 'Hello World';
});



/* middleware is not work
$router->group(['prefix' => 'user', 'middleware' => 'auth'], function () use ($router) {
    // Routing User operations
});*/

// User
$router->post('/user/login', ['as' => 'login', 'uses' => 'userController@userLogin']);
$router->get('logout', ['as' => 'logout', 'uses' => 'userController@userLogout']);
$router->post('/user/logout', ['as' => 'logout', 'uses' => 'userController@userLogout']);
$router->post('/user/register', ['as' => 'register', 'uses' => 'userController@userRegister']);
$router->post('update', ['as' => 'update', 'uses' => 'userController@userUpdate']);

// List
$router->post('/user/createList', ['as' =>'createlist', 'uses' => 'listController@createList']);
$router->post('/user/getList', ['as' =>'getList', 'uses' => 'listController@getList']);

// Folders
$router->get('/user/getFolder', ['as' => 'getFolder', 'uses' => 'folderController@getFolder']);
$router->post('/user/createFolder', ['as' => 'createFolder', 'uses' => 'folderController@createFolder']);

// Frequency
$router->post('/user/createFrequency', ['as' => 'createFrequency', 'uses' => 'taskController@createFrequency']);

// Priority
$router->post('/user/createPriority', ['as' => 'createPriority', 'uses' => 'taskController@createPriority']);

// Tasks
$router->post('/user/getTask', ['as' =>'getTask', 'uses' => 'taskController@getTask']);
$router->get('/user/getTaskInfo', ['as' => 'getTaskInfo', 'uses' => 'taskController@getTaskInfo']);
$router->post('/user/getTaskChild', ['as' =>'getTaskChild', 'uses' => 'taskController@getTaskChild']);

//$router->post('/user/createTask', ['middleware' => 'auth', 'uses' => 'taskController@createTask']);
$router->post('/user/createTask', ['as' => 'createTask', 'uses' => 'taskController@createTask']);
/* Routing Tasks operations
$router->post('createTask', ['as' => 'createTask', 'uses' => 'taskController@taskCreate']);
$router->post('findTask', ['as' => 'findTask', 'uses' => 'taskController@findOneTask']);*/

$router->post('/user/search/team', ['as' => 'team', 'uses' => 'taskController@findTeam']);
$router->post('/user/search/user', ['as' => 'user', 'uses' => 'taskController@findUser']);
