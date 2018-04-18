<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Laravel\Lumen\Auth\Authorizable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;

class User extends Model implements AuthenticatableContract, AuthorizableContract
{
    use Authenticatable, Authorizable;

    protected $table = 'USERS';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'PEOPLE_id', 'STATUS_id', 'TYPES_id', 'email', 'password', 'date_creation'
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'date_creation'
    ];

    // Disable the automatic timestamp add by lumen
    public $timestamps = false;

    /**
     * Etablished relation 1:n for users in task table
     */
    public function tasks()
    {
        return $this->hasMany('App\Task');
    }

    /**
     * The name of the "created at" column.
     *
     * @var string
     */
    const CREATED_AT = 'date_creation';

    /**
     * The name of the "updated at" column.
     *
     * @var string
     */
    const UPDATED_AT = 'date_update';
}
