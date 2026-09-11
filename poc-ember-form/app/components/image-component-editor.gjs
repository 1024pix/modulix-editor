import { concat, fn } from '@ember/helper';
import { on } from '@ember/modifier';

<template>
  <div class="component-editor component-editor--image">
    <div class="form-floating mb-2">
      <input
        type="text"
        class="form-control"
        id={{concat "component-url-" @component.id}}
        placeholder="URL de l'image"
        value={{@component.url}}
        {{on "input" (fn @onChange "url")}}
      />
      <label for={{concat "component-url-" @component.id}}>URL de l'image</label>
    </div>
    <div class="form-floating">
      <input
        type="text"
        class="form-control"
        id={{concat "component-alt-" @component.id}}
        placeholder="Texte alternatif"
        value={{@component.alt}}
        {{on "input" (fn @onChange "alt")}}
      />
      <label for={{concat "component-alt-" @component.id}}>Texte alternatif</label>
    </div>
  </div>
</template>
