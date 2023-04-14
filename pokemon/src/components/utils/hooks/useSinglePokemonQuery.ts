import gql from "graphql-tag";

export const GET_SINGLE_POKEMON = gql`
  query Pokemons($name: String, $pokemonId: String) {
    pokemon(name: $name, id: $pokemonId) {
      height {
        maximum
        minimum
      }
      name
      image
      weight {
        maximum
        minimum
      }
      classification
      types
      resistant
      id
      weaknesses
    }
  }
`;
