# API Documentation

## Overview

This API provides endpoints for managing Unity Objects, Trainings, Sessions, and Activities. It supports CRUD operations for each entity, allowing you to create, read, update, and delete resources.

## Base URL
`<host>:<port>/api/v1/[...]`

---

## Endpoints

### Health Check

- **GET /health**
  - **Description:** Check the health of the API.
  - **Response:**
    - **Status Code:** 200 OK

---

### Unity Objects

#### Create a Unity Object

- **POST /unityObjects**
  - **Description:** Create a new Unity Object.
  - **Request Body:**
    ```json
    {
      "name": "Glasses",
      "type": "Head",
      "posX": 10.0,
      "posY": 20.0,
      "posZ": 5.0
    }
    ```
  - **Response:**
    - **Status Code:** 201 Created
    - **Body:** Returns the created Unity Object.

#### List All Unity Objects

- **GET /unityObjects**
  - **Description:** Retrieve a list of all Unity Objects.
  - **Response:**
    - **Status Code:** 200 OK
    - **Body:** Returns an array of Unity Objects.

#### Get a Unity Object by ID

- **GET /unityObjects/{id}**
  - **Description:** Retrieve a Unity Object by its ID.
  - **Path Parameters:**
    - `id` (integer) - The ID of the Unity Object.
  - **Response:**
    - **Status Code:** 200 OK
    - **Body:** Returns the Unity Object with the specified ID.

#### Update a Unity Object by ID

- **PUT /unityObjects/{id}**
  - **Description:** Update a Unity Object by its ID.
  - **Request Body:**
    ```json
    {
      "name": "Helmet",
      "type": "Head",
      "posX": 10.0,
      "posY": 20.0,
      "posZ": 5.0
    }
    ```
  - **Path Parameters:**
    - `id` (integer) - The ID of the Unity Object.
  - **Response:**
    - **Status Code:** 200 OK
    - **Body:** Returns the updated Unity Object.

#### Delete a Unity Object by ID

- **DELETE /unityObjects/{id}**
  - **Description:** Delete a Unity Object by its ID.
  - **Path Parameters:**
    - `id` (integer) - The ID of the Unity Object.
  - **Response:**
    - **Status Code:** 204 No Content

---

### Trainings

#### Create a Training

- **POST /training**
  - **Description:** Create a new Training.
  - **Request Body:**
    ```json
    {
      "name": "New Training",
      "description": "Details about the training",
      "unityObjectIds": [1, 2]
    }
    ```
  - **Response:**
    - **Status Code:** 201 Created
    - **Body:** Returns the created Training.

#### List All Trainings

- **GET /training**
  - **Description:** Retrieve a list of all Trainings.
  - **Response:**
    - **Status Code:** 200 OK
    - **Body:** Returns an array of Trainings.

#### Get a Training by ID

- **GET /training/{id}**
  - **Description:** Retrieve a Training by its ID.
  - **Path Parameters:**
    - `id` (integer) - The ID of the Training.
  - **Response:**
    - **Status Code:** 200 OK
    - **Body:** Returns the Training with the specified ID.

#### Update a Training by ID

- **PUT /training/{id}**
  - **Description:** Update a Training by its ID.
  - **Request Body:**
    ```json
    {
      "name": "Updated Training",
      "description": "Updated details about the training",
      "unityObjectIds": [1, 3]
    }
    ```
  - **Path Parameters:**
    - `id` (integer) - The ID of the Training.
  - **Response:**
    - **Status Code:** 200 OK
    - **Body:** Returns the updated Training.

#### Delete a Training by ID

- **DELETE /training/{id}**
  - **Description:** Delete a Training by its ID.
  - **Path Parameters:**
    - `id` (integer) - The ID of the Training.
  - **Response:**
    - **Status Code:** 204 No Content

---

### Sessions

#### Create a Session

- **POST /session**
  - **Description:** Create a new Session.
  - **Request Body:**
    ```json
    {
      "code": "ABC123",
      "trainingId": 1
    }
    ```
  - **Response:**
    - **Status Code:** 201 Created
    - **Body:** Returns the created Session.

#### List All Sessions

- **GET /session**
  - **Description:** Retrieve a list of all Sessions.
  - **Response:**
    - **Status Code:** 200 OK
    - **Body:** Returns an array of Sessions.

#### Get a Session by ID

- **GET /session/{id}**
  - **Description:** Retrieve a Session by its ID.
  - **Path Parameters:**
    - `id` (integer) - The ID of the Session.
  - **Response:**
    - **Status Code:** 200 OK
    - **Body:** Returns the Session with the specified ID.

#### Get a Session by Code

- **GET /session/code/{code}**
  - **Description:** Retrieve a Session by its Code.
  - **Path Parameters:**
    - `code` (string) - The code of the Session.
  - **Response:**
    - **Status Code:** 200 OK
    - **Body:** Returns the Session with the specified Code.

#### Update a Session by ID

- **PUT /session/{id}**
  - **Description:** Update a Session by its ID.
  - **Request Body:**
    ```json
    {
      "code": "SESSION12346",
      "trainingId": 2
    }
    ```
  - **Path Parameters:**
    - `id` (integer) - The ID of the Session.
  - **Response:**
    - **Status Code:** 200 OK
    - **Body:** Returns the updated Session.

#### Delete a Session by ID

- **DELETE /session/{id}**
  - **Description:** Delete a Session by its ID.
  - **Path Parameters:**
    - `id` (integer) - The ID of the Session.
  - **Response:**
    - **Status Code:** 204 No Content

---

### Activities

#### Create an Activity

- **POST /activities**
  - **Description:** Create a new Activity.
  - **Request Body:**
    ```json
    {
      "name": "HOLD",
      "posX": 10.0,
      "posY": 20.0,
      "posZ": 5.0,
      "unityObjectId": 2,
      "sessionId": 5
    }
    ```
  - **Response:**
    - **Status Code:** 201 Created
    - **Body:** Returns the created Activity.

#### List All Activities

- **GET /activities**
  - **Description:** Retrieve a list of all Activities.
  - **Response:**
    - **Status Code:** 200 OK
    - **Body:** Returns an array of Activities.

#### List All Activities by Session ID

- **GET /activities/session/{id}**
  - **Description:** Retrieve a list of all Activities by a Session.
  - **Response:**
    - **Status Code:** 200 OK
    - **Body:** Returns an array of Activities.

#### Get an Activity by ID

- **GET /activities/{id}**
  - **Description:** Retrieve an Activity by its ID.
  - **Path Parameters:**
    - `id` (integer) - The ID of the Activity.
  - **Response:**
    - **Status Code:** 200 OK
    - **Body:** Returns the Activity with the specified ID.

#### Update an Activity by ID

- **PUT /activities/{id}**
  - **Description:** Update an Activity by its ID.
  - **Request Body:**
    ```json
    {
      "name": "HOLD",
      "posX": 15.0,
      "posY": 25.0,
      "posZ": 35.0,
      "unityObjectId": 2,
      "sessionId": 5
    }
    ```
  - **Path Parameters:**
    - `id` (integer) - The ID of the Activity.
  - **Response:**
    - **Status Code:** 200 OK
    - **Body:** Returns the updated Activity.

#### Delete an Activity by ID

- **DELETE /activities/{id}**
  - **Description:** Delete an Activity by its ID.
  - **Path Parameters:**
    - `id` (integer) - The ID of the Activity.
  - **Response:**
    - **Status Code:** 204 No Content

---

## Models

### UnityObject

- **id**: integer (readonly) - The unique identifier of the Unity Object.
- **name**: string - The name of the Unity Object.
- **type**: string - The type of the Unity Object.
- **posX**: float - The X coordinate position.
- **posY**: float - The Y coordinate position.
- **posZ**: float - The Z coordinate position.

### Training

- **id**: integer (readonly) - The unique identifier of the Training.
- **name**: string - The name of the Training.
- **description**: string - A description of the Training.
- **createdAt**: string (ISO 8601) - The date and time when the Training was created.
- **unityObjects**: array of UnityObject - The list of Unity Objects associated with the Training.

### Session

- **id**: integer (readonly) - The unique identifier of the Session.
- **code**: string - The unique code of the Session.
- **createdAt**: string (ISO 8601) - The date and time when the Session was created.
- **training**: Training - The Training associated with the Session.
- **trainingId**: integer - The ID of the Training associated with the Session.
- **Activity**: array of Activity - The list of Activities associated with the Session.

### Activity

- **id**: integer (readonly) - The unique identifier of the Activity.
- **name**: string - Activity name.
- **posX**: float - The X coordinate position.
- **posY**: float - The Y coordinate position.
- **posZ**: float - The Z coordinate position.
- **createdAt**: string (ISO 8601) - The date and time when the Activity was created.
- **unityObject**: UnityObject - The Unity Object associated with the Activity.
- **unityObjectId**: integer - The ID of the Unity Object associated with the Activity.
- **session**: Session - The Session associated with the Activity.
- **sessionId**: integer - The ID of the Session associated with the Activity.
