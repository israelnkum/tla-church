<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Account extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'date',
        'comments',
        'account_record_id', 
        'user_id'
    ];

    public function accountRecord(): BelongsTo
    {
        return $this->belongsTo(AccountRecord::class);
    }

    public function user(): BelongsTo{
        return $this->belongsTo(User::class);
    }
}
