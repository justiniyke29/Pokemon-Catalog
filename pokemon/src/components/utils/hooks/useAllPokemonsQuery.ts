import gql from "graphql-tag";

export const POKEMONS_QUERY = gql`
  query Pokemons($first: Int!) {
    pokemons(first: $first) {
      id
      name
      image
      number
      types
    }
  }
`;
