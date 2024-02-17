// Import the GraphQLClient class from the "@refinedev/nestjs-query" package
import { GraphQLClient } from "@refinedev/nestjs-query";
// Import fetchWrapper from the "@refinedev/fetch-wrapper" package
import { fetchWrapper } from "./fetch-wrapper";


// Declare a constant named API_URL and assign it the GraphQL API endpoint URL
export const API_URL = "https://api.refine.dev/graphql";

// Initialize a new GraphQLClient instance named "client" with the API_URL
export const client = new GraphQLClient(API_URL, {
  // Define a fetch function for making HTTP requests
  fetch: (url: string, options: RequestInit) => {
    // Attempt to make an HTTP request using fetchWrapper
    try {
      return fetchWrapper(url, options); // Return the result of the fetchWrapper function
    } catch (error) {
      // If an error occurs, reject the Promise with the caught error
      return Promise.reject(error as Error);
    }
  },
});
