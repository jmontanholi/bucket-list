# Bucket List

### Video Demo: URL

### Description:

#### This project consists of a bucket list that generates your list items for you with a suggestion from an external third-part API.

#### The user have the option to create his account, create lists and add items to his lists. He will then be able to update or delete both lists and items as desired.

#### The authentication system is all based on Auth0 integration and it's database and its deployment is on Vercel.

## Technologies and resources used:

- ### Nextjs
- ### React
- ### SASS
- ### Vercel
- ### Auth0
- ### dotenv
- ### Kysely
- ### Postgresql
- ### bcrypt
- ### Tailwind
- ### HeroIcons

## How to start this project locally

- ### Clone this repository locally or fork it

- ### Run `npm install` on the root folder

- ### Create a .env file with the values below (this is just an example with the env variables used here) for more information you can look into [Vercel Storage documentation](https://vercel.com/docs/projects/environment-variables) and [Auth0 quick setup documentation for your case](https://auth0.com/docs/quickstarts)

  - <details>
      <summary>Example</summary>
      
      ```
      AUTH0_BASE_URL=""
      AUTH0_CLIENT_ID=""
      AUTH0_CLIENT_SECRET=""
      AUTH0_ISSUER_BASE_URL=""
      AUTH0_SECRET=""
      NX_DAEMON=""
      POSTGRES_DATABASE=""
      POSTGRES_PRISMA_URL=""
      POSTGRES_URL=""
      POSTGRES_URL_NON_POOLING=""
      POSTGRES_URL_NO_SSL=""
      POSTGRES_USER=""
      TURBO_REMOTE_ONLY=""
      TURBO_RUN_SUMMARY=""
      VERCEL=""
      VERCEL_ENV="development"
      VERCEL_GIT_COMMIT_AUTHOR_LOGIN=""
      VERCEL_GIT_COMMIT_AUTHOR_NAME=""
      VERCEL_GIT_COMMIT_MESSAGE=""
      VERCEL_GIT_COMMIT_REF=""
      VERCEL_GIT_COMMIT_SHA=""
      VERCEL_GIT_PREVIOUS_SHA=""
      VERCEL_GIT_PROVIDER=""
      VERCEL_GIT_PULL_REQUEST_ID=""
      VERCEL_GIT_REPO_ID=""
      VERCEL_GIT_REPO_OWNER=""
      VERCEL_GIT_REPO_SLUG=""
      VERCEL_URL=""
      NINJA_API_KEY=""
      ```
    </details>

- ### You will also have to create a database, create the tables and connect to it to be able to run this project as it does not have a local database. The database details can be found in the 'create.sql' file

- ### To run it locally just do `npm run dev`

## Connect locally to database to debug or do changes manually

`psql "postgresql://username:password@host:port/verceldb?options=project%3D<endpoint>"`

Where you can just copy vercel default connection to PSQL and then change the end to have `options=project%3D` and paste the endpoint that is available in the database page

### Example:

`psql "postgres://default:********@ep-shrill-dew-a4jcxcna.us-east-1.aws.neon.tech:5432/verceldb?options=project%3Dep-shrill-dew-a4jcxcna"`

For more information see:
https://github.com/vercel/examples/issues/697
