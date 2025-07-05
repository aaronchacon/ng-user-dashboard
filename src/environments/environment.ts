import { endWith } from "rxjs";

export const environment = {
  production: false,
  version: '1.0.0',
  jsonPlaceholderUrl: {
    base: 'https://jsonplaceholder.typicode.com',
    endpoints: {
      users: '/users',
    }
  },
};