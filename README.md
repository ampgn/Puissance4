## Objectif 

L'objectif du projet est de créer un jeu de puissance 4 connecté ou 2 joueurs peuvent se défier.

- Le premier utilisateur choisit son pseudo et obtient l'URL à partager pour inviter les autres joueurs
- Le joueur 2 choisit aussi son pseudo et rejoint la partie
- Les 2 joueurs choisissent une partie
- Le créateur de la partie lance la partie
- Les joueurs placent des pions à tour de rôle dans une grille de 7x6
- Un joueur gagne si 4 pions sont alignés verticalement / horizontalement ou en diagonal


## Technologies 

- NodeJS
- TypeScript
- React
- Xstate (machine à état)
- Websocket
- https://www.npmjs.com/package/reconnecting-websocket
- Fastify
- https://www.npmjs.com/package/@fastify/websocket


## Etapes 

- Machine à état(tester tant que possible)
- Interface
- Jeu hors ligne
- Mise en place du server
- Jeu en ligne
- Mise en ligne (déploiement)



# React + TypeScript + Vite

Ce modèle fournit une configuration minimale pour faire fonctionner React dans Vite avec un rechargement à chaud (HMR) et certaines règles ESLint.

Actuellement, deux plugins officiels sont disponibles :

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) utilise [Babel](https://babeljs.io/) pour Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) utilise [SWC](https://swc.rs/) pour Fast Refresh

## Expansion de la configuration ESLint

Si vous développez une application destinée à la production, nous vous recommandons de mettre à jour la configuration pour activer des règles de linting conscientes du type :

- Configurez la propriété `parserOptions` au niveau supérieur comme suit :

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Remplacez `plugin:@typescript-eslint/recommended` par `plugin:@typescript-eslint/recommended-type-checked` ou `plugin:@typescript-eslint/strict-type-checked`
- Ajoutez éventuellement `plugin:@typescript-eslint/stylistic-type-checked`
- Installez  [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) et ajoutez `plugin:react/recommended` & `plugin:react/jsx-runtime` à la liste `extends`
