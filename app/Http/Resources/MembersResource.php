<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class MembersResource extends JsonResource
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
            'name' => $this->name,
            'first_name' => $this->first_name,
            'other_names' => $this->other_names,
            'last_name' => $this->last_name,
            'home_town' => $this->home_town,
            'gender' => $this->gender,
            'email' => $this->email,
            'ghana_card_number' => $this->ghana_card_number,
            'address' => $this->address,
            'class_leader' => $this->class_leader,
            'phone_number' => $this->phone_number,
            'alt_phone_number' => $this->alt_phone_number,
            'member_class_id' => $this->member_class_id,
            'member_class' => [
                'name' => $this->memberClass->name
            ],
            'status' => $this->status,
            'user_id' => $this->user_id,
            'user' => $this->user,
        ];
    }
}
