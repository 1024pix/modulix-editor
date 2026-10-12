import { concat, fn } from '@ember/helper';
import { on } from '@ember/modifier';

<template>
  <div class="component-editor component-editor--text">
    <div class="form-floating">
      <textarea
        class="form-control component-editor-textarea"
        id={{concat "component-content-" @component.id}}
        placeholder="Contenu"
        {{on "input" (fn @onChange "content")}}
      >{{@component.content}}</textarea>
      <label for={{concat "component-content-" @component.id}}>Contenu</label>
    </div>
    <div class="form-text">Placeholder — remplacerait le champ
      <code>jodit</code></div>
  </div>
</template>
