/**
 * @apiDefine AuthHeader
 *
 * @apiHeader {String} X-Access-Token Required Access token of logged in user
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "X-Access-Token": "ZG1pdHJpLnZvcm9uaWFuc2tpQGdtYWlsLmNvbTsxNDM1NjU5NjEzMDQyOzM4NzhmMmJiMTc0YmE1MzIwNGUxZTZmYmFiYTIwYzdiZGFlNjRlZWM="
 *     }
 */

/**
 * @apiDefine SendItemPayload
 * @apiParam {String} title Item title text
 * @apiParam {String} [description] Item description text
 * @apiParam {Boolean} [isPublic=true] Is item visible for listeners
 * @apiParamExample {json} Request-Example
 *     {
 *       "title": "Basket Case",
 *       "description": "Seventh track and third single from Green Day third album, Dookie (1994).",
 *       "isPublic": true
 *     }
 */

 /**
 * @apiDefine GetItemSuccessResponse
 *
 * @apiSuccess {String} _id Unique item id
 * @apiSuccess {String} owner Artist email address
 * @apiSuccess {String} title Item title text
 * @apiSuccess {String} description Item description text
 * @apiSuccess {Boolean} isPublic Is item visible for listeners
 * @apiSuccessExample {json} Success-Response
 *     HTTP/1.1 200 OK
 *     {
 *       "_id": "T4laEftw4kF4Hjx3",
 *       "owner": "john.doe@example.com",
 *       "title": "Basket Case",
 *       "description": "Seventh track and third single from Green Day third album, Dookie (1994).",
 *       "isPublic": true
 *     }
 */

/**
 * @api {post} /items Create item
 * @apiVersion 0.0.0
 * @apiGroup Item
 * @apiName CreateItem
 * @apiPermission user
 * @apiDescription Creates new artist's item. Only artists can add items.
 *
 * @apiUse AuthHeader
 * @apiUse GetItemSuccessResponse
 * @apiUse SendItemPayload
 */

/**
 * @api {get} /items/:id Read item
 * @apiVersion 0.0.0
 * @apiGroup Item
 * @apiName ReadItem
 * @apiPermission user
 * @apiDescription Get artist's item by id.
 *
 * @apiUse AuthHeader
 * @apiUse GetItemSuccessResponse
 */

/**
 * @api {put} /items/:id Update item
 * @apiVersion 0.0.0
 * @apiGroup Item
 * @apiName UpdateItem
 * @apiPermission user
 * @apiDescription Update artist's item by id.
 *
 * @apiUse AuthHeader
 * @apiUse GetItemSuccessResponse
 * @apiUse SendItemPayload
 */

/**
 * @api {delete} /items/:id Delete item
 * @apiVersion 0.0.0
 * @apiGroup Item
 * @apiName DeleteItem
 * @apiPermission user
 * @apiDescription Delete artist's item by id.
 *
 * @apiUse AuthHeader
 *
 * @apiSuccessExample {json} Success-Response
 *     HTTP/1.1 204 OK
 */
