# Bucket List

### Video Demo: URL

### Description:

#### This project consists of a bucket list that generates your list items for you with a suggestion from an external third-part API.

#### The user have the option to create his account, create lists and add items to his lists. He will then be able to update or delete both lists and items as desired.

#### The authentication system is all based on Auth0 integration and it's database and its deployment is on Vercel, I chose this first because I need to learn Auth0, and starting a new project with it is, in my opinion, much better for learning than trying to integrate it into an existing project. I chose Vercel for database and deployment because of its ease to integrate with Next.js

#### I've chosen to use Next.js with Typescript as I wanted to explore a new technology that allowed me to learn multiple things at a time, I did not work previously with TypeScript, so I also thought it to be a good opportunity to start familiarizing myself with such technology. I also chose to use TypeScript as it provides me with a safety device that allows me to use my functions and variables seamlessly without having to worry if I am passing the right parameters or not.

#### I've created a controllers folder where I can have my main functions regarding each of my database tables functions, and then I can use those as actions directly in a server component or as functions in an API route.

#### Almost all styling is made using Tailwind, since it is easy to use and a lot of roles expect experience working with it, the exceptions use modular SCSS files, as it is easier to keep track of and also allow me to reuse classes names.

#### The folder structure follows what Next.js suggests and it uses its latest APP Router structure, where basically every page.tsx is a main file for a route defined by the folder in which this file is found, for example, app/dashboard/page.tsx is the main page representing the /dashboard route in the URL of the website. And the folders that contain a square bracket are for dynamic routes, so in the API for example we have lists/[list_id] which represent something like lists/1 for a post call. The folders with a parenthesis represent folders for utilities, and should not be represented as URL paths by Next.js

#### The database table structure has been designed to accomodate more than was put in place (basically a social media for bucket lists). But for the scope of this project it will not be explored further, anyone that might find this public repository is more than welcome to utilize it.

## Technologies and resources used:

- #### Nextjs
- #### React
- #### TypeScript
- #### SASS
- #### Vercel
- #### Auth0
- #### dotenv
- #### Kysely
- #### Postgresql
- #### bcrypt
- #### Tailwind
- #### HeroIcons

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
