// Create an ItemClient class here. This is what makes requests to your express server (your own custom API!)

class ItemClient {
  constructor() {
    this.API_URL = "http://localhost:8080";
  }

  getItems = async () => {
    const response = await fetch(`${this.API_URL}/`);

    const data = await response.json();

    return data;
  };

  addToDo = async (item) => {
    console.log(item);
    console.log(JSON.stringify(this._capitalize(item)));
    const response = await fetch(`${this.API_URL}/item`, {
      method: "POST",
      body: JSON.stringify(this._capitalize(item)),
    });
    console.log(response);

    const data = await response.json();
  };

  addPokemon = async (inputArray) => {
    const response = await fetch(`${this.API_URL}/pokemon`, {
      method: "POST",
      body: JSON.stringify(inputArray),
    });

    const data = await response.json();
  };

  removeItem = async (liElm) => {
    const itemId = liElm.id.split("-");
    const item = itemId.join(" ");

    const response = await fetch(`${this.API_URL}/item`, {
      method: "DELETE",
      body: JSON.stringify(item),
    });

    const data = await response.json();
  };

  removeAll = async () => {
    const response = await fetch(`${this.API_URL}/items`, {
      method: "DELETE",
    });

    const data = await response.json();
  };

  sortByName = async () => {
    const response = await fetch(`${this.API_URL}/sort`, {
      method: "PATCH",
    });

    const data = await response.json();
  };

  _capitalize = (string) => {
    const updatedString = `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
    return updatedString;
  };
}

export default ItemClient;
