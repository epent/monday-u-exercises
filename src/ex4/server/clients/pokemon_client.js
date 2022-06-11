import axios from "axios";

class PokemonClient {
  constructor() {}

  async fetchPokemon(pokemonId) {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
      );

      const data = await response.json();

      return data;
    } catch (error) {
      // console.log(error);
    }
  }
}

const pokemonClient = new PokemonClient();

export default pokemonClient;
