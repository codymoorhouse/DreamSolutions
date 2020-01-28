<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function leadOn()
    {
        return $this->belongsToMany('App\Goat')->where('user_role', '=', 'L')->withTimestamps();
    }

    public function collaboratorOn()
    {
        return $this->belongsToMany('App\Goat')->where('user_role', '=', 'C')->withTimestamps();
    }

    public function goats()
    {
        return $this->belongsToMany('App\Goat');
    }
    
    // To access the permission_level as it is... something like
    //    $user->departments()->where('name', 'IT')->first()->pivot->permission_level
    // There's gotta be an easier way than this!
    public function departments()
    {
        return $this->belongsToMany('App\Department')->withPivot('permission_level')->withTimestamps();
    }

    public function permission(Department $department)
    {
        $dept = $this->belongsToMany('App\Department')->withPivot('permission_level')->find($department->id);
        return $dept ? $dept->pivot->permission_level : null;
    }

    public function leadOf()
    {
        return $this->belongsToMany('App\Department')->where('permission_level', 'T')->withTimestamps();
    }

    public function name()
    {
        return $this->first_name . " " . $this->last_name;
    }
}
