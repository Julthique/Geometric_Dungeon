////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////// CHOIX POUVOIRS /////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// On prépare les boutons de sélections des pourvoirs
const bouton_pouvoir_balles = document.getElementById("play balles");
bouton_pouvoir_balles.addEventListener("click", (event) => {
        pouvoir_choisie = "projectiles";
        window.location.href='game.html?power=1';

});

// On prépare les boutons de sélections des pourvoirs
const bouton_pouvoir_halo = document.getElementById("play halo");
bouton_pouvoir_halo.addEventListener("click", (event) => {
        pouvoir_choisie = "halo";
        window.location.href='game.html?power=2';

});

// On prépare les boutons de sélections des pourvoirs
const bouton_pouvoir_bombes = document.getElementById("play bombes");
bouton_pouvoir_bombes.addEventListener("click", (event) => {
        pouvoir_choisie = "bombes";
        window.location.href='game.html?power=3';

});
