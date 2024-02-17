// Import the Data Provider and GraphQLClient class from the "@refinedev/nestjs-query" package
import graphqlDataProvider, {
  GraphQLClient,
  liveProvider as graphqlLiveProvider,
} from "@refinedev/nestjs-query";
// Import fetchWrapper from the "@refinedev/fetch-wrapper" package
import { fetchWrapper } from "./fetch-wrapper";
// Import createClient from the "graphql-ws" package
import { createClient } from "graphql-ws";

// Declare a constant named API_URL and assign it the GraphQL API endpoint URL
export const API_BASE_URL = "https://api.crm.refine.dev";
export const API_URL = `${API_BASE_URL}/graphql`;
export const WS_URL = "wss://api.refine.dev/graphql";

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
// Initialize a new WebSocketClient instance named "wsClient" with the WS_URL
export const wsClient =
  typeof window !== "undefined"
    ? createClient({
        url: WS_URL,
        connectionParams: () => {
          const accessToken = localStorage.getItem("accessToken");

          return {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          };
        },
      })
    : undefined;

export const dataProvider = graphqlDataProvider(client);

export const liveProvider = wsClient ? graphqlLiveProvider(wsClient) : undefined;
