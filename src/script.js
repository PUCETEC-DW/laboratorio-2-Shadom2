document.addEventListener("DOMContentLoaded", () => {
  const inputBuscar = document.getElementById("buscar");
  const divResultado = document.getElementById("resultado");

  fetch("https://restcountries.com/v3.1/all")
    .then(res => res.json())
    .then(data => {
      mostrarPaises(data);

      inputBuscar.addEventListener("input", () => {
        const texto = inputBuscar.value.toLowerCase();
        const filtrados = data.filter(pais => {
          const nombreES = pais.translations?.spa?.official?.toLowerCase() || "";
          return nombreES.includes(texto);
        });
        mostrarPaises(filtrados);
      });
    })
    .catch(error => {
      console.error("Error al cargar los datos:", error);
      divResultado.innerHTML = "<p>Error al cargar los países.</p>";
    });

  function traducirRegion(region) {
    const traducciones = {
      "Africa": "África",
      "Americas": "América",
      "Asia": "Asia",
      "Europe": "Europa",
      "Oceania": "Oceanía",
      "Antarctic": "Antártida"
    };
    return traducciones[region] || region;
  }

  function mostrarPaises(lista) {
    divResultado.innerHTML = "";

    if (lista.length === 0) {
      divResultado.innerHTML = "<p>No se encontraron resultados.</p>";
      return;
    }

    lista.forEach(pais => {
      const nombreES = pais.translations?.spa?.official || pais.name.official;
      const regionES = traducirRegion(pais.region);
      const div = document.createElement("div");
      div.className = "pais";
      div.innerHTML = `
        <h3>${nombreES}</h3>
        <img src="${pais.flags.svg}" alt="Bandera de ${nombreES}">
        <p><strong>Región:</strong> ${regionES}</p>
        <p><strong>Población:</strong> ${pais.population.toLocaleString('es-ES')}</p>
      `;
      divResultado.appendChild(div);
    });
  }
});
