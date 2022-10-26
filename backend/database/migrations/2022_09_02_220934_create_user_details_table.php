<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_details', function (Blueprint $table) {

            $table->increments('id');
            $table->unsignedInteger('user_id');
            $table->string('name');
            $table->string('email')->unique();
            $table->integer('age');
            $table->string('gender');
            $table->string('level_of_education');
            $table->string('employement_status');
            $table->string('profession');
            $table->integer('phone');
            $table->string('country');
            $table->string('city');
            $table->string('univercity')->default('univercity');
            $table->string('department')->default('depatment');
            $table->string('password');
            $table->string('photo')->nullable();
            $table->string('CV')->default('Cv');
            $table->foreign('user_id')
                    ->references('id')
                    ->on('users')
                    ->onUpdate('cascade')
                    ->onDelete('cascade');
            $table->timestamp('email_verified_at')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_details');
    }
};
