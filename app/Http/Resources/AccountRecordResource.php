<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AccountRecordResource extends JsonResource
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
            'account_id' => $this->account_id,
            'type' => $this->type,
            'amount' => $this->amount,
            'comments' => $this->comments,
            'user_id' => $this->user_id,
            'member' => $this->member ? [
                'name' => $this->member?->name,
                'photo' =>  $this->member->photo?->file_name ? env('APP_URL').'/storage/members/'.$this->member->photo?->file_name : null,
            ] : $this->member,
            'staff' => $this->user->userable->name === " " ? $this->user->userable->username : $this->user->userable->name,
        ];
    }
}
