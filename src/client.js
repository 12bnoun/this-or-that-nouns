import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from '@apollo/client';

const defaultOptions: DefaultOptions = {
      watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
      },
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      },
};

const client = new ApolloClient({
  uri: 'https://tot-backend.herokuapp.com/graphql',
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
});

export { client, gql };
