import { pageTitle } from 'ember-page-title';
import ModulixEditorHeader from 'modulix-editor/components/header';

<template>
  {{pageTitle "Modulix Editor"}}
  <ModulixEditorHeader />

  {{outlet}}
</template>
