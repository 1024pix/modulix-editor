import { concat, fn } from '@ember/helper';
import { on } from '@ember/modifier';
import ComponentsField from './components-field';

<template>
  <div class="grain-editor">
    <div class="mb-2">
      <label class="form-label">
        Titre du grain
        <input
          type="text"
          class="form-control"
          value={{@grain.title}}
          {{on "input" (fn @onChange "title")}}
        />
      </label>
    </div>

    <ComponentsField
      @components={{@grain.components}}
      @onChange={{fn @onComponentsChange @grain}}
      @groupName={{concat "components-" @grain.id}}
    />
  </div>
</template>
