/* This TypeScript file defines functions and 
types to handle HTTP requests and GraphQL errors in a web application. */

// Importing the GraphQLFormattedError type from the "graphql" module
import { FastBackwardFilled } from "@ant-design/icons";
import { GraphQLFormattedError } from "graphql";

// Defining a custom Error type with message and statusCode properties
type Error = {
  message: string;
  statusCode: string;
};

// Defining a customFetch function to handle HTTP requests with authorization
const customFetch = async (url: string, options: RequestInit) => {
  // Retrieving access token from localStorage
  const accessToken = localStorage.getItem("access_token");

  // Extracting headers from options
  const headers = options.headers as Record<string, string>;

  // Making fetch request with additional headers for authorization and content type
  return await fetch(url, {
    ...options,
    headers: {
      ...headers,
      Authorization: headers?.Authorization || `Bearer ${accessToken}`, // Adding Authorization header with access token
      "Content-Type": "application/json", // Setting Content-Type header to JSON
      "Apollo-Require-Preflight": "true", // Adding custom header for Apollo client
    },
  });
};

// Function to extract GraphQL errors from the response body
const getGraphQLErrors = (
  body: Record<"errors", GraphQLFormattedError[] | undefined>
): Error | null => {
  // Handling case where body is empty
  if (!body) {
    return {
      message: "Unknown error",
      statusCode: "INTERNAL_SERVER_ERROR",
    };
  }
  // Checking if errors exist in the body
  if ("errors" in body) {
    const errors = body.errors;

    // Extracting error messages and code from GraphQL errors
    const messages = errors?.map((error) => error?.message)?.join("");
    const code = errors?.[0]?.extensions?.code;

    // Creating a custom Error object with extracted details
    return {
      message: messages || JSON.stringify(errors),
      statusCode: code || "500",
    };
  }
  return null;
};

// Wrapper function for fetch to handle GraphQL errors
export const fetchWrapper = async (url: string, options: RequestInit) => {
  // Making the HTTP request
  const response = await customFetch(url, options);

  // Cloning the response to read its body
  const responseClone = response.clone();

  // Parsing response body as JSON
  const body = await responseClone.json();

  // Extracting GraphQL errors from response body
  const error = getGraphQLErrors(body);

  // If there are errors, throw them
  if (error) {
    throw error;
  }

  // Otherwise, return the response
  return response;
};