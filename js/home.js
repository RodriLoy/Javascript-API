(async function load() {
  async function getData(url) {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.log("Datos no encontrado");
    }
  }
  /*function showCharacters(characters, $container) {
    characters.forEach((character) => {
     
      const resultsorigin = await getData(`${character.episode[0]}`)
      debugger;
      const HTMLString = characterItemTemplate(character,resultsorigin)
      const characterElement = createTemplate(HTMLString)
      $container.append(characterElement)
    });
  }
  */
  function showCharacter(character, origin, $container) {
    const HTMLString = characterItemTemplate(character, origin);
    const characterElement = createTemplate(HTMLString);
    $container.append(characterElement);
  }
  function characterItemTemplate(character, origin) {
    return `<div class="tarjeta">
          <div class="tarjeta__foto">
            <img src="${character.image}" alt="" class="tarjeta__img"/>
          </div>
          <div class="tarjeta__contenido">
            <h2 class="tarjeta__nombre">${character.name}</h2>
            <span class="tarjeta__estatus">${character.species}</span>
            <div class="tarjeta__seccion">
              <p class="tarjeta__descripcion">Last known location:</p>
              <p class="tarjeta__respuesta">${character.location.name}</p>
            </div>
            <div class="tarjeta__seccion">
              <p class="tarjeta__descripcion">First seen in:</p>
              <p class="tarjeta__respuesta">${origin.name}</p>
            </div>
          </div> 
        </div>`;
  }
  function createTemplate(HTMLString) {
    const html = document.implementation.createHTMLDocument();
    html.body.innerHTML = HTMLString;
    return html.body.children[0];
  }
  const BASE_API = "https://rickandmortyapi.com/api/";
  const results = await getData(`${BASE_API}character/1,2,3,4,5,6,7,8,9`);
  const $characterContainer = document.querySelector("#contenedor");
  await results.forEach(async (result) => {
    const resultsorigin = await getData(`${result.episode[0]}`);
    showCharacter(result, resultsorigin, $characterContainer);
  });
})();
