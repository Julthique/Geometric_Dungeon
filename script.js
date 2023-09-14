// On attend que la page HTML soit chargé avant d'executer le script JS
document.addEventListener("DOMContentLoaded", function () {

//########################################################################################################################//
/////////////////////// INITIALISATION /////////////////////////////////////////////////////////////////////////////////////
//########################################################################################################################//

var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;

// On ajoute de la couleurau fond du Canva
var container = document.getElementById('container');
container.style.backgroundColor = '#03A696';
var body = document.getElementById('body');
body.style.backgroundColor = '#014040'; 


var stage = new Konva.Stage({
    container: 'container',   // id of container <div>
    width: screenWidth,
    height: screenHeight
});
  
var layer = new Konva.Layer();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////// POUVOIR CHOISIE /////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// On récupère le pouvoir choisi dans l'url
var url = this.location;
// permet de récupérer le pouvoir choisi dans l'url (récupére le dernier caratère de l'url après l'égal)
var pouvoir_choisi = this.location.search.split('=')[1]; 
// On affecte le nom du pouvoir à son numéro
if (pouvoir_choisi==1){
    pouvoir_choisi = "projectiles";
} else if (pouvoir_choisi==2){
    pouvoir_choisi = "halo";
} else if (pouvoir_choisi==3){
    pouvoir_choisi = "bombes";
} else {
    pouvoir_choisi = "projectiles";
    console.log('Pouvoir choisi manquant, projectiles par défaut !');
}
console.log('Pouvoir choisi = ' + pouvoir_choisi);

//########################################################################################################################//
/////////////////////// CREATION OBJET /////////////////////////////////////////////////////////////////////////////////////
//########################################################################################################################//

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////// CREATION BASE //////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var vie_max = 5; // Variable pour stocker le nombre de vie max
var life = vie_max; // Variable pour compter le nombre de vie

// Groupe Base
var base = new Konva.Group({
    x: 0,
    y: 0,
    name: 'base'
});

// Création de la base composé de plusieurs cercles
var circleBase1 = new Konva.Circle({
    x: screenWidth/2,
    y: screenHeight/2,
    radius: 30,
    fill: '#BF4E24',
    opacity: 0.7,
    shadowColor: 'black', // Couleur de l'ombre
    shadowBlur: 25,       // Flou de l'ombre
    shadowOffsetX: 5,     // Décalage horizontal de l'ombre
    shadowOffsetY: 5     // Décalage vertical de l'ombre
});

var circleBase2 = new Konva.Circle({
    x: screenWidth/2-10,
    y: screenHeight/2+15,
    radius: 20,
    fill: '#F2BB16',
    opacity: 0.7,
    shadowColor: 'black', // Couleur de l'ombre
    shadowBlur: 25,       // Flou de l'ombre
    shadowOffsetX: 5,     // Décalage horizontal de l'ombre
    shadowOffsetY: 5     // Décalage vertical de l'ombre
});

var circleBase3 = new Konva.Circle({
    x: screenWidth/2+8,
    y: screenHeight/2+32,
    radius: 10,
    fill: '#F2C641',
    opacity: 0.7,
    shadowColor: 'black', // Couleur de l'ombre
    shadowBlur: 25,       // Flou de l'ombre
    shadowOffsetX: 5,     // Décalage horizontal de l'ombre
    shadowOffsetY: 5     // Décalage vertical de l'ombre
});

var circleBase4 = new Konva.Circle({
    x: screenWidth/2+20,
    y: screenHeight/2-38,
    radius: 5,
    fill: '#F2A007',
    opacity: 0.7,
    shadowColor: 'black', // Couleur de l'ombre
    shadowBlur: 25,       // Flou de l'ombre
    shadowOffsetX: 5,     // Décalage horizontal de l'ombre
    shadowOffsetY: 5     // Décalage vertical de l'ombre
});

var circleBase5 = new Konva.Circle({
    x: screenWidth/2+2,
    y: screenHeight/2+26,
    radius: 12,
    fill: '#594011',
    opacity: 0.7,
    shadowColor: 'black', // Couleur de l'ombre
    shadowBlur: 25,       // Flou de l'ombre
    shadowOffsetX: 5,     // Décalage horizontal de l'ombre
    shadowOffsetY: 5     // Décalage vertical de l'ombre
});

var circleBase6 = new Konva.Circle({
    x: screenWidth/2-14,
    y: screenHeight/2-25,
    radius: 17,
    fill: '#F28705',
    opacity: 0.7,
    shadowColor: 'black', // Couleur de l'ombre
    shadowBlur: 25,       // Flou de l'ombre
    shadowOffsetX: 5,     // Décalage horizontal de l'ombre
    shadowOffsetY: 5     // Décalage vertical de l'ombre
});

// Ajout du cercle au groupe
base.add(circleBase1);
base.add(circleBase2);
base.add(circleBase3);
base.add(circleBase4);
base.add(circleBase5);
base.add(circleBase6);

// Ajout du groupe au layer
layer.add(base);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////// JOUEUR /////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Création du Joueur 
var circle = new Konva.Circle({
    x: 700,
    y: 350,
    radius: 15,
    fill: '#02735E',
    shadowColor: 'black', // Couleur de l'ombre
    shadowBlur: 10,       // Flou de l'ombre
    shadowOffsetX: 5,     // Décalage horizontal de l'ombre
    shadowOffsetY: 5     // Décalage vertical de l'ombre
});
layer.add(circle);


// Déplacement du Joueur
let isMoving = false;

stage.on('mousemove', function (e) {
    if (!pause) {
        if (!isMoving) {
            isMoving = true;
            requestAnimationFrame(function () {
                var pos = stage.getPointerPosition();
                if (pos) {
                    if (pos.x > 30 && pos.x < screenWidth - 30 && pos.y > 30 && pos.y < screenHeight -30){
                        circle.x(pos.x);
                        circle.y(pos.y);
                        layer.draw();
                    }
                }
                isMoving = false;
            });
        }
    }
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////// TERRAIN ////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Groupe Mur 
var mur = new Konva.Group({
    x: 0,
    y: 0
});

// Mur Gauche 
var murGauche = new Konva.Rect({
    x: 0,
    y: 0,
    width: 20,
    height: screenHeight,
    fill: '#014040',
    shadowBlur: 10,       // Flou de l'ombre
    shadowOffsetX: 5,     // Décalage horizontal de l'ombre
    shadowOffsetY: 5     // Décalage vertical de l'ombre
});

// Mur Droit
var murDroit = new Konva.Rect({
    x: screenWidth - 20,
    y: 0,
    width: 20,
    height: screenHeight,
    fill: '#014040',
    shadowBlur: 10,       // Flou de l'ombre
    shadowOffsetX: 5,     // Décalage horizontal de l'ombre
    shadowOffsetY: 5     // Décalage vertical de l'ombre
});

// Mur Haut
var murHaut = new Konva.Rect({
    x: 0,
    y: 0,
    width: screenWidth,
    height: 20,
    fill: '#014040',
    shadowBlur: 10,       // Flou de l'ombre
    shadowOffsetX: 5,     // Décalage horizontal de l'ombre
    shadowOffsetY: 5     // Décalage vertical de l'ombre
});

// Mur Bas
var murBas = new Konva.Rect({
    x: 0,
    y: screenHeight - 20,
    width: screenWidth,
    height: 20,
    fill: '#014040',
    shadowBlur: 10,       // Flou de l'ombre
    shadowOffsetX: 5,     // Décalage horizontal de l'ombre
    shadowOffsetY: 5     // Décalage vertical de l'ombre
});

// On ajoute des murs supplémentaires pour améliorer le rendu des ombres

// Mur Gauche 1 bis
var murGauche3 = new Konva.Rect({
    x: 0,
    y: 0,
    width: 20,
    height: screenHeight/5,
    fill: '#014040'
});

// Mur Gauche 2 bis
var murGauche4 = new Konva.Rect({
    x: 0,
    y: (3*screenHeight)/5,
    width: 20,
    height: screenHeight/5,
    fill: '#014040'
});

// Mur Droit 1 bis
var murDroit3 = new Konva.Rect({
    x: screenWidth - 20,
    y: 0,
    width: 20,
    height: screenHeight/5,
    fill: '#014040'
});

// Mur Droit 2 bis
var murDroit4 = new Konva.Rect({
    x: screenWidth - 20,
    y: (3*screenHeight)/5,
    width: 20,
    height: (2*screenHeight)/5,
    fill: '#014040'
});

// Ajout des murs au groupe
mur.add(murGauche);
mur.add(murDroit);
mur.add(murHaut);
mur.add(murBas);
mur.add(murGauche3);
mur.add(murGauche4);
mur.add(murDroit3);
mur.add(murDroit4);


// Ajout du groupe au layer
layer.add(mur);

//########################################################################################################################//
/////////////////////// POUVOIR ////////////////////////////////////////////////////////////////////////////////////////////
//########################################################################################################################//

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////// BOMBE //////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var vitesse_explosion = 800;
var taille_explosion = 60;

if (pouvoir_choisi == "bombes"){
    // Création d'une bombe que le joueur pourra poser sur le terrain avec un clic gauche
    // La bombe explose au bout de 5 secondes et le joueur ne peux en poser qu'une à la fois
    var canDrop = true; // Cette variable indique si la bombe peut être posée

    // Création Bombe
    function CreaBombe(){
        var bombe = new Konva.Ring({
            x: stage.width() / 2,
            y: stage.height() / 2,
            innerRadius: 10,
            outerRadius: 15,
            fill: '#025159',
            shadowColor: 'black', // Couleur de l'ombre
            shadowBlur: 10,       // Flou de l'ombre
            shadowOffsetX: 5,     // Décalage horizontal de l'ombre
            shadowOffsetY: 5     // Décalage vertical de l'ombre
        });
        return bombe;
    }

    // Fonction pour l'animation de disparition des ennemis
    function AnimationExplosionBombe(bombe){
        var tween = new Konva.Tween({
            node: bombe,   
            duration: 0.1,
            innerRadius: 30,
            outerRadius: taille_explosion,
            opacity: 0,
            onFinish: function() {
                bombe.remove();
            }
        });
        tween.play();
    }

    // Gestionnaire d'événement de pose de bombe
    window.addEventListener('click', function (e) {
        if (e.button === 0 && canDrop) {
            var bombe = CreaBombe();
            bombe.x(circle.x());
            bombe.y(circle.y());
            layer.add(bombe);
            layer.draw();
            // canDrop = false; // Désactive la possibilité pour le joueur de poser une bombe temporairement

            // Réactive la possibilité pour le joueur de poser une bombe après 5 secondes
            setTimeout(function () {
                AnimationExplosionBombe(bombe);
                ExplosionBombe(bombe);
                canDrop = true;
            }, vitesse_explosion); // 1000 millisecondes (1 secondes)
        }
    });

    // Création d'une fonction qui regarde la position de tous les ennemis lors de l'explosion et les détruits si ils sont dans le rayon de l'explosion
    function ExplosionBombe(bombe){
        var i = ennemis.length;
        while (i--) {
            var ennemi = ennemis[i];
            console.log("Ennemi : ", ennemi.x(), ennemi.y());
            if (ennemi.x() < bombe.x() + taille_explosion && ennemi.x() > bombe.x() - taille_explosion && ennemi.y() < bombe.y() + taille_explosion && ennemi.y() > bombe.y() - taille_explosion){
                AnimationDisparitionEnnemi(ennemi);
                ennemis.splice(i, 1);
            }
        }
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////// HALO DE LUMIERE ////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var degat_halo = 0.2;
var taille_halo = 50;
var vitesse_halo = 1;

if (pouvoir_choisi == "halo"){
    var halo = new Konva.Ring({
        x: stage.width() / 2,
        y: stage.height() / 2,
        innerRadius: 35,
        outerRadius: taille_halo,
        opacity: 0.4,
        fill: '#025159',
        shadowColor: 'black',
        shadowBlur: 20,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
    });

    // Ajout de l'halo au layer
    layer.add(halo);

    // L'halo suit en permanence la souris pour donner l'impression que c'est l'halo du joueur 
    stage.on('mousemove', function (e) {
        var pos = stage.getPointerPosition();
        if (pos) {
            if (pos.x > 30 && pos.x < screenWidth - 30 && pos.y > 30 && pos.y < screenHeight -30){
                halo.x(pos.x);
                halo.y(pos.y);
                layer.draw();
            }
        }
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////// PROJECTILES ////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

if (pouvoir_choisi == "projectiles"){
    var canShoot = true; // Cette variable indique si le projectile peut être tiré
    var projectiles = []; // Tableau pour stocker les projectiles
    var nouveauProjectile = null; // Variable pour stocker le nouveau projectile
    var nbProjectiles = 0; // Variable pour compter le nombre de projectiles

    // Fonction pour l'animation de disparition des ennemis
    function AnimationDestructionProjectile(projectile){
        var tween = new Konva.Tween({
            node: projectile,   
            duration: 0.1,
            radius: 10,
            opacity: 0,
            onFinish: function() {
                projectile.remove();
            }
        });
        tween.play();
    }

    var vitesse_projectile = 7;
    var delai_projectile = 250;
    // Fonction pour mettre à jour la position des projectiles
    function updateProjectiles() {
        if(!pause){        
            var i = projectiles.length;
            while (i--) {
                var projectile = projectiles[i];
                if (projectile.name() == 'haut'){
                    projectile.y(projectile.y() - vitesse_projectile); // Vitesse de déplacement ici
                }
                if (projectile.name() == 'gauche'){
                    projectile.x(projectile.x() - vitesse_projectile); 
                }
                if (projectile.name() == 'bas'){
                    projectile.y(projectile.y() + vitesse_projectile); 
                }
                if (projectile.name() == 'droite'){
                    projectile.x(projectile.x() + vitesse_projectile); 
                }
                
                // Si le projectile est en dehors de l'écran on le retire
                if (projectile.y() < 0) {
                    projectile.remove();
                    projectiles.splice(i, 1);
                }
                if (projectile.x() < 0) {
                    projectile.remove();
                    projectiles.splice(i, 1);
                }
                if (projectile.y() > screenHeight) {
                    projectile.remove();
                    projectiles.splice(i, 1);
                }
                if (projectile.x() > screenWidth) {
                    projectile.remove();
                    projectiles.splice(i, 1);
                }
            
                if (ennemis.length > 0){
                    var j = ennemis.length;
                    while (j--) {
                        var ennemi = ennemis[j];
                        if (ennemi.x() < projectile.x() + ennemi.radius() && ennemi.x() > projectile.x() - ennemi.radius() && ennemi.y() < projectile.y() + ennemi.radius() && ennemi.y() > projectile.y() - ennemi.radius()){
                            AnimationDestructionProjectile(projectile);
                            projectiles.splice(i, 1);
                            if (ennemi.radius() > 15){
                                ennemi.radius(ennemi.radius() - 5);
                            } else if (ennemi.sides() > 3){
                                ennemi.sides(ennemi.sides() - 1);
                            } else {
                                AnimationDisparitionEnnemi(ennemi);
                                ennemis.splice(j, 1);
                            }
                        }
                    }
                }
            }
            layer.batchDraw(); // Mise à jour de la couche
        }
        requestAnimationFrame(updateProjectiles);
    }

    // Appel de la fonction de mise à jour des projectiles pour démarrer la boucle
    updateProjectiles();
    // Variable pour stocker la taille des projectile
    var taille_projectile = 5; 

    // Gestionnaire d'événement les projectiles
    window.addEventListener('keydown', function (e) {
        if ((e.key === 'z' || e.key === 'q' || e.key ==='s' || e.key === 'd') && canShoot) {
            if (!pause) {
                if (e.key === 'z'){
                    var nom = 'haut';
                }
                if (e.key === 'q'){
                    var nom = 'gauche';
                }
                if (e.key === 's'){
                    var nom = 'bas';
                }
                if (e.key === 'd'){
                    var nom = 'droite';
                }
                var projectile = new Konva.Circle({
                    x: circle.x(),
                    y: circle.y(),
                    radius: taille_projectile, // Taille du projectile 
                    fill: '#025159',
                    shadowColor: 'black', // Couleur de l'ombre
                    shadowBlur: 10,       // Flou de l'ombre
                    shadowOffsetX: 5,     // Décalage horizontal de l'ombre
                    shadowOffsetY: 5,     // Décalage vertical de l'ombre
                    name : nom
                });
                layer.add(projectile);
                projectiles.push(projectile); // Ajout du projectile au tableau
                canShoot = false; // Désactive la possibilité de tirer temporairement
                
                nbProjectiles++; // Incrémente le nombre de projectiles
                nouveauProjectile = projectile; // Stocke le nouveau projectile
                
                // Réactive la possibilité de tirer après une seconde
                setTimeout(function () {
                    canShoot = true;
                }, delai_projectile); // par défaut = 250 millisecondes (1/4 seconde)
            }
        }
    });
}

//########################################################################################################################//
/////////////////////// ENNEMIS ////////////////////////////////////////////////////////////////////////////////////////////
//########################################################################################################################//

var canSpawn = true; // Cette variable indique si le ennemi peut être tiré
var ennemis = []; // Tableau pour stocker les ennemis
var nbEnnemis = 0; // Variable pour compter le nombre d'ennemis
var nouvelEnnemi = null; // Variable pour stocker le nouvel ennemi

// Fonction pour l'animation de disparition des ennemis
function AnimationDisparitionEnnemi(ennemi){
    var tween = new Konva.Tween({
        node: ennemi,   
        duration: 0.1,
        radius: 0,
        opacity: 0,
        onFinish: function() {
            ennemi.remove();
        }
    });
    tween.play();
}

// Déplacement des ennemis vers la base 
// Variables pour la position de la base (centre de l'écran)
var baseX = screenWidth / 2;
var baseY = screenHeight / 2;

// Constante pour la force de gravité (ajustez selon vos besoins)

// Fonction pour mettre à jour la position des ennemis et vérifier les collisions
var vitesse_ennemi = 1;
function updateEnnemis() {
    if (!pause){
        var i = ennemis.length;
        while (i--) {
            var ennemi = ennemis[i];

                /////// DEPLACEMENT VERS BASE ////////

                // Calculez la distance entre l'ennemi et la base
                var dx = baseX - ennemi.x();
                var dy = baseY - ennemi.y();

                if (ennemi.name() == 'basique') {
                    var vitesseEnnemi = 1;
                } else if (ennemi.name() == 'rapide' || ennemi.name() == 'boss'){
                    var vitesseEnnemi = 1.3;
                } else if (ennemi.name() == 'rapide+'){
                    var vitesseEnnemi = 1.6;
                } else if (ennemi.name() == 'rapide++' || ennemi.name() == 'ultime'){
                    var vitesseEnnemi = 1.9;
                } else if (ennemi.name() == 'resistant'){
                    var vitesseEnnemi = 0.9;
                } else if (ennemi.name() == 'resistant+'){
                    var vitesseEnnemi = 0.8;
                } else if (ennemi.name() == 'resistant++'){
                    var vitesseEnnemi = 0.7;
                }

                // On affecte une valeur à la force qui correspond à la vitesse de l'ennemi
                var force = vitesseEnnemi * vitesse_ennemi;
                if (pouvoir_choisi == "halo" && ennemi.name() != 'boss'){
                    if (ennemi.x() < circle.x() + 50 && ennemi.x() > circle.x() - 50 && ennemi.y() < circle.y() + 50 && ennemi.y() > circle.y() - 50){
                        force = force * vitesse_halo;
                    }
                }
                // Calculez la direction de la force
                var angle = Math.atan2(dy, dx);

                // Appliquez la force pour déplacer l'ennemi
                ennemi.x(ennemi.x() + force * Math.cos(angle));
                ennemi.y(ennemi.y() + force * Math.sin(angle));
    

                /////// COLLISION BASE ////////
                if (ennemi.x() < screenWidth/2 + 45 && ennemi.x() > screenWidth/2 - 45 && ennemi.y() < screenHeight/2 + 45 && ennemi.y() > screenHeight/2 - 45){
                    AnimationDisparitionEnnemi(ennemi);
                    ennemis.splice(i, 1);
                    life--;
                    if (ennemi.name() == 'boss'){
                        life = 0;
                    }
                    vie_perdu();
                }

                /////// COLLISION HALO ////////
                if (pouvoir_choisi == "halo"){
                    if (ennemi.x() < circle.x() + (taille_halo + ennemi.radius()) && ennemi.x() > circle.x() - (taille_halo + ennemi.radius()) && ennemi.y() < circle.y() + (taille_halo + ennemi.radius()) && ennemi.y() > circle.y() - (taille_halo + ennemi.radius())){
                        if (ennemi.radius() > 12){
                            ennemi.radius(ennemi.radius() - degat_halo);
                        }else{
                            AnimationDisparitionEnnemi(ennemi);
                            ennemis.splice(i, 1);
                        } 
                    }
                }
            
        }
        layer.batchDraw(); // Mettre à jour la couche
    }
    requestAnimationFrame(updateEnnemis);
}

// Appeler la fonction de mise  nà jour des ennemis pour démarrer la boucle
updateEnnemis();

var nb_coups_boss = 0;
// Fonction de création des ennemis 
function CreaEnnemis() { 

        //////////// Génération aléatoire des coordonnées X et Y pour les ennemis ////////////
        var PositionX, PositionY;
        if (Math.random() < 0.5) { // 50% de chance d'apparition sur l'axe X
        PositionX = Math.random() * screenWidth;
        PositionY = Math.random() < 0.5 ? 0 : screenHeight + 10;
        } else { // 50% de chance d'apparition sur l'axe Y
        PositionY = Math.random() * screenHeight;
        PositionX = Math.random() < 0.5 ? 0 : screenWidth + 10;
        }

        //////////// Génération aléatoire du type d'ennemie ////////////
        // Manche - Multiple de 10 : Boss
        if (manche % 10 === 0){
            var type = 'boss';
        }
        // Manche 30 : Survie Hardcore
        else if (manche >= 31){
            var type = Math.floor(Math.random() * 3) + 1;
            if (type === 1){
                type = 'rapide++';
            } else if (type === 2){
                type = 'resistant++';
            } else if (type === 3){
                type = 'ultime';
            }
        } 
        // Manche 21 : Ultime
        else if (manche >= 21){
            var type = Math.floor(Math.random() * 5) + 1;
            if (type === 1){
                type = 'rapide+';
            } else if (type === 2){
                type = 'resistant+';
            } else if (type === 3){
                type = 'rapide++';
            } else if (type === 4){
                type = 'resistant++';
            } else if (type === 5){
                type = 'ultime';
            }
        }
        // Manche 16 : Résistant ++
        else if (manche >= 16){
            var type = Math.floor(Math.random() * 6) + 1;
            if (type === 1){
                type = 'rapide';
            } else if (type === 2){
                type = 'resistant';
            } else if (type === 3){
                type = 'rapide+';
            } else if (type === 4){
                type = 'resistant+';
            } else if (type === 5){
                type = 'rapide++';
            } else if (type === 6){
                type = 'resistant++';
            }
        }
        // Manche 13 : Rapide ++
        else if (manche >= 13){
            var type = Math.floor(Math.random() * 6) + 1;
            if (type === 1){
                type = 'basique';
            } else if (type === 2){
                type = 'rapide';
            } else if (type === 3){
                type = 'resistant';
            } else if (type === 4){
                type = 'rapide+';
            } else if (type === 5){
                type = 'resistant+';
            } else if (type === 6){
                type = 'rapide++';
            }
        }
        // Manche 11 : Résistant +
        else if (manche >= 11){
            var type = Math.floor(Math.random() * 5) + 1;
            if (type === 1){
                type = 'basique';
            } else if (type === 2){
                type = 'rapide';
            } else if (type === 3){
                type = 'resistant';
            } else if (type === 4){
                type = 'rapide+';
            } else if (type === 5){
                type = 'resistant+';
            }
        }
        // Manche 8 : Rapide +
        else if (manche >= 8){
            var type = Math.floor(Math.random() * 4) + 1;
            if (type === 1){
                type = 'basique';
            } else if (type === 2){
                type = 'rapide';
            } else if (type === 3){
                type = 'resistant';
            } else if (type === 4){
                type = 'rapide+';
            }
        }
        // Manche 6 : Résistant
        else if (manche >= 6){
            var type = Math.floor(Math.random() * 3) + 1;
            if (type === 1){
                type = 'basique';
            } else if (type === 2){
                type = 'rapide';
            } else if (type === 3){
                type = 'resistant';
            }
        }
        // Manche 3 : Rapide
        else if (manche >= 3){
            var type = Math.floor(Math.random() * 2) + 1;
            if (type === 1){
                type = 'basique';
            } else if (type === 2){
                type = 'rapide';
            }
        }
        // Manche 1 : Basique
        else if (manche >= 1){
            var type = 'basique';
        }

        // console.log(type);
        
        // Géstionaire des statistiques pour chaque type d'ennemis
        var opacity = 1;
        var nbCotes = 3;
        var taille = 15;
        if (type === 'basique'){
            var couleur = '#F2BD1D';
        } else if (type === 'rapide' || type === 'rapide+' || type === 'rapide++' ){
            var couleur = '#F28705';
        } else if (type === 'resistant' ){
            var taille = 20; 
            var couleur = '#BF4904';        
        } else if (type === 'resistant+' ){
            var taille = 25;
            var couleur = '#BF4904';
        } else if (type === 'resistant++' ){
            var taille = 30;
            var couleur = '#BF4904';
        } else if (type === 'ultime' ){
            var taille = 30;
            var couleur = '#732210';
        } else if (type === 'boss'){
            var nbCotes = manche*2-(nb_coups_boss*manche);
            var taille = 40;
            if (pouvoir_choisi == "halo"){
                var nbCotes = 8;
                var taille = 10*manche;
            }
            var couleur = '#3D1701';
            var PositionX = -100;
            var PositionY = screenHeight / 2;
        }

        // console.log("Position X : ", PositionX);
        // console.log("Position Y : ", PositionY);
        var ennemi = new Konva.RegularPolygon({
            x: PositionX,
            y: PositionY,
            sides: nbCotes,
            radius: taille,
            fill: couleur,
            opacity: opacity,
            shadowColor: 'black',
            shadowBlur: 10,       
            shadowOffsetX: 5,     
            shadowOffsetY: 5,
            name: type
        });

        return ennemi; 
}

//########################################################################################################################//
/////////////////////// GAMEPLAY ///////////////////////////////////////////////////////////////////////////////////////////
//########################################################################################################################//

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////// AMELIORATIONS //////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// On écrit les améliorations sous forme de tableau
// [Nom, Description, Image, Id de la fonction]

// améliration commune
var amelioration_Lenteur = ["Lenteur", "- 20% à la vitesse de tous les ennemis", "lenteur", 1];
var amelioration_Vie = ["Vie supplémentaire", "Votre nombre total de vie augmente de 2", "vie_plus", 2];
var amelioration_Boss_bouclier = ["Protection Boss -", "Baisse fortement le nombre de coups qu'un Boss doit recevoir pour être éliminé", "protection",3];
var amelioration_Vitesse_apparition = ["Vitesse d'apparition", "+ 20% de délai pour chaque intervalle d’apparition des ennemis", "sablier", 4];

// améliration specific

// amélioration pour projectiles
if (pouvoir_choisi == "projectiles"){
    var amelioration_Taille_balle = ["Taille Balle +", "+ 50% à la taille de chacun de vos projectiles","agrandissement", 5];
    var amelioration_Vitesse_balle = ["Vitesse Balle +", "+ 50% à la vitesse de tous vos projectiles", "eclair", 6];
    var amelioration_Rechargement_balle = ["Rechargement Balle +", "-40% de délai entre chacun de vos projectiles", "sablier", 7];
}

// amélioration pour l'halo
if (pouvoir_choisi == "halo"){
    var amelioration_Taille_halo = ["Taille Halo +", "+ 50% à la taille totale de votre Halo","agrandissement", 5];
    var amelioration_Degat_halo = ["Degat Halo +", "Double les dégats initiales produits par votre halo", "degat_halo", 6];
    var amelioration_Taille_halo = ["Immobilisation", "- 50% à la vitesse des ennemis pris par votre halo", "sablier", 7];
}

// amélioration pour les bombes
if (pouvoir_choisi == "halo"){
    var amelioration_Taille_explosion = ["Taille Explosion +", "+ 50% à la taille totale des explosions des bombes","agrandissement", 5];
    var amelioration_vitesse_explosion = ["Vitesse Explosion +", "- 50% de délai avant l’explosion des bombes", "degat_halo", 6];
}
function Amelioration_pouvoir(id_pouvoir){
    if (id_pouvoir === 1){
        vitesse_ennemi = vitesse_ennemi -0.2; 
    }else if (id_pouvoir === 2){
        vie_max = vie_max + 2;
    }else if (id_pouvoir === 3){
        if (nb_coups_boss < 1){
            nb_coups_boss = nb_coups_boss + 0.2;
        }   
    }else if (id_pouvoir === 4){
        vitesse_apparition = Math.floor(vitesse_apparition * 1.2);
    }
    else if (pouvoir_choisi == "projectiles"){
        if (id_pouvoir === 5){
            taille_projectile = Math.floor(taille_projectile *2);
        }else if (id_pouvoir === 6){
            vitesse_projectile = Math.floor(vitesse_projectile * 1.5);
        }else if (id_pouvoir === 7){
            delai_projectile = Math.floor(delai_projectile * 0.6);
        }
    } else if (pouvoir_choisi == "halo"){
        if (id_pouvoir === 5){
            taille_halo = Math.floor(taille_halo * 1.5);
        } else if (id_pouvoir === 6){
            degat_halo = degat_halo + 0.2;
        } else if (id_pouvoir === 7){
            vitesse_halo = vitesse_halo * 0.5;
        }
    } else if (pouvoir_choisi == "halo"){
        if (id_pouvoir === 5){
            taille_explosion = Math.floor(taille_explosion * 1.5);
        } else if (id_pouvoir === 6){
            vitesse_explosion = Math.floor(vitesse_explosion * 0.5);
        }
    }

}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////// GESTIONAIRE MANCHES ////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Initialisation des variables de lancement
var manche = 0; 
var PointManche;

var opacity_manche = 0;

// Animation du texte des manches
function AnimationManche(manche){
    var TextManche = new Konva.Text({
        x: stage.width() / 2,
        y: 150,
        text: 'Manche ' + manche,
        opacity: opacity_manche,
        fontSize: 50,
        fontFamily: 'Inter',
        fontStyle: '75',
        fill: '#014040',
        shadowColor: 'black', // Couleur de l'ombre
        shadowBlur: 20,       // Flou de l'ombre
        shadowOffsetX: 5,     // Décalage horizontal de l'ombre
        shadowOffsetY: 5     // Décalage vertical de l'ombre
      });
    TextManche.offsetX(TextManche.width() / 2);
    layer.add(TextManche);

    var tween = new Konva.Tween({
        node: TextManche,
        duration: 2,
        opacity: 1,
        onFinish: function() {
            var tween2 = new Konva.Tween({
                node: TextManche,
                duration: 2,
                opacity: 0,
                onFinish: function() {
                }
            });
            tween2.play();        
        }
    });
    tween.play();

    setTimeout(function () {
        TextManche.remove();
    }, 3000); // 3 secondes
}

var antipause = 0; // On créer une variable pour empêcher de faire pause pendant le choix des améliorations
document.getElementById('amelioration').style.display = 'none';

// Gestionnaire d'événement d'apparition pour les ennemis
// Fonction pour démarrer la génération d'ennemis
// Fonction pour démarrer la génération d'ennemis
function startGeneratingEnnemis() {
    if (ennemis.length === 0 && !pause) {
        // On affiche le numéro de la manche
        manche++;
        AnimationManche(manche);
        life = vie_max;
        container.style.backgroundColor = '#03A696';
        PointManche = 6 * manche + 10;      
        if (manche > 10){
            PointManche = 8 * manche;
        } else if (manche > 15){
            PointManche = 10 * manche;
        } else if (manche > 20){
            PointManche = 12 * manche;
        } else if (manche > 30){
            PointManche = 15 * manche;
        } else if (manche > 40){
            PointManche = 20 * manche;
        } else if (manche > 50){
            PointManche = 40 * manche;
        }

        generateEnnemis(); // Démarre la génération d'ennemis

        // Si la manche est un multiple de 5 alors on affiche l'écran de choix des amélioratons
        console.log("Manche : " + manche);
        if ((manche-1) % 10 == 0 && antipause == 0 && manche > 2) {
            antipause = 1;
            pause = 1;

            var power1 = 0;
            var power2 = 0;
            var power3 = 0;
            while (power1 == power2 || power1 == power3 || power2 == power3 ){
                var power1 = Math.floor(Math.random() * 7) + 1;
                var power2 = Math.floor(Math.random() * 7) + 1;
                var power3 = Math.floor(Math.random() * 7) + 1;
            }
            
            
            // Créez un objet de mappage pour les pouvoirs
            if (pouvoir_choisi == "projectiles"){
                var powerMapping = {
                    1: amelioration_Lenteur,
                    2: amelioration_Vie,
                    3: amelioration_Boss_bouclier,
                    4: amelioration_Vitesse_apparition,
                    5: amelioration_Taille_balle,
                    6: amelioration_Vitesse_balle,
                    7: amelioration_Rechargement_balle
                };
            } else if (pouvoir_choisi == "halo"){
                var powerMapping = {
                    1: amelioration_Lenteur,
                    2: amelioration_Vie,
                    3: amelioration_Boss_bouclier,
                    4: amelioration_Vitesse_apparition,
                    5: amelioration_Taille_halo,
                    6: amelioration_Degat_halo,
                    7: amelioration_Taille_halo
                };
            } else if (pouvoir_choisi == "bombes") {
                var powerMapping = {
                    1: amelioration_Lenteur,
                    2: amelioration_Vie,
                    3: amelioration_Boss_bouclier,
                    4: amelioration_Vitesse_apparition,
                    5: amelioration_Taille_explosion,
                    6: amelioration_vitesse_explosion,
                };
            }
            // Utilisez une boucle pour mettre à jour power1, power2 et power3
            power1 = powerMapping[power1] || power1;
            power2 = powerMapping[power2] || power2;
            power3 = powerMapping[power3] || power3;

            // On affecte les textes pour les amélioratios
            this.document.getElementById('amelioration1_img').innerHTML ="<img class='pouvoir' src='img/pouvoir/"+ power1[2] +".png' style='height: 10vh; width: auto;' alt='Image de la première amélioration'>";
            this.document.getElementById('amelioration1_nom').innerHTML = power1[0];
            this.document.getElementById('amelioration1_contenue').innerHTML = power1[1];

            this.document.getElementById('amelioration2_img').innerHTML ="<img class='pouvoir' src='img/pouvoir/"+ power2[2] +".png' style='height: 10vh; width: auto;' alt='Image de la deuxième amélioration'>";
            this.document.getElementById('amelioration2_nom').innerHTML = power2[0];
            this.document.getElementById('amelioration2_contenue').innerHTML = power2[1];

            this.document.getElementById('amelioration3_img').innerHTML ="<img class='pouvoir' src='img/pouvoir/"+ power3[2] +".png' style='height: 10vh; width: auto;' alt='Image de la troisième amélioration'>";
            this.document.getElementById('amelioration3_nom').innerHTML = power3[0];
            this.document.getElementById('amelioration3_contenue').innerHTML = power3[1];

            // On affiche le menu des améliorations
            document.getElementById('amelioration').style.display = 'block';

            // On prépare les boutons de choix des améloirations
            const bouton1 = document.getElementById("play amelioration1_button");
                bouton1.addEventListener("click", (event) => {
                document.getElementById('amelioration').style.display = 'none';
                Amelioration_pouvoir(power1[3]);
                pause = 0;
                antipause = 0;
            });

            const bouton2 = document.getElementById("play amelioration2_button");
            bouton2.addEventListener("click", (event) => {
                Amelioration_pouvoir(power2[3]);
                document.getElementById('amelioration').style.display = 'none';
                pause = 0;
                antipause = 0;

            });

            const bouton3 = document.getElementById("play amelioration3_button");
            bouton3.addEventListener("click", (event) => {
                document.getElementById('amelioration').style.display = 'none';
                Amelioration_pouvoir(power3[3]);
                pause = 0;
                antipause = 0;
            });
        }
    }
    // Ajouter un délai de 3 secondes (3000 millisecondes) avant de relancer
    setTimeout(function () {
        requestAnimationFrame(startGeneratingEnnemis);
    }, 3000); // 3 secondes
}

// Gestionnaire d'événement de clic initial
container.addEventListener('click', function () {
    if (ennemis.length === 0) {
        startGeneratingEnnemis();
    }
});

var vitesse_apparition = 400;
// Fonction de génération des ennemis
function generateEnnemis() {
    if (!pause){
        if (canSpawn && PointManche > 0) {
            var ennemi = CreaEnnemis();
            layer.add(ennemi);
            ennemis.push(ennemi);
            canSpawn = false;
            
            nouvelEnnemi = ennemi;
            // console.log("Nombre d'ennemis actifs : ", ennemis.length);        
            if (ennemi.name() === 'boss'){
                PointManche = 1;
            }
            setTimeout(function () {
                canSpawn = true;
                PointManche--;
                generateEnnemis(); // Appel récursif pour générer le prochain ennemi
            }, vitesse_apparition);
        }
    } else {
        requestAnimationFrame(generateEnnemis); // Appel récursif pour reprendre la génération aprè la pause 
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////// EVENEMENT VIE PERDU ////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function AnimationViePerdu(){
    var tween = new Konva.Tween({
        node: circle,   
        duration: 0.1,
        radius: 20,
        opacity: 0.5,
        fill: '#FF0000',
        onFinish: function() {
            var tween2 = new Konva.Tween({
                node: circle,   
                duration: 0.1,
                radius: 15,
                opacity: 1,
                fill: '#02735E',
                onFinish: function() {
                }
            });
            tween2.play();        
        }
    });
    tween.play();

}


document.getElementById('perdu').style.display = 'none';

function AnimationDefaite(){
    pause = 1;
    this.document.getElementById('score').innerHTML = "Manche : <b>" + manche+"</b>";
    document.getElementById('perdu').style.display = 'block';
}


function vie_perdu(){
    var container = document.getElementById('container');
    if (life === 4){
        container.style.backgroundColor = '#039485';
    } else if (life === 3){
        container.style.backgroundColor = '#038275';
    } else if (life === 2){
        container.style.backgroundColor = '#027065';
    } else if (life === 1){
        container.style.backgroundColor = '#025E55';
    } else if (life === 0){
        container.style.backgroundColor = '#024D45';
        AnimationDefaite();
    }
    AnimationViePerdu();
    console.log("Vie perdu");
    console.log("Vie : ", life);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////// PAUSE / OPTION /////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Gestionnaire du systéme de pause
var pause = false;
window.addEventListener('keydown', function (e) {
    if (e.key === ' ' && life > 0 && !antipause) {
        if (pause === false){
            pause = true;
            console.log("Pause");
            // On remplace le texte de Pause pour y mettre le numéro de la manche
            this.document.getElementById('pause_text').innerHTML = "Manche : <b>" + manche +"</b>";
            document.getElementById('pause').style.display = 'flex';
        } else {
            pause = false;
            console.log("Reprise");
            document.getElementById('pause').style.display = 'none';
        }
    }
});

// Gestionnaire de la fenêtre d'option
document.getElementById('option').style.display = 'none';

// On prépare le bouton pour accéder au options
const bouton_option = document.getElementById("option_bouton");
    bouton_option.addEventListener("click", (event) => {
        antipause = 1;
        document.getElementById('pause').style.display = 'none';
        document.getElementById('option').style.display = 'inline';
});

// On prépare le bouton pour fermer les options
const bouton_fermeture_option = document.getElementById("fermeture");
    bouton_fermeture_option.addEventListener("click", (event) => {
        antipause = 0;
        document.getElementById('pause').style.display = 'flex';
        document.getElementById('option').style.display = 'none';
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////// LANCEMENT DU JEU ///////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

startGeneratingEnnemis();

stage.add(layer);
layer.draw();
});