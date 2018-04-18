<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTasksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->increments('id_task');
            $table->int('list_id');
            $table->string('name', 45);
            $table->string('author', 45);
            $table->tinyInt('order', 45);
            $table->int('priority_id');
            $table->int('frequency_id');
            $table->timestamps('created_at');
            $table->date('start_date');
            $table->date('end_date');
            $table->string('description', 255);
            $table->int('parent_id');
            $table->int('users_task_id');
            $table->int('discussion_id');
            $table->int('tags_task_id');

            $table->foreign('list_id')->references('id_list')->on('lists');
            $table->foreign('priority_id')->references('id_prority')->on('priorities');
            $table->foreign('frequency_id')->references('id_frequency')->on('frequencies');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tasks');
    }
}
