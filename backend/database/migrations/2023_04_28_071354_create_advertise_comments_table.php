<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    
    public function up(): void
    {
        Schema::create('advertise_comments', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('adv_id')->unsigned();
            $table->bigInteger('comment_id')->unsigned();
            $table->foreign('adv_id')->references('id')->on('advertises');
            $table->foreign('comment_id')->references('id')->on('comments');
            $table->timestamps();
        });
    }
    
    public function down(): void
    {
        Schema::dropIfExists('advertise_comments');
    }
};
