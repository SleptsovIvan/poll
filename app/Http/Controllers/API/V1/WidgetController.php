<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\PollResource;
use App\Models\Poll;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;

class WidgetController extends Controller
{
  function show(Request $request, $id)
  {
    $cookie = Crypt::encryptString(
      json_encode([
        'date' => Carbon::now(),
        'used' => false
      ])
    );

    return (new PollResource(
      Poll::where('id', $id)->first()
    ))->additional(['meta' => [
      'cookie' => $cookie
    ]]);
  }

  function store(Request $request)
  {
    $request->validate([
      'data.poll_id' => ['required', 'uuid'],
      'data.option_id' => ['required', 'uuid'],
      'meta.cookie' => ['required', 'string']
    ]);

    try {
      $cookie = json_decode(Crypt::decryptString($request->meta['cookie']));
    } catch (DecryptException $e) {
      return response()->json([
        'errors' => [
          $e->getMessage()
        ]
      ], 400);
    }

    if ($cookie->used) {
      return response()->json([
        'errors' => [
          'Forbidden'
        ]
      ], 403);
    }

    $poll_id = $request->data['poll_id'];
    $option_id = $request->data['option_id'];

    DB::table('option_poll')->where([
      'poll_id' => $poll_id,
      'option_id' => $option_id
    ])->increment('count');

    $cookie = Crypt::encryptString(
      json_encode([
        'date' => Carbon::now(),
        'used' => true
      ])
    );

    return (new PollResource(
      Poll::where('id', $poll_id)
        ->with('options')
        ->first()
    ))->additional(['meta' => [
      'cookie' => $cookie
    ]]);
  }
}
