<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AccountResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'date' => $this->date,
            'comments' => $this->comments,
            'total_amount' => $this->accountRecords()->sum('amount'),
            'user_id' => $this->user_id,
            'staff' => $this->user->userable->name === " " ? $this->user->userable->username : $this->user->userable->name,
        ];
    }
}
