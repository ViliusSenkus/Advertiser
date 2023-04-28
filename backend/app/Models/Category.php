<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    use HasFactory;

    protected $table='categories';
	protected $guarded = false;
    
    public function advertise() {
        return $this->belongsToMany(Advertise::class, 'advertise_categories', 'category_id', 'adv_id');
    }
}
