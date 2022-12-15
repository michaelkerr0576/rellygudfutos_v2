/* 
 $ responseMessageUtils
  - dataAdded
  - dataDeleted
  - dataFetched
  - dataUpdated
  - userLoggedIn
*/

export const dataAdded = (model: string): string => `${model} added`;

export const dataDeleted = (model: string): string => `${model} deleted`;

export const dataFetched = (model: string): string => `${model} fetched successfully`;

export const dataUpdated = (model: string): string => `${model} updated`;

export const userLoggedIn = (username: string): string => `${username} logged in`;
