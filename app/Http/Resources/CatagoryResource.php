<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CatagoryResource extends JsonResource
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
            "catagory"=>$this->catagory,
            "created_at"=>$this->created_at->format('Y-m-d H:i:s'),
        ];
    }
}
