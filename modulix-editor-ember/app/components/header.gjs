import Component from '@glimmer/component';
import { action } from '@ember/object';
import { on } from '@ember/modifier';

export default class ModulixEditorHeader extends Component {

  @action
  onPreviewButtonClicked() {
    // TODO : add code
  }

  @action
  onDisplayJSONButtonClicked() {
    // TODO : add code
  }

  @action
  onDownloadJSONButtonClicked() {
    // TODO : add code
  }

  @action
  onCleanButtonClicked() {
    // TODO : add code
  }

  @action
  onCollapseButtonClicked() {
    // TODO : add code
  }

  @action
  onDisplayCheatsheetButtonClicked() {
    // TODO : replace with a link to the cheatsheet when component has been created
  }

  @action
  onResetModuleButtonClicked() {
    // TODO : add code
  }

<template>
  <header class="modulix-editor__header">
    <h1 class="modulix-editor__title">
      <img src="public/logo.png" alt="" class="modulix-editor__logo" />
      Modulix Editor
    </h1>

    <div class="btn-group">
      <button
        class="btn btn-light"
        id="preview-button"
        aria-label="Prévisualiser le module sur Pix App (Nouvelle fenêtre)"
        {{on "click" this.onPreviewButtonClicked}}
      >
        <span class="fa fa-eye me-1"></span> Prévisualiser
      </button>
      <button
        class="btn btn-light"
        id="toggle-json-button"
        aria-label="Afficher le JSON"
        {{on "click" this.onDisplayJSONButtonClicked}}
      >
        <span class="fa fa-code me-1"></span> JSON
      </button>
      <button
        class="btn btn-light"
        id="download-json-button"
        aria-label="Télécharger le JSON"
        {{on "click" this.onDownloadJSONButtonClicked}}
      >
        <span class="fa fa-download me-1"></span> Télécharger
      </button>
      <button
        class="btn btn-light"
        id="format-button"
        aria-label="Nettoyer la typographie"
        {{on "click" this.onCleanButtonClicked}}
      >
        <span class="fa fa-broom me-1"></span> Nettoyer
      </button>
      <button
        class="btn btn-light"
        id="collapse-all-button"
        aria-label="Tout replier"
        {{on "click" this.onCollapseButtonClicked}}
      >
        <span class="fa fa-compress me-1"></span> Replier
      </button>
      <button
        class="btn btn-light"
        id="display-documentation-button"
        aria-label="Afficher la fiche mémo (Nouvelle fenêtre)"
        {{on "click" this.onDisplayCheatsheetButtonClicked}}
      >
        <span class="fa fa-book me-1"></span> Mémo
      </button>
    </div>

    <button
      class="btn
      modulix-editor__reset-button"
      id="reset-button"
      aria-label="Réinitialiser le module"
      {{on "click" this.onResetModuleButtonClicked}}
    >
      <span class="fa fa-trash me-1"></span> Supprimer
    </button>
  </header>

</template>
}
