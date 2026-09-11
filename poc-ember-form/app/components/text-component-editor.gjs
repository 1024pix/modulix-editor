import { fn } from '@ember/helper';
import { on } from '@ember/modifier';

<template>
  <div class="component-editor component-editor--text">
    <label>
      Contenu (placeholder — remplacerait le champ <code>jodit</code>)
      <textarea
        rows="2"
        {{on "input" (fn @onChange "content")}}
      >{{@component.content}}</textarea>
    </label>
  </div>
</template>
