<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Option extends Model
{
    use HasFactory, HasUuids;

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = [
        'value',
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    public function polls(): BelongsToMany
    {
        return $this->belongsToMany(Poll::class);
    }
}
