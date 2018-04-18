<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Laravel\Lumen\Auth\Authorizable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;

class Tasks extends Model implements AuthenticatableContract, AuthorizableContract
{
    use Authenticatable, Authorizable;

    protected $table = 'TASKS';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'LISTS_id', 'USERS_id', 'PRIORITIES_id', 'FREQUENCY_id', 'USERS_TASKS_id', 'TAGS_TASKS_id', 'ADRESS_id',
        'STATES_id', 'id_parent', 'name', 'order','date_update', 'date_start', 'date_end', 'description'
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        //'password',
    ];

    // Disable the automatic timestamp add by lumen
    public $timestamps = false;

    /**
     * Etablished relation 1:n for users in task table
     */
    /*public function tasks()
    {
        return $this->hasMany('App\Task');
    }*/
}
