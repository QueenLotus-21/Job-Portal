<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Applicant extends Model
{
    use HasFactory;

    protected $fillable = [

        'userName',
        'userEmail',
        'jobTitle',
        'role',
        'name',
        'image',
    ];

    protected $table="applicants";

}
