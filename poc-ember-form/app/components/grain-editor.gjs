import { fn } from '@ember/helper';
import { on } from '@ember/modifier';
import ComponentsField from './components-field';

<template>
  <div class="grain-editor">
    <label>
      Titre du grain
      <input type="text" value={{@grain.title}} {{on "input" (fn @onChange "title")}} />
    </label>

    <ComponentsField
      @components={{@grain.components}}
      @onChange={{fn @onComponentsChange @grain}}
    />
  </div>
</template>
