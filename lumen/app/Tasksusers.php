<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class Tasksusers extends Model
{

    protected $table = 'USERS_TASKS';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'USERS_id', 'TASKS_id'
    ];


    // Disable the automatic timestamp add by lumen
    public $timestamps = false;


}