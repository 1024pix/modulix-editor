import { fn } from '@ember/helper';
import { on } from '@ember/modifier';

<template>
  <div class="component-editor component-editor--image">
    <label>
      URL de l'image
      <input type="text" value={{@component.url}} {{on "input" (fn @onChange "url")}} />
    </label>
    <label>
      Texte alternatif
      <input type="text" value={{@component.alt}} {{on "input" (fn @onChange "alt")}} />
    </label>
  </div>
</template>
