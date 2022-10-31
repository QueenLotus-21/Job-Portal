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
        Schema::create('applicants', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('user_id');
            $table->unsignedInteger('job_id');
            $table->string('userName');
            $table->string('email');
            $table->string('jobTitle');
            $table->string('JobRole');
            $table->string('CompanyName');
            $table->mediumText('CV')->nullable();
            $table->foreign('user_id')
                    ->references('id')
                    ->on('user_details')
                    ->onUpdate('cascade')
                    ->onDelete('cascade');
            $table->foreign('job_id')
                    ->references('id')
                    ->on('job_details')
                    ->onUpdate('cascade')
                    ->onDelete('cascade');
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
        Schema::dropIfExists('applicants');
    }
};
