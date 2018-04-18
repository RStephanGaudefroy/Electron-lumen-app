<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Frequency extends Model {

    protected $table = 'FREQUENCY';
    
    protected $fillable = ['name'];

    // Disable the automatic timestamp add by lumen
    public $timestamps = false;

    public static $rules = [
        // Validation rules
    ];

    // Relationships

}
