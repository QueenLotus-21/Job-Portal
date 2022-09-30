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
            $table->id();

            $table->string('title');
            $table->string('gender');
            $table->string('person');
            $table->string('skill');
            $table->string('role');
            $table->string('workhour');
            $table->string('status');
            $table->string('name');
            $table->string('description');
            $table->string('responsibility');
            $table->string('location');
            $table->string('contact_info');
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