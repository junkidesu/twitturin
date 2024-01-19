# TwitturIn

Future social media platform for teachers and students of TTPU.

## Getting Started

This repository contains the source code of both the API and the web client of TwitturIn, structured as a monorepo.

The API is written with <a href="https://expressjs.com/">Express</a>, with <a href="https://www.mongodb.com/">MongoDB</a> as the database and <a href="https://aws.amazon.com/s3/">Amazon S3</a> as the remote storage. The web client is a <a href="https://react.dev/">React</a> single-page-application, with <a href="https://redux.js.org/">Redux</a> for state management and <a href="https://redux-toolkit.js.org/rtk-query/overview">RTK Query</a> for connecting to the API. Styling is done with <a href="https://styled-components.com/">styled-components</a>.

The application is running at https://twitturin.onrender.com.

### Prerequisites

<ul>
    <li>
        Node.js.
        You can either download directly from <a href="https://nodejs.org/en/download/">the official website</a>, or use a tool like <a href="https://github.com/nvm-sh/nvm">nvm</a>. (Note: nvm is not available for Windows, but you might be interested in <a href="https://github.com/coreybutler/nvm-windows">this alternative</a>.)
    </li>
    <li>
        If you are on a Windows machine, you'll need to install <a href="https://www.npmjs.com/package/cross-env">cross-env</a> as a dependency for the backend, and modify the npm scripts accordingly. See <a href="https://www.npmjs.com/package/cross-env#usage">here</a> for reference.
    </li>
    <li>
        As mentioned previously, TwitturIn API uses MongoDB and Amazon S3. The keys and links to connect to those are stored in environment variables. In the directory for the API, there is a sample file for the environment variables that need to be present to start the application. Please refer to the official docs of the respective services to see how to get started.
    </li>
</ul>

In the root of the repository, run the following:

```
npm install
```

This will install both the API and the client dependencies.

### Development

Start the API in development mode:

```
npm run dev:api
```

Start the client in development mode:

```
npm run dev:client
```

### Build

Build both the API and the client:

```
npm run build
```

### Tests

Run unit tests and the API integration tests:

```
npm test
```

For end-to-end testing, the API and web client must both be running in the background:

```
npm run start:api
npm run start:client
```

Then, you can start the end-to-end tests:

```
npm run test:e2e
```

### Documentation

When the API is running in development mode (see <a href="#development">Development</a>), check the route `/swagger` for the documentation of the API endpoints.
