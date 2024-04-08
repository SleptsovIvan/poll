<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OptionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $resource = [
            'id' => $this->id,
            'value' => $this->value,
            'count' => $this->pivot->count
        ];

        if ($request->routeIs('widget.*')) {
            $resource['counter'] = [
                'time' => null,
                'value' => 0,
                'percent' => 0
            ];
        }

        return $resource;
    }
}
