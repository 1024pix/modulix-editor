#!/usr/bin/env node
/**
 * generate-cheatsheet.mjs
 *
 * Génère cheatsheet.html à partir du JSON schema de l'API Modulix Pix.
 * Requiert Node 18+ (fetch natif).
 *
 * Usage :
 *   node generate-cheatsheet.mjs
 *   node generate-cheatsheet.mjs --url https://api.recette.pix.fr/api/module-schema/module-json-schema.json
 *   node generate-cheatsheet.mjs --output ./docs/cheatsheet.html
 */

import { writeFileSync } from 'fs';
import { basename, dirname, join } from 'path';

const DEFAULT_URLS = [
  'https://api.integration.pix.fr/api/module-schema/module-json-schema.json',
  'https://api.recette.pix.fr/api/module-schema/module-json-schema.json',
];

// ─── CLI args ──────────────────────────────────────────────────────────────

const schemaUrls = DEFAULT_URLS;
const htmlFile = 'cheatsheet.html';
const cssFile = 'cheatsheet.css';

// ─── Fetch schema ──────────────────────────────────────────────────────────

async function fetchSchema(urls) {
  for (const url of urls) {
    try {
      const res = await fetch(url, { cache: 'no-cache' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      console.error(`[ok] Schema fetched from ${url}`);
      return await res.json();
    } catch (e) {
      console.error(`[skip] ${url} : ${e.message}`);
    }
  }
  throw new Error('Impossible de charger le schema depuis les URLs fournies.');
}

// ─── Schema helpers ────────────────────────────────────────────────────────

function getDesc(s) {
  const opts = s?.options;
  const raw =
    opts && typeof opts === 'object'
      ? opts.infoText || ''
      : s?.description || '';
  return raw.replace(/jodit/gi, 'wysiwyg');
}

function propInfo(name, schema, requiredList = []) {
  const fmt = schema?.format || null;
  return {
    name,
    type: schema?.type || '',
    format: fmt ? fmt.replace(/jodit/gi, 'wysiwyg') : null,
    enum: schema?.enum || [],
    desc: getDesc(schema),
    required: requiredList.includes(name),
    min: schema?.minimum ?? null,
    max: schema?.maximum ?? null,
    minLength: schema?.minLength ?? null,
    pattern: schema?.pattern || null,
    items: schema?.items || null,
    oneOf: schema?.oneOf || null,
  };
}

function extractProps(schemaObj, requiredList = []) {
  return Object.entries(schemaObj?.properties || {}).map(([name, s]) =>
    propInfo(name, s, requiredList),
  );
}

/** Résumé court du contenu d'un array items, pour affichage inline. */
function describeItems(itemsSchema) {
  if (!itemsSchema) return '';
  if (itemsSchema.oneOf) {
    return itemsSchema.oneOf
      .map((s) => s.title || s?.properties?.type?.enum?.[0] || '?')
      .join(' | ');
  }
  if (itemsSchema.type === 'object' && itemsSchema.properties) {
    return '{ ' + Object.keys(itemsSchema.properties).join(', ') + ' }';
  }
  return itemsSchema.type || '';
}

// ─── Parse schema into a structured model ─────────────────────────────────

function parseSchema(schema) {
  const sectionsItems = schema?.properties?.sections?.items;
  const grainsItems = sectionsItems?.properties?.grains?.items;
  const componentOneOf =
    grainsItems?.properties?.components?.items?.oneOf || [];

  const elementComp = componentOneOf.find((c) =>
    c?.properties?.type?.enum?.includes('element'),
  );
  const stepperComp = componentOneOf.find((c) =>
    c?.properties?.type?.enum?.includes('stepper'),
  );

  const elementOneOf = elementComp?.properties?.element?.oneOf || [];
  const stepperElementOneOf =
    stepperComp?.properties?.steps?.items?.properties?.elements?.items?.oneOf ||
    [];

  // Titre des éléments disponibles dans le stepper (pour la note)
  const stepperElementTitles = stepperElementOneOf.map(
    (e) => e.title || e?.properties?.type?.enum?.[0] || '?',
  );

  // Parse element types
  const elementTypes = elementOneOf.map((el) => {
    // L'élément "custom" a lui-même un oneOf pour ses sous-types
    if (el.oneOf) {
      return {
        title: el.title || 'custom',
        isCustomGroup: true,
        tagNames: el.oneOf.map((sub) => sub.title).filter(Boolean),
        commonProps: extractProps(
          el.oneOf[0],
          el.oneOf[0]?.required || [],
        ).filter((p) => !['id', 'type', 'tagName', 'props'].includes(p.name)),
        sharedProps: [
          propInfo('id', { type: 'string', format: 'uuid' }, ['id']),
          propInfo('type', { type: 'string', enum: ['custom'] }, ['type']),
          propInfo('tagName', { type: 'string' }, ['tagName']),
          {
            name: 'title',
            type: 'string',
            format: null,
            enum: [],
            desc: "Titre de l'élément interactif. Facultatif.",
            required: false,
            min: null,
            max: null,
            pattern: null,
            items: null,
            oneOf: null,
          },
          {
            name: 'instruction',
            type: 'string',
            format: 'html',
            enum: [],
            desc: 'Consigne pédagogique. Facultatif.',
            required: false,
            min: null,
            max: null,
            pattern: null,
            items: null,
            oneOf: null,
          },
          {
            name: 'functionalInstruction',
            type: 'string',
            format: 'html',
            enum: [],
            desc: 'Consigne fonctionnelle. Facultatif.',
            required: false,
            min: null,
            max: null,
            pattern: null,
            items: null,
            oneOf: null,
          },
          {
            name: 'props',
            type: 'object',
            format: null,
            enum: [],
            desc: 'Propriétés spécifiques au composant (varie selon le tagName).',
            required: false,
            min: null,
            max: null,
            pattern: null,
            items: null,
            oneOf: null,
          },
        ],
      };
    }

    return {
      title: el.title || el?.properties?.type?.enum?.[0] || '?',
      isCustomGroup: false,
      props: extractProps(el, el.required || []).filter(
        (p) => p.name !== 'type',
      ),
    };
  });

  // QROCM proposals
  const qrocmSchema = elementOneOf.find((e) => e.title === 'qrocm');
  const qrocmProposalOneOf =
    qrocmSchema?.properties?.proposals?.items?.oneOf || [];
  const qrocmProposals = qrocmProposalOneOf.map((p) => ({
    title: p.title || p?.properties?.type?.enum?.[0] || '?',
    props: extractProps(p, p.required || []).filter((p) => p.name !== 'type'),
    typeValue: p?.properties?.type?.enum?.[0] || '',
  }));

  // Section & grain properties (id, type, children)
  const sectionSchema = sectionsItems || {};
  const grainSchema = grainsItems || {};

  return {
    moduleProps: extractProps(schema, schema.required || []).filter(
      (p) => !['sections', 'details'].includes(p.name),
    ),
    moduleAllProps: extractProps(schema, schema.required || []),
    detailsProps: extractProps(
      schema.properties?.details,
      schema.properties?.details?.required || [],
    ),
    sectionTypes: sectionSchema?.properties?.type?.enum || [],
    sectionRequired: sectionSchema?.required || [],
    grainTypes: grainSchema?.properties?.type?.enum || [],
    grainRequired: grainSchema?.required || [],
    elementTypes,
    stepperElementTitles,
    qrocmProposals,
  };
}

// ─── HTML helpers ──────────────────────────────────────────────────────────

function esc(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function typeTag(type) {
  if (!type) return '';
  return `<span class="tag tag-${esc(type)}">${esc(type)}</span>`;
}

function formatTag(fmt) {
  if (!fmt) return '';
  return `<span class="tag tag-format">${esc(fmt)}</span>`;
}

function enumPills(values) {
  if (!values?.length) return '';
  return `<div class="enum-list">${values.map((v) => `<span class="enum-pill pix-monospace">${esc(v)}</span>`).join('')}</div>`;
}

function inlineCode(str) {
  return `<code>${esc(str)}</code>`;
}

function propRow(p) {
  const emptyStringOk = p.required && p.type === 'string' && p.minLength === 0;
  const showStar = p.required && !emptyStringOk;
  const nameHtml = `<span class="prop-name pix-monospace pix-body-weight-bold">${esc(p.name)}${showStar ? '<span class="req-star">*</span>' : ''}</span>`;

  // Type cell: type tag + items hint if array
  let typeCell = typeTag(p.type);
  if (p.type === 'array' && p.items) {
    const hint = describeItems(p.items);
    if (hint)
      typeCell += ` <span class="prop-desc" style="font-size:11px;">de ${esc(hint)}</span>`;
  }

  // Value cell: enum > format + pattern + range
  let valCell = '';
  if (p.enum?.length) {
    valCell = enumPills(p.enum);
  } else {
    const parts = [];
    if (p.format) parts.push(formatTag(p.format));
    if (p.pattern) parts.push(inlineCode(p.pattern));
    if (p.min !== null && p.max !== null) parts.push(`${p.min} — ${p.max}`);
    else if (p.min !== null) parts.push(`&ge; ${p.min}`);
    valCell = parts.join(' ');
  }

  const descParts = [];
  if (p.desc)
    descParts.push(`<span class="prop-desc pix-body-xs">${esc(p.desc)}</span>`);
  if (emptyStringOk)
    descParts.push(
      `<span class="empty-ok-note pix-body-xs">Doit être présent dans le JSON, peut contenir une chaîne vide <code>""</code></span>`,
    );
  const descCell = descParts.join('');

  return `<tr><td>${nameHtml}</td><td>${typeCell}</td><td>${valCell}</td><td>${descCell}</td></tr>`;
}

function propTable(props, compact = false) {
  const style = compact ? ' style="font-size:12px;"' : '';
  const ths = ['Propriété', 'Type', 'Valeurs / Format', 'Description']
    .map((h) => `<th>${h}</th>`)
    .join('');
  const rows = props.map(propRow).join('');
  return `<div class="table-wrap">
  <table class="prop-table"${style}>
    <thead><tr>${ths}</tr></thead>
    <tbody>${rows}</tbody>
  </table></div>`;
}

// ─── Section blocks ────────────────────────────────────────────────────────

function sectionBlock(id, headerClass, title, descHtml, bodyHtml) {
  return `
<div class="section-block" id="${id}">
  <div class="section-header pix-title-xxs ${headerClass}">${esc(title)}</div>
  ${descHtml ? `<div class="section-desc">${descHtml}</div>` : ''}
  ${bodyHtml}
</div>`;
}

function subTitle(text) {
  return `<div class="sub-section"><h3 class="pix-body-xs pix-body-weight-bold">${esc(text)}</h3></div>`;
}

function elementCard(titleHtml, bodyHtml) {
  return `<div class="element-card"><div class="element-card-title pix-monospace pix-body-weight-bold">${titleHtml}</div>${bodyHtml}</div>`;
}

// ─── Render element types ──────────────────────────────────────────────────

function renderElementType(el) {
  if (el.isCustomGroup) {
    const tagNamesHtml = el.tagNames
      .map((t) => `<span class="custom-pill pix-monospace">${esc(t)}</span>`)
      .join('');
    const titleHtml = `custom <a href="#custom" style="font-size:11px; font-weight:400; color:var(--custom-color);">voir subtypes</a>`;
    const body = `
      <div class="custom-grid" style="padding:8px 0 4px;">${tagNamesHtml}</div>
      <div class="table-wrap"><table class="prop-table" style="font-size:12px;">
        <tbody>${el.sharedProps.map(propRow).join('')}</tbody>
      </table></div>`;
    return elementCard(titleHtml, body);
  }

  const titleStr = el.title;
  const isElementOnly = [
    'qab',
    'qcu-declarative',
    'qcu-discovery',
    'flashcards',
  ].includes(titleStr);
  const badge = isElementOnly
    ? ` <small style="font-weight:400; color:var(--muted); font-size:11px;">(element only)</small>`
    : '';
  const qrocmLink =
    titleStr === 'qrocm'
      ? ` <small style="font-size:11px; font-weight:400;"><a href="#qrocm" style="color:var(--element-color);">voir details</a></small>`
      : '';

  const props = el.props.filter((p) => p.name !== 'id');
  const body =
    props.length === 0
      ? `<div class="prop-desc" style="padding-top:4px;">Aucune propriété supplémentaire (id + type uniquement).</div>`
      : `<div class="table-wrap"><table class="prop-table" style="font-size:12px;">
          <tbody>${props.map(propRow).join('')}</tbody>
        </table></div>`;

  return elementCard(`${esc(titleStr)}${badge}${qrocmLink}`, body);
}

// ─── CSS ───────────────────────────────────────────────────────────────────

const CSS = `
/* ── Pix UI Design Tokens (inlinés depuis @1024pix/pix-ui) ─────────────── */
:root {
  /* Primary */
  --pix-primary-10: rgb(247,245,255); --pix-primary-100: rgb(206,195,244);
  --pix-primary-300: rgb(149,126,232); --pix-primary-500: rgb(97,63,221);
  --pix-primary-700: rgb(69,45,157);  --pix-primary-900: rgb(41,26,93);
  /* Tertiary */
  --pix-tertiary-100: rgb(195,208,255); --pix-tertiary-500: rgb(61,104,255);
  --pix-tertiary-900: rgb(26,44,107);
  /* Neutral */
  --pix-neutral-0: rgb(255,255,255);   --pix-neutral-20: rgb(244,245,247);
  --pix-neutral-100: rgb(205,209,217); --pix-neutral-300: rgb(147,157,173);
  --pix-neutral-500: rgb(94,108,132);  --pix-neutral-800: rgb(37,56,88);
  --pix-neutral-900: rgb(18,38,71);
  /* Info */
  --pix-info-50: rgb(234,241,255);  --pix-info-100: rgb(190,212,255);
  --pix-info-500: rgb(44,117,255);  --pix-info-700: rgb(31,83,181);
  /* Success */
  --pix-success-50: rgb(230,246,239); --pix-success-100: rgb(176,228,204);
  --pix-success-500: rgb(0,168,90);   --pix-success-700: rgb(0,119,64);
  /* Warning */
  --pix-warning-50: rgb(253,240,231); --pix-warning-100: rgb(250,209,181);
  --pix-warning-500: rgb(238,105,17); --pix-warning-700: rgb(169,75,12);
  /* Error */
  --pix-error-50: rgb(251,235,234); --pix-error-500: rgb(215,51,40);
  --pix-error-700: rgb(153,36,28);
  /* Secondary */
  --pix-secondary-50: rgb(255,250,235); --pix-secondary-100: rgb(255,239,192);
  --pix-secondary-700: rgb(161,98,6);   --pix-secondary-900: rgb(91,56,8);
  /* Domain */
  --pix-security-dark: rgb(172,0,141);
  /* Spacing */
  --pix-spacing-1x:4px; --pix-spacing-2x:8px;  --pix-spacing-3x:12px;
  --pix-spacing-4x:16px;--pix-spacing-6x:24px; --pix-spacing-8x:32px;
  --pix-spacing-10x:40px;--pix-spacing-12x:48px;
  /* Font weights */
  --pix-font-normal:400; --pix-font-medium:500; --pix-font-bold:700;
  /* Font families (depuis @1024pix/pix-ui _fonts.scss) */
  --_pix-font-family-title: 'Nunito', Arial, sans-serif;
  --_pix-font-family-body: 'Roboto', Arial, sans-serif;
  --_pix-font-family-monospace: 'Roboto Mono', monospace;

  /* ── Alias sémantiques ── */
  --bg:      var(--pix-neutral-20);
  --surface: var(--pix-neutral-0);
  --border:  var(--pix-neutral-100);
  --text:    var(--pix-neutral-900);
  --muted:   var(--pix-neutral-500);
  --required: var(--pix-error-500);

  --module-color:    var(--pix-primary-700);
  --section-color:   var(--pix-tertiary-900);
  --grain-color:     var(--pix-success-700);
  --component-color: var(--pix-warning-700);
  --element-color:   var(--pix-warning-500);
  --custom-color:    var(--pix-security-dark);

  --tag-bg-string:  var(--pix-info-50);       --tag-color-string:  var(--pix-info-700);
  --tag-bg-boolean: var(--pix-success-50);    --tag-color-boolean: var(--pix-success-700);
  --tag-bg-number:  var(--pix-error-50);      --tag-color-number:  var(--pix-error-700);
  --tag-bg-integer: var(--pix-error-50);      --tag-color-integer: var(--pix-error-700);
  --tag-bg-array:   var(--pix-secondary-50);  --tag-color-array:   var(--pix-secondary-700);
  --tag-bg-object:  var(--pix-primary-10);    --tag-color-object:  var(--pix-primary-700);
  --tag-bg-format:  var(--pix-success-50);     --tag-color-format:  var(--pix-success-700);
}

/* ── Classes typographiques (depuis @1024pix/pix-ui _typography.scss) ───── */
.pix-title-l   { font-family:var(--_pix-font-family-title); font-weight:var(--pix-font-bold); font-size:1.75rem; line-height:1.3; letter-spacing:calc(-0.02 * 1.75rem); }
.pix-title-xxs { font-family:var(--_pix-font-family-title); font-weight:var(--pix-font-bold); font-size:1.125rem; line-height:1.625; letter-spacing:calc(-0.01 * 1.125rem); }
.pix-body-s    { font-family:var(--_pix-font-family-body); font-weight:var(--pix-font-normal); font-size:0.875rem; line-height:1.5; }
.pix-body-xs   { font-family:var(--_pix-font-family-body); font-weight:var(--pix-font-normal); font-size:0.75rem; line-height:1.5; letter-spacing:0.02em; }
.pix-monospace { font-family:var(--_pix-font-family-monospace); font-weight:var(--pix-font-normal); }
.pix-body-weight-bold   { font-weight:var(--pix-font-bold); }
.pix-body-weight-medium { font-weight:var(--pix-font-medium); }

/* ── Layout & composants ─────────────────────────────────────────────────── */
* { box-sizing: border-box; margin: 0; padding: 0; }
body { background: var(--bg); color: var(--text); }
header { background: linear-gradient(135deg, var(--pix-primary-500) 0%, var(--pix-tertiary-500) 100%); color: var(--pix-neutral-0); padding: var(--pix-spacing-8x) var(--pix-spacing-10x); }
header h1 { margin-bottom: var(--pix-spacing-2x); }
header p { opacity: 0.85; font-size: 0.9375rem; }
nav { background: var(--surface); border-bottom: 1px solid var(--border); padding: var(--pix-spacing-3x) var(--pix-spacing-10x); display: flex; gap: var(--pix-spacing-2x); flex-wrap: wrap; position: sticky; top: 0; z-index: 100; box-shadow: 0 1px 4px rgba(18,38,71,.08); }
nav a { text-decoration: none; padding: var(--pix-spacing-1x) var(--pix-spacing-3x); border-radius: 20px; font-size: 0.8125rem; font-weight: var(--pix-font-medium); border: 1px solid transparent; }
nav a:hover { opacity: .8; }
.nav-module  { background:var(--pix-primary-10);   color:var(--module-color);    border-color:var(--pix-primary-100); }
.nav-section { background:var(--pix-tertiary-100); color:var(--section-color);   border-color:var(--pix-tertiary-500); }
.nav-grain   { background:var(--pix-success-50);   color:var(--grain-color);     border-color:var(--pix-success-500); }
.nav-element { background:var(--pix-warning-50);   color:var(--element-color);   border-color:var(--pix-warning-100); }
.nav-custom  { background:var(--pix-info-50);      color:var(--pix-info-700);    border-color:var(--pix-info-100); }
main { margin: 0 auto; padding: var(--pix-spacing-8x) var(--pix-spacing-10x) var(--pix-spacing-12x); display: flex; flex-direction: column; gap: var(--pix-spacing-10x); }
.section-block { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; }
.section-header { padding: var(--pix-spacing-4x) var(--pix-spacing-6x); border-bottom: 1px solid var(--border); }
.section-desc { padding: var(--pix-spacing-2x) var(--pix-spacing-6x) var(--pix-spacing-4x); color: var(--muted); font-size: 0.8125rem; border-bottom: 1px solid var(--border); }
.section-desc code, code { font-family: var(--_pix-font-family-monospace); background: var(--pix-neutral-20); padding: 1px 5px; border-radius: 3px; font-size: 0.75rem; }
.hd-module    { background:var(--pix-primary-10);  color:var(--module-color); }
.hd-section   { background:var(--pix-tertiary-100); color:var(--section-color); }
.hd-grain     { background:var(--pix-success-50);  color:var(--grain-color); }
.hd-component { background:var(--pix-secondary-50); color:var(--component-color); }
.hd-element   { background:var(--pix-warning-50);  color:var(--element-color); }
.hd-custom    { background:var(--pix-info-50);     color:var(--pix-info-700); }
.prop-table { width: 100%; border-collapse: collapse; }
.prop-table th { background:var(--pix-neutral-20); text-align:left; padding:var(--pix-spacing-2x) var(--pix-spacing-4x); font-size:0.6875rem; text-transform:uppercase; letter-spacing:.06em; color:var(--muted); border-bottom:1px solid var(--border); font-weight:var(--pix-font-bold); }
.prop-table td { padding:var(--pix-spacing-2x) var(--pix-spacing-4x); border-bottom:1px solid var(--pix-neutral-20); vertical-align:top; }
.prop-table tr:last-child td { border-bottom:none; }
.prop-table tr:hover td { background:var(--pix-neutral-20); }
.prop-name { font-size:0.8125rem; color:var(--pix-neutral-800); }
.req-star { color:var(--required); font-weight:var(--pix-font-bold); margin-left:2px; }
.tag { display:inline-block; padding:2px var(--pix-spacing-2x); border-radius:10px; font-size:0.6875rem; font-weight:var(--pix-font-bold); margin-right:4px; margin-bottom:2px; }
.tag-string  { background:var(--tag-bg-string);  color:var(--tag-color-string); }
.tag-boolean { background:var(--tag-bg-boolean); color:var(--tag-color-boolean); }
.tag-number  { background:var(--tag-bg-number);  color:var(--tag-color-number); }
.tag-integer { background:var(--tag-bg-integer); color:var(--tag-color-integer); }
.tag-array   { background:var(--tag-bg-array);   color:var(--tag-color-array); }
.tag-object  { background:var(--tag-bg-object);  color:var(--tag-color-object); }
.tag-format  { background:var(--tag-bg-format);  color:var(--tag-color-format); }
.enum-list { display:flex; flex-wrap:wrap; gap:4px; margin-top:2px; }
.enum-pill { font-size:0.6875rem; background:var(--pix-secondary-50); color:var(--pix-secondary-900); border:1px solid var(--pix-secondary-100); border-radius:4px; padding:1px 7px; }
.prop-desc { color:var(--muted); margin-top:3px; }
.hierarchy { padding:var(--pix-spacing-6x); font-size:0.8125rem; line-height:2; color:var(--muted); }
.h-module  { color:var(--module-color);    font-weight:var(--pix-font-bold); }
.h-section { color:var(--section-color);   font-weight:var(--pix-font-medium); }
.h-grain   { color:var(--grain-color);     font-weight:var(--pix-font-medium); }
.h-comp    { color:var(--component-color); font-weight:var(--pix-font-medium); }
.h-element { color:var(--element-color); }
.element-card { border-right:1px solid var(--border); border-bottom:1px solid var(--border); padding:var(--pix-spacing-4x) var(--pix-spacing-6x); }
.element-card-title { font-size:0.875rem; color:var(--element-color); margin-bottom:var(--pix-spacing-2x); }
.custom-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(210px,1fr)); gap:var(--pix-spacing-2x); padding:var(--pix-spacing-6x); }
.custom-pill { font-size:0.75rem; background:var(--pix-info-50); color:var(--pix-info-700); border:1px solid var(--pix-info-100); border-radius:6px; padding:var(--pix-spacing-2x) var(--pix-spacing-3x); font-weight:var(--pix-font-medium); }
.sub-section { padding:0 var(--pix-spacing-6x) 4px; }
.sub-section h3 { font-size:0.6875rem; text-transform:uppercase; letter-spacing:.05em; color:var(--muted); margin:var(--pix-spacing-4x) 0 0; }
.legend { display:flex; flex-wrap:wrap; gap:var(--pix-spacing-2x); padding:var(--pix-spacing-3x) var(--pix-spacing-6x); border-bottom:1px solid var(--border); align-items:center; color:var(--muted); }
.table-wrap { overflow-x:auto; }
.empty-ok-note { display:block; margin-top:4px; color:var(--pix-info-700); background:var(--pix-info-50); border:1px solid var(--pix-info-100); border-radius:4px; padding:2px 6px; font-size:0.6875rem; }
@media(max-width:768px){ main{padding:var(--pix-spacing-4x);} header{padding:var(--pix-spacing-6x);} nav{padding:var(--pix-spacing-3x) var(--pix-spacing-4x);} }
`;

// ─── Generate HTML ─────────────────────────────────────────────────────────

function generateHtml(model, generatedAt, cssFilename) {
  const {
    moduleProps,
    detailsProps,
    sectionTypes,
    sectionRequired,
    grainTypes,
    grainRequired,
    elementTypes,
    stepperElementTitles,
    qrocmProposals,
  } = model;

  // Module section: split details/sections from the rest
  const topProps = moduleProps;

  // Stepper note: elements NOT in stepper
  const allElementTitles = elementTypes
    .filter((e) => !e.isCustomGroup)
    .map((e) => e.title);
  const notInStepper = allElementTitles.filter(
    (t) => !stepperElementTitles.includes(t),
  );
  const notInStepperNote =
    notInStepper.length > 0
      ? `Éléments <strong>non disponibles</strong> dans un stepper : ${notInStepper.map((t) => `<code>${esc(t)}</code>`).join(', ')}.`
      : '';

  // Custom tagNames
  const customGroup = elementTypes.find((e) => e.isCustomGroup);
  const customTagNames = customGroup?.tagNames || [];

  const legendHtml = `<div class="legend pix-body-xs">
    <span>Légende :</span>
    <span><span class="req-star">*</span> = requis, valeur non vide obligatoire</span>
    <span><span class="empty-ok-note" style="display:inline;">sans *</span> = doit être présent dans le JSON, mais peut contenir <code>""</code></span>
    ${['string', 'boolean', 'integer', 'array', 'object'].map((t) => `<span>${typeTag(t)}</span>`).join('')}
    <span>${formatTag('format')}</span>
  </div>`;

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Modulix — Cheat Sheet JSON Schema</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&family=Roboto:wght@400;500;700&family=Roboto+Mono:wght@400&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="${cssFilename}" />
</head>
<body class="pix-body-s">

<header>
  <h1 class="pix-title-l">Modulix — JSON Schema Cheat Sheet</h1>
  <p>Référence complète de tous les champs, types et propriétés du schéma de module Pix.
     <small style="opacity:.65;">Généré le ${esc(generatedAt)}</small></p>
</header>

<nav>
  <a href="#structure"  class="nav-module">Structure</a>
  <a href="#module"     class="nav-module">Module</a>
  <a href="#sections"   class="nav-section">Sections</a>
  <a href="#grains"     class="nav-grain">Grains</a>
  <a href="#components" class="nav-element">Components</a>
  <a href="#elements"   class="nav-element">Elements</a>
  <a href="#custom"     class="nav-custom">Focus Custom</a>
  ${qrocmProposals.length ? '<a href="#qrocm" class="nav-element">Focus QROCM proposals</a>' : ''}
</nav>

<main>

${sectionBlock(
  'structure',
  'hd-module',
  'Structure générale',
  '',
  `<div class="hierarchy pix-monospace">
    <span class="h-module">Module</span><br>
    &nbsp;&nbsp;&#9500;&#9472;&#9472; id, shortId, slug, title, isBeta, visibility<br>
    &nbsp;&nbsp;&#9500;&#9472;&#9472; <span class="h-module">details</span> { image, description, duration, level, objectives, tabletSupport }<br>
    &nbsp;&nbsp;&#9492;&#9472;&#9472; <span class="h-section">sections[]</span><br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#9500;&#9472;&#9472; id, type<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#9492;&#9472;&#9472; <span class="h-grain">grains[]</span><br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#9500;&#9472;&#9472; id, type, title<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#9492;&#9472;&#9472; <span class="h-comp">components[]</span> <em>(oneOf)</em><br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#9500;&#9472;&#9472; <span class="h-element">{ type: "element", element: Element }</span><br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#9492;&#9472;&#9472; <span class="h-element">{ type: "stepper", steps: [{ elements: Element[] }] }</span>
  </div>`,
)}

${sectionBlock(
  'module',
  'hd-module',
  'Module',
  'Propriétés du module au niveau racine.',
  `${legendHtml}
  ${propTable(topProps)}
  ${subTitle('details.*')}
  ${propTable(detailsProps)}`,
)}

${sectionBlock(
  'sections',
  'hd-section',
  'Sections',
  'Une section regroupe plusieurs grains dans un thème pédagogique.',
  `${legendHtml}
  ${propTable([
    propInfo('id', { type: 'string', format: 'uuid' }, sectionRequired),
    propInfo('type', { type: 'string', enum: sectionTypes }, sectionRequired),
    propInfo('grains', { type: 'array' }, sectionRequired),
  ])}`,
)}

${sectionBlock(
  'grains',
  'hd-grain',
  'Grains',
  'Un grain est une unité pédagogique atomique contenant des composants.',
  `${legendHtml}
  ${propTable([
    propInfo('id', { type: 'string', format: 'uuid' }, grainRequired),
    propInfo('type', { type: 'string', enum: grainTypes }, grainRequired),
    propInfo('title', { type: 'string' }, grainRequired),
    propInfo('components', { type: 'array' }, grainRequired),
  ])}`,
)}

${sectionBlock(
  'components',
  'hd-component',
  'Components',
  'Deux types de composants sont possibles dans un grain via <code>oneOf</code> : <strong>element</strong> et <strong>stepper</strong>.',
  `${legendHtml}
  <div class="element-grid">
    <div class="element-card">
      <div class="element-card-title pix-monospace pix-body-weight-bold" style="color:var(--component-color);">element</div>
      <table class="prop-table"><tbody>
        <tr><td><span class="prop-name pix-monospace pix-body-weight-bold">type<span class="req-star">*</span></span></td><td><span class="enum-pill pix-monospace">element</span></td></tr>
        <tr><td><span class="prop-name pix-monospace pix-body-weight-bold">element<span class="req-star">*</span></span></td><td>${typeTag('object')} — cf. section Elements</td></tr>
      </tbody></table>
    </div>
    <div class="element-card">
      <div class="element-card-title pix-monospace pix-body-weight-bold" style="color:var(--component-color);">stepper</div>
      <table class="prop-table"><tbody>
        <tr><td><span class="prop-name pix-monospace pix-body-weight-bold">type<span class="req-star">*</span></span></td><td><span class="enum-pill pix-monospace">stepper</span></td></tr>
        <tr><td><span class="prop-name pix-monospace pix-body-weight-bold">steps<span class="req-star">*</span></span></td><td>${typeTag('array')} de <code>{ elements: Element[] }</code></td></tr>
      </tbody></table>
      ${notInStepperNote ? `<div class="prop-desc" style="margin-top:10px; font-size:12px;">${notInStepperNote}</div>` : ''}
    </div>
  </div>`,
)}

${sectionBlock(
  'elements',
  'hd-element',
  'Elements',
  `Chaque élément possède <code>id</code> (uuid, requis) et <code>type</code> (requis).
   Les éléments marqués <em>(element only)</em> ne sont pas disponibles dans un stepper.`,
  `${legendHtml}
  <div class="element-grid">${elementTypes.map(renderElementType).join('')}</div>`,
)}

${sectionBlock(
  'custom',
  'hd-custom',
  'Éléments custom (tagName)',
  `Les éléments custom sont de <code>type: "custom"</code>. Le champ <code>tagName</code> identifie le composant spécifique.
   Ils partagent les mêmes propriétés communes. Disponibles uniquement dans un composant <strong>element</strong> (pas dans un stepper).`,
  `${legendHtml}
  <div class="custom-grid">
    ${customTagNames.map((t) => `<div class="custom-pill pix-monospace">${esc(t)}</div>`).join('')}
  </div>
  ${subTitle('Propriétés communes à tous les custom')}
  ${propTable(customGroup?.sharedProps || [])}`,
)}

${
  qrocmProposals.length
    ? sectionBlock(
        'qrocm',
        'hd-element',
        'QROCM — Détail des proposals',
        `Les <code>proposals</code> d'un QROCM sont une séquence de blocs <strong>text</strong>, <strong>input</strong> et <strong>select</strong> (oneOf). Ils s'affichent les uns à la suite des autres pour former la question.`,
        `${legendHtml}
        <div class="element-grid">
          ${qrocmProposals
            .map((p) => {
              const body =
                p.props.length === 0
                  ? ''
                  : `<div class="table-wrap"><table class="prop-table" style="font-size:12px;">
                      <tbody>
                        <tr><td><span class="prop-name pix-monospace pix-body-weight-bold">type<span class="req-star">*</span></span></td><td><span class="enum-pill pix-monospace">${esc(p.typeValue)}</span></td></tr>
                        ${p.props.map(propRow).join('')}
                      </tbody>
                    </table></div>`;
              return elementCard(esc(p.title), body);
            })
            .join('')}
        </div>`,
      )
    : ''
}

</main>

<script>
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const t = document.querySelector(a.getAttribute('href'));
      if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
</script>
</body>
</html>`;
}

// ─── Main ──────────────────────────────────────────────────────────────────

const schema = await fetchSchema(schemaUrls);
const model = parseSchema(schema);
const generatedAt = new Date().toLocaleDateString('fr-FR', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
});
const cssFilename = basename(cssFile);
const html = generateHtml(model, generatedAt, cssFilename);

writeFileSync(htmlFile, html, 'utf8');
console.error(`[ok] ${htmlFile} généré (${html.length} octets)`);

writeFileSync(cssFile, CSS, 'utf8');
console.error(`[ok] ${cssFile} généré (${CSS.length} octets)`);
