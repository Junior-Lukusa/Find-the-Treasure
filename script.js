//Le code du jeu

//fonction qui permettra de définir une position aléatoire du trésor
var creerNombreAleatoire = function (dimension) {
    nombreAleatoire = Math.floor(Math.random() * (dimension - 1));
    console.log("Le nombre aléatoire est : " + nombreAleatoire);
    return nombreAleatoire;
};


//Calculer la distance entre le clic et la cible
var calculerDistance = function (evenement, cible) {
    var diffX = evenement.offsetX - cible.x;
    var diffY = evenement.offsetY - cible.y;
    return Math.sqrt((diffX * diffX) + (diffY * diffY));
};

//Chaîne correspondant à la distance
var creerIndiceDistance = function (distance) {
    if (distance < 13) {
        return "ça brûle vraiment !";
    } else if (distance < 15) {
        return "ça brûle !";
    } else if (distance < 20) {
        return "C'est vraiment chaud!";
    } else if (distance < 40) {
        return "C'est un peu chaud !";
    } else if (distance < 80) {
        return "C'est tiède !";
    } else if (distance < 160) {
        return "C'est froid !";
    } else if (distance < 320) {
        return "C'est vraiment froid !";
    } else {
        return "C'est l'hiver là-bas !"
    }
};

//Mettre une croix sur les positions déjà cliquées

//Constructeur de Croix

//Croix Rouge
var CroixRouge = function (x, y) {
    this.x = x;
    this.y = y;
//    this.croixHtml = '<img id ="croixrouge" width = 16 height = 16 src = "https://cdn.pixabay.com/photo/2012/04/15/19/12/cross-34976_960_720.png">;';
    this.croixHtml = '<img id ="croixrouge" width = 16 height = 16 src = "https://www.yemp.co/wp-content/uploads/2018/11/red-cross-1-300x300.png">;';
}
//Dernière Croix Rouge
var DerniereCroixRouge = function (x, y) {
    this.x = x;
    this.y = y;
    this.croixHtml = '<img id ="dcroixrouge" width = 16 height = 16 src = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Red_X.svg/240px-Red_X.svg.png">;';
}


CroixRouge.prototype.dessiner = function () {

    this.croixElement = $(this.croixHtml);
    this.croixElement.css({
        position: "absolute",
        left: this.x,
        top: this.y,
    });
    $("body").append(this.croixElement);
};

DerniereCroixRouge.prototype.dessiner = function () {

    this.croixElement = $(this.croixHtml);
    this.croixElement.css({
        position: "absolute",
        left: this.x,
        top: this.y,
    });
    $("body").append(this.croixElement);
};

//Croix Verte
var CroixVerte = function (x, y) {
    this.x = x;
    this.y = y;
    this.croixHtml = '<img id ="croixverte" width = 16 height = 16 src = "http://nsm08.casimages.com/img/2016/06/07/16060705585115523514289442.gif">;';
}

CroixVerte.prototype.dessiner = function () {

    this.croixElement = $(this.croixHtml);
    this.croixElement.css({
        position: "absolute",
        left: this.x,
        top: this.y,
    });
    $("body").append(this.croixElement);
};


//Dimensions de la carte au trésor
var largeur = 600;
var hauteur = 400;

//Constructeur du trésor
var Tresor = function (x, y) {
    this.x = x;
    this.y = y;
}

Tresor.prototype.dessinerTresor = function () {
    //var tresorHtml = '<img id ="croix" width = 50 height = 50 src = "https://thumbs.dreamstime.com/z/coffre-au-trsor-d-pe-de-garon-de-pirate-d-isolement-41516732.jpg">;';
    //var tresorHtml = '<img id ="croix" width = 400 height = 400 src = "http://blog.annikids.com/wp-content/uploads/2014/04/min_image.php_1.jpeg">;
    //				var tresorHtml = '<img id ="croix" width = 400 height = 400 src = "http://www.st-hubert.com/images/product/10299_p.jpg">';
    var tresorHtml = '<img id ="croix" width = 640 height = 400 src = "https://st2.depositphotos.com/1000389/12243/i/950/depositphotos_122435564-stock-photo-roasted-chicken-on-white-background.jpg">';


    this.tresorElement = $(tresorHtml);
    this.tresorElement.css({
        position: "absolute",
        left: this.x,
        top: this.y,
    });
    $("body").append(this.tresorElement);
};


var cible = {
    x: creerNombreAleatoire(largeur), //Pour corriger la position avec les offset des images
    y: creerNombreAleatoire(hauteur)
}




//GESTIONNAIRE DE CLICS *************************************************************************************
var clics = 0;
var limiteDeClics = 10; //Trouver un liens avec les dimensions de la carte
var reussite = 10; //Ne pas l'initialiser à 0 pour qu'une fois le jeu réussi, il fasse disparaitre la carte en ayant la valeur 1

$("#carte", "body").click(function (evenement) {
    
    clics++;
    limiteDeClics--;
    reussite++;

    if (reussite == 1) {
        $("body").text("Actualisez la page pour rejouer");
    };

    //Pour vérifier si le clic se fait sur la carte.

    //Calcul de la distance clic - cible
    var distance = calculerDistance(evenement, cible);
    
    //Indice de la position du clic par rapport à la cible
    var indiceDistance = creerIndiceDistance(distance);

    $("#distance").text(indiceDistance + " T'es à " + Math.floor(distance) + " pixels.");
    $("#limite").text("Il te reste " + limiteDeClics + " clics !");
    
    

    if (distance <= 11.5) {
        $("#distance").text(" T'es arrivé à " + Math.floor(distance) + " pixel(s) du trésor.");
        $("#limite").fadeOut(1000);
        $("#victoire").append("Aaaaaah 🙈🙈C'est lui là🙈🙈. <br>Bravo, Tu as retrouvé le Poulet en " + clics + " clics !");
        $("#recompense").append("Tu gagnes donc " + Math.floor(100 / clics) + "<strong>🍗</strong>.");
        $("#actualiser").text("Actualise la page pour recommencer!");
        $("body").append("<h1 style='color:red'>Merci beaucoup d'avoir joué. </h1>");
        $("body").append("<h2>Makak 🐵 a besoin de 200 🍗, au moins</h2>");
        $("body").append("<h1>🐵 🙈 🙉 🙊 🐒</h1>");
        x = cible.x + (evenement.pageX - evenement.offsetX) - 8; //Pour centrer la croix avec la pointe du curseur au clic
        y = cible.y + (evenement.pageY - evenement.offsetY) - 8; //La croix a les dimensions 16 x 16
        var croix = new CroixVerte(x, y);
        croix.dessiner();
        console.log("Tu as déjà cliqué à (" + evenement.offsetX + "," + evenement.offsetY + ")");

        xTresor = evenement.pageX - evenement.pageX + largeur + 20; // + evenement.offsetX;
        yTresor = evenement.pageY - evenement.offsetY; //Attention avec le repere de la page et celui de l'image
        var tresor = new Tresor(xTresor, yTresor);
        tresor.dessinerTresor();
        reussite = 0;
        return;
    };

    if (limiteDeClics == 0) {
        $("#positionSurCarte").text("" + Math.floor(distance) + " pixels.");
        $("#positionSurCarte").fadeIn(10);
        $("#distance").text(" T'étais à " + Math.floor(distance) + " pixel(s) du trésor au dernier clic");
        $("#victoire").text("GAME OVER!");
        $("#recompense").append("😭😭😭😭😭😭<br>Makak a besoin d'aide. STP🙊");
        $("#actualiser").text("Actualise la page pour recommencer!");
        $("body").append("<h1 style='color:red'>Merci beaucoup d'avoir joué. </h1>")
        x = cible.x - 8; //Pour centrer la croix avec la pointe du curseur au clic
        y = cible.y + (evenement.pageY - evenement.offsetY) - 8; //La croix a les dimensions 16 x 16
        var croix = new CroixVerte(x, y);
        croix.dessiner();
        console.log("Tu as déjà cliqué à (" + evenement.offsetX + "," + evenement.offsetY + ")");

    };

    if (limiteDeClics == -1) {
        $("body").text("");
        $("body").append("<h2>T'étais à pas loin🙈</h2>");
        $("body").append("<h1>GAME OVER!</h1>");
        $("body").append("<h1>😭😭😭😭😭😭<br>Makak a besoin d'aide. STP🙊🙈</h1>");
        $("body").append("<h3>Actualise la page pour recommencer!</h3>");
        $("body").append("<h1 style='color:red'>Merci beaucoup d'avoir joué. </h1>")
    };

    
    //Affichage de la croix
    //croix(evenement);
    x = evenement.offsetX + (evenement.pageX - evenement.offsetX) - 8; //Pour centrer la croix avec la pointe du curseur au clic
    y = evenement.offsetY + (evenement.pageY - evenement.offsetY) - 8; //La croix a les dimensions 16 x 16

    if (clics > 1) {
        var croix = new CroixRouge(ancienX, ancienY);
        croix.dessiner();
    }
    
    ancienX = x;
    ancienY = y;
    
    var croix = new DerniereCroixRouge(x, y);
    croix.dessiner();

    $("#positionSurCarte").text("" + Math.floor(distance) + " pixels.");
    $("#positionSurCarte").fadeIn(10);


    $("html").click(function (evenement) {
        $("#positionSurCarte").offset({
            left: x + 16,
            top: y

        });
        $("#positionSurCarte").text("" + Math.floor(distance) + " pixels.");
        $("#positionSurCarte").fadeOut(1000);

    });
});
