<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Status extends Model {
    protected $table = 'STATUS';

    protected $fillable = ['name'];

    // Disable the automatic timestamp add by lumen
    public $timestamps = false;

    // if you are using append const MODEL = "App\Task"; in your controller
    public static $rules = [
        // Validation rules
    ];
}