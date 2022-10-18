const dataAdded = (model: string): string => `${model} added`;

const dataDeleted = (model: string): string => `${model} deleted`;

const dataFetched = (model: string): string => `${model} fetched successfully`;

const dataUpdated = (model: string): string => `${model} updated`;

const userLoggedIn = (username: string): string => `${username} logged in`;

export default {
  dataAdded,
  dataDeleted,
  dataFetched,
  dataUpdated,
  userLoggedIn,
};
