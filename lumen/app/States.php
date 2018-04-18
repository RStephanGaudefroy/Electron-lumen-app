<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class States extends Model {
    protected $table = 'STATES';

    protected $fillable = ['name'];

    // Disable the automatic timestamp add by lumen
    public $timestamps = false;

    // if you are using append const MODEL = "App\Task"; in your controller
    public static $rules = [
        // Validation rules
    ];
}