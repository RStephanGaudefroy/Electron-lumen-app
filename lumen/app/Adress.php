<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Laravel\Lumen\Auth\Authorizable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;

class Adress extends Model implements AuthenticatableContract, AuthorizableContract
{
    use Authenticatable, Authorizable;

    protected $table = 'ADRESS';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'pathway_number', 'pathway_type', 'pathway_name', 'complement', 'code', 'city', 'country'
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
    public function tasks()
    {
        return $this->hasMany('App\Task');
    }
}
