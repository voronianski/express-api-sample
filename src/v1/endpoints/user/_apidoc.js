/**
 * @apiDefine UserSuccessAuthResponseObject
 *
 * @apiSuccess {String} accessToken Unique accessToken for requesting private data
 * @apiSuccess {Object} user User profile information
 * @apiSuccess {String} user.email User email
 * @apiSuccess {String} user.firstName User first name
 * @apiSuccess {String} user.lastName User last name
 * @apiSuccess {String="artist","listener"} user.role User role
 * @apiSuccessExample {json} Success-Response
 *     HTTP/1.1 200 OK
 *     {
 *       "accessToken": "ZG1tbTJAZXhhbXBsZS5jb207MTQzNTE0NzYyOTAxNjs1Yzc0MTdmNmM3MGQ2MmYzMjFhNWE4NGYwODQ5ZmU5NTM1Nzg5NTE2",
 *       "user": {
 *          "email": "john.doe@example.com",
 *          "firstName": "John",
 *          "lastName": "Doe",
 *          "role": "artist"
 *       }
 *     }
 */

/**
 * @api {post} /user/signup Signup User
 * @apiVersion 0.0.0
 * @apiGroup User
 * @apiName SignupUser
 * @apiPermission public
 * @apiDescription Adds new user with role "artist" or "listener" to database and sends welcome email
 *
 * @apiUse UserSuccessAuthResponseObject
 *
 * @apiParam {String} email Required User email
 * @apiParam {String} password Required User password
 * @apiParam {String} firstName Required User first name
 * @apiParam {String} lastName Required User last name
 * @apiParam {String="artist","listener"} role Required User role
 * @apiParamExample {json} Request-Example
 *     {
 *       "email": "john.doe@example.com",
 *       "password": "qwerty",
 *       "firstName": "John",
 *       "lastName": "Doe",
 *       "role": "artist"
 *     }
 */

/**
 * @api {post} /user/login Login User
 * @apiVersion 0.0.0
 * @apiGroup User
 * @apiName LoginUser
 * @apiPermission public
 * @apiDescription Logins already created user.
 *
 * @apiUse UserSuccessAuthResponseObject
 *
 * @apiParam {String} email Required User email
 * @apiParam {String} password Required User password
 * @apiParamExample {json} Request-Example
 *     {
 *       "email": "john.doe@example.com",
 *       "password": "qwerty"
 *     }
 */

/**
 * @api {get} /me Get User
 * @apiVersion 0.0.0
 * @apiGroup User
 * @apiName GetUser
 * @apiPermission public
 * @apiDescription Returns authenticated user info.
 *
 * @apiUse UserSuccessAuthResponseObject
 *
 */
