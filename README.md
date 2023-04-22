# Projet Site Enchères - Miage Auction

**V0.0.8**

### Contexte

Ce projet a été réalisé dans le cadre de notre Master MIAGE (promotion 2021-2022) pour le module de programmation web. 
Nous avons choisi de créer une application client/serveur d'enchères rapides à distance répondant aux besoins suivants :

*Côté client :*
</br>
Il pourra enchérir sur une offre existante ou proposer une nouvelle vente. Il devra au préalable se connecter et sera afficher à sa connexion :
<ul>
<li>la liste des ventes en cours incluant l'intitulé de la vente, la meilleure offre</li>
Il pourra alors lorsqu'il le souhaite :
<li>actualiser la liste des enchères en cours ;</li>
<li>enchérir sur une des offres ;</li>
<li>proposer une nouvelle offre (intitulé, prix, durée de la vente...)</li>
Et bien évidemment se déconnecter.
</ul>

*Côté serveur :*
<ul>
<li>renvoyer la liste des enchères en cours</li>
<li>vérifier la validité de l'offre et du fait de renchérir (évitant par exemple de renchérir de 1€ en plus) </li>
<li>le serveur clôturera la vente une fois le temps imparti écoulé</li>
<li>une historisation sera également conservée</li>
</ul>

### Technologies utilisées
Pour ce projet, réalisé sous NodeJS, nous avons utilisé les technologies suivantes :
Express, MongoDB, Https, PassportJs, Gitflow....

### Stade de développement
A ce jour, l'application peut encore être améliorée avec par exemple l'ajout d'images lors d'une enchère, l'actualisation de l'application en temps réel...

### Processus d'installation
Pour exécuter cette application, il vous faudra tout simplement NodeJS (puis npm install) & MongoDB.

### Retour d'expérience
Ce projet nous a particulièrement plu, notamment car des nouvelles notions de programmation ont été abordées. Malgré quelques difficultés, nous sommes fiers d'avoir fourni un projet fonctionnel répondant à la majeure partie des contraintes exigées.


