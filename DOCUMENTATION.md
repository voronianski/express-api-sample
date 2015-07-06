# Express API Sample Documentation v0.0.0

Sample API ready to be used in different client app boilerplates and playgrounds.

- [Item](#item)
	- [Create item](#create-item)
	- [Delete item](#delete-item)
	- [Read item](#read-item)
	- [Update item](#update-item)
	
- [User](#user)
	- [Get User](#get-user)
	- [Get User Items](#get-user-items)
	- [Login User](#login-user)
	- [Signup User](#signup-user)
	


# Item

## Create item

<p>Creates new artist's item. Only artists can add items.</p> 

	POST /items

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| X-Access-Token			| String			|  <p>Required Access token of logged in user</p> 							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| title			| <p>String</p> 			|  <p>Item title text</p> 							|
| description			| <p>String</p> 			| **optional** <p>Item description text</p> 							|
| isPublic			| <p>Boolean</p> 			| **optional** <p>Is item visible for listeners</p> 							|

### Success Response

Success-Response

```
HTTP/1.1 200 OK
{
  "_id": "T4laEftw4kF4Hjx3",
  "owner": "john.doe@example.com",
  "title": "Basket Case",
  "description": "Seventh track and third single from Green Day third album, Dookie (1994).",
  "isPublic": true
}
```
## Delete item

<p>Delete artist's item by id.</p> 

	DELETE /items/:id

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| X-Access-Token			| String			|  <p>Required Access token of logged in user</p> 							|

### Success Response

Success-Response

```
HTTP/1.1 204 OK
```
## Read item

<p>Get artist's item by id.</p> 

	GET /items/:id

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| X-Access-Token			| String			|  <p>Required Access token of logged in user</p> 							|

### Success Response

Success-Response

```
HTTP/1.1 200 OK
{
  "_id": "T4laEftw4kF4Hjx3",
  "owner": "john.doe@example.com",
  "title": "Basket Case",
  "description": "Seventh track and third single from Green Day third album, Dookie (1994).",
  "isPublic": true
}
```
## Update item

<p>Update artist's item by id.</p> 

	PUT /items/:id

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| X-Access-Token			| String			|  <p>Required Access token of logged in user</p> 							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| title			| <p>String</p> 			|  <p>Item title text</p> 							|
| description			| <p>String</p> 			| **optional** <p>Item description text</p> 							|
| isPublic			| <p>Boolean</p> 			| **optional** <p>Is item visible for listeners</p> 							|

### Success Response

Success-Response

```
HTTP/1.1 200 OK
{
  "_id": "T4laEftw4kF4Hjx3",
  "owner": "john.doe@example.com",
  "title": "Basket Case",
  "description": "Seventh track and third single from Green Day third album, Dookie (1994).",
  "isPublic": true
}
```
# User

## Get User

<p>Returns authenticated user info.</p> 

	GET /user/me


### Success Response

Success-Response

```
HTTP/1.1 200 OK
{
  "accessToken": "ZG1tbTJAZXhhbXBsZS5jb207MTQzNTE0NzYyOTAxNjs1Yzc0MTdmNmM3MGQ2MmYzMjFhNWE4NGYwODQ5ZmU5NTM1Nzg5NTE2",
  "user": {
     "email": "john.doe@example.com",
     "firstName": "John",
     "lastName": "Doe",
     "role": "artist"
  }
}
```
## Get User Items

<p>Returns user with role &quot;artist&quot; created items.</p> 

	GET /user/items


### Success Response

Success-Response

```
HTTP/1.1 200 OK
[{
  "_id": "T4laEftw4kF4Hjx3",
  "owner": "john.doe@example.com",
  "title": "Basket Case",
  "description": "Seventh track and third single from Green Day third album, Dookie (1994).",
  "isPublic": true
}]
```
## Login User

<p>Logins already created user.</p> 

	POST /user/login


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| email			| <p>String</p> 			|  <p>Required User email</p> 							|
| password			| <p>String</p> 			|  <p>Required User password</p> 							|

### Success Response

Success-Response

```
HTTP/1.1 200 OK
{
  "accessToken": "ZG1tbTJAZXhhbXBsZS5jb207MTQzNTE0NzYyOTAxNjs1Yzc0MTdmNmM3MGQ2MmYzMjFhNWE4NGYwODQ5ZmU5NTM1Nzg5NTE2",
  "user": {
     "email": "john.doe@example.com",
     "firstName": "John",
     "lastName": "Doe",
     "role": "artist"
  }
}
```
## Signup User

<p>Adds new user with role &quot;artist&quot; or &quot;listener&quot; to database and sends welcome email</p> 

	POST /user/signup


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| email			| <p>String</p> 			|  <p>Required User email</p> 							|
| password			| <p>String</p> 			|  <p>Required User password</p> 							|
| firstName			| <p>String</p> 			|  <p>Required User first name</p> 							|
| lastName			| <p>String</p> 			|  <p>Required User last name</p> 							|
| role			| <p>String</p> 			|  <p>Required User role</p> 							|

### Success Response

Success-Response

```
HTTP/1.1 200 OK
{
  "accessToken": "ZG1tbTJAZXhhbXBsZS5jb207MTQzNTE0NzYyOTAxNjs1Yzc0MTdmNmM3MGQ2MmYzMjFhNWE4NGYwODQ5ZmU5NTM1Nzg5NTE2",
  "user": {
     "email": "john.doe@example.com",
     "firstName": "John",
     "lastName": "Doe",
     "role": "artist"
  }
}
```

