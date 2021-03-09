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
    this.champPseudonymeAdversaire = document.getElementById("champ-pseudonyme-adversaire");
    this.fieldDebutPartie = document.getElementById("field-debut-partie");
    this.fieldJoueur = document.getElementById("field-joueur");
    this.fieldAdversaire = document.getElementById("field-adversaire");

    this.fieldJoueur.style.display = "none";
    this.fieldAdversaire.style.display = "none";

  }

  soumettreAuthentificationJoueur(evenementsubmit){
    console.log("soumettreAuthentificationJoueur");
    evenementsubmit.preventDefault();
    //La demande de connexion au serveur est asynchrone, il faut attendre la réponse du serveur
    //pour faire une demande d'authentification
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
    this.ajouterJoueur(this.pseudonymeJoueur);
    if(autresParticipants.length > 0){
      this.pseudonymeAutreJoueur = autresParticipants[0];
      this.ajouterJoueur(autresParticipants[0]); 
      this.afficherPartie();
    }
  }

  apprendreAuthentification(pseudonyme){
    console.log("Nouveau joueur: " + pseudonyme);
    this.ajouterJoueur(pseudonyme);
    this.pseudonymeAutreJoueur = pseudonyme;
    this.afficherPartie();
  }

  ajouterJoueur(pseudonyme){
    console.log("Ajout joueur: " + pseudonyme);
    this.listeJoueur[pseudonyme] = {pointDeVie : 10};
  }

  afficherPartie(){
    console.log("afficherpartie " + this.pseudonymeAutreJoueur);

    this.fieldDebutPartie.style.display = "none";
    this.fieldJoueur.style.display = "block";
    this.fieldAdversaire.style.display = "block";
    this.champPseudonymeAdversaire.innerHTML = this.pseudonymeAutreJoueur;
  }
}

new App();