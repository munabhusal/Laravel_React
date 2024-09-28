<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBlogRequest;
use App\Http\Requests\UpdateBlogRequest;
use App\Http\Resources\BlogResource;
use App\Models\Blog;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Str;


class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return BlogResource::collection(
            Blog::query()->orderBy('id', 'desc')->paginate(10)
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBlogRequest $request)
    {
        $data =  $request->validated();
        $data['slug']= str_replace(' ', '', Str::lower($request->title));
        $data['user_id'] = Auth::user()->id;

        if($request->image != ''){
            $img = $request->file('image');
            $name_img = time().'.'.$img->getClientOriginalExtension();
            $img->move('image/', $name_img);

            $data['image'] = $name_img;

        }else{
        $data['image'] = 'default.jpg';
        }

        $blog = Blog::create($data);
        $blog->tag()->attach($request->tag);

        return response(new BlogResource($blog));
    }

    /**
     * Display the specified resource.
     */
    public function show(Blog $blog)
    {
        $result = Blog::with(['catagory','tag','user'])->findOrFail($blog->id); 
        return response(compact('result'));


        // return new BlogResource($blog);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBlogRequest $request, Blog $blog)
    {        
        $data =  $request->validated();
        $data['slug']= str_replace(' ', '', Str::lower($request->title));
        $data['image'] = Str::random(10);
        $data['user_id'] = Auth::user()->id;

        $blog->update($data);

        $blog->tag()->detach($blog->tag);

        $blog->tag()->attach($request->tag);

        return new BlogResource($blog);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Blog $blog)
    {
        $blog->delete();
        $blog->tag()->detach($blog->tag);

        return response("", 204);
    }

    public function mypost(Request $request)
    {
        // $data = Blog::with(['catagory','tag','user'])->get()->groupBy('user_id')->get(Auth::id());
        $data = Blog::orderBy('created_at','desc')->with(['catagory','tag','user'])->get()->groupBy('user_id')->get(Auth::id());

        return response(compact('data'));
    }

    public function getMyPostWithId(Request $request, $id)
    {
        $data = Blog::where('id',$id)->with(['catagory','tag','user'])->first();
        return response(compact('data'));
    }
} 
