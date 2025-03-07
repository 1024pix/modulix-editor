export const schema = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "object",
  "properties": {
    "formId": {
      "type": "integer",
      "title": "Identifiant du formulaire"
    },
    "mailboxName": {
      "type": "string",
      "title": "Nom de la boîte mail associée (pense-bête)",
    },
    "personaSelectorId": {
      "type": "integer",
      "title": "Identifiant du champ de sélection de persona"
    },
    "reasonSelectorId": {
      "type": "integer",
      "title": "Identifiant du champ de sélection de motif"
    },
    "subReasonSelectorId": {
      "type": "integer",
      "title": "Identifiant du champ de sélection de sous-motif"
    },
    "personas": {
      "type": "array",
      "title": "Personas",
      "items":
        {
          "title": "Persona",
          "type": "object",
          "properties": {
            "id": {
              "title": "Identifiant de la persona",
              "type": "integer",
              "description": "Valeur de l'option correspondante dans le champ de sélection de persona",
            },
            "name": {
              "title": "Nom de la persona (pense-bête)",
              "type": "string"
            },
            "fields": {
              "title": "Champs",
              "type": "array",
              "description": "Champs à afficher lorsque la persona est sélectionnée.",
              "items": {
                "title": "Champ",
                "type": "object",
                "properties": {
                  "id": {
                    "title": "Identifiant du champ",
                    "type": "integer"
                  },
                  "name": {
                    "title": "Libellé du champ (pense-bête)",
                    "type": "string"
                  }
                },
                "required": [
                  "id",
                  "name"
                ]
              },
            },
            "reasons": {
              "title": "Motifs",
              "description": "Motifs à proposer lorsque la persona est sélectionnée.",
              "type": "array",
              "items": {
                "title": "Motif",
                "type": "object",
                "properties": {
                  "id": {
                    "title": "Identifiant du motif",
                    "description": "Valeur de l'option correspondante dans le champ de sélection de motif.",
                    "type": "integer"
                  },
                  "name": {
                    "title": "Nom du motif (pense-bête)",
                    "type": "string"
                  },
                  "subReasons": {
                    "title": "Sous-motifs",
                    "description": "Sous-motifs à proposer lorsque le motif est sélectionnée.",
                    "type": "array",
                    "items": [
                      {
                        "title": "Sous-motif",
                        "type": "object",
                        "properties": {
                          "id": {
                            "title": "Identifiant du sous-motif",
                            "type": "integer"
                          },
                          "name": {
                            "title": "Nom du sous-motif (pense-bête)",
                            "type": "string"
                          }
                        },
                        "required": [
                          "id",
                          "name"
                        ]
                      },
                      {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "integer"
                          }
                        },
                        "required": [
                          "id"
                        ]
                      }
                    ]
                  }
                },
                "required": [
                  "id",
                  "name",
                  "subReasons"
                ]
              }
            }
          },
          "required": [
            "id",
            "name",
            "fields",
            "reasons"
          ]
        },

    }
  },
  "required": [
    "formId",
    "mailboxName",
    "personaSelectorId",
    "reasonSelectorId",
    "subReasonSelectorId",
    "personas"
  ]
};
