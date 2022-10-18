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
        'user_id',
        'name',
       'location',
       'description',
        'gender',
        'skill',
        'contact_info',
        'role',
        'status',
        'responsibility',
        'title',
        'person',
        'workhour',
    ];
    protected $table ="job_details";


    public function users(){
        return $this->belongsTo(user_detail::class,'user_id');
    }

    public function applicantDetail(){
        return $this->belongsTo(Applicant::class,'applicant_id');
    }

}
