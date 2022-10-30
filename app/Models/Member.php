<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Member extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'first_name',
        'other_names',
        'last_name',
        'gender',
        'home_town',
        'ghana_card_number',
        'address',
        'phone_number',
        'alt_phone_number',
        'class_leader',
        'member_class_id',
        'status',
        'email',
        'user_id'
    ];

    public function getNameAttribute(): string
    {
        return $this->first_name.' '.$this->other_names.' '.$this->last_name;
    }

    public function memberClass (): BelongsTo
    {
        return $this->belongsTo(MemberClass::class)->withDefault([
            'name' => 'Not Assigned'
        ]);
    }

    public function user (): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function photo(): MorphOne
    {
        return $this->morphOne(Photo::class,'photoable');
    }
}
