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
        Schema::create('job_details', function (Blueprint $table) {
            $table->increments('id');
           // $table->unsignedInteger('user_id');
            //$table->unsignedInteger('applicant_id');
            //$table->unsignedBigInteger('user_id');
            $table->string('title');
            $table->string('gender');
            $table->string('person');
            $table->string('skill');
            $table->string('JobRole');
            $table->string('workhour');
            $table->string('status');
            $table->string('CompanyName');
            $table->string('description');
            $table->string('responsibility');
            $table->string('location');
            $table->string('contact_info');
            $table->string('salary');
            // $table->foreign('user_id')
            //         ->references('id')
            //         ->on('users')
            //         ->onDelete('cascade');
            // $table->foreign('applicant_id')
            //         ->references('id')
            //         ->on('applicants')
            //         ->onDelete('cascade');
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
        Schema::dropIfExists('job_details');
    }
};
