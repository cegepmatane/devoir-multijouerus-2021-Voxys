class App{
  constructor(){
    this.multiNode = new MultiNode();
    this.multiNode.confirmerConnexion = () => this.confirmerConnexion();
    this.multiNode.confirmerAuthentification = (autresParticipants) => this.confirmerAuthentification(autresParticipants);
    this.multiNode.apprendreAuthentification = (pseudonyme) => this.apprendreAuthentification(pseudonyme);
    this.multiNode.recevoirVariable = (variable) => this.recevoirVariable(variable);

    this.listeJoueur = {};
    this.pseudonymeJoueur = "";
    this.pseudonymeAutreJoueur = "";

    this.formulaireAuthentification = document.getElementById("formulaire-authentification");
    this.formulaireAuthentification.addEventListener("submit", (evenementsubmit) => this.soumettreAuthentificationJoueur(evenementsubmit))
    this.boutonAuthentification = document.getElementById("bouton-authentification");
    this.champPseudonyme = document.getElementById("champ-pseudonyme");
    this.champPseudonymeJoueur = document.getElementById("champ-pseudonyme-joueur");
    this.champPseudonymeAdversaire = document.getElementById("champ-pseudonyme-adversaire");
    this.fieldDebutPartie = document.getElementById("field-debut-partie");
    this.fieldJoueur = document.getElementById("field-joueur");
    this.fieldAdversaire = document.getElementById("field-adversaire");
    this.fieldLancerDes = document.getElementById("field-lancer-des");
    this.boutonLancerDes = document.getElementById("bouton-lancer-des");
    this.resultatLancerDes = document.getElementById("resultat-lancer-des");
    this.champCompteurJoueur = document.getElementById("compteur-joueur");
    this.champCompteurAdversaire = document.getElementById("compteur-adversaire");

    this.imageJoueurDe1 = document.getElementById("joueur-de1");
    this.imageJoueurDe2 = document.getElementById("joueur-de2");
    this.imageAdversaireDe1 = document.getElementById("adversaire-de1");
    this.imageAdversaireDe2 = document.getElementById("adversaire-de2");


    this.compteurJoueur = 0;
    this.compteurAdversaire = 0;

    this.dernierDe1Adversaire = 0;
    this.dernierDe2Adversaire = 0;

    this.fieldJoueur.style.display = "none";
    this.fieldAdversaire.style.display = "none";
    this.fieldLancerDes.style.display = "none";
    this.boutonLancerDes.style.display = "none";
    this.boutonLancerDes.addEventListener("click", (evenementdes) => this.soumettreLancer());

    this.compteurTour = 0;
  }

  soumettreAuthentificationJoueur(evenementsubmit){
    console.log("soumettreAuthentificationJoueur");
    evenementsubmit.preventDefault();
    //La demande de connexion au serveur est asynchrone, il faut attendre la réponse du serveur
    //pour faire une demande d'authenbtification
    this.multiNode.connecter();
    this.boutonAuthentification.disabled = true;
  }

  confirmerConnexion(){
    console.log("Je suis connecté.");
    //Le serveur nous confirme que nous sommes bien connecté, nous pouvons faire une demande d'authentification
    this.pseudonymeJoueur = this.champPseudonyme.value;
    this.multiNode.demanderAuthentification(this.pseudonymeJoueur);
  }

  confirmerAuthentification(autresParticipants){
    console.log("Je suis authentifié.");
    console.log("Les autres participants sont " + JSON.stringify(autresParticipants));
    this.formulaireAuthentification.querySelector("fieldset").disabled = true;
    if(autresParticipants.length > 0){
      this.pseudonymeAutreJoueur = autresParticipants[0];
      this.afficherPartie();
    }
  }

  apprendreAuthentification(pseudonyme){
    console.log("Nouveau joueur: " + pseudonyme);
    this.pseudonymeAutreJoueur = pseudonyme;
    this.afficherPartie();
  }

  afficherPartie(){
    console.log("afficherpartie " + this.pseudonymeAutreJoueur);

    this.fieldDebutPartie.style.display = "none";
    this.fieldJoueur.style.display = "block";
    this.fieldAdversaire.style.display = "block";
    this.fieldLancerDes.style.display = "block";
    this.boutonLancerDes.style.display = "block";
    this.champPseudonymeAdversaire.innerHTML = this.pseudonymeAutreJoueur;
    this.champPseudonymeJoueur.innerHTML = "Vous " + '(' + this.pseudonymeJoueur + ')';
  }

  lancerDes(){
    console.log("_________ L A N C E R _________");

    console.log("Lanceur des dés: " + this.pseudonymeJoueur);

    //Suppression image du lancer de dé précédent
    if(this.de1 != null && this.de2 != null){
      this.imageJoueurDe1.classList.remove("de" + this.de1);
      this.imageJoueurDe2.classList.remove("de" + this.de2);
    }

    this.de1 = Math.floor(Math.random() * 6 + 1);
    console.log("Valeur premier dé: " + this.de1);
    this.imageJoueurDe1.classList.add("de" + this.de1);

    this.de2 = Math.floor(Math.random() * 6 + 1);
    console.log("Valeur deuxieme dé: " + this.de2);
    this.imageJoueurDe2.classList.add("de" + this.de2);
    
    this.resultat = this.de1 + this.de2;
    console.log("Resultat: " + this.resultat);

    this.resultatLancerDes.value = this.resultat;

    this.boutonLancerDes.disabled = true;
    this.compteurJoueur += this.resultat;
    this.champCompteurJoueur.value = this.compteurJoueur;
  }

  soumettreLancer(){
      this.lancerDes();

      let message = {
        pseudonyme : this.pseudonymeJoueur,
        valeur : this.resultat,
        de1 : this.de1,
        de2 : this.de2
      };

      this.multiNode.posterVariableTextuelle(App.MESSAGE.VALEUR, JSON.stringify(message));
  }

  recevoirVariable(variable){
    console.log("Surcharge de recevoirVariable " + variable.cle + " = " + variable.valeur);
    let message = JSON.parse(variable.valeur);

    if(message.pseudonyme == this.pseudonymeAutreJoueur){
      this.compteurAdversaire += message.valeur;
      this.champCompteurAdversaire.value = this.compteurAdversaire;
      this.boutonLancerDes.disabled = false;

      if(this.dernierDe1Adversaire != 0 && this.dernierDe2Adversaire != 0){
        this.imageAdversaireDe1.classList.remove("de" + this.dernierDe1Adversaire);
        this.imageAdversaireDe2.classList.remove("de" + this.dernierDe2Adversaire);
      }

      this.dernierDe1Adversaire = message.de1;
      this.dernierDe2Adversaire = message.de2;

      this.imageAdversaireDe1.classList.add("de" + message.de1);
      this.imageAdversaireDe2.classList.add("de" + message.de2);
    } 
  }

  changerPointdeVieJoueur(nouveauPointDeVie){
    console.log("changerPointdeVieJoueur()=>valeur" + nouveauPointDeVie);
    this.listeJoueur[this.pseudonymeJoueur].pointDeVie = nouveauPointDeVie;
    this.champPointDeVie.value = nouveauPointDeVie;
    this.validerFinPartie();
  }
}

App.MESSAGE = {
  LANCER : "LANCER",
  VALEUR : "VALEUR"
};

new App();