# Geometric Dungeon

J'ai développé un petit jeu dans lequel vous contrôlez une sphère dotée de pouvoirs spéciaux et chargée de défendre une base contre des ennemis. Le jeu offre une expérience dynamique grâce à des éléments aléatoires et a été créé en utilisant la bibliothèque Konva en JavaScript.

# Régle du jeu

Vous démarrez le jeu en choisissant l'un des trois pouvoirs disponibles sur le second écran. 
Votre mission consiste à éliminer les ennemis en utilisant votre pouvoir pour défendre votre base, 
située au centre de l'écran. Vous disposez de 5 vies au début de chaque partie. À la fin de chaque manche, 
votre nombre de vies est rétabli à son niveau initial si vous en avez perdu. Toutes les 10 manches, 
vous serez confronté à un boss redoutable. À la suite de chaque combat contre un boss, 
vous aurez la possibilité de choisir parmi trois améliorations. Ces améliorations sont proposées 
de manière aléatoire et peuvent varier d'une partie à l'autre, ainsi que d'un pouvoir à l'autre

En ce qui concerne les ennemis, il existe au total quatre types différents : Basique, Rapide, Résistant et Ultime.
Les ennemis Basiques ont un seul point de vie et font leur apparition dès la première manche. 
Les ennemis Rapides et Résistants font leur apparition respectivement aux manches 3 et 6. 
Ces deux types d'ennemis possèdent des améliorations liées au nombre de vies ou à leur vitesse. 
Les ennemis Ultimes sont une combinaison redoutable des caractéristiques des ennemis Rapides et Résistants, 
mais ils n'apparaissent qu'à partir de la manche 21.