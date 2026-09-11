import Component from '@glimmer/component';
import { action } from '@ember/object';
import { fn } from '@ember/helper';
import { on } from '@ember/modifier';
import sortableGroup from 'ember-sortable/modifiers/sortable-group';
import sortableItem from 'ember-sortable/modifiers/sortable-item';
import sortableHandle from 'ember-sortable/modifiers/sortable-handle';
import GrainEditor from './grain-editor';

function makeGrain() {
  return { id: crypto.randomUUID(), title: '', components: [] };
}

export default class GrainsField extends Component {
  @action
  reorder(items) {
    this.args.onChange(items);
  }

  @action
  addGrain() {
    this.args.onChange([...this.args.grains, makeGrain()]);
  }

  @action
  removeGrain(grain) {
    this.args.onChange(this.args.grains.filter((g) => g !== grain));
  }

  @action
  updateGrainField(grain, field, event) {
    this.args.onChange(this.args.grains.map((g) => (g === grain ? { ...g, [field]: event.target.value } : g)));
  }

  @action
  updateGrainComponents(grain, components) {
    this.args.onChange(this.args.grains.map((g) => (g === grain ? { ...g, components } : g)));
  }

  <template>
    <ol class="grains-field" {{sortableGroup onChange=this.reorder}}>
      {{#each @grains as |grain|}}
        <li class="grains-field__item" {{sortableItem model=grain}}>
          <span class="grains-field__handle" {{sortableHandle}}>⠿</span>
          <GrainEditor
            @grain={{grain}}
            @onChange={{fn this.updateGrainField grain}}
            @onComponentsChange={{this.updateGrainComponents}}
          />
          <button type="button" {{on "click" (fn this.removeGrain grain)}}>Supprimer le grain</button>
        </li>
      {{/each}}
    </ol>
    <button type="button" {{on "click" this.addGrain}}>+ Grain</button>
  </template>
}
