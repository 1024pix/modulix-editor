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
    <ol class="sections-field" {{sortableGroup onChange=this.reorder}}>
      {{#each @sections as |section|}}
        <li class="sections-field__item" {{sortableItem model=section}}>
          <span class="sections-field__handle" {{sortableHandle}}>⠿</span>
          <SectionEditor
            @section={{section}}
            @onChange={{fn this.updateSectionField section}}
            @onGrainsChange={{this.updateSectionGrains}}
          />
          <button type="button" data-test-remove-section {{on "click" (fn this.removeSection section)}}>Supprimer la section</button>
        </li>
      {{/each}}
    </ol>
    <button type="button" data-test-add-section {{on "click" this.addSection}}>+ Section</button>
  </template>
}
