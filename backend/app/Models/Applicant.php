<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Applicant extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'job_id',
        'userName',
        'userEmail',
        'jobTitle',
        'role',
        'name',
        'image',
    ];

    protected $table="applicants";


    public function applicantJob(){
        return $this->hasMany(job_detail::class,'applicant_id');
    }
    public function applicantUser(){
        return $this->belongsTo(user_detail::class,'user_id');
    }
}
