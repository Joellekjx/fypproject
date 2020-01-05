import { ENDPOINT } from '../settings'
// import mockData from './categories.json';
import restGet from './restGet'; // for Dependency Inversion Principle

/**
 * @return {string[]} response - return the get response in Promises
 */

export default () => {

//   const promise = new Promise(resolve => {
//     resolve(mockData);
//   });

//   if (mockApi) { // return mock data for testing
//     return promise;
//   }

  const response = restGet(
    ENDPOINT + 'category',
    {}
  );
  return response;
};