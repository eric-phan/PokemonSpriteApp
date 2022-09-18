//Example fetch using pokemonapi.co
document.querySelector("button").addEventListener("click", getPoke, colors);
document.querySelector("button").addEventListener("click", getType);
document.getElementById("lucky").addEventListener("click", getLucky);

document.querySelector("input").addEventListener("keypress", function (event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    getPoke();
    getType();
  }
});

// can try separating the two types in html side by side to show only one
// use pokemon id to potentially implement an rng 'feelin lucky' functinolity

function getPoke() {
  var poke = document
    .querySelector("input")
    .value.toLowerCase()
    .split(" ")
    .join("");
  fetch(`https://pokeapi.co/api/v2/pokemon/${poke}`)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      console.log(data);
      document.querySelector("h2").innerText =
        data.name.charAt(0).toUpperCase() +
        data.name.slice(1) +
        "'s" +
        " Normal and Shiny Sprites:";
      document.getElementById("normal").src = data.sprites.front_default;
      document.getElementById("shiny").src = data.sprites.front_shiny;
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}

function getType() {
  var poke = document
    .querySelector("input")
    .value.toLowerCase()
    .split(" ")
    .join("");
  fetch(`https://pokeapi.co/api/v2/pokemon/${poke}`)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      var firstType = data.types[0].type.name;
      if (data.types[1]) {
        var secondType = data.types[1].type.name;
      }
      // if there is a second type declare
      console.log(firstType);
      // secondType if TRUE
      if (firstType.length > 0 && !secondType) {
        document.querySelector("h3").innerText =
          firstType.charAt(0).toUpperCase() + firstType.slice(1);
      } else if (firstType.length > 0 && secondType.length > 0) {
        document.querySelector("h3").innerText =
          firstType.charAt(0).toUpperCase() +
          firstType.slice(1) +
          "/" +
          secondType.charAt(0).toUpperCase() +
          secondType.slice(1);
      }
    });
}
function colors() {
  if (firstType === "fire") {
    document.body.style.background = "#ff9999";
    console.log("hii");
  } else if (firstType === "grass") {
    document.body.style.background = "#c2f0c2";
  }
}

function getLucky() {
  let rando = rng();
  console.log(rando);

  fetch(`https://pokeapi.co/api/v2/pokemon/${rando}`)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      console.log(data);
      document.querySelector("h2").innerText =
        data.name.charAt(0).toUpperCase() +
        data.name.slice(1) +
        "'s" +
        " Normal and Shiny Sprites:";
      document.getElementById("normal").src = data.sprites.front_default;
      document.getElementById("shiny").src = data.sprites.front_shiny;
      var firstType = data.types[0].type.name;
      if (data.types[1]) {
        var secondType = data.types[1].type.name;
      }
      // if there is a second type declare
      console.log(firstType);
      // secondType if TRUE
      if (firstType.length > 0 && !secondType) {
        document.querySelector("h3").innerText =
          firstType.charAt(0).toUpperCase() + firstType.slice(1);
      } else if (firstType.length > 0 && secondType.length > 0) {
        document.querySelector("h3").innerText =
          firstType.charAt(0).toUpperCase() +
          firstType.slice(1) +
          "/" +
          secondType.charAt(0).toUpperCase() +
          secondType.slice(1);
      }
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}

function rng() {
  return Math.ceil(Math.random() * 905);
}
