const axios = require("axios").default;

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

export const pokemonClient = new PokemonClient();
