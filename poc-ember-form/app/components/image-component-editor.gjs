import { fn } from '@ember/helper';
import { on } from '@ember/modifier';

<template>
  <div class="component-editor component-editor--image">
    <div class="mb-2">
      <label class="form-label">
        URL de l'image
        <input
          type="text"
          class="form-control"
          value={{@component.url}}
          {{on "input" (fn @onChange "url")}}
        />
      </label>
    </div>
    <div class="mb-2">
      <label class="form-label">
        Texte alternatif
        <input
          type="text"
          class="form-control"
          value={{@component.alt}}
          {{on "input" (fn @onChange "alt")}}
        />
      </label>
    </div>
  </div>
</template>
