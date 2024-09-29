<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\BlogResource;
use App\Http\Resources\CatagoryResource;
use App\Http\Resources\TagResource;
use App\Models\Blog;
use App\Models\Catagory;
use App\Models\Tag;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function show_blog(Request $request, $id)
    {
        $result = Blog::with(['catagory','tag','user'])->findOrFail($id); 
        return response(compact('result'));
    }

    
    public function show_feeds()
    {
        
        return BlogResource::collection(
            Blog::query()->orderBy('id', 'desc')->paginate(10)
        );
    }

    
    public function author_feeds($id)
    {
        $data = Blog::orderBy('created_at','desc')->with('user')->get()->groupBy('user_id')->get($id);

        return response(compact('data'));
    }


    public function catagory_feeds($id)
    {
        $data = Blog::orderBy('created_at','desc')->with(['catagory'])->get()->groupBy('catagory_id')->get($id);

        return response(compact('data'));
    }

    
    public function tag_feeds($id)
    {
        $data = Tag::with(['blog'])->get()->get($id-1);     
        return response(compact('data'));
    }

    
    public function search_tag($search)
    {
        $data = Tag::where(function($query) use ($search){
            $query->where('tag','like',"$search%");
        })->get();

        return response(compact('data'));     

    }

    
    public function search_catagory($search)
    {
        $data = Catagory::where(function($query) use ($search){
            $query->where('catagory','like',"$search%");
        })->get();

        return response(compact('data'));
    }

}
