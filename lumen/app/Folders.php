<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Laravel\Lumen\Auth\Authorizable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;

class Folders extends Model implements AuthenticatableContract, AuthorizableContract
{
    use Authenticatable, Authorizable;

    protected $table = 'FOLDERS';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'USERS_id', 'name'
    ];

    
    // Disable the automatic timestamp add by lumen
    public $timestamps = false;

    /**
     * Etablished relation for folders in list table
     */
    public function lists()
    {
        return $this->hasMany('App\List');
    }
}
