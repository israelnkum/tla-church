<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class MemberClass extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
      'name', 'member_id', 'user_id'
    ];

    public function members(): HasMany
    {
        return $this->hasMany(Member::class);
    }
}
