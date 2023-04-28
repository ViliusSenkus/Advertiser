<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class Advertise extends Model
{
    use HasFactory;

    protected $table='advertises';
	protected $guarded = false;
}
