import { concat, fn } from '@ember/helper';
import { on } from '@ember/modifier';
import eq from 'ember-truth-helpers/helpers/eq';
import GrainsField from './grains-field';

const SECTION_TYPES = [
  'question-yourself',
  'explore-to-understand',
  'retain-the-essentials',
  'practise',
  'go-further',
  'blank',
];

<template>
  <div class="section-editor">
    <div class="mb-3">
      <label class="form-label">
        Type de section
        <select class="form-select" {{on "change" (fn @onChange "type")}}>
          {{#each SECTION_TYPES as |type|}}
            <option
              value={{type}}
              selected={{eq type @section.type}}
            >{{type}}</option>
          {{/each}}
        </select>
      </label>
    </div>

    <GrainsField
      @grains={{@section.grains}}
      @onChange={{fn @onGrainsChange @section}}
      @groupName={{concat "grains-" @section.id}}
    />
  </div>
</template>
