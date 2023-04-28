<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Advertise;

class AdvertiseController extends Controller
{
    public function index() {
        $data = Advertise::with('category')->get();
        return $data;
    }
    
    public function singleAdv($id) {
        try {
            return Advertise::with('category')->find($id);
        } catch(\Exception $e) {
            return response('Can not get such advertise', 500);
        }
    }

    public function search($keyword) {
        try {
            return Advertise::where('name', 'LIKE', '%'.$keyword.'%')->get();
        } catch(\Exception $e) {
            return response('Search error', 500);
        }
    }

    public function order($field, $order) {
        try {
            return Advertise::with('categories')->orderBy($field, $order)->get();                  
        } catch(\Exception $e) {
            return response('ordering not avialable', 500);
        }
    }

    public function create(Request $request) {
        try {
            $data = new Advertise;

            $data->name = $request->name;
            $data->description = $request->description;
            $data->price = $request->price;
            $data->photo = $request->photo;
            $data->city = $request->city;
            
            $data->save();

            $data->category()->attach($request->categories);  
            return 'Successfully created';
        } catch(\Exception $e) {
            return response('Can not creat, server error', 500);
        }
    }

    public function edit(Request $request, $id) {
        try {
            $data = Advertise::find($id);

            $data->name = $request->name;
            $data->description = $request->description;
            $data->price = $request->price;
            $data->photo = $request->photo;
            $data->city = $request->city;
    
            $data->save();

            $data->category()->sync($request->categories);

            return 'Advertiser updated successfully';
            
        } catch(\Exception $e) {
            return response('error on update ocured', 500);
        }
    }

    public function delete($id) {
        try {
            $data = Advertise::find($id);
            $data->category()->detach();
            $data->delete();
            
            return 'Deleted successfully';
        } catch(\Exception $e) {
            return response('Deletion not successfull, server error', 500);
        }
    }
}
