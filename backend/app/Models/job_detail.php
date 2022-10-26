<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;

class job_detail extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    protected $fillable = [
        'CompanyName',
       'location',
       'description',
        'gender',
        'skill',
        'contact_info',
        'JobRole',
        'status',
        'responsibility',
        'title',
        'salary',
        'person',
        'workhour',
    ];
    protected $table ="job_details";



    public function applicantDetail(){
        return $this->belongsTo(Applicant::class,'job_id');
    }

}
