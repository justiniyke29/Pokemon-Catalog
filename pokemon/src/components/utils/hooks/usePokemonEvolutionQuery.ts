import gql from "graphql-tag";

export const GET_POKEMON_EVOLUTION = gql`
  query Pokemon($name: String) {
    pokemon(name: $name) {
      evolutions {
        name
        number
        id
        image
        types
      }
    }
  }
`;
