# Planning 2026

Application téléphone du **Tableau de Service 2026** — consultation du planning, import Excel, mode hors-ligne.

## Ouvrir sur le téléphone

URL GitHub Pages :

**https://lecalvez-yann1-collab.github.io/plannig/**

Ouvrez ce lien dans Safari (iPhone) ou Chrome (Android).

## Ajouter à l’écran d’accueil (PWA)

### iOS (Safari)

1. Ouvrez l’URL ci-dessus dans **Safari**.
2. Appuyez sur le bouton **Partager** (carré avec flèche).
3. Choisissez **Sur l’écran d’accueil**.
4. Confirmez **Ajouter**.

L’icône « Planning 2026 » s’ouvre ensuite en plein écran, comme une app.

### Android (Chrome)

1. Ouvrez l’URL dans **Chrome**.
2. Menu **⋮** → **Installer l’application** (ou **Ajouter à l’écran d’accueil**).
3. Confirmez.

## Importer le fichier Excel

1. Appuyez sur **⬆ MàJ** en haut à droite.
2. Sélectionnez (ou glissez) le fichier **`TABLEAU DE SERVICE 2026.xlsx`**.
3. Seul le format **`.xlsx`** est accepté (feuille nommée **2026**).
4. Après un import réussi, le libellé passe à **Mis à jour • nom-du-fichier.xlsx**.

## Persistance

- Un import réussi est **enregistré sur l’appareil** (localStorage / IndexedDB).
- À la prochaine ouverture (même hors-ligne), l’app recharge **le dernier import**, pas seulement les données intégrées.
- Si un nouvel import **échoue**, l’ancien import sauvegardé **n’est pas effacé**.
- Réimportez le fichier dès qu’une nouvelle version du tableau de service est disponible : cela met à jour l’affichage **et** la sauvegarde locale.

## Hors-ligne

Un service worker met en cache la coque de l’app (HTML, manifeste, icônes). Avec le dernier import déjà sauvegardé, vous pouvez consulter le planning sans réseau.
