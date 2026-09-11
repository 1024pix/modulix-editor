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
    <ol class="grains-field list-unstyled d-flex flex-column gap-2 mb-2" {{sortableGroup onChange=this.reorder}}>
      {{#each @grains as |grain|}}
        <li class="grains-field__item card bg-light" {{sortableItem model=grain}}>
          <div class="card-body">
            <div class="d-flex align-items-start gap-2 mb-2">
              <span class="grains-field__handle btn btn-sm btn-light" {{sortableHandle}}>⠿</span>
              <button
                type="button"
                class="btn btn-sm btn-outline-danger ms-auto"
                {{on "click" (fn this.removeGrain grain)}}
              >Supprimer le grain</button>
            </div>
            <GrainEditor
              @grain={{grain}}
              @onChange={{fn this.updateGrainField grain}}
              @onComponentsChange={{this.updateGrainComponents}}
            />
          </div>
        </li>
      {{/each}}
    </ol>
    <button type="button" class="btn btn-sm btn-outline-primary" {{on "click" this.addGrain}}>+ Grain</button>
  </template>
}
