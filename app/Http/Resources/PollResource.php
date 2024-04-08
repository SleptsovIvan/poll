<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PollResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'type' =>  $request->routeIs('widget.polls.store') ? 'poll_result' : 'poll',
            'question' => $this->question,
            'created_at' => $this->created_at,
            'options' => OptionResource::collection($this->options)
        ];
    }
}
