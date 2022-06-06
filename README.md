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
  </br>

#### Architecture

General project structuring. Split into Frontend and Backend. Each folder contains everything it needs in case it needs to be decoupled in the future.

**Useful Links:**

- [Express Architecture](https://blog.logrocket.com/organizing-express-js-project-structure-better-productivity/)
- [React Architecture](https://www.taniarascia.com/react-architecture-directory-structure/)
  </br>

#### Typescript

Typescript will be used across Frontend and Backend. Can customize behaviour in `tsconfig.json`.

**Useful Links:**

- [Typescript Cheat Sheet](https://www.typescriptlang.org/cheatsheets)
- [Typescript Compiler Options](https://www.typescriptlang.org/tsconfig)
  </br>

### Node Express with Typescript

Setting up Backend to be Typescript. Everything Typescript!

**Useful Links:**

- [Setting Up](https://developer.okta.com/blog/2018/11/15/node-express-typescript)
  </br>

### Eslint & Airbnb Style Guide

Airbnb introduces it as the “Most reasonable approach to JavaScript”. To check syntax, find problems, and enforce code style. More coding rules equals a more consistent coding experience is my take on it.

**Useful Links:**

- [Setting Up](https://dev.to/devdammak/setting-up-eslint-in-your-javascript-project-with-vs-code-2amf)
- [Eslint Rules](https://eslint.org/docs/rules/)
- [Airbnb Style Guide](https://airbnb.io/javascript/react/)
- [Youtube Tutorial - Traversy Media](https://www.youtube.com/watch?v=SydnKbGc7W8&ab_channel=TraversyMedia)
  </br>

### Path Aliases

Makes it a lot easier to import from anywhere within the project and move files around without changing imports and you never end up with something like `../../../../../components/`. Too many `../../../../../` can be extremely sore on the eyes. This was more of a pain then I thought it would be. Getting Typescript, Eslint and Vscode Intellisense to play nice was a b\*tch.

See `tsconfig.paths.json` in frontend and backend root folders for configured paths.

**Useful Links:**

- [Config tsconfig.json](https://www.typescriptlang.org/tsconfig#paths)
- [Config eslintrc.js](https://github.com/alexgorbatchev/eslint-import-resolver-typescript)
- [Stack Overflow Troubleshoot](https://stackoverflow.com/questions/69932369/setting-up-eslint-import-resolver-typescript-in-monorepo)
  </br>

### React Query

Server side state that reduces API requests :drooling_face:.

**Useful Links:**

- [React Query Docs](https://react-query.tanstack.com/)
- [Youtube Tutorial - Codevolution](https://www.youtube.com/watch?v=VtWkSCZX0Ec&list=PLC3y8-rFHvwjTELCrPrcZlo6blLBUspd2&ab_channel=Codevolution)
  </br>

### Zustand

Super light weight client side state. For this application, Redux is overkill when using React Query.

**Useful Links:**

- [Zustand Docs](https://docs.pmnd.rs/zustand/introduction)
  </br>

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
