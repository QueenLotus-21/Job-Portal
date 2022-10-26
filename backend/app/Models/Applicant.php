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
        'email',
        'jobTitle',
        'JobRole',
        'CompanyName',
        'CV',
    ];

    protected $table="applicants";


    public function applicantJob(){
        return $this->hasMany(job_detail::class,'job_id');
    }
    public function applicantUser(){
        return $this->belongsTo(user_detail::class,'user_id');
    }
}
