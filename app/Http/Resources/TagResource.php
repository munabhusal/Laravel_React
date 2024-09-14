<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TagResource extends JsonResource
{
    public static $wrap = false;

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
            "tag"=>$this->tag,
            "created_at"=>$this->created_at->format('Y-m-d H:i:s'),
        ];
    }
}
