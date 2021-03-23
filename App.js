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
    this.fieldSelectionPremierJoueur = document.getElementById("field-selection-premier-joueur");
    this.fieldDebutPartie = document.getElementById("field-debut-partie");
    this.fieldJoueur = document.getElementById("field-joueur");
    this.fieldAdversaire = document.getElementById("field-adversaire");
    this.fieldLancerDes = document.getElementById("field-lancer-des");
    this.boutonLancerDesSelection = document.getElementById("bouton-lancer-des-selection");
    this.boutonLancerDes = document.getElementById("bouton-lancer-des");
    this.champResultatLancerDesSelection = document.getElementById("resultat-lancer-des-selection");
    this.champResultatLancerDes = document.getElementById("resultat-lancer-des");
    this.champCompteurJoueur = document.getElementById("compteur-joueur");
    this.champCompteurAdversaire = document.getElementById("compteur-adversaire");
    this.imageJoueurDe1 = document.getElementById("joueur-de1");
    this.imageJoueurDe2 = document.getElementById("joueur-de2");
    this.imageAdversaireDe1 = document.getElementById("adversaire-de1");
    this.imageAdversaireDe2 = document.getElementById("adversaire-de2");
    this.joueurDebutePartie = "";
    this.partieDemarrer = false;
    this.deSelectionJoueur = 0;
    this.deSelectionAdversaire = 0;
    this.compteurJoueur = 0;
    this.compteurAdversaire = 0;
    this.dernierDe1 = 0;
    this.dernierDe2 = 0;
    this.dernierDe1Adversaire = 0;
    this.dernierDe2Adversaire = 0;
    this.fieldSelectionPremierJoueur.style.display = "none";
    this.fieldJoueur.style.display = "none";
    this.fieldAdversaire.style.display = "none";
    this.fieldLancerDes.style.display = "none";
    this.boutonLancerDes.style.display = "none";
    this.boutonLancerDesSelection.style.display = "none";
    this.boutonLancerDesSelection.addEventListener("click", (evenementdes) => this.lancerDes());
    this.boutonLancerDes.addEventListener("click", (evenementdes) => this.lancerDes());
    this.id = 0;
    this.idPrecedentAdversaire = 0;
  }

  soumettreAuthentificationJoueur(evenementsubmit){
    console.log("soumettreAuthentificationJoueur");
    evenementsubmit.preventDefault();
    this.multiNode.connecter();
    this.boutonAuthentification.disabled = true;
  }

  confirmerConnexion(){
    if(!this.partieDemarrer){
      console.log("Je suis connecté.");
      this.pseudonymeJoueur = this.champPseudonyme.value;
      this.multiNode.demanderAuthentification(this.pseudonymeJoueur);
    }
  }

  confirmerAuthentification(autresParticipants){
    console.log("Je suis authentifié.");
    console.log("Les autres participants sont " + JSON.stringify(autresParticipants));
    if(autresParticipants.length > 0){
      this.pseudonymeAutreJoueur = autresParticipants[0];

      if(!this.partieDemarrer)
        this.afficherSelectionPremierJoueur();
    }
  }

  apprendreAuthentification(pseudonyme){
    console.log("Nouveau joueur: " + pseudonyme);
    this.pseudonymeAutreJoueur = pseudonyme;

    if(!this.partieDemarrer)
        this.afficherSelectionPremierJoueur();
  }

  afficherSelectionPremierJoueur(){
    this.fieldDebutPartie.style.display = "none";
    this.fieldSelectionPremierJoueur.style.display = "block";
    this.boutonLancerDesSelection.style.display = "block";
  }

  afficherPartie(){
    this.fieldSelectionPremierJoueur.style.display = "none";
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

    if(!this.partieDemarrer){
      this.deSelection = Math.floor(Math.random() * 6 + 1);
      console.log("Valeur dé sélection: " + this.deSelection);
    }

    if(this.partieDemarrer){
      this.de1 = Math.floor(Math.random() * 6 + 1);
      console.log("Valeur premier dé: " + this.de1);
      this.de2 = Math.floor(Math.random() * 6 + 1);
      console.log("Valeur deuxieme dé: " + this.de2);

      this.resultat = this.de1 + this.de2;
      console.log("Resultat: " + this.resultat);
      this.champResultatLancerDes.value = this.resultat;
      this.compteurJoueur += this.resultat;
      this.champCompteurJoueur.value = this.compteurJoueur;
    }

    this.soumettreLancer();
  }

  soumettreLancer(){

    if(!this.partieDemarrer){
      var message = {
        pseudonyme : this.pseudonymeJoueur,
        deSelection : this.deSelection
      };
    } else {

      this.id+=1;
      
      var message = {
        pseudonyme : this.pseudonymeJoueur,
        valeur : this.resultat,
        id : this.id,
        de1 : this.de1,
        de2 : this.de2
      };
        
    this.gestionImageDes(message);

    

    this.enregistrerDernierLancer();
    }
   
    this.multiNode.posterVariableTextuelle(App.MESSAGE.VALEUR, JSON.stringify(message));
  }

  recevoirVariable(variable){
    console.log("Surcharge de recevoirVariable " + variable.cle + " = " + variable.valeur);
    let message = JSON.parse(variable.valeur);

    if(!this.partieDemarrer){
      this.gestionSelectionDebutPartie(message);
      return;
    }
    
    this.gestionCompteurAdversaire(message);
    this.gestionImageDesAdversaire(message);
    this.gestionDouble(message);
    this.gestionFinPartie();
  } 

  gestionFinPartie(){
    if(this.compteurJoueur > 60){
      alert("Bravo " + this.pseudonymeJoueur + ", tu as gagné !");
      window.location.reload();
    }
    if(this.compteurAdversaire > 60){
      alert("Le vainqueur est " + this.pseudonymeAutreJoueur + " !");
      window.location.reload();
    }
  }

  gestionDouble(message){
    
  }

  gestionCompteurAdversaire(message){
    if(message.pseudonyme == this.pseudonymeAutreJoueur && message.id != this.idPrecedentAdversaire){
      this.compteurAdversaire += message.valeur;
      this.champCompteurAdversaire.value = this.compteurAdversaire;
      this.idPrecedentAdversaire = message.id;
    }
  }

  gestionSelectionDebutPartie(message){
    if(message.pseudonyme == this.pseudonymeJoueur){
      this.deSelectionJoueur = message.deSelection;
      this.boutonLancerDesSelection.disabled = true;
    }
    else if(message.pseudonyme == this.pseudonymeAutreJoueur){
      this.deSelectionAdversaire = message.deSelection;
    }
    
    if(this.deSelectionAdversaire != 0 && this.deSelectionJoueur != 0){
      if(this.deSelectionJoueur > this.deSelectionAdversaire){
        this.joueurDebutePartie = this.pseudonymeJoueur;
        this.partieDemarrer = true;
        alert("commence la partie: " + this.joueurDebutePartie);
        this.afficherPartie();
      }
      else if(this.deSelectionJoueur == this.deSelectionAdversaire){
        this.deSelectionJoueur = 0;
        this.deSelectionAdversaire = 0;
        this.deSelection = 0;
        this.boutonLancerDes.disabled = false;
      }
      else if(this.deSelectionJoueur < this.deSelectionAdversaire){
        this.joueurDebutePartie = this.pseudonymeAutreJoueur;
        this.partieDemarrer = true;
        alert("commence la partie: " + this.joueurDebutePartie);
        this.afficherPartie();
      }
    }
  }

  gestionImageDes(message){
    if(this.dernierDe1 == 0 && this.dernierDe2 == 0){
        this.imageJoueurDe1.classList.remove("de");
        this.imageJoueurDe2.classList.remove("de");
        this.imageJoueurDe1.classList.add("de" + message.de1);
        this.imageJoueurDe2.classList.add("de" + message.de2);
    }else{
        this.imageJoueurDe1.classList.remove("de" + this.dernierDe1);
        this.imageJoueurDe2.classList.remove("de" + this.dernierDe2);
        this.imageJoueurDe1.classList.add("de" + message.de1);
        this.imageJoueurDe2.classList.add("de" + message.de2);
    }  
    // this.boutonLancerDes.disabled = "true";
  }

  gestionImageDesAdversaire(message){
    if(this.pseudonymeAutreJoueur == message.pseudonyme){
      if(this.dernierDe1Adversaire == 0 && this.dernierDe2Adversaire == 0){
        this.imageAdversaireDe1.classList.remove("de");
        this.imageAdversaireDe2.classList.remove("de");
        this.imageAdversaireDe1.classList.add("de" + message.de1);
        this.imageAdversaireDe2.classList.add("de" + message.de2);
        this.dernierDe1Adversaire = message.de1;
        this.dernierDe2Adversaire = message.de2;
      }else{
        this.imageAdversaireDe1.classList.remove("de" + this.dernierDe1Adversaire);
        this.imageAdversaireDe2.classList.remove("de" + this.dernierDe2Adversaire);
        this.imageAdversaireDe1.classList.add("de" + message.de1);
        this.imageAdversaireDe2.classList.add("de" + message.de2);
        this.dernierDe1Adversaire = message.de1;
        this.dernierDe2Adversaire = message.de2;
      }  
    }
    // this.boutonLancerDes.disabled = "false";
  }

  enregistrerDernierLancer(){
    this.dernierDe1 = this.de1;
    this.dernierDe2 = this.de2;
  }
}

App.MESSAGE = {
  LANCER : "LANCER",
  VALEUR : "VALEUR"
};

new App();