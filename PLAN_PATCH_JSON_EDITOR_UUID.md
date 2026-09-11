# Patcher le bug de duplication d'UUID de json-editor (PR upstream #1696) sans forker

## Contexte

Le projet charge `@json-editor/json-editor@2.15.2` en tant que build préconstruit via un `<script>` CDN dans `index.html` (jsdelivr, `dist/jsoneditor.min.js`), pas comme dépendance npm. Il n'y a donc pas de `node_modules/@json-editor` ni de mécanisme de patch existant (pas de `patch-package`, pas de fork vendorisé).

Un bug connu de la librairie (issue upstream #1481) fait que la fonction de duplication de ligne (bouton "copy" des éditeurs `array` et `table`) ne régénère les UUID que de façon superficielle : elle ne descend pas dans les objets imbriqués et ne gère pas les schémas `oneOf`/`anyOf`. Le correctif a été proposé et mergé en amont dans https://github.com/json-editor/json-editor/pull/1696 (implémenté par `1024pix/json-editor`, commit `84f175c697df00ec05206be2742d78661519c86e`), qui introduit une fonction récursive `regenerateUUIDs(value, schema)` dans `src/utilities.js` et l'utilise dans `_createCopyButton` de `src/editors/array.js` et `src/editors/table.js`.

Comme la version publiée sur npm/CDN (2.15.2) ne contient pas encore ce correctif, et que le projet ne veut pas maintenir un fork GitHub du dépôt, on applique le correctif **par monkey-patch runtime** : après le chargement du script CDN, on réécrit en JavaScript les méthodes buguées directement sur les classes d'éditeurs exposées globalement par `JSONEditor.defaults.editors`. Cette API (`JSONEditor.defaults.editors.<type>`) est l'API publique documentée de json-editor pour enregistrer/étendre des éditeurs, donc stable d'une version mineure à l'autre.

J'ai vérifié dans le bundle CDN actuel (`dist/jsoneditor.js` non minifié) que :

- Les classes sont bien exposées sous `JSONEditor.defaults.editors.array` et `JSONEditor.defaults.editors.table`.
- Leurs prototypes exposent `_createCopyButton` sous ce nom exact (non manglé, car nom de méthode de classe transpilée).
- L'implémentation actuelle bugguée fait un test plat du type `"string"===schema.items.type&&"uuid"===schema.items.format` sans récursion ni gestion `oneOf`/`anyOf`.
- Le script CDN (`<script src=...>` classique) s'exécute avant `index.js` (`<script type="module">`, différé), donc `window.JSONEditor` est garanti disponible quand `index.js` s'exécute.

## Implémentation

### 1. Nouveau fichier `json-editor-uuid-patch.js` (racine du projet, à côté de `LocalBackup.js`)

Contient, portés depuis la PR upstream (adaptés en JS simple, sans dépendre des internes de la lib) :

- `generateUUID()` — identique à `src/utilities.js` de json-editor (génération UUID v4 avec timestamp + `performance.now()`), pour rester cohérent avec le format déjà généré ailleurs par la lib.
- `_schemaMatchesValue(value, schema)` — helper de correspondance `oneOf`/`anyOf` (copié tel quel depuis la PR).
- `regenerateUUIDs(value, schema)` — la fonction récursive corrigée (copiée telle quelle depuis la PR).
- Une fonction exportée `applyJsonEditorUuidPatch()` qui :
  1. Vérifie que `window.JSONEditor?.defaults?.editors?.array` et `.table` existent (sinon `console.warn` et sort sans planter, au cas où une future version change la structure interne).
  2. Réassigne `JSONEditor.defaults.editors.array.prototype._createCopyButton` avec une version copiée de l'originale (mêmes appels `getButton`/`getItemTitle`/`classList`/listeners) mais où le calcul de la copie utilise `regenerateUUIDs(row, schema.items)` au lieu de la logique plate actuelle.
  3. Fait de même pour `JSONEditor.defaults.editors.table.prototype._createCopyButton`.

Le corps de chaque méthode remplacée reproduit fidèlement le comportement actuel du bundle (mêmes titres de bouton, mêmes classes CSS, mêmes événements déclenchés type `copyRow`) — seule la ligne de régénération d'UUID change, pour limiter la divergence avec la lib et faciliter la suppression du patch quand la lib publiera un correctif officiel.

### 2. Appliquer le patch dans `index.js`

En tout début de fichier (avant l'utilisation de `JSONEditor`, donc avant l'instanciation de l'éditeur ligne ~154) :

```js
import { applyJsonEditorUuidPatch } from './json-editor-uuid-patch.js';

applyJsonEditorUuidPatch();
```

Comme `JSONEditor` est un global CDN chargé de façon synchrone avant le script module, l'appel peut se faire immédiatement, pas besoin d'attendre un event `load`.

### 3. Commentaire de traçabilité

Un court commentaire au-dessus de `applyJsonEditorUuidPatch()` dans `json-editor-uuid-patch.js` référence l'issue upstream et la PR (`json-editor/json-editor#1696`), pour qu'on sache pourquoi ce patch existe et quand le retirer (dès que la version CDN utilisée intègre le correctif).

## Vérification

1. `npm run dev`, ouvrir l'éditeur.
2. Construire un module avec un champ de type array contenant des objets avec un `format: "uuid"` imbriqué (ou vérifier via le schéma existant s'il y a déjà un tel champ, ex. composants avec `id`/`shortId`).
3. Dupliquer une ligne via le bouton "copy" et vérifier dans le panneau JSON (textarea) que les UUID imbriqués de la copie sont bien différents de l'original (et non identiques comme avant le patch).
4. Tester aussi un éditeur de type `table` si le schéma en expose un.
5. Vérifier dans la console qu'aucun `console.warn` du patch n'apparaît (confirmant que `JSONEditor.defaults.editors.array`/`table` ont bien été trouvés et patchés).
