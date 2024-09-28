<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BlogResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);

        return[
            "id"=>$this->id,
            "title"=>$this->title,
            "slug"=>$this->slug,
            "body"=>$this->body,
            "image"=>$this->image,
            "status"=>$this->status,
            "user_id"=>$this->user_id,
            "catagory_id"=>$this->catagory_id,
            "created_at"=>$this->created_at->format('Y-m-d H:i:s'),

        ];
    }
}
