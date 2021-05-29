# Auth0 X NestJS

Project to test integration between Auth0 and NestJS framework, also having a frontend to test roles and permissions.

## Features

- Auth0 register and login
- Auth0 [RBAC](https://en.wikipedia.org/wiki/Role-based_access_control)
- Notes C.R.U.D
- Admin support

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

| Name                        | Description                                                                                                                                                                         |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `AUTH0_DOMAIN`              | Go to [manage.auth0.com](https://manage.auth0.com/) > Applications > APIs > Select your previously created API > Quick Start > Select Node.js tab. Should look something like this: |
|                             | ![Auth0 Domain](https://i.imgur.com/2e9JXsD.png)                                                                                                                                    |
| `AUTH0_AUDIENCE`            | Go to [manage.auth0.com](https://manage.auth0.com/) > Applications > APIs > Select your previously created API > Settings. Should look something like this:                         |
|                             | ![Auth0 Audience](https://i.imgur.com/BsyUeei.png)                                                                                                                                  |
| `REACT_APP_AUTH0_DOMAIN`    | Same as `AUTH0_DOMAIN`                                                                                                                                                              |
| `REACT_APP_AUTH0_AUDIENCE`  | Same as `AUTH0_AUDIENCE`                                                                                                                                                            |
| `REACT_APP_AUTH0_CLIENT_ID` | Go to [manage.auth0.com](https://manage.auth0.com/) > Applications > Applications > Select your previously created SPA application > Settings. Should look something like this:     |
|                             | ![Auth0 React Audience](https://i.imgur.com/TuN6cI8.png)                                                                                                                            |

## Run Locally

- I start from the premise that you have already created an Auth0 account, an API and also a SPA application (from Auth0 dashboard).

- Add some roles and permissions to your Auth0 API:

| Roles                                           | Permissions                                           |
| ----------------------------------------------- | ----------------------------------------------------- |
| ![Auth0 Roles](https://i.imgur.com/oPe643W.png) | ![Auth0 Permissions](https://i.imgur.com/3XvYRb8.png) |

1. Install:

   - [Node.js](https://nodejs.org/es/download/)

1. Clone the project:

   ```bash
   git clone https://github.com/AloisCRR/nestjs-auth0-integration.git
   ```

1. Go to the project directory:

   ```bash
   cd nestjs-auth0-integration
   ```

1. Install dependencies:

   ```bash
   npm install
   ```

1. Start NestJS and React dev servers by running:

   ```bash
   npm run api
   npm run app
   ```

## API Reference

<p align="center">
  <img src="https://i.imgur.com/gTsThyF.png" alt="Note entity" width="200">
</p>

#### Note creation

```http
POST /notes
```

| Headers          | Type           | Description                               |
| :--------------- | :------------- | :---------------------------------------- |
| `Authentication` | `Bearer token` | **Required**. Access token given by Auth0 |

| Body    | Type     | Description                |
| :------ | :------- | :------------------------- |
| `title` | `string` | **Required**. Note title   |
| `note`  | `string` | **Required**. Note content |

| Response | Type   | Description  |
| :------- | :----- | :----------- |
| `Note`   | `Note` | Created note |

#### Get all notes

```http
GET /notes
```

| Headers          | Type           | Description                               |
| :--------------- | :------------- | :---------------------------------------- |
| `Authentication` | `Bearer token` | **Required**. Access token given by Auth0 |

| Response | Type     | Description                |
| :------- | :------- | :------------------------- |
| `Notes`  | `Note[]` | Private notes of some user |

#### Note update

```http
PUT /notes/${id}
```

| Parameter | Type     | Description           |
| :-------- | :------- | :-------------------- |
| `id`      | `string` | **Required**. Note ID |

| Headers          | Type           | Description                               |
| :--------------- | :------------- | :---------------------------------------- |
| `Authentication` | `Bearer token` | **Required**. Access token given by Auth0 |

| Response | Type   | Description  |
| :------- | :----- | :----------- |
| `Note`   | `Note` | Updated note |

#### Get single note

```http
GET /notes/${id}
```

| Parameter | Type     | Description           |
| :-------- | :------- | :-------------------- |
| `id`      | `string` | **Required**. Note ID |

| Headers          | Type           | Description                               |
| :--------------- | :------------- | :---------------------------------------- |
| `Authentication` | `Bearer token` | **Required**. Access token given by Auth0 |

| Response | Type   | Description             |
| :------- | :----- | :---------------------- |
| `Note`   | `Note` | Note of user by it's ID |

#### Delete note

```http
DELETE /notes/${id}
```

| Parameter | Type     | Description           |
| :-------- | :------- | :-------------------- |
| `id`      | `string` | **Required**. Note ID |

| Headers          | Type           | Description                               |
| :--------------- | :------------- | :---------------------------------------- |
| `Authentication` | `Bearer token` | **Required**. Access token given by Auth0 |

## Screenshots

![Admin view](https://i.imgur.com/l69Jluu.png)

## Tech Stack

| Name                          | Description                                                                                          |
| ----------------------------- | ---------------------------------------------------------------------------------------------------- |
| [Auth0](https://auth0.com/)   | Flexible, drop-in solution to add authentication and authorization services to your applications.    |
| [React](https://reactjs.org/) | Frontend                                                                                             |
| [NestJS](https://nestjs.com/) | Progressive Node.js framework for building efficient, reliable and scalable server-side applications |

## Roadmap

- [x] App functionality
- [ ] Add better css support (CSS-in-JS...)
- [ ] Testing
- [ ] Hosting, domain, etc.
- [ ] CI/CD

## Appendix

- To add new packages run:

  ```bash
  npm run add -- [app|api] somepackage
  ```
