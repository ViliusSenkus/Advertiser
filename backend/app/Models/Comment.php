<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Comment extends Model
{
    use HasFactory;

    protected $table='comments';
	protected $guarded = false;

    public function advertise() {
        return $this->hasOne(Advertise::class, 'advertise_comments', 'comment_id', 'adv_id');
    }
}
