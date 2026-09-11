import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
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
  // État d'affichage uniquement (pas dans les données du module : ne doit
  // pas apparaître dans le JSON exporté). On suit les grains DÉPLIÉS
  // (plutôt que repliés) pour que replié soit l'état par défaut — y
  // compris pour les grains ajoutés ensuite, comme le fait l'actuel
  // modulix-editor via `options: { collapsed: true }`.
  @tracked expandedGrainIds = new Set();

  @action
  isCollapsed(grain) {
    return !this.expandedGrainIds.has(grain.id);
  }

  @action
  toggleCollapsed(grain) {
    const next = new Set(this.expandedGrainIds);
    if (next.has(grain.id)) {
      next.delete(grain.id);
    } else {
      next.add(grain.id);
    }
    this.expandedGrainIds = next;
  }

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
    this.args.onChange(
      this.args.grains.map((g) =>
        g === grain ? { ...g, [field]: event.target.value } : g,
      ),
    );
  }

  @action
  updateGrainComponents(grain, components) {
    this.args.onChange(
      this.args.grains.map((g) => (g === grain ? { ...g, components } : g)),
    );
  }

  <template>
    <ol
      class="grains-field list-unstyled d-flex flex-column gap-2 mb-2"
      {{sortableGroup groupName=@groupName onChange=this.reorder}}
    >
      {{#each @grains as |grain|}}
        <li
          class="grains-field__item card bg-light"
          {{sortableItem groupName=@groupName model=grain}}
        >
          <div class="card-body">
            <div class="d-flex align-items-center gap-2 mb-2">
              <span
                class="grains-field__handle btn btn-sm btn-light"
                {{sortableHandle}}
              >⠿</span>
              <button
                type="button"
                class="btn btn-sm btn-light"
                data-test-toggle-grain
                {{on "click" (fn this.toggleCollapsed grain)}}
              >{{if (this.isCollapsed grain) "▸" "▾"}}</button>
              <strong>Grain —
                {{if grain.title grain.title "(sans titre)"}}</strong>
              <button
                type="button"
                class="btn btn-sm btn-outline-danger ms-auto"
                {{on "click" (fn this.removeGrain grain)}}
              >Supprimer le grain</button>
            </div>
            {{#unless (this.isCollapsed grain)}}
              <GrainEditor
                @grain={{grain}}
                @onChange={{fn this.updateGrainField grain}}
                @onComponentsChange={{this.updateGrainComponents}}
              />
            {{/unless}}
          </div>
        </li>
      {{/each}}
    </ol>
    <button
      type="button"
      class="btn btn-sm btn-outline-primary"
      data-test-add-grain
      {{on "click" this.addGrain}}
    >+ Grain</button>
  </template>
}
