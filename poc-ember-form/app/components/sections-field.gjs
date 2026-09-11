import Component from '@glimmer/component';
import { action } from '@ember/object';
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
      this.args.sections.map((s) => (s === section ? { ...s, [field]: event.target.value } : s)),
    );
  }

  @action
  updateSectionGrains(section, grains) {
    this.args.onChange(this.args.sections.map((s) => (s === section ? { ...s, grains } : s)));
  }

  <template>
    <ol class="sections-field list-unstyled d-flex flex-column gap-3 mb-3" {{sortableGroup onChange=this.reorder}}>
      {{#each @sections as |section|}}
        <li class="sections-field__item card" {{sortableItem model=section}}>
          <div class="card-body">
            <div class="d-flex align-items-start gap-2 mb-2">
              <span class="sections-field__handle btn btn-sm btn-light" {{sortableHandle}}>⠿</span>
              <button
                type="button"
                class="btn btn-sm btn-outline-danger ms-auto"
                data-test-remove-section
                {{on "click" (fn this.removeSection section)}}
              >Supprimer la section</button>
            </div>
            <SectionEditor
              @section={{section}}
              @onChange={{fn this.updateSectionField section}}
              @onGrainsChange={{this.updateSectionGrains}}
            />
          </div>
        </li>
      {{/each}}
    </ol>
    <button type="button" class="btn btn-outline-primary" data-test-add-section {{on "click" this.addSection}}>+ Section</button>
  </template>
}
