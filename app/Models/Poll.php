<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Poll extends Model
{
    use HasFactory, HasUuids;

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = [
        'question',
        'user_id'
    ];

    protected $hidden = [
        
    ];

    public function options(): BelongsToMany
    {
        return $this->belongsToMany(Option::class)->withPivot('count');
    }
}
