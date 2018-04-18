<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Laravel\Lumen\Auth\Authorizable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;

class Lists extends Model implements AuthenticatableContract, AuthorizableContract
{
    use Authenticatable, Authorizable;
    
    protected $table = 'LISTS';

    protected $fillable = [
        'FOLDERS_id', 'PRIORITIES_id', 'USERS_id', 'name', 'color', 'date_start', 'date_end'
    ];

    //protected $dates = [];
    // Disable the automatic timestamp add by lumen
    public $timestamps = false;

    public static $rules = [
        // Validation rules
    ];

    // Relationships

}
