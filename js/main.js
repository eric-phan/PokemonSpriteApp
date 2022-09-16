//Example fetch using pokemonapi.co
document.querySelector("button").addEventListener("click", getPoke, typeColor);
document.querySelector("input").addEventListener("keypress", function (event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    getPoke();
  }
});

// can try separating the two types in html side by side to show only one
// use pokemon id to potentially implement an rng 'feelin lucky' functinolity

function getPoke() {
  let poke = document
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
      let firstType = data.types[0].type.name;
      let secondType = data.types[1].type.name;
      if (firstType === "fire") {
        document.body.style.background = "#ff9999";
      }

      document.querySelector("h3").innerText =
        firstType.charAt(0).toUpperCase() +
        firstType.slice(1) +
        "/" +
        secondType.charAt(0).toUpperCase() +
        secondType.slice(1);
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}

// function onlyOne() {
//   if (secondType.length > 0) {
//     document.querySelector("h3").innerText =
//       firstType.charAt(0).toUpperCase() +
//       firstType.slice(1) +
//       "/" +
//       secondType.charAt(0).toUpperCase() +
//       secondType.slice(1);
//   } else {
//     document.querySelector("h3").innerText =
//       firstType.charAt(0).toUpperCase() + firstType.slice(1);
//   }
// }

function typeColor() {
  if (firstType === "fire") {
    document.body.style.background = "red";
  }
}
