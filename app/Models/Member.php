<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Member extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'first_name',
        'other_names',
        'last_name',
        'home_town',
        'nearest_landmark',
        'phone_number',
        'alt_phone_number',
        'member_class_id',
        'status',
        'user_id'
    ];

    public function memberClass (): BelongsTo
    {
        return $this->belongsTo(MemberClass::class);
    }

    public function user (): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
