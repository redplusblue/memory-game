const API = "https://hp-api.onrender.com/api/characters";

export async function characterIDs(numChar) {
  return fetch(API)
    .then((res) => res.json())
    .then((data) => {
      let charIDs = [];
      for (let i = 0; i < numChar; i++) {
        charIDs.push(data[i].id);
      }
      return charIDs;
    });
}
