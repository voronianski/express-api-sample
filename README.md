# Express API Sample

[![build status](http://img.shields.io/travis/voronianski/express-api-sample.svg?style=flat)](https://travis-ci.org/voronianski/express-api-sample.js)
[![Dependency Status](http://david-dm.org/voronianski/express-api-sample.svg)](http://david-dm.org/voronianski/express-api-sample)

> Sample API server powered by express.js which provides login/password user authentication and basic "items" CRUD interface. It's easy to use this sample API for different playgrounds and different client app bolierplates.

## Usage

Just clone this repository, install dependencies and start application:

```bash
git clone git@github.com:voronianski/express-api-sample.git
cd express-api-sample
npm install
npm run start-dev # with watcher turned on
```

It will generate documentation of all endpoints and start server with [nodemon]() on a port specified in environment config. Default urls will be `http://localhost:8081/v1` for API endpoints and `http://localhost:8081/doc` for documentation.

### [Documentation](https://github.com/voronianski/express-api-sample/blob/master/DOCUMENTATION.md)

## What's inside?

- [express.js](http://expressjs.com) framework
- [nedb](https://github.com/louischatriot/nedb) as **in-memory** data storage
- endpoints schema validation by [is-express-schema-valid](https://github.com/voronianski/is-express-schema-valid)
- app configuration by [c0nfig](https://github.com/voronianski/c0nfig)
- all code is written ES6/ES7 and transpiled by [babel](http://babeljs.io)
- [npm scripts](https://github.com/voronianski/express-api-sample/blob/master/package.json#L6) for task automation
- well tested with [mocha](http://mochajs.org), [chai](http://chaijs.com) and [supertest](https://github.com/visionmedia/supertest)
- [apidoc](http://apidocjs.com) for documentation generation

---

**MIT Licensed**
