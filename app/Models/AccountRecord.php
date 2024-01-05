<?php

namespace App\Models;

use App\Enums\AccountRecordType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class AccountRecord extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'account_id',
        'type',
        'amount',
        'comments',
        'member_id',
        'user_id',
    ];

    protected $casts = [
        'type' => AccountRecordType::class
    ];

    public function account(): BelongsTo
    {
        return $this->belongsTo(Account::class);
    }

    public function user(): BelongsTo{
        return $this->belongsTo(User::class);
    }

    public function member(): BelongsTo{
        return $this->belongsTo(Member::class)->withDefault(null);
    }
}
