# rellygudfutos_v2

## Development Notes

### MERN Stack

This application will be using the MERN stack. MERN stands for MongoDB, Express, React, Node, after the four key technologies that make up the stack.

- MongoDB - document database
- Express(.js) - Node.js web framework
- React(.js) - a client-side JavaScript framework
- Node(.js) - the premier JavaScript web server

**Useful Links:**

- [Youtube Tutorial - Traversy Media](https://www.youtube.com/playlist?list=PLillGF-RfqbbQeVSccR9PGKHzPJSWqcsm)

#### Architecture

General project structuring. Split into Frontend and Backend. Each folder contains everything it needs in case it needs to be decoupled in the future.

**Useful Links:**

- [Node Architecture](https://softwareontheroad.com/ideal-nodejs-project-structure/)
- [Express Architecture](https://blog.logrocket.com/organizing-express-js-project-structure-better-productivity/)
- [React Architecture](https://www.taniarascia.com/react-architecture-directory-structure/)

#### Typescript

Typescript will be used across Frontend and Backend. Can customize behaviour in `tsconfig.json`.

**Useful Links:**

- [Typescript Cheat Sheet](https://www.typescriptlang.org/cheatsheets)
- [Typescript Compiler Options](https://www.typescriptlang.org/tsconfig)

### Node Express with Typescript

Setting up Backend to be Typescript. Everything Typescript!

**Useful Links:**

- [Setting Up](https://developer.okta.com/blog/2018/11/15/node-express-typescript)

### Eslint & Airbnb Style Guide

Airbnb introduces it as the “Most reasonable approach to JavaScript”. To check syntax, find problems, and enforce code style. More coding rules equals a more consistent coding experience is my take on it.

**Useful Links:**

- [Setting Up](https://dev.to/devdammak/setting-up-eslint-in-your-javascript-project-with-vs-code-2amf)
- [Eslint Rules](https://eslint.org/docs/rules/)
- [Airbnb Style Guide](https://airbnb.io/javascript/react/)
- [Youtube Tutorial - Traversy Media](https://www.youtube.com/watch?v=SydnKbGc7W8&ab_channel=TraversyMedia)

### Path Aliases

Makes it a lot easier to import from anywhere within the project and move files around without changing imports and you never end up with something like `../../../../../components/`. Too many `../../../../../` can be extremely sore on the eyes. This was more of a pain then I thought it would be. Getting Typescript, Eslint, Jest and Vscode Intellisense to play nice was a b\*tch.

See `tsconfig.paths.json` in frontend and backend folders for configured paths. See `jest.config.cjs` in backend folder for connection to `tsconfig.paths.json`.

**Useful Links:**

- [Config tsconfig.json](https://www.typescriptlang.org/tsconfig#paths)
- [Config eslintrc.js](https://github.com/alexgorbatchev/eslint-import-resolver-typescript)
- [Stack Overflow Troubleshoot](https://stackoverflow.com/questions/69932369/setting-up-eslint-import-resolver-typescript-in-monorepo)

### MongoDB & Mongoose

MongoDB likes to think it has no rule book. So here is some rules:

1. Embed unless there is a compelling reason not to
2. Avoid JOINS if they can be avoided
3. Array should never grow without bound
4. An object should not be embedded if it needs to be accessed individually

Based on these rules. I will:

- Embed Equipment as an array for Users
- Separate Tags from Photos because I will need to access Tags separately

##### Users to Equipment - Embed Equipment in Users

An example of embedded data that Users and Equipment will have:
![image](https://user-images.githubusercontent.com/53580213/172372055-fee70f8a-dc96-437f-a33b-0ca4dbd75a51.png)

##### Photos to Tags - Many to Many

An example of the Many to Many relationship that Photos and Tags will have:
![image](https://user-images.githubusercontent.com/53580213/172371168-9855767a-ee9b-4a43-817e-3e2a09f2dbae.png)

##### Testing

Decided to use an in-memory database over mocks. This will allow the tests to be directly executed on the in-memory database. This allows the tests to more closely emulate production instead of using mocks that can be incorrect, incomplete or outdated. :nerd_face:

**Useful Links:**

- [Youtube Tutorial Best Practices - MongoDB](https://www.youtube.com/watch?v=QAqK-R9HUhc&ab_channel=MongoDB)
- [Youtube Tutorial Anti Patterns - MongoDB](https://www.youtube.com/watch?v=8CZs-0it9r4&ab_channel=MongoDB)
- [Mongoose Typescript Schema](https://thecodebarbarian.com/working-with-mongoose-in-typescript.html)
- [Mongoose Docs](https://mongoosejs.com/docs/)
- [Testing with Mongoose - Jest](https://javascript.plainenglish.io/unit-testing-node-js-mongoose-using-jest-106a39b8393d)
- [Testing with Mongoose - mongodb-memory-server](https://dev.to/remrkabledev/testing-with-mongodb-memory-server-4ja2)
- [mongodb-memory-server Docs](https://github.com/nodkz/mongodb-memory-server)
- [Regex Generator](https://regex-generator.olafneumann.org/?sampleText=2020-03-12T13%3A34%3A56.123Z&flags=i&onlyPatterns=true&matchWholeLine=false&selection=0%7CDate,10%7CCharacter,11%7CTime,23%7CCharacter)

### User Authorisation

Depending on the role of the user, they will have different authorisations.

|             | ADMIN | USER | VIEW |
| ----------- | :---: | :--: | :--: |
| addUser     |   X   |  -   |  -   |
| deleteUser  |   X   |  -   |  -   |
| getUser     |   X   |  X   |  -   |
| getUsers    |   X   |  X   |  -   |
| loginUser   |   X   |  X   |  X   |
| updateUser  |   X   |  -   |  -   |
| addPhoto    |   X   |  X   |  -   |
| deletePhoto |   X   |  X   |  -   |
| getPhoto    |   X   |  X   |  X   |
| getPhotos   |   X   |  X   |  X   |
| updatePhoto |   X   |  X   |  -   |
| addTag      |   X   |  X   |  -   |
| deleteTag   |   X   |  X   |  -   |
| getTag      |   X   |  X   |  X   |
| getTags     |   X   |  X   |  X   |
| updateTag   |   X   |  X   |  -   |

**Useful Links:**

- [User Role Based Authorisation](https://jasonwatmore.com/post/2018/11/28/nodejs-role-based-authorization-tutorial-with-example-api)

### Sorting, Filtering and Pagination

First time round in rellygudfutos_v1 Frontend handled sorting and filtering. Pagination wasn't even a thing... As you can guess, this was not a long term solution. Loading up everything upfront did have some pros and cons.

**Pros:**

1. Sorting was very quick (no API request needed)
2. Filtering was very quick (no API request needed)

**Cons:**

1. Long loading times for the `GET /photos` endpoint
2. App wont scale well as more photos are added

**Useful Links:**

- [Node Sorting, Filtering and Pagination](https://medium.com/swlh/node-js-api-add-crud-operations-with-pagination-filtering-grouping-and-sorting-capabilities-55375ad0b774)
- [MongoDB Sorting, Filtering and Pagination](https://jeffdevslife.com/p/1-mongodb-query-of-advanced-filtering-sorting-limit-field-and-pagination-with-mongoose/)
- [Youtube Pagination Tutorial - Web Dev Simplified](https://www.youtube.com/watch?v=ZX3qt0UWifc&ab_channel=WebDevSimplified)

### Next.js && React Query

Next.js as server sid rendering that reduces first contentful paint. :drooling_face:
React Query as server side state that reduces API requests. :drooling_face:

**Useful Links:**

- [Setting Up](https://prateeksurana.me/blog/mastering-data-fetching-with-react-query-and-next-js/)
- [React Query Docs](https://react-query.tanstack.com/)
- [Youtube Next.js Tutorial - Traversy Media](https://www.youtube.com/watch?v=mTz0GXj8NN0&ab_channel=TraversyMedia)
- [Youtube Next.js Tutorial - Fireship](https://www.youtube.com/watch?v=Sklc_fQBmcs&ab_channel=Fireship)
- [Youtube React Query Tutorial - Codevolution](https://www.youtube.com/watch?v=VtWkSCZX0Ec&list=PLC3y8-rFHvwjTELCrPrcZlo6blLBUspd2&ab_channel=Codevolution)

### Zustand

Super light weight client side state. For this application, Redux is overkill when using React Query.

**Useful Links:**

- [Zustand Docs](https://docs.pmnd.rs/zustand/introduction)

### Terminal

Some useful commands and what they do because I will forget.

#### General

- Kill localhost bash - `npx kill-port 5000`

#### Yarn

List of commands [Yarn Cli](https://classic.yarnpkg.com/en/docs/cli/)

- Installs all the dependencies defined in a `package.json` file - `yarn install`
- Add package to dependencies - `yarn add package`
- Add package to dev dependencies - `yarn add -D package`
- Remove package from `package.json` - `yarn remove package`

#### Git

- Status of staged and unstaged changes - `git status`
- Add all changed files to staging area - `git add .`
- Commit staging area files with commit message - `git commit -m 'commit message'`
- Push changes to Github repo - `git push`
- Pull changes from Github repo - `git pull`

#### Node & Nvm

Using [Nvm for Windows](https://github.com/coreybutler/nvm-windows).
Check [Node for Windows](https://nodejs.org/en/) for recommended version.

- List of Node versions installed - `nvm list`
- Current Node version running - `nvm current`
- Use Node version specified - `nvm use 16.15.1`
- Install Node version specified - `nvm install 16.15.1`
- Node version - `node -v`

#### Typescript

- Check version - `tsc --version`
- Compile file - `tsc index.ts`
