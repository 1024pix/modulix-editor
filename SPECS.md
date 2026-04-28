# Specifications

## Présentation générale

Modulix Editor est une application web permettant à des concepteurs pédagogiques (aka Contenu métier) de créer et éditer
des modules de formation Pix au format JSON. L'éditeur génère un JSON conforme au schéma officiel des modules Pix, prêt
à être intégré dans la plateforme (aujourd’hui dans le mono repo)

Utilisateurs cibles : concepteurs pédagogiques et développeurs de contenu Pix.

## Architecture et contexte technique

- Application statique (HTML/CSS/JS, sans backend propre), construite avec Vite.
- Le schéma JSON des modules est chargé dynamiquement depuis l'API Pix (environnements localhost, integration, recette,
  par ordre de priorité).
- Le rendu du formulaire est assuré par la bibliothèque [JSON Editor](https://github.com/json-editor/json-editor) (
  pilotée par le schéma JSON Schema fourni par l’API).
- Les champs texte enrichi utilisent l'éditeur WYSIWYG [Jodit](https://xdsoft.net/jodit/).
- L'interface utilise Bootstrap 5 et Font Awesome 5.

## Chargement de l'application

### Récupération du schéma

Au démarrage, l'application tente de récupérer le schéma JSON Schema depuis les URLs API Pix dans l'ordre suivant :

1. [http://localhost:{VITE_API_PORT}/api/module-schema/module-json-schema.json](http://localhost:%7BVITE_API_PORT%7D/api/module-schema/module-json-schema.json) (
   en mode DEV uniquement)
2. [https://api.integration.pix.fr/api/module-schema/module-json-schema.json](https://api.integration.pix.fr/api/module-schema/module-json-schema.json)
3. [https://api.recette.pix.fr/api/module-schema/module-json-schema.json](https://api.recette.pix.fr/api/module-schema/module-json-schema.json)

En cas d'échec sur toutes les URLs, une alerte informe l'utilisateur que le schéma n'a pas pu être chargé et
l'application ne s'initialise pas.

### Initialisation de l'éditeur

Une fois le schéma chargé, l'éditeur est configuré avec les ajustements suivants :

- La vue du formulaire est en mode catégories (format: `categories`).
- Les sections et les grains sont repliés par défaut.
- Le champ `shortId` est pré-rempli avec un identifiant généré aléatoirement (hexadécimal, 8 caractères) et mis en
  lecture seule.
- Le champ `visibility` est pré-rempli à `public` et mis en lecture seule.
- Dans les listes d'éléments (`oneOf`), le type `text` est toujours présenté en premier.

## Fonctionnalités de la barre d'outils

### Prévisualiser

- Ouvre une fenêtre dédiée qui charge le JSON du module dans la preview de
  l’intégration <https://app.integration.pix.fr/modules/preview>.
- Communique le contenu du module à la fenêtre via `postMessage` (protocole : attente du message
  `Ready to receive content !` de la part de Pix App, puis envoi du JSON du module).
- La prévisualisation est mise à jour en temps réel à chaque modification dans l'éditeur.

### JSON

- Affiche/masque un panneau latéral contenant le JSON brut du module dans une `<textarea>`.
- Le JSON est synchronisé en temps réel avec le formulaire (modification du formulaire → mise à jour du JSON).
- L'utilisateur peut éditer le JSON directement dans la textarea. À la perte du focus (`focusout`), le formulaire est
  mis à jour si le JSON est valide. Si le JSON est invalide, un style d'erreur est appliqué à la textarea.

### Télécharger

- Génère et télécharge un fichier `.json` nommé avec le slug du module (ex : `mon-module.json`).
- Le JSON est formaté avec une indentation de 2 espaces.

### Supprimer

- Supprime la sauvegarde locale (`localStorage`) et recharge la page, réinitialisant le formulaire à son état vierge.
- Affiche une confirmation avant de procéder.

### Nettoyer

- Applique des corrections typographiques françaises automatiques sur tout le contenu textuel du module :
  - Ajout d’espaces insécables avant `?`, `!`, `;`, `:`, `»`
  - Ajout d’espaces insécables après `«`
  - Ajout d’espaces insécables avant les emojis
  - Suppression des balises `<p><br></p>` vides
  - Suppression des sauts de ligne `\n`
  - Remplacement des apostrophes droites `'` par des apostrophes typographiques `’`
- Met à jour le formulaire et le JSON avec le résultat corrigé.

### Replier

- Replie ~~l’espace temps sur lui-même~~ toutes les sections et tous les grains dans l'arborescence du formulaire.

### Mémo

- Ouvre dans un nouvel onglet la page cheatsheet, une référence complète du schema JSON des modules Pix (structure,
  types, valeurs acceptées).

## Sauvegarde automatique locale

- À chaque modification du formulaire, le contenu du module est sauvegardé automatiquement dans le `localStorage` du
  navigateur (clé : `modulix-schema`).
- Au chargement de l'éditeur, si une sauvegarde existe, elle est automatiquement restaurée dans le formulaire.
- La sauvegarde est supprimée lors d'une réinitialisation.
- En cas de données corrompues en `localStorage`, elles sont supprimées silencieusement.

## Éditeur WYSIWYG

Les champs de format [WYSIWYG](https://www.youtube.com/watch?v=R2DAvHD50R8) utilisent Jodit avec la configuration
suivante :

- Boutons disponibles : `paragraph`, `bold`, `italic`, `strikethrough`, `link`, `eraser`, `ul`, `ol`, `hr`, `source`.
- Types de paragraphes : `p` (Paragraph), `h4`, `h5`, `blockquote`, `code`.
- Le collage de contenu HTML externe insère uniquement le texte brut (sans formatage).
- Mode par défaut : vue partagée (source + rendu).

## Fiche mémo (cheatsheet)

Page HTML autonome accessible via le bouton « Afficher la fiche mémo ». Elle présente :

- La structure hiérarchique complète d'un module.
- Les propriétés, types et valeurs acceptées pour chaque niveau (Module, Détails, Sections, Grains, Components,
  Elements).
- Le détail de chaque type d'élément et de ses propriétés.
- Le détail des proposals QROCM (`text`, `input`, `select`).
- La liste de tous les éléments _custom_ disponibles.
- Une navigation par ancres entre les sections.

## Contraintes et règles métier

- Schéma obligatoire : l'application ne peut pas fonctionner sans schéma chargé
- `shortId` : généré automatiquement, non modifiable par l'utilisateur
- `visibility` : défini à `public` par défaut, non modifiable
- `slug` : uniquement des caractères `[a-z0-9-]`
- `id` : format UUID obligatoire sur tous les niveaux
- `durée` : entier entre 0 et 120 minutes
- `niveau` : `novice` | `independent` | `advanced` | `expert`
- `flashcards` et `qab` : Non disponibles dans un `stepper`
- `custom elements` : uniquement dans un composant `element`, pas dans un `stepper`

## Déploiement

- Le déploiement est automatisé via GitHub Actions (workflow `.github/workflows/deploy.yml`).
- La build est produite avec `npm run build` (Vite), dans le dossier `dist/`.
- Pour visualiser localement le build, lancer la commande `vite preview`.

# Revue des pull requests

## Contexte

Le repository [modulix-editor](https://github.com/1024pix/modulix-editor) n’a actuellement pas de tests automatisés ce
qui fait que nous ne sommes pas alertés en cas de régression sur les fonctionnalités existantes.  
Nous avons décidé de faire des tests plus poussés lors de la review des PR pour palier à cela.

## Checklist

- [ ] Récupérer le contenu d’un module existant (
      ex : [bac-a-sable](https://github.com/1024pix/pix/blob/dev/api/src/devcomp/infrastructure/datasources/learning-content/modules/bac-a-sable.json))
      et le copier / coller dans Modulix Editor
- [ ] Vérifier que la liste des sections du module s’affiche bien, et que cette liste commence par 0
- [ ] Prévisualiser le module

Aller sur l’onglet _Basic_ :

- [ ] Vérifier qu’un `shortId` existe, avec les contraintes de format
- [ ] Vérifier qu’un `slug` existe et suit bien le kebab-case

Aller sur l’onglet _details_ :

- [ ] Vérifier que le champ `description` s’affiche bien avec le format Jodit en version splitée
- [ ] Constater que les balises HTML sont bien affichées sans interagir avec le champ
- [ ] Cliquer dans le champ `description` et vérifier que le compteur de caractères se met bien à jour.
