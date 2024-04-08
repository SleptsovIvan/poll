<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\PollResource;
use App\Models\Option;
use App\Models\Poll;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;

class PollController extends Controller
{
    function show(Request $request, $id)
    {
        $user_id = $request->user()->id;
        $poll = Poll::find($id);
        if (!$poll || $poll->user_id != $user_id) {
            return response()->json([
                'error' => 'Forbidden'
            ], 403);
        }
        return new PollResource($poll);
    }

    function index(Request $request)
    {
        $user_id = $request->user()->id;
        return PollResource::collection(
            Poll::where('user_id', $user_id)->get()
        );
    }

    function store(Request $request)
    {
        $user_id = $request->user()->id;
        $request->validate([
            'question' => ['string', 'required', 'max:255'],
            'options' => ['array', 'required'],
            'options.*.value' => ['nullable', 'required'],
        ]);

        $poll = Poll::create([
            'question' => $request->question,
            'user_id' => $user_id
        ]);

        foreach ($request->options as $item) {
            $option = Option::create([
                'value' => $item['value']
            ]);

            $poll->options()->attach($option);
        }

        return response()->json([
            'success' => true
        ], 200);
    }

    function update(Request $request, $id) {
        $user_id = $request->user()->id;
        $request->validate([
            'question' => ['string', 'required', 'max:255'],
            'options' => ['array', 'required'],
            'options.*.id' => ['uuid', 'required'],
            'options.*.value' => ['nullable', 'required'],
        ]);
        
        $poll = Poll::find($id);
        if (!$poll || $poll->user_id != $user_id) {
            return response()->json([
                'error' => 'Forbidden'
            ], 403);
        }

        $sync_options_ids = [];
        $saved_options_ids = [];
        $removing_options_ids = [];
        
        $saved_options = DB::table('option_poll')
            ->select('option_id')
            ->where('poll_id', $id)
            ->get();
        
        foreach ($saved_options as $option) {
            $saved_options_ids[] = $option->option_id;
        };

        try {
            DB::beginTransaction();

            $poll->question = $request->question;
            $poll->save();

            foreach ($request->options as $item) {
                if ($option = Option::find($item['id'])) {
                    $option->value = $item['value'];
                    $option->save();
                } else {
                    $option = Option::create([
                        'value' => $item['value']
                    ]);
                }
                $sync_options_ids[] = $option->id;
            }
            
            foreach ($saved_options_ids as $id) {
                if (!in_array($id, $sync_options_ids)) {
                    $removing_options_ids[] = $id;
                }
            }

            $poll->options()->sync($sync_options_ids);
            
            if ($removing_options_ids) {
                Option::destroy($removing_options_ids);
            }

            DB::commit();

            return response()->json([
                'success' => true
            ], 200);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }   
    }

    function destroy(Request $request, $id) {
        $user_id = $request->user()->id;
        $poll = Poll::find($id);
        if (!$poll || $poll->user_id != $user_id) {
            return response()->json([
                'error' => 'Forbidden'
            ], 403);
        }
        $poll->delete();
        return response()->json([
            'success' => true
        ], 200);
    }
}
