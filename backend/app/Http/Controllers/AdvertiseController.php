<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Advertise;

class AdvertiseController extends Controller
{
    public function index(){
        return Advertise::all();
    }
}
