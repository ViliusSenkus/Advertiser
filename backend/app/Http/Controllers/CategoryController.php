<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    public function index() {
        $data = Category::with('advertise')->get();
        return $data;
    }
    
    public function singleCat($id) {
        try {
            return Category::with('advertise')->find($id);
        } catch(\Exception $e) {
            return response('Can not get such category', 500);
        }
    }

    public function search($keyword) {
        try {
            return Category::where('name', 'LIKE', '%'.$keyword.'%')->get();
        } catch(\Exception $e) {
            return response('Search error', 500);
        }
    }

    public function order($field, $order) {
        try {
            return Category::with('advertise')->orderBy($field, $order)->get();                  
        } catch(\Exception $e) {
            return response('ordering not avialable', 500);
        }
    }

    public function create(Request $request) {
        try {
            $data = new Category;

            $data->name = $request->name;
            
            $data->save();

            $data->advertise()->attach($request->categories);  
            return 'Successfully created';
        } catch(\Exception $e) {
            return response('Can not creat, server error', 500);
        }
    }

    public function edit(Request $request, $id) {
        try {
            $data = Category::find($id);

            $data->name = $request->name;
    
            $data->save();

            $data->advertise()->sync($request->advertise);

            return 'Categoryr updated successfully';
            
        } catch(\Exception $e) {
            return response('error on update ocured', 500);
        }
    }

    public function delete($id) {
        try {
            $data = Category::find($id);
            $data->advertise()->detach();
            $data->delete();
            
            return 'Deleted successfully';
        } catch(\Exception $e) {
            return response('Deletion not successfull, server error', 500);
        }
    }

}
