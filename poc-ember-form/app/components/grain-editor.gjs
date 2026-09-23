import { concat, fn } from '@ember/helper';
import { on } from '@ember/modifier';
import ComponentsField from './components-field';

<template>
  <div class="grain-editor">
    <div class="form-floating mb-2">
      <input
        type="text"
        class="form-control"
        id={{concat "grain-title-" @grain.id}}
        placeholder="Titre du grain"
        value={{@grain.title}}
        {{on "input" (fn @onChange "title")}}
      />
      <label for={{concat "grain-title-" @grain.id}}>Titre du grain</label>
    </div>

    <ComponentsField
      @components={{@grain.components}}
      @onChange={{fn @onComponentsChange @grain}}
      @groupName={{concat "components-" @grain.id}}
    />
  </div>
</template>
