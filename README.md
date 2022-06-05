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

### Node Express Typescript

**Useful Links:**

- [Setting Up](https://developer.okta.com/blog/2018/11/15/node-express-typescript)
- [File Structure](https://www.npmjs.com/package/typescript-express-starter)

### Eslint & Airbnb Style Guide

Airbnb introduces it as the “Most reasonable approach to JavaScript”. To check syntax, find problems, and enforce code style. More coding rules equals a more consistent coding experience is my take on it.

**Useful Links:**

- [Setting Up](https://dev.to/devdammak/setting-up-eslint-in-your-javascript-project-with-vs-code-2amf)
- [Eslint Rules](https://eslint.org/docs/rules/)
- [Airbnb Style Guide](https://airbnb.io/javascript/react/)
- [Youtube Tutorial - Traversy Media](https://www.youtube.com/watch?v=SydnKbGc7W8&ab_channel=TraversyMedia)

### Path Aliases

Makes it a lot easier to import from anywhere within the project and move files around without changing imports and you never end up with something like `../../../../../components/`. Too many `../../../../../` can be extremely sore on the eyes. This was more of a pain then I thought it would be. Getting Typescript, Eslint and Vscode Intellisense to play nice was a b\*tch.

See `tsconfig.paths.json` in frontend and backend root folders for configured paths.

**Useful Links:**

- [tsconfig.json Config](https://www.typescriptlang.org/tsconfig#paths)
- [eslintrc.js Config](https://github.com/alexgorbatchev/eslint-import-resolver-typescript)
- [Stack Overflow Troubleshoot](https://stackoverflow.com/questions/69932369/setting-up-eslint-import-resolver-typescript-in-monorepo)

### React Query

Server side state that reduces API requests.

**Useful Links:**

- [React Query Docs](https://react-query.tanstack.com/)
- [Youtube Tutorial - Codevolution](https://www.youtube.com/watch?v=VtWkSCZX0Ec&list=PLC3y8-rFHvwjTELCrPrcZlo6blLBUspd2&ab_channel=Codevolution)

### Zustand

Super light weight client side state. For this application, Redux is overkill when using React Query.

**Useful Links:**

- [Zustand Docs](https://docs.pmnd.rs/zustand/introduction)

### Terminal

Some useful commands and what they do.

**General:**

- Kill localhost bash - `npx kill-port 5000`
