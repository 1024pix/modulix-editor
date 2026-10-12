import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { fn } from '@ember/helper';
import { on } from '@ember/modifier';
import sortableGroup from 'ember-sortable/modifiers/sortable-group';
import sortableItem from 'ember-sortable/modifiers/sortable-item';
import sortableHandle from 'ember-sortable/modifiers/sortable-handle';
import SectionEditor from './section-editor';

function makeSection() {
  return { id: crypto.randomUUID(), type: 'blank', grains: [] };
}

export default class SectionsField extends Component {
  // État d'affichage uniquement (pas dans les données du module : ne doit
  // pas apparaître dans le JSON exporté). On suit les sections DÉPLIÉES
  // (plutôt que repliées) pour que replié soit l'état par défaut — y
  // compris pour les sections ajoutées ensuite, comme le fait l'actuel
  // modulix-editor via `options: { collapsed: true }`.
  @tracked expandedSectionIds = new Set();

  @action
  isCollapsed(section) {
    return !this.expandedSectionIds.has(section.id);
  }

  @action
  toggleCollapsed(section) {
    const next = new Set(this.expandedSectionIds);
    if (next.has(section.id)) {
      next.delete(section.id);
    } else {
      next.add(section.id);
    }
    this.expandedSectionIds = next;
  }

  @action
  reorder(items) {
    this.args.onChange(items);
  }

  @action
  addSection() {
    this.args.onChange([...this.args.sections, makeSection()]);
  }

  @action
  removeSection(section) {
    this.args.onChange(this.args.sections.filter((s) => s !== section));
  }

  @action
  updateSectionField(section, field, event) {
    this.args.onChange(
      this.args.sections.map((s) =>
        s === section ? { ...s, [field]: event.target.value } : s,
      ),
    );
  }

  @action
  updateSectionGrains(section, grains) {
    this.args.onChange(
      this.args.sections.map((s) => (s === section ? { ...s, grains } : s)),
    );
  }

  <template>
    <ol
      class="sections-field list-unstyled d-flex flex-column gap-3 mb-3"
      {{sortableGroup groupName="sections" onChange=this.reorder}}
    >
      {{#each @sections key="id" as |section|}}
        <li
          class="sections-field__item card"
          {{sortableItem groupName="sections" model=section}}
        >
          <div class="card-body">
            <div class="d-flex align-items-center gap-2 mb-2">
              <span
                class="sections-field__handle btn btn-sm btn-light"
                {{sortableHandle}}
              >⠿</span>
              <button
                type="button"
                class="btn btn-sm btn-light"
                data-test-toggle-section
                {{on "click" (fn this.toggleCollapsed section)}}
              >{{if (this.isCollapsed section) "▸" "▾"}}</button>
              <strong>Section — {{section.type}}</strong>
              <button
                type="button"
                class="btn btn-sm btn-outline-danger ms-auto"
                data-test-remove-section
                {{on "click" (fn this.removeSection section)}}
              >Supprimer la section</button>
            </div>
            {{#unless (this.isCollapsed section)}}
              <SectionEditor
                @section={{section}}
                @onChange={{fn this.updateSectionField section}}
                @onGrainsChange={{this.updateSectionGrains}}
              />
            {{/unless}}
          </div>
        </li>
      {{/each}}
    </ol>
    <button
      type="button"
      class="btn btn-outline-primary"
      data-test-add-section
      {{on "click" this.addSection}}
    >+ Section</button>
  </template>
}
