<?php

namespace App\Http\Controllers\API\V1\Swagger;

use App\Http\Controllers\Controller;

/**
 *
 * @OA\Post(
 *      path="/api/poll",
 *      summary="Выбор ответа",
 *      tags={"Widget poll"},
 *      @OA\RequestBody(
 *          @OA\JsonContent(
 *              allOf={
 *                  @OA\Schema(
 *                      @OA\Property(property="poll_id", type="string", format="uuid", example="69a6c62c-19cf-4977-bd96-ca4064ade088"),
 *                      @OA\Property(property="option_id", type="string", format="uuid", example="69a6c62c-19cf-4977-bd96-ca4064ade088"),
 *                  ),
 *              },
 *          ),
 *      ),
 *      @OA\Response(
 *          response=200,
 *          description="Ok",
 *          @OA\JsonContent(
 *              @OA\Property(property="success", type="boolean", example="true"),
 *          ),
 *      ),
 * ),
 * 
 * @OA\Get(
 *      path="/api/polls/{id}",
 *      summary="Опрос",
 *      tags={"Widget poll"},
 *      @OA\Parameter(
 *          description="ID опроса",
 *          in="path",
 *          name="id",
 *          required=true,
 *          example="69a6c62c-19cf-4977-bd96-ca4064ade088"
 *      ),
 *      @OA\Response(
 *          response=200,
 *          description="Ok",
 *          @OA\JsonContent(  
 *              @OA\Property(property="data", type="array", @OA\Items(
 *                  @OA\Property(property="id", type="string", format="uuid", example="69a6c62c-19cf-4977-bd96-ca4064ade088"),
 *                  @OA\Property(property="type", type="string", example="poll"),
 *                  @OA\Property(property="question", type="string", example="Some question"),
 *                  @OA\Property(property="options", type="array", @OA\Items(
 *                      @OA\Property(property="id", type="string", format="uuid", example="69a6c62c-19cf-4977-bd96-ca4064ade088"),
 *                      @OA\Property(property="count", type="integer", example="0"),
 *                      @OA\Property(property="value", example="Some option", oneOf={
 *                     	    @OA\Schema(type="string"),
 *                     	    @OA\Schema(type="integer"),
 *                      }))
 *                  ),
 *              )),
 *          ),
 *      ),
 * ),
 *
 */

class WidgetController extends Controller
{
    //
}
