let paises = [];

document.addEventListener("DOMContentLoaded", () => {
  const inputBuscar = document.getElementById("buscar");
  const divResultado = document.getElementById("resultado");

  fetch("https://restcountries.com/v3.1/all")
    .then(res => res.json())
    .then(data => {
      paises = data;
      mostrarPaises(paises);
    })
    .catch(error => {
      console.error("Error al cargar los datos:", error);
      divResultado.innerHTML = "<p>Error al cargar los países.</p>";
    });

  inputBuscar.addEventListener("input", () => {
    const texto = inputBuscar.value.toLowerCase();
    const filtrados = paises.filter(pais =>
      pais.name.official.toLowerCase().includes(texto)
    );
    mostrarPaises(filtrados);
  });

  function mostrarPaises(lista) {
    divResultado.innerHTML = "";

    if (lista.length === 0) {
      divResultado.innerHTML = "<p>No se encontraron resultados.</p>";
      return;
    }

    lista.forEach(pais => {
      const div = document.createElement("div");
      div.className = "pais";
      div.innerHTML = `
        <h3>${pais.name.official}</h3>
        <img src="${pais.flags.svg}" alt="Bandera de ${pais.name.official}">
        <p><strong>Región:</strong> ${pais.region}</p>
        <p><strong>Población:</strong> ${pais.population.toLocaleString()}</p>
      `;
      divResultado.appendChild(div);
    });
  }
});