<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Account extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'date',
        'comments',
        'user_id'
    ];

    public function accountRecords(): HasMany
    {
        return $this->hasMany(AccountRecord::class);
    }

    public function user(): BelongsTo{
        return $this->belongsTo(User::class);
    }
}
