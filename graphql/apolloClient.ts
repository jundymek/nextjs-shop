import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: "https://api-eu-central-1.hygraph.com/v2/cl5nkriuz0zll01ujfc3357t8/master",
  cache: new InMemoryCache(),
});
