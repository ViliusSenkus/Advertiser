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

    public function category() {
        return $this->belongsToMany(Category::class, 'advertise_categories', 'adv_id', 'category_id');
    }
    public function comments() {
        return $this->belongsToMany(Comment::class, 'advertise_comments', 'adv_id', 'comment_id');
    }
}