export const schema = {
  "type": "object",
  "properties": {
    "id": {
      "type": "string",
      "format": "uuid"
    },
    "shortId": {
      "type": "string",
      "format": null
    },
    "slug": {
      "type": "string",
      "format": null,
      "pattern": "^[a-z0-9-]+$"
    },
    "title": {
      "type": "string",
      "format": null
    },
    "isBeta": {
      "type": "boolean"
    },
    "visibility": {
      "type": "string",
      "format": null,
      "enum": [
        "private",
        "public"
      ]
    },
    "details": {
      "type": "object",
      "properties": {
        "image": {
          "type": "string",
          "format": "uri"
        },
        "description": {
          "type": "string",
          "format": "jodit"
        },
        "duration": {
          "type": "integer",
          "minimum": 0,
          "maximum": 120
        },
        "level": {
          "type": "string",
          "format": null,
          "enum": [
            "novice",
            "independent",
            "advanced",
            "expert"
          ]
        },
        "objectives": {
          "type": "array",
          "minItems": 1,
          "items": {
            "type": "string",
            "format": "jodit",
            "title": "objective"
          }
        },
        "tabletSupport": {
          "type": "string",
          "format": null,
          "enum": [
            "comfortable",
            "inconvenient",
            "obstructed"
          ]
        }
      },
      "required": [
        "image",
        "description",
        "duration",
        "level",
        "objectives",
        "tabletSupport"
      ],
      "additionalProperties": false
    },
    "sections": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "type": {
            "type": "string",
            "format": null,
            "enum": [
              "question-yourself",
              "explore-to-understand",
              "retain-the-essentials",
              "practise",
              "go-further",
              "blank"
            ]
          },
          "grains": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "id": {
                  "type": "string",
                  "format": "uuid"
                },
                "type": {
                  "type": "string",
                  "format": null,
                  "enum": [
                    "short-lesson",
                    "discovery",
                    "activity",
                    "challenge",
                    "lesson",
                    "summary",
                    "transition"
                  ]
                },
                "title": {
                  "type": "string",
                  "format": null
                },
                "components": {
                  "type": "array",
                  "items": {
                    "oneOf": [
                      {
                        "type": "object",
                        "properties": {
                          "type": {
                            "type": "string",
                            "format": null,
                            "enum": [
                              "element"
                            ]
                          },
                          "element": {
                            "oneOf": [
                              {
                                "type": "object",
                                "properties": {
                                  "id": {
                                    "type": "string",
                                    "format": "uuid"
                                  },
                                  "type": {
                                    "type": "string",
                                    "format": null,
                                    "enum": [
                                      "audio"
                                    ]
                                  },
                                  "title": {
                                    "type": "string",
                                    "format": null
                                  },
                                  "url": {
                                    "type": "string",
                                    "format": "uri"
                                  },
                                  "transcription": {
                                    "type": "string",
                                    "format": "jodit"
                                  }
                                },
                                "required": [
                                  "id",
                                  "type",
                                  "title",
                                  "url",
                                  "transcription"
                                ],
                                "additionalProperties": false,
                                "title": "audio"
                              },
                              {
                                "oneOf": [
                                  {
                                    "type": "object",
                                    "properties": {
                                      "id": {
                                        "type": "string",
                                        "format": "uuid"
                                      },
                                      "type": {
                                        "type": "string",
                                        "format": null,
                                        "enum": [
                                          "custom"
                                        ]
                                      },
                                      "instruction": {
                                        "type": "string",
                                        "format": "jodit"
                                      },
                                      "tagName": {
                                        "type": "string",
                                        "format": null,
                                        "enum": [
                                          "calcul-impact"
                                        ]
                                      },
                                      "props": {
                                        "type": "object",
                                        "properties": {
                                          "titleLevel": {
                                            "type": "number"
                                          }
                                        },
                                        "additionalProperties": false
                                      }
                                    },
                                    "required": [
                                      "id",
                                      "type",
                                      "instruction",
                                      "tagName"
                                    ],
                                    "additionalProperties": false,
                                    "title": "calcul-impact"
                                  },
                                  {
                                    "type": "object",
                                    "properties": {
                                      "id": {
                                        "type": "string",
                                        "format": "uuid"
                                      },
                                      "type": {
                                        "type": "string",
                                        "format": null,
                                        "enum": [
                                          "custom"
                                        ]
                                      },
                                      "instruction": {
                                        "type": "string",
                                        "format": "jodit"
                                      },
                                      "tagName": {
                                        "type": "string",
                                        "format": null,
                                        "enum": [
                                          "capacity-calculation"
                                        ]
                                      },
                                      "props": {
                                        "type": "object",
                                        "properties": {
                                          "titleLevel": {
                                            "type": "number"
                                          },
                                          "capacityImage": {
                                            "type": "string",
                                            "format": null
                                          }
                                        },
                                        "required": [
                                          "capacityImage"
                                        ],
                                        "additionalProperties": false
                                      }
                                    },
                                    "required": [
                                      "id",
                                      "type",
                                      "instruction",
                                      "tagName"
                                    ],
                                    "additionalProperties": false,
                                    "title": "capacity-calculation"
                                  },
                                  {
                                    "type": "object",
                                    "properties": {
                                      "id": {
                                        "type": "string",
                                        "format": "uuid"
                                      },
                                      "type": {
                                        "type": "string",
                                        "format": null,
                                        "enum": [
                                          "custom"
                                        ]
                                      },
                                      "instruction": {
                                        "type": "string",
                                        "format": "jodit"
                                      },
                                      "tagName": {
                                        "type": "string",
                                        "format": null,
                                        "enum": [
                                          "clickable-image"
                                        ]
                                      },
                                      "props": {
                                        "type": "object",
                                        "properties": {
                                          "image": {
                                            "type": "object",
                                            "properties": {
                                              "src": {
                                                "type": "string",
                                                "format": null
                                              },
                                              "alt": {
                                                "type": "string",
                                                "format": null
                                              },
                                              "width": {
                                                "type": "number"
                                              },
                                              "height": {
                                                "type": "number"
                                              }
                                            },
                                            "required": [
                                              "src",
                                              "alt"
                                            ],
                                            "additionalProperties": true
                                          },
                                          "areas": {
                                            "type": "array",
                                            "minItems": 1,
                                            "items": {
                                              "type": "object",
                                              "properties": {
                                                "coords": {
                                                  "type": "object",
                                                  "properties": {
                                                    "x1": {
                                                      "type": "number"
                                                    },
                                                    "y1": {
                                                      "type": "number"
                                                    },
                                                    "x2": {
                                                      "type": "number"
                                                    },
                                                    "y2": {
                                                      "type": "number"
                                                    }
                                                  },
                                                  "required": [
                                                    "x1",
                                                    "y1",
                                                    "x2",
                                                    "y2"
                                                  ],
                                                  "additionalProperties": false
                                                },
                                                "spot": {
                                                  "type": "object",
                                                  "properties": {
                                                    "x": {
                                                      "type": "number"
                                                    },
                                                    "y": {
                                                      "type": "number"
                                                    }
                                                  },
                                                  "additionalProperties": false
                                                },
                                                "info": {
                                                  "type": "string",
                                                  "format": null
                                                },
                                                "tooltipPosition": {
                                                  "type": "string",
                                                  "format": null,
                                                  "enum": [
                                                    "bottom"
                                                  ]
                                                }
                                              },
                                              "required": [
                                                "coords",
                                                "info"
                                              ],
                                              "additionalProperties": false,
                                              "title": "area"
                                            }
                                          }
                                        },
                                        "required": [
                                          "image",
                                          "areas"
                                        ],
                                        "additionalProperties": false
                                      }
                                    },
                                    "required": [
                                      "id",
                                      "type",
                                      "instruction",
                                      "tagName"
                                    ],
                                    "additionalProperties": false,
                                    "title": "clickable-image"
                                  },
                                  {
                                    "type": "object",
                                    "properties": {
                                      "id": {
                                        "type": "string",
                                        "format": "uuid"
                                      },
                                      "type": {
                                        "type": "string",
                                        "format": null,
                                        "enum": [
                                          "custom"
                                        ]
                                      },
                                      "instruction": {
                                        "type": "string",
                                        "format": "jodit"
                                      },
                                      "tagName": {
                                        "type": "string",
                                        "format": null,
                                        "enum": [
                                          "complete-phrase"
                                        ]
                                      },
                                      "props": {
                                        "type": "object",
                                        "properties": {
                                          "titleLevel": {
                                            "type": "number"
                                          },
                                          "listOfProbabilityBarsLists": {
                                            "type": "array",
                                            "items": {
                                              "type": "array",
                                              "items": {
                                                "type": "object",
                                                "properties": {
                                                  "name": {
                                                    "type": "string",
                                                    "format": null
                                                  },
                                                  "percent": {
                                                    "type": "integer"
                                                  }
                                                },
                                                "required": [
                                                  "name",
                                                  "percent"
                                                ],
                                                "additionalProperties": false
                                              },
                                              "title": "listOfProbabilityBarsList"
                                            }
                                          },
                                          "userMessage": {
                                            "type": "string",
                                            "format": null
                                          },
                                          "llmMessage": {
                                            "type": "string",
                                            "format": null
                                          },
                                          "wordsToAdd": {
                                            "type": "array",
                                            "items": {
                                              "type": "string",
                                              "format": null,
                                              "title": "wordsToAdd"
                                            }
                                          }
                                        },
                                        "required": [
                                          "listOfProbabilityBarsLists",
                                          "userMessage",
                                          "llmMessage",
                                          "wordsToAdd"
                                        ],
                                        "additionalProperties": false
                                      }
                                    },
                                    "required": [
                                      "id",
                                      "type",
                                      "instruction",
                                      "tagName"
                                    ],
                                    "additionalProperties": false,
                                    "title": "complete-phrase"
                                  },
                                  {
                                    "type": "object",
                                    "properties": {
                                      "id": {
                                        "type": "string",
                                        "format": "uuid"
                                      },
                                      "type": {
                                        "type": "string",
                                        "format": null,
                                        "enum": [
                                          "custom"
                                        ]
                                      },
                                      "instruction": {
                                        "type": "string",
                                        "format": "jodit"
                                      },
                                      "tagName": {
                                        "type": "string",
                                        "format": null,
                                        "enum": [
                                          "flip-cards"
                                        ]
                                      },
                                      "props": {
                                        "type": "object",
                                        "properties": {
                                          "titleLevel": {
                                            "type": "number"
                                          },
                                          "name": {
                                            "type": "string",
                                            "format": null
                                          },
                                          "cardList": {
                                            "type": "array",
                                            "items": {
                                              "type": "object",
                                              "properties": {
                                                "name": {
                                                  "type": "string",
                                                  "format": null
                                                },
                                                "description": {
                                                  "type": "string",
                                                  "format": null
                                                },
                                                "icon": {
                                                  "type": "string",
                                                  "format": null
                                                },
                                                "image": {
                                                  "type": "string",
                                                  "format": null
                                                }
                                              },
                                              "required": [
                                                "name",
                                                "description",
                                                "icon",
                                                "image"
                                              ],
                                              "additionalProperties": false,
                                              "title": "cardList"
                                            }
                                          }
                                        },
                                        "required": [
                                          "name",
                                          "cardList"
                                        ],
                                        "additionalProperties": false
                                      }
                                    },
                                    "required": [
                                      "id",
                                      "type",
                                      "instruction",
                                      "tagName"
                                    ],
                                    "additionalProperties": false,
                                    "title": "flip-cards"
                                  },
                                  {
                                    "type": "object",
                                    "properties": {
                                      "id": {
                                        "type": "string",
                                        "format": "uuid"
                                      },
                                      "type": {
                                        "type": "string",
                                        "format": null,
                                        "enum": [
                                          "custom"
                                        ]
                                      },
                                      "instruction": {
                                        "type": "string",
                                        "format": "jodit"
                                      },
                                      "tagName": {
                                        "type": "string",
                                        "format": null,
                                        "enum": [
                                          "image-quiz"
                                        ]
                                      },
                                      "props": {
                                        "type": "object",
                                        "properties": {
                                          "name": {
                                            "type": "string",
                                            "format": null
                                          },
                                          "multiple": {
                                            "type": "boolean"
                                          },
                                          "context": {
                                            "type": "string",
                                            "format": null
                                          },
                                          "maxChoicesPerLine": {
                                            "type": "number"
                                          },
                                          "hideChoicesName": {
                                            "type": "boolean"
                                          },
                                          "orderChoices": {
                                            "type": "boolean"
                                          },
                                          "imageChoicesSize": {
                                            "type": "string",
                                            "format": null,
                                            "enum": [
                                              "icon",
                                              "medium",
                                              "large"
                                            ]
                                          },
                                          "choices": {
                                            "type": "array",
                                            "items": {
                                              "type": "object",
                                              "properties": {
                                                "name": {
                                                  "type": "string",
                                                  "format": null
                                                },
                                                "image": {
                                                  "type": "object",
                                                  "properties": {
                                                    "src": {
                                                      "type": "string",
                                                      "format": null
                                                    }
                                                  },
                                                  "required": [
                                                    "src"
                                                  ],
                                                  "additionalProperties": true
                                                },
                                                "response": {
                                                  "type": "string",
                                                  "format": null
                                                }
                                              },
                                              "required": [
                                                "name"
                                              ],
                                              "additionalProperties": false,
                                              "title": "choice"
                                            }
                                          }
                                        },
                                        "required": [
                                          "name",
                                          "choices"
                                        ],
                                        "additionalProperties": false
                                      }
                                    },
                                    "required": [
                                      "id",
                                      "type",
                                      "instruction",
                                      "tagName",
                                      "props"
                                    ],
                                    "additionalProperties": false,
                                    "title": "image-quiz"
                                  },
                                  {
                                    "type": "object",
                                    "properties": {
                                      "id": {
                                        "type": "string",
                                        "format": "uuid"
                                      },
                                      "type": {
                                        "type": "string",
                                        "format": null,
                                        "enum": [
                                          "custom"
                                        ]
                                      },
                                      "instruction": {
                                        "type": "string",
                                        "format": "jodit"
                                      },
                                      "tagName": {
                                        "type": "string",
                                        "format": null,
                                        "enum": [
                                          "image-quizzes"
                                        ]
                                      },
                                      "props": {
                                        "type": "object",
                                        "properties": {
                                          "quizzes": {
                                            "type": "array",
                                            "items": {
                                              "type": "object",
                                              "properties": {
                                                "name": {
                                                  "type": "string",
                                                  "format": null
                                                },
                                                "multiple": {
                                                  "type": "boolean"
                                                },
                                                "context": {
                                                  "type": "string",
                                                  "format": null
                                                },
                                                "maxChoicesPerLine": {
                                                  "type": "number"
                                                },
                                                "hideChoicesName": {
                                                  "type": "boolean"
                                                },
                                                "orderChoices": {
                                                  "type": "boolean"
                                                },
                                                "imageChoicesSize": {
                                                  "type": "string",
                                                  "format": null,
                                                  "enum": [
                                                    "icon",
                                                    "medium",
                                                    "large"
                                                  ]
                                                },
                                                "choices": {
                                                  "type": "array",
                                                  "items": {
                                                    "type": "object",
                                                    "properties": {
                                                      "name": {
                                                        "type": "string",
                                                        "format": null
                                                      },
                                                      "image": {
                                                        "type": "object",
                                                        "properties": {
                                                          "src": {
                                                            "type": "string",
                                                            "format": null
                                                          }
                                                        },
                                                        "required": [
                                                          "src"
                                                        ],
                                                        "additionalProperties": true
                                                      },
                                                      "response": {
                                                        "type": "string",
                                                        "format": null
                                                      }
                                                    },
                                                    "required": [
                                                      "name"
                                                    ],
                                                    "additionalProperties": false,
                                                    "title": "choice"
                                                  }
                                                }
                                              },
                                              "required": [
                                                "name",
                                                "choices"
                                              ],
                                              "additionalProperties": false,
                                              "title": "quizze"
                                            }
                                          }
                                        },
                                        "required": [
                                          "quizzes"
                                        ],
                                        "additionalProperties": false
                                      }
                                    },
                                    "required": [
                                      "id",
                                      "type",
                                      "instruction",
                                      "tagName",
                                      "props"
                                    ],
                                    "additionalProperties": false,
                                    "title": "image-quizzes"
                                  },
                                  {
                                    "type": "object",
                                    "properties": {
                                      "id": {
                                        "type": "string",
                                        "format": "uuid"
                                      },
                                      "type": {
                                        "type": "string",
                                        "format": null,
                                        "enum": [
                                          "custom"
                                        ]
                                      },
                                      "instruction": {
                                        "type": "string",
                                        "format": "jodit"
                                      },
                                      "tagName": {
                                        "type": "string",
                                        "format": null,
                                        "enum": [
                                          "message-conversation"
                                        ]
                                      },
                                      "props": {
                                        "type": "object",
                                        "properties": {
                                          "title": {
                                            "type": "string",
                                            "format": null
                                          },
                                          "messages": {
                                            "type": "array",
                                            "items": {
                                              "oneOf": [
                                                {
                                                  "type": "object",
                                                  "properties": {
                                                    "userName": {
                                                      "type": "string",
                                                      "format": null
                                                    },
                                                    "direction": {
                                                      "type": "string",
                                                      "format": null,
                                                      "enum": [
                                                        "incoming",
                                                        "outgoing"
                                                      ]
                                                    },
                                                    "type": {
                                                      "type": "string",
                                                      "format": null,
                                                      "enum": [
                                                        "Texte"
                                                      ]
                                                    },
                                                    "content": {
                                                      "type": "string",
                                                      "format": null
                                                    }
                                                  },
                                                  "required": [
                                                    "userName",
                                                    "direction",
                                                    "type",
                                                    "content"
                                                  ],
                                                  "additionalProperties": false,
                                                  "title": "Texte"
                                                },
                                                {
                                                  "type": "object",
                                                  "properties": {
                                                    "userName": {
                                                      "type": "string",
                                                      "format": null
                                                    },
                                                    "direction": {
                                                      "type": "string",
                                                      "format": null,
                                                      "enum": [
                                                        "incoming",
                                                        "outgoing"
                                                      ]
                                                    },
                                                    "type": {
                                                      "type": "string",
                                                      "format": null,
                                                      "enum": [
                                                        "Texte + Image"
                                                      ]
                                                    },
                                                    "content": {
                                                      "type": "string",
                                                      "format": null
                                                    },
                                                    "image": {
                                                      "type": "object",
                                                      "properties": {
                                                        "src": {
                                                          "type": "string",
                                                          "format": null
                                                        },
                                                        "alt": {
                                                          "type": "string",
                                                          "format": null
                                                        }
                                                      },
                                                      "required": [
                                                        "src",
                                                        "alt"
                                                      ],
                                                      "additionalProperties": true
                                                    }
                                                  },
                                                  "required": [
                                                    "userName",
                                                    "direction",
                                                    "type",
                                                    "content",
                                                    "image"
                                                  ],
                                                  "additionalProperties": false,
                                                  "title": "Texte + Image"
                                                },
                                                {
                                                  "type": "object",
                                                  "properties": {
                                                    "userName": {
                                                      "type": "string",
                                                      "format": null
                                                    },
                                                    "direction": {
                                                      "type": "string",
                                                      "format": null,
                                                      "enum": [
                                                        "incoming",
                                                        "outgoing"
                                                      ]
                                                    },
                                                    "type": {
                                                      "type": "string",
                                                      "format": null,
                                                      "enum": [
                                                        "Image seule"
                                                      ]
                                                    },
                                                    "image": {
                                                      "type": "object",
                                                      "properties": {
                                                        "src": {
                                                          "type": "string",
                                                          "format": null
                                                        },
                                                        "alt": {
                                                          "type": "string",
                                                          "format": null
                                                        }
                                                      },
                                                      "required": [
                                                        "src",
                                                        "alt"
                                                      ],
                                                      "additionalProperties": true
                                                    }
                                                  },
                                                  "required": [
                                                    "userName",
                                                    "direction",
                                                    "type",
                                                    "image"
                                                  ],
                                                  "additionalProperties": false,
                                                  "title": "Image seule"
                                                }
                                              ],
                                              "title": "message"
                                            }
                                          },
                                          "animationSpeed": {
                                            "type": "number"
                                          }
                                        },
                                        "required": [
                                          "title",
                                          "messages"
                                        ],
                                        "additionalProperties": false
                                      }
                                    },
                                    "required": [
                                      "id",
                                      "type",
                                      "instruction",
                                      "tagName",
                                      "props"
                                    ],
                                    "additionalProperties": false,
                                    "title": "message-conversation"
                                  },
                                  {
                                    "type": "object",
                                    "properties": {
                                      "id": {
                                        "type": "string",
                                        "format": "uuid"
                                      },
                                      "type": {
                                        "type": "string",
                                        "format": null,
                                        "enum": [
                                          "custom"
                                        ]
                                      },
                                      "instruction": {
                                        "type": "string",
                                        "format": "jodit"
                                      },
                                      "tagName": {
                                        "type": "string",
                                        "format": null,
                                        "enum": [
                                          "phishing-message"
                                        ]
                                      },
                                      "props": {
                                        "type": "object",
                                        "properties": {
                                          "titleLevel": {
                                            "type": "number"
                                          }
                                        },
                                        "additionalProperties": false
                                      }
                                    },
                                    "required": [
                                      "id",
                                      "type",
                                      "instruction",
                                      "tagName"
                                    ],
                                    "additionalProperties": false,
                                    "title": "phishing-message"
                                  },
                                  {
                                    "type": "object",
                                    "properties": {
                                      "id": {
                                        "type": "string",
                                        "format": "uuid"
                                      },
                                      "type": {
                                        "type": "string",
                                        "format": null,
                                        "enum": [
                                          "custom"
                                        ]
                                      },
                                      "instruction": {
                                        "type": "string",
                                        "format": "jodit"
                                      },
                                      "tagName": {
                                        "type": "string",
                                        "format": null,
                                        "enum": [
                                          "phishing-notification"
                                        ]
                                      },
                                      "props": {
                                        "type": "object",
                                        "properties": {
                                          "notifications": {
                                            "type": "array",
                                            "items": {
                                              "type": "object",
                                              "properties": {
                                                "icon": {
                                                  "type": "string",
                                                  "format": null
                                                },
                                                "sender": {
                                                  "type": "string",
                                                  "format": null
                                                },
                                                "content": {
                                                  "type": "string",
                                                  "format": null
                                                },
                                                "category": {
                                                  "type": "string",
                                                  "format": null
                                                },
                                                "time": {
                                                  "type": "object",
                                                  "properties": {
                                                    "hours": {
                                                      "type": "number"
                                                    },
                                                    "minutes": {
                                                      "type": "number"
                                                    }
                                                  },
                                                  "additionalProperties": false
                                                }
                                              },
                                              "required": [
                                                "icon",
                                                "sender",
                                                "content",
                                                "category",
                                                "time"
                                              ],
                                              "additionalProperties": false,
                                              "title": "notification"
                                            }
                                          },
                                          "categories": {
                                            "type": "array",
                                            "items": {
                                              "type": "object",
                                              "properties": {
                                                "name": {
                                                  "type": "string",
                                                  "format": null
                                                },
                                                "icon": {
                                                  "type": "string",
                                                  "format": null
                                                }
                                              },
                                              "required": [
                                                "name",
                                                "icon"
                                              ],
                                              "additionalProperties": false,
                                              "title": "categorie"
                                            }
                                          },
                                          "informationMessage": {
                                            "type": "string",
                                            "format": null
                                          },
                                          "titleLevel": {
                                            "type": "number"
                                          }
                                        },
                                        "required": [
                                          "notifications",
                                          "categories",
                                          "informationMessage"
                                        ],
                                        "additionalProperties": false
                                      }
                                    },
                                    "required": [
                                      "id",
                                      "type",
                                      "instruction",
                                      "tagName"
                                    ],
                                    "additionalProperties": false,
                                    "title": "phishing-notification"
                                  },
                                  {
                                    "type": "object",
                                    "properties": {
                                      "id": {
                                        "type": "string",
                                        "format": "uuid"
                                      },
                                      "type": {
                                        "type": "string",
                                        "format": null,
                                        "enum": [
                                          "custom"
                                        ]
                                      },
                                      "instruction": {
                                        "type": "string",
                                        "format": "jodit"
                                      },
                                      "tagName": {
                                        "type": "string",
                                        "format": null,
                                        "enum": [
                                          "pix-anonymisation"
                                        ]
                                      },
                                      "props": {
                                        "type": "object",
                                        "properties": {
                                          "titleLevel": {
                                            "type": "number"
                                          },
                                          "steps": {
                                            "type": "array",
                                            "items": {
                                              "type": "object",
                                              "properties": {
                                                "fullSentence": {
                                                  "type": "array",
                                                  "items": {
                                                    "type": "object",
                                                    "properties": {
                                                      "content": {
                                                        "type": "string",
                                                        "format": null
                                                      },
                                                      "isAnonymizable": {
                                                        "type": "boolean"
                                                      }
                                                    },
                                                    "required": [
                                                      "content"
                                                    ],
                                                    "additionalProperties": false,
                                                    "title": "fullSentence"
                                                  }
                                                },
                                                "rephrase": {
                                                  "type": "string",
                                                  "format": null
                                                },
                                                "feedback": {
                                                  "type": "string",
                                                  "format": null
                                                }
                                              },
                                              "required": [
                                                "rephrase",
                                                "feedback"
                                              ],
                                              "additionalProperties": false,
                                              "title": "step"
                                            }
                                          }
                                        },
                                        "additionalProperties": false
                                      }
                                    },
                                    "required": [
                                      "id",
                                      "type",
                                      "instruction",
                                      "tagName"
                                    ],
                                    "additionalProperties": false,
                                    "title": "pix-anonymisation"
                                  },
                                  {
                                    "type": "object",
                                    "properties": {
                                      "id": {
                                        "type": "string",
                                        "format": "uuid"
                                      },
                                      "type": {
                                        "type": "string",
                                        "format": null,
                                        "enum": [
                                          "custom"
                                        ]
                                      },
                                      "instruction": {
                                        "type": "string",
                                        "format": "jodit"
                                      },
                                      "tagName": {
                                        "type": "string",
                                        "format": null,
                                        "enum": [
                                          "pix-article"
                                        ]
                                      },
                                      "props": {
                                        "type": "object",
                                        "properties": {
                                          "titleLevel": {
                                            "type": "number"
                                          },
                                          "title": {
                                            "type": "string",
                                            "format": null
                                          },
                                          "author": {
                                            "type": "string",
                                            "format": null
                                          },
                                          "date": {
                                            "type": "string",
                                            "format": null
                                          },
                                          "paragraphs": {
                                            "type": "array",
                                            "items": {
                                              "type": "string",
                                              "format": null,
                                              "title": "paragraph"
                                            }
                                          },
                                          "highlightedSentence": {
                                            "type": "string",
                                            "format": null
                                          },
                                          "colorOfHighlightSentence": {
                                            "type": "string",
                                            "format": null
                                          }
                                        },
                                        "required": [
                                          "title",
                                          "author",
                                          "date"
                                        ],
                                        "additionalProperties": false
                                      }
                                    },
                                    "required": [
                                      "id",
                                      "type",
                                      "instruction",
                                      "tagName"
                                    ],
                                    "additionalProperties": false,
                                    "title": "pix-article"
                                  },
                                  {
                                    "type": "object",
                                    "properties": {
                                      "id": {
                                        "type": "string",
                                        "format": "uuid"
                                      },
                                      "type": {
                                        "type": "string",
                                        "format": null,
                                        "enum": [
                                          "custom"
                                        ]
                                      },
                                      "instruction": {
                                        "type": "string",
                                        "format": "jodit"
                                      },
                                      "tagName": {
                                        "type": "string",
                                        "format": null,
                                        "enum": [
                                          "pix-carousel"
                                        ]
                                      },
                                      "props": {
                                        "type": "object",
                                        "properties": {
                                          "type": {
                                            "type": "string",
                                            "format": null,
                                            "enum": [
                                              "image",
                                              "image-text",
                                              "text"
                                            ]
                                          },
                                          "slides": {
                                            "oneOf": [
                                              {
                                                "type": "array",
                                                "items": {
                                                  "type": "object",
                                                  "properties": {
                                                    "title": {
                                                      "type": "string",
                                                      "format": null
                                                    },
                                                    "description": {
                                                      "type": "string",
                                                      "format": null
                                                    },
                                                    "displayWidth": {
                                                      "type": "number",
                                                      "minimum": 0
                                                    },
                                                    "image": {
                                                      "type": "object",
                                                      "properties": {
                                                        "src": {
                                                          "type": "string",
                                                          "format": null
                                                        },
                                                        "alt": {
                                                          "type": "string",
                                                          "format": null
                                                        }
                                                      },
                                                      "required": [
                                                        "src",
                                                        "alt"
                                                      ],
                                                      "additionalProperties": false
                                                    },
                                                    "license": {
                                                      "type": "object",
                                                      "properties": {
                                                        "name": {
                                                          "type": "string",
                                                          "format": null
                                                        },
                                                        "attribution": {
                                                          "type": "string",
                                                          "format": null
                                                        },
                                                        "url": {
                                                          "type": "string",
                                                          "format": null
                                                        }
                                                      },
                                                      "required": [
                                                        "name",
                                                        "attribution",
                                                        "url"
                                                      ],
                                                      "additionalProperties": false
                                                    }
                                                  },
                                                  "required": [
                                                    "title",
                                                    "description",
                                                    "image"
                                                  ],
                                                  "additionalProperties": false
                                                },
                                                "title": "image"
                                              },
                                              {
                                                "type": "array",
                                                "items": {
                                                  "type": "object",
                                                  "properties": {
                                                    "title": {
                                                      "type": "string",
                                                      "format": null
                                                    },
                                                    "description": {
                                                      "type": "string",
                                                      "format": null
                                                    },
                                                    "text": {
                                                      "type": "string",
                                                      "format": null
                                                    },
                                                    "image": {
                                                      "type": "object",
                                                      "properties": {
                                                        "src": {
                                                          "type": "string",
                                                          "format": null
                                                        },
                                                        "alt": {
                                                          "type": "string",
                                                          "format": null
                                                        }
                                                      },
                                                      "required": [
                                                        "src",
                                                        "alt"
                                                      ],
                                                      "additionalProperties": false
                                                    }
                                                  },
                                                  "required": [
                                                    "title",
                                                    "description",
                                                    "text",
                                                    "image"
                                                  ],
                                                  "additionalProperties": false
                                                },
                                                "title": "image-text"
                                              },
                                              {
                                                "type": "array",
                                                "items": {
                                                  "type": "object",
                                                  "properties": {
                                                    "title": {
                                                      "type": "string",
                                                      "format": null
                                                    },
                                                    "description": {
                                                      "type": "string",
                                                      "format": null
                                                    },
                                                    "text": {
                                                      "type": "string",
                                                      "format": null
                                                    }
                                                  },
                                                  "required": [
                                                    "title",
                                                    "description",
                                                    "text"
                                                  ],
                                                  "additionalProperties": false
                                                },
                                                "title": "text"
                                              }
                                            ]
                                          },
                                          "randomSlides": {
                                            "type": "boolean"
                                          },
                                          "titleLevel": {
                                            "type": "integer"
                                          },
                                          "disableAnimation": {
                                            "type": "boolean"
                                          },
                                          "disableStyleAroundImage": {
                                            "type": "boolean"
                                          },
                                          "enableLoop": {
                                            "type": "boolean"
                                          },
                                          "imageTextDisplay": {
                                            "type": "string",
                                            "format": null
                                          }
                                        },
                                        "required": [
                                          "type",
                                          "slides"
                                        ],
                                        "additionalProperties": false
                                      }
                                    },
                                    "required": [
                                      "id",
                                      "type",
                                      "instruction",
                                      "tagName",
                                      "props"
                                    ],
                                    "additionalProperties": false,
                                    "title": "pix-carousel"
                                  },
                                  {
                                    "type": "object",
                                    "properties": {
                                      "id": {
                                        "type": "string",
                                        "format": "uuid"
                                      },
                                      "type": {
                                        "type": "string",
                                        "format": null,
                                        "enum": [
                                          "custom"
                                        ]
                                      },
                                      "instruction": {
                                        "type": "string",
                                        "format": "jodit"
                                      },
                                      "tagName": {
                                        "type": "string",
                                        "format": null,
                                        "enum": [
                                          "pix-cursor"
                                        ]
                                      },
                                      "props": {
                                        "type": "object",
                                        "properties": {
                                          "options": {
                                            "type": "array",
                                            "items": {
                                              "type": "object",
                                              "properties": {
                                                "label": {
                                                  "type": "string",
                                                  "format": null
                                                },
                                                "feedback": {
                                                  "type": "object",
                                                  "properties": {
                                                    "type": {
                                                      "type": "string",
                                                      "format": null,
                                                      "enum": [
                                                        "bad",
                                                        "neutral",
                                                        "close",
                                                        "good"
                                                      ]
                                                    },
                                                    "text": {
                                                      "type": "string",
                                                      "format": null
                                                    }
                                                  },
                                                  "required": [
                                                    "type",
                                                    "text"
                                                  ],
                                                  "additionalProperties": false
                                                }
                                              },
                                              "required": [
                                                "label",
                                                "feedback"
                                              ],
                                              "additionalProperties": false,
                                              "title": "option"
                                            }
                                          }
                                        },
                                        "required": [
                                          "options"
                                        ],
                                        "additionalProperties": false
                                      }
                                    },
                                    "required": [
                                      "id",
                                      "type",
                                      "instruction",
                                      "tagName"
                                    ],
                                    "additionalProperties": false,
                                    "title": "pix-cursor"
                                  },
                                  {
                                    "type": "object",
                                    "properties": {
                                      "id": {
                                        "type": "string",
                                        "format": "uuid"
                                      },
                                      "type": {
                                        "type": "string",
                                        "format": null,
                                        "enum": [
                                          "custom"
                                        ]
                                      },
                                      "instruction": {
                                        "type": "string",
                                        "format": "jodit"
                                      },
                                      "tagName": {
                                        "type": "string",
                                        "format": null,
                                        "enum": [
                                          "llm-compare-messages"
                                        ]
                                      },
                                      "props": {
                                        "type": "object",
                                        "properties": {
                                          "conversation1": {
                                            "type": "object",
                                            "properties": {
                                              "title": {
                                                "type": "string",
                                                "format": null
                                              },
                                              "llmName": {
                                                "type": "string",
                                                "format": null
                                              }
                                            },
                                            "required": [
                                              "title",
                                              "llmName"
                                            ],
                                            "additionalProperties": false
                                          },
                                          "conversation2": {
                                            "type": "object",
                                            "properties": {
                                              "title": {
                                                "type": "string",
                                                "format": null
                                              },
                                              "llmName": {
                                                "type": "string",
                                                "format": null
                                              }
                                            },
                                            "required": [
                                              "title",
                                              "llmName"
                                            ],
                                            "additionalProperties": false
                                          },
                                          "userName": {
                                            "type": "string",
                                            "format": null
                                          },
                                          "messages": {
                                            "type": "array",
                                            "items": {
                                              "oneOf": [
                                                {
                                                  "type": "object",
                                                  "properties": {
                                                    "direction": {
                                                      "type": "string",
                                                      "format": null,
                                                      "enum": [
                                                        "outbound"
                                                      ]
                                                    },
                                                    "content": {
                                                      "type": "string",
                                                      "format": null
                                                    }
                                                  },
                                                  "required": [
                                                    "direction",
                                                    "content"
                                                  ],
                                                  "additionalProperties": false
                                                },
                                                {
                                                  "type": "array",
                                                  "minItems": 2,
                                                  "items": {
                                                    "type": "object",
                                                    "properties": {
                                                      "direction": {
                                                        "type": "string",
                                                        "format": null,
                                                        "enum": [
                                                          "inbound"
                                                        ]
                                                      },
                                                      "content": {
                                                        "type": "string",
                                                        "format": null
                                                      }
                                                    },
                                                    "required": [
                                                      "direction",
                                                      "content"
                                                    ],
                                                    "additionalProperties": false
                                                  }
                                                }
                                              ],
                                              "title": "message"
                                            }
                                          }
                                        },
                                        "required": [
                                          "conversation1",
                                          "conversation2",
                                          "userName",
                                          "messages"
                                        ],
                                        "additionalProperties": false
                                      }
                                    },
                                    "required": [
                                      "id",
                                      "type",
                                      "instruction",
                                      "tagName",
                                      "props"
                                    ],
                                    "additionalProperties": false,
                                    "title": "llm-compare-messages"
                                  },
                                  {
                                    "type": "object",
                                    "properties": {
                                      "id": {
                                        "type": "string",
                                        "format": "uuid"
                                      },
                                      "type": {
                                        "type": "string",
                                        "format": null,
                                        "enum": [
                                          "custom"
                                        ]
                                      },
                                      "instruction": {
                                        "type": "string",
                                        "format": "jodit"
                                      },
                                      "tagName": {
                                        "type": "string",
                                        "format": null,
                                        "enum": [
                                          "llm-messages"
                                        ]
                                      },
                                      "props": {
                                        "type": "object",
                                        "properties": {
                                          "messages": {
                                            "type": "array",
                                            "items": {
                                              "type": "object",
                                              "properties": {
                                                "direction": {
                                                  "type": "string",
                                                  "format": null,
                                                  "enum": [
                                                    "inbound",
                                                    "outbound"
                                                  ]
                                                },
                                                "content": {
                                                  "type": "string",
                                                  "format": null
                                                }
                                              },
                                              "required": [
                                                "direction",
                                                "content"
                                              ],
                                              "additionalProperties": false,
                                              "title": "message"
                                            }
                                          }
                                        },
                                        "required": [
                                          "messages"
                                        ],
                                        "additionalProperties": false
                                      }
                                    },
                                    "required": [
                                      "id",
                                      "type",
                                      "instruction",
                                      "tagName",
                                      "props"
                                    ],
                                    "additionalProperties": false,
                                    "title": "llm-messages"
                                  },
                                  {
                                    "type": "object",
                                    "properties": {
                                      "id": {
                                        "type": "string",
                                        "format": "uuid"
                                      },
                                      "type": {
                                        "type": "string",
                                        "format": null,
                                        "enum": [
                                          "custom"
                                        ]
                                      },
                                      "instruction": {
                                        "type": "string",
                                        "format": "jodit"
                                      },
                                      "tagName": {
                                        "type": "string",
                                        "format": null,
                                        "enum": [
                                          "llm-prompt-select"
                                        ]
                                      },
                                      "props": {
                                        "type": "object",
                                        "properties": {
                                          "speed": {
                                            "type": "number",
                                            "minimum": 0
                                          },
                                          "messages": {
                                            "type": "array",
                                            "items": {
                                              "type": "object",
                                              "properties": {
                                                "direction": {
                                                  "type": "string",
                                                  "format": null,
                                                  "enum": [
                                                    "inbound",
                                                    "outbound"
                                                  ]
                                                },
                                                "content": {
                                                  "type": "string",
                                                  "format": null
                                                }
                                              },
                                              "required": [
                                                "direction",
                                                "content"
                                              ],
                                              "additionalProperties": false,
                                              "title": "message"
                                            }
                                          },
                                          "prompts": {
                                            "type": "array",
                                            "items": {
                                              "type": "object",
                                              "properties": {
                                                "prompt": {
                                                  "type": "string",
                                                  "format": null
                                                },
                                                "response": {
                                                  "type": "string",
                                                  "format": null
                                                }
                                              },
                                              "required": [
                                                "prompt",
                                                "response"
                                              ],
                                              "additionalProperties": false,
                                              "title": "prompt"
                                            }
                                          }
                                        },
                                        "required": [
                                          "messages",
                                          "prompts"
                                        ],
                                        "additionalProperties": false
                                      }
                                    },
                                    "required": [
                                      "id",
                                      "type",
                                      "instruction",
                                      "tagName",
                                      "props"
                                    ],
                                    "additionalProperties": false,
                                    "title": "llm-prompt-select"
                                  },
                                  {
                                    "type": "object",
                                    "properties": {
                                      "id": {
                                        "type": "string",
                                        "format": "uuid"
                                      },
                                      "type": {
                                        "type": "string",
                                        "format": null,
                                        "enum": [
                                          "custom"
                                        ]
                                      },
                                      "instruction": {
                                        "type": "string",
                                        "format": "jodit"
                                      },
                                      "tagName": {
                                        "type": "string",
                                        "format": null,
                                        "enum": [
                                          "qcm-deepfake"
                                        ]
                                      },
                                      "props": {
                                        "type": "object",
                                        "properties": {
                                          "titleLevel": {
                                            "type": "number"
                                          },
                                          "successImage": {
                                            "type": "string",
                                            "format": null
                                          },
                                          "failImage": {
                                            "type": "string",
                                            "format": null
                                          },
                                          "infoImage": {
                                            "type": "string",
                                            "format": null
                                          },
                                          "searchImage": {
                                            "type": "string",
                                            "format": null
                                          }
                                        },
                                        "required": [
                                          "successImage",
                                          "failImage",
                                          "infoImage",
                                          "searchImage"
                                        ],
                                        "additionalProperties": false
                                      }
                                    },
                                    "required": [
                                      "id",
                                      "type",
                                      "instruction",
                                      "tagName"
                                    ],
                                    "additionalProperties": false,
                                    "title": "qcm-deepfake"
                                  },
                                  {
                                    "type": "object",
                                    "properties": {
                                      "id": {
                                        "type": "string",
                                        "format": "uuid"
                                      },
                                      "type": {
                                        "type": "string",
                                        "format": null,
                                        "enum": [
                                          "custom"
                                        ]
                                      },
                                      "instruction": {
                                        "type": "string",
                                        "format": "jodit"
                                      },
                                      "tagName": {
                                        "type": "string",
                                        "format": null,
                                        "enum": [
                                          "quiz-stepper"
                                        ]
                                      },
                                      "props": {
                                        "type": "object",
                                        "properties": {
                                          "titleLevel": {
                                            "type": "number"
                                          },
                                          "steps": {
                                            "type": "array",
                                            "items": {
                                              "type": "object",
                                              "properties": {
                                                "question": {
                                                  "type": "string",
                                                  "format": null
                                                },
                                                "feedback": {
                                                  "type": "object",
                                                  "properties": {
                                                    "success": {
                                                      "type": "string",
                                                      "format": null
                                                    },
                                                    "failed": {
                                                      "type": "string",
                                                      "format": null
                                                    }
                                                  },
                                                  "required": [
                                                    "success",
                                                    "failed"
                                                  ],
                                                  "additionalProperties": false
                                                },
                                                "choice1": {
                                                  "type": "object",
                                                  "properties": {
                                                    "title": {
                                                      "type": "string",
                                                      "format": null
                                                    },
                                                    "content": {
                                                      "type": "string",
                                                      "format": null
                                                    },
                                                    "isGoodAnswer": {
                                                      "type": "boolean"
                                                    }
                                                  },
                                                  "additionalProperties": false
                                                },
                                                "choice2": {
                                                  "type": "object",
                                                  "properties": {
                                                    "title": {
                                                      "type": "string",
                                                      "format": null
                                                    },
                                                    "content": {
                                                      "type": "string",
                                                      "format": null
                                                    },
                                                    "isGoodAnswer": {
                                                      "type": "boolean"
                                                    }
                                                  },
                                                  "additionalProperties": false
                                                }
                                              },
                                              "required": [
                                                "question",
                                                "feedback",
                                                "choice1",
                                                "choice2"
                                              ],
                                              "additionalProperties": false,
                                              "title": "step"
                                            }
                                          }
                                        },
                                        "additionalProperties": false
                                      }
                                    },
                                    "required": [
                                      "id",
                                      "type",
                                      "instruction",
                                      "tagName"
                                    ],
                                    "additionalProperties": false,
                                    "title": "quiz-stepper"
                                  },
                                  {
                                    "type": "object",
                                    "properties": {
                                      "id": {
                                        "type": "string",
                                        "format": "uuid"
                                      },
                                      "type": {
                                        "type": "string",
                                        "format": null,
                                        "enum": [
                                          "custom"
                                        ]
                                      },
                                      "instruction": {
                                        "type": "string",
                                        "format": "jodit"
                                      },
                                      "tagName": {
                                        "type": "string",
                                        "format": null,
                                        "enum": [
                                          "select-conversation"
                                        ]
                                      },
                                      "props": {
                                        "type": "object",
                                        "properties": {
                                          "titleLevel": {
                                            "type": "number"
                                          },
                                          "incomingMessage": {
                                            "type": "object",
                                            "properties": {
                                              "username": {
                                                "type": "string",
                                                "format": null
                                              },
                                              "content": {
                                                "type": "string",
                                                "format": null
                                              },
                                              "time": {
                                                "type": "object",
                                                "properties": {
                                                  "days": {
                                                    "type": "number",
                                                    "maximum": -1
                                                  },
                                                  "minutes": {
                                                    "type": "number",
                                                    "maximum": -1
                                                  }
                                                },
                                                "additionalProperties": false
                                              }
                                            },
                                            "required": [
                                              "username",
                                              "content",
                                              "time"
                                            ],
                                            "additionalProperties": false
                                          },
                                          "username": {
                                            "type": "string",
                                            "format": null
                                          },
                                          "responseChoices": {
                                            "type": "array",
                                            "items": {
                                              "type": "object",
                                              "properties": {
                                                "content": {
                                                  "type": "string",
                                                  "format": null
                                                },
                                                "goodIdea": {
                                                  "type": "boolean"
                                                },
                                                "feedback": {
                                                  "type": "string",
                                                  "format": null
                                                }
                                              },
                                              "required": [
                                                "content",
                                                "goodIdea",
                                                "feedback"
                                              ],
                                              "additionalProperties": false,
                                              "title": "responseChoice"
                                            }
                                          }
                                        },
                                        "required": [
                                          "incomingMessage",
                                          "username",
                                          "responseChoices"
                                        ],
                                        "additionalProperties": false
                                      }
                                    },
                                    "required": [
                                      "id",
                                      "type",
                                      "instruction",
                                      "tagName"
                                    ],
                                    "additionalProperties": false,
                                    "title": "select-conversation"
                                  },
                                  {
                                    "type": "object",
                                    "properties": {
                                      "id": {
                                        "type": "string",
                                        "format": "uuid"
                                      },
                                      "type": {
                                        "type": "string",
                                        "format": null,
                                        "enum": [
                                          "custom"
                                        ]
                                      },
                                      "instruction": {
                                        "type": "string",
                                        "format": "jodit"
                                      },
                                      "tagName": {
                                        "type": "string",
                                        "format": null,
                                        "enum": [
                                          "template-mail"
                                        ]
                                      },
                                      "props": {
                                        "type": "object",
                                        "properties": {
                                          "titleLevel": {
                                            "type": "number"
                                          },
                                          "subject": {
                                            "type": "string",
                                            "format": null
                                          },
                                          "mailAddress": {
                                            "type": "string",
                                            "format": null
                                          },
                                          "avatarColor": {
                                            "type": "string",
                                            "format": null
                                          },
                                          "expeditor": {
                                            "type": "string",
                                            "format": null
                                          },
                                          "content": {
                                            "type": "string",
                                            "format": null
                                          },
                                          "time": {
                                            "type": "object",
                                            "properties": {
                                              "days": {
                                                "type": "number",
                                                "maximum": -1
                                              },
                                              "minutes": {
                                                "type": "number",
                                                "maximum": -1
                                              }
                                            },
                                            "additionalProperties": false
                                          },
                                          "previousMail": {
                                            "type": "object",
                                            "properties": {
                                              "name": {
                                                "type": "string",
                                                "format": null
                                              },
                                              "content": {
                                                "type": "string",
                                                "format": null
                                              },
                                              "time": {
                                                "type": "object",
                                                "properties": {
                                                  "days": {
                                                    "type": "number",
                                                    "maximum": -1
                                                  },
                                                  "minutes": {
                                                    "type": "number",
                                                    "maximum": -1
                                                  }
                                                },
                                                "additionalProperties": false
                                              }
                                            },
                                            "required": [
                                              "name",
                                              "content",
                                              "time"
                                            ],
                                            "additionalProperties": false
                                          }
                                        },
                                        "required": [
                                          "subject",
                                          "mailAddress",
                                          "expeditor",
                                          "content",
                                          "time"
                                        ],
                                        "additionalProperties": false
                                      }
                                    },
                                    "required": [
                                      "id",
                                      "type",
                                      "instruction",
                                      "tagName"
                                    ],
                                    "additionalProperties": false,
                                    "title": "template-mail"
                                  },
                                  {
                                    "type": "object",
                                    "properties": {
                                      "id": {
                                        "type": "string",
                                        "format": "uuid"
                                      },
                                      "type": {
                                        "type": "string",
                                        "format": null,
                                        "enum": [
                                          "custom"
                                        ]
                                      },
                                      "instruction": {
                                        "type": "string",
                                        "format": "jodit"
                                      },
                                      "tagName": {
                                        "type": "string",
                                        "format": null,
                                        "enum": [
                                          "test-top-mdp"
                                        ]
                                      },
                                      "props": {
                                        "type": "object",
                                        "properties": {
                                          "titleLevel": {
                                            "type": "number"
                                          },
                                          "passwords": {
                                            "type": "array",
                                            "items": {
                                              "type": "string",
                                              "format": null,
                                              "title": "password"
                                            }
                                          },
                                          "expectedPassword": {
                                            "type": "string",
                                            "format": null
                                          }
                                        },
                                        "required": [
                                          "passwords",
                                          "expectedPassword"
                                        ],
                                        "additionalProperties": false
                                      }
                                    },
                                    "required": [
                                      "id",
                                      "type",
                                      "instruction",
                                      "tagName"
                                    ],
                                    "additionalProperties": false,
                                    "title": "test-top-mdp"
                                  }
                                ],
                                "title": "custom"
                              },
                              {
                                "type": "object",
                                "properties": {
                                  "id": {
                                    "type": "string",
                                    "format": "uuid"
                                  },
                                  "type": {
                                    "type": "string",
                                    "format": null,
                                    "enum": [
                                      "custom-draft"
                                    ]
                                  },
                                  "title": {
                                    "type": "string",
                                    "format": null
                                  },
                                  "url": {
                                    "type": "string",
                                    "format": "uri"
                                  },
                                  "instruction": {
                                    "type": "string",
                                    "format": "jodit"
                                  },
                                  "height": {
                                    "type": "integer",
                                    "minimum": 0,
                                    "maximum": 550
                                  }
                                },
                                "required": [
                                  "id",
                                  "type",
                                  "title",
                                  "url",
                                  "instruction",
                                  "height"
                                ],
                                "additionalProperties": false,
                                "title": "custom-draft"
                              },
                              {
                                "type": "object",
                                "properties": {
                                  "id": {
                                    "type": "string",
                                    "format": "uuid"
                                  },
                                  "type": {
                                    "type": "string",
                                    "format": null,
                                    "enum": [
                                      "download"
                                    ]
                                  },
                                  "files": {
                                    "type": "array",
                                    "items": {
                                      "type": "object",
                                      "properties": {
                                        "url": {
                                          "type": "string",
                                          "format": "uri"
                                        },
                                        "format": {
                                          "type": "string",
                                          "format": null
                                        }
                                      },
                                      "required": [
                                        "url",
                                        "format"
                                      ],
                                      "additionalProperties": false,
                                      "title": "file"
                                    }
                                  }
                                },
                                "required": [
                                  "id",
                                  "type",
                                  "files"
                                ],
                                "additionalProperties": false,
                                "title": "download"
                              },
                              {
                                "type": "object",
                                "properties": {
                                  "id": {
                                    "type": "string",
                                    "format": "uuid"
                                  },
                                  "type": {
                                    "type": "string",
                                    "format": null,
                                    "enum": [
                                      "embed"
                                    ]
                                  },
                                  "isCompletionRequired": {
                                    "type": "boolean"
                                  },
                                  "title": {
                                    "type": "string",
                                    "format": null
                                  },
                                  "url": {
                                    "type": "string",
                                    "format": "uri"
                                  },
                                  "instruction": {
                                    "type": "string",
                                    "format": "jodit"
                                  },
                                  "solution": {
                                    "type": "string",
                                    "format": null
                                  },
                                  "height": {
                                    "type": "number",
                                    "minimum": 0
                                  }
                                },
                                "required": [
                                  "id",
                                  "type",
                                  "isCompletionRequired",
                                  "title",
                                  "url",
                                  "height"
                                ],
                                "additionalProperties": false,
                                "title": "embed"
                              },
                              {
                                "type": "object",
                                "properties": {
                                  "id": {
                                    "type": "string",
                                    "format": "uuid"
                                  },
                                  "type": {
                                    "type": "string",
                                    "format": null,
                                    "enum": [
                                      "expand"
                                    ]
                                  },
                                  "title": {
                                    "type": "string",
                                    "format": null
                                  },
                                  "content": {
                                    "type": "string",
                                    "format": "jodit"
                                  }
                                },
                                "required": [
                                  "id",
                                  "type",
                                  "title",
                                  "content"
                                ],
                                "additionalProperties": false,
                                "title": "expand"
                              },
                              {
                                "type": "object",
                                "properties": {
                                  "id": {
                                    "type": "string",
                                    "format": "uuid"
                                  },
                                  "type": {
                                    "type": "string",
                                    "format": null,
                                    "enum": [
                                      "flashcards"
                                    ]
                                  },
                                  "instruction": {
                                    "type": "string",
                                    "format": "jodit"
                                  },
                                  "title": {
                                    "type": "string",
                                    "format": null
                                  },
                                  "introImage": {
                                    "type": "object",
                                    "properties": {
                                      "url": {
                                        "type": "string",
                                        "format": "uri"
                                      }
                                    },
                                    "required": [
                                      "url"
                                    ],
                                    "additionalProperties": false
                                  },
                                  "cards": {
                                    "type": "array",
                                    "items": {
                                      "type": "object",
                                      "properties": {
                                        "id": {
                                          "type": "string",
                                          "format": "uuid"
                                        },
                                        "recto": {
                                          "type": "object",
                                          "properties": {
                                            "image": {
                                              "type": "object",
                                              "properties": {
                                                "url": {
                                                  "type": "string",
                                                  "format": "uri"
                                                }
                                              },
                                              "required": [
                                                "url"
                                              ],
                                              "additionalProperties": false
                                            },
                                            "text": {
                                              "type": "string",
                                              "format": null
                                            }
                                          },
                                          "required": [
                                            "text"
                                          ],
                                          "additionalProperties": false
                                        },
                                        "verso": {
                                          "type": "object",
                                          "properties": {
                                            "image": {
                                              "type": "object",
                                              "properties": {
                                                "url": {
                                                  "type": "string",
                                                  "format": "uri"
                                                }
                                              },
                                              "required": [
                                                "url"
                                              ],
                                              "additionalProperties": false
                                            },
                                            "text": {
                                              "type": "string",
                                              "format": "jodit"
                                            }
                                          },
                                          "required": [
                                            "text"
                                          ],
                                          "additionalProperties": false
                                        }
                                      },
                                      "required": [
                                        "id"
                                      ],
                                      "additionalProperties": false,
                                      "title": "card"
                                    }
                                  }
                                },
                                "required": [
                                  "id",
                                  "type",
                                  "title"
                                ],
                                "additionalProperties": false,
                                "title": "flashcards"
                              },
                              {
                                "type": "object",
                                "properties": {
                                  "id": {
                                    "type": "string",
                                    "format": "uuid"
                                  },
                                  "type": {
                                    "type": "string",
                                    "format": null,
                                    "enum": [
                                      "image"
                                    ]
                                  },
                                  "url": {
                                    "type": "string",
                                    "format": "uri"
                                  },
                                  "alt": {
                                    "type": "string",
                                    "format": null
                                  },
                                  "alternativeText": {
                                    "type": "string",
                                    "format": "jodit"
                                  },
                                  "legend": {
                                    "type": "string",
                                    "format": null
                                  },
                                  "licence": {
                                    "type": "string",
                                    "format": null
                                  }
                                },
                                "required": [
                                  "id",
                                  "type",
                                  "url",
                                  "alt"
                                ],
                                "additionalProperties": false,
                                "title": "image"
                              },
                              {
                                "type": "object",
                                "properties": {
                                  "id": {
                                    "type": "string",
                                    "format": "uuid"
                                  },
                                  "type": {
                                    "type": "string",
                                    "format": null,
                                    "enum": [
                                      "qab"
                                    ]
                                  },
                                  "instruction": {
                                    "type": "string",
                                    "format": "jodit"
                                  },
                                  "cards": {
                                    "type": "array",
                                    "minItems": 1,
                                    "items": {
                                      "type": "object",
                                      "properties": {
                                        "id": {
                                          "type": "string",
                                          "format": "uuid"
                                        },
                                        "text": {
                                          "type": "string",
                                          "format": null
                                        },
                                        "image": {
                                          "type": "object",
                                          "properties": {
                                            "url": {
                                              "type": "string",
                                              "format": "uri"
                                            },
                                            "altText": {
                                              "type": "string",
                                              "format": null
                                            }
                                          },
                                          "required": [
                                            "url",
                                            "altText"
                                          ],
                                          "additionalProperties": false
                                        },
                                        "proposalA": {
                                          "type": "string",
                                          "format": null
                                        },
                                        "proposalB": {
                                          "type": "string",
                                          "format": null
                                        },
                                        "solution": {
                                          "type": "string",
                                          "format": null
                                        }
                                      },
                                      "required": [
                                        "id",
                                        "text",
                                        "proposalA",
                                        "proposalB",
                                        "solution"
                                      ],
                                      "additionalProperties": false,
                                      "title": "card"
                                    }
                                  },
                                  "feedback": {
                                    "type": "object",
                                    "properties": {
                                      "diagnosis": {
                                        "type": "string",
                                        "format": "jodit"
                                      }
                                    },
                                    "required": [
                                      "diagnosis"
                                    ],
                                    "additionalProperties": false
                                  }
                                },
                                "required": [
                                  "id",
                                  "type",
                                  "instruction",
                                  "cards",
                                  "feedback"
                                ],
                                "additionalProperties": false,
                                "title": "qab"
                              },
                              {
                                "type": "object",
                                "properties": {
                                  "id": {
                                    "type": "string",
                                    "format": "uuid"
                                  },
                                  "type": {
                                    "type": "string",
                                    "format": null,
                                    "enum": [
                                      "qcu"
                                    ]
                                  },
                                  "instruction": {
                                    "type": "string",
                                    "format": "jodit"
                                  },
                                  "hasShortProposals": {
                                    "type": "boolean"
                                  },
                                  "proposals": {
                                    "type": "array",
                                    "items": {
                                      "type": "object",
                                      "properties": {
                                        "id": {
                                          "type": "string",
                                          "format": null,
                                          "pattern": "^[0-9]+$"
                                        },
                                        "content": {
                                          "type": "string",
                                          "format": "jodit"
                                        },
                                        "feedback": {
                                          "type": "object",
                                          "properties": {
                                            "state": {
                                              "type": "string",
                                              "format": "jodit"
                                            },
                                            "diagnosis": {
                                              "type": "string",
                                              "format": "jodit"
                                            }
                                          },
                                          "required": [
                                            "state",
                                            "diagnosis"
                                          ],
                                          "additionalProperties": false
                                        }
                                      },
                                      "required": [
                                        "id",
                                        "content",
                                        "feedback"
                                      ],
                                      "additionalProperties": false,
                                      "title": "proposal"
                                    }
                                  },
                                  "solution": {
                                    "type": "string",
                                    "format": null,
                                    "pattern": "^[0-9]+$"
                                  }
                                },
                                "required": [
                                  "id",
                                  "type",
                                  "instruction",
                                  "hasShortProposals",
                                  "proposals",
                                  "solution"
                                ],
                                "additionalProperties": false,
                                "title": "qcu",
                                "if": {
                                  "properties": {
                                    "hasShortProposals": {
                                      "const": true
                                    }
                                  }
                                },
                                "then": {
                                  "properties": {
                                    "id": {
                                      "type": "string",
                                      "format": "uuid"
                                    },
                                    "type": {
                                      "type": "string",
                                      "format": null,
                                      "enum": [
                                        "qcu"
                                      ]
                                    },
                                    "instruction": {
                                      "type": "string",
                                      "format": "jodit"
                                    },
                                    "hasShortProposals": {
                                      "type": "boolean"
                                    },
                                    "proposals": {
                                      "type": "array",
                                      "items": {
                                        "type": "object",
                                        "properties": {
                                          "id": {
                                            "type": "string",
                                            "format": null,
                                            "pattern": "^[0-9]+$"
                                          },
                                          "content": {
                                            "type": "string",
                                            "format": null,
                                            "maxLength": 20
                                          },
                                          "feedback": {
                                            "type": "object",
                                            "properties": {
                                              "state": {
                                                "type": "string",
                                                "format": "jodit"
                                              },
                                              "diagnosis": {
                                                "type": "string",
                                                "format": "jodit"
                                              }
                                            },
                                            "required": [
                                              "state",
                                              "diagnosis"
                                            ],
                                            "additionalProperties": false
                                          }
                                        },
                                        "required": [
                                          "id",
                                          "content",
                                          "feedback"
                                        ],
                                        "additionalProperties": false,
                                        "title": "proposal"
                                      }
                                    },
                                    "solution": {
                                      "type": "string",
                                      "format": null,
                                      "pattern": "^[0-9]+$"
                                    }
                                  }
                                }
                              },
                              {
                                "type": "object",
                                "properties": {
                                  "id": {
                                    "type": "string",
                                    "format": "uuid"
                                  },
                                  "type": {
                                    "type": "string",
                                    "format": null,
                                    "enum": [
                                      "qcu-declarative"
                                    ]
                                  },
                                  "instruction": {
                                    "type": "string",
                                    "format": "jodit"
                                  },
                                  "hasShortProposals": {
                                    "type": "boolean"
                                  },
                                  "proposals": {
                                    "type": "array",
                                    "items": {
                                      "type": "object",
                                      "properties": {
                                        "id": {
                                          "type": "string",
                                          "format": null,
                                          "pattern": "^[0-9]+$"
                                        },
                                        "content": {
                                          "type": "string",
                                          "format": "jodit"
                                        },
                                        "feedback": {
                                          "type": "object",
                                          "properties": {
                                            "diagnosis": {
                                              "type": "string",
                                              "format": "jodit"
                                            }
                                          },
                                          "required": [
                                            "diagnosis"
                                          ],
                                          "additionalProperties": false
                                        }
                                      },
                                      "required": [
                                        "id",
                                        "content",
                                        "feedback"
                                      ],
                                      "additionalProperties": false,
                                      "title": "proposal"
                                    }
                                  }
                                },
                                "required": [
                                  "id",
                                  "type",
                                  "instruction",
                                  "hasShortProposals",
                                  "proposals"
                                ],
                                "additionalProperties": false,
                                "title": "qcu-declarative",
                                "if": {
                                  "properties": {
                                    "hasShortProposals": {
                                      "const": true
                                    }
                                  }
                                },
                                "then": {
                                  "properties": {
                                    "id": {
                                      "type": "string",
                                      "format": "uuid"
                                    },
                                    "type": {
                                      "type": "string",
                                      "format": null,
                                      "enum": [
                                        "qcu-declarative"
                                      ]
                                    },
                                    "instruction": {
                                      "type": "string",
                                      "format": "jodit"
                                    },
                                    "hasShortProposals": {
                                      "type": "boolean"
                                    },
                                    "proposals": {
                                      "type": "array",
                                      "items": {
                                        "type": "object",
                                        "properties": {
                                          "id": {
                                            "type": "string",
                                            "format": null,
                                            "pattern": "^[0-9]+$"
                                          },
                                          "content": {
                                            "type": "string",
                                            "format": null,
                                            "maxLength": 20
                                          },
                                          "feedback": {
                                            "type": "object",
                                            "properties": {
                                              "diagnosis": {
                                                "type": "string",
                                                "format": "jodit"
                                              }
                                            },
                                            "required": [
                                              "diagnosis"
                                            ],
                                            "additionalProperties": false
                                          }
                                        },
                                        "required": [
                                          "id",
                                          "content",
                                          "feedback"
                                        ],
                                        "additionalProperties": false,
                                        "title": "proposal"
                                      }
                                    }
                                  }
                                }
                              },
                              {
                                "type": "object",
                                "properties": {
                                  "id": {
                                    "type": "string",
                                    "format": "uuid"
                                  },
                                  "type": {
                                    "type": "string",
                                    "format": null,
                                    "enum": [
                                      "qcu-discovery"
                                    ]
                                  },
                                  "instruction": {
                                    "type": "string",
                                    "format": "jodit"
                                  },
                                  "hasShortProposals": {
                                    "type": "boolean"
                                  },
                                  "proposals": {
                                    "type": "array",
                                    "items": {
                                      "type": "object",
                                      "properties": {
                                        "id": {
                                          "type": "string",
                                          "format": null,
                                          "pattern": "^[0-9]+$"
                                        },
                                        "content": {
                                          "type": "string",
                                          "format": "jodit"
                                        },
                                        "feedback": {
                                          "type": "object",
                                          "properties": {
                                            "diagnosis": {
                                              "type": "string",
                                              "format": "jodit"
                                            }
                                          },
                                          "required": [
                                            "diagnosis"
                                          ],
                                          "additionalProperties": false
                                        }
                                      },
                                      "required": [
                                        "id",
                                        "content",
                                        "feedback"
                                      ],
                                      "additionalProperties": false,
                                      "title": "proposal"
                                    }
                                  },
                                  "solution": {
                                    "type": "string",
                                    "format": null,
                                    "pattern": "^[0-9]+$"
                                  }
                                },
                                "required": [
                                  "id",
                                  "type",
                                  "instruction",
                                  "hasShortProposals",
                                  "proposals",
                                  "solution"
                                ],
                                "additionalProperties": false,
                                "title": "qcu-discovery",
                                "if": {
                                  "properties": {
                                    "hasShortProposals": {
                                      "const": true
                                    }
                                  }
                                },
                                "then": {
                                  "properties": {
                                    "id": {
                                      "type": "string",
                                      "format": "uuid"
                                    },
                                    "type": {
                                      "type": "string",
                                      "format": null,
                                      "enum": [
                                        "qcu-discovery"
                                      ]
                                    },
                                    "instruction": {
                                      "type": "string",
                                      "format": "jodit"
                                    },
                                    "hasShortProposals": {
                                      "type": "boolean"
                                    },
                                    "proposals": {
                                      "type": "array",
                                      "items": {
                                        "type": "object",
                                        "properties": {
                                          "id": {
                                            "type": "string",
                                            "format": null,
                                            "pattern": "^[0-9]+$"
                                          },
                                          "content": {
                                            "type": "string",
                                            "format": null,
                                            "maxLength": 20
                                          },
                                          "feedback": {
                                            "type": "object",
                                            "properties": {
                                              "diagnosis": {
                                                "type": "string",
                                                "format": "jodit"
                                              }
                                            },
                                            "required": [
                                              "diagnosis"
                                            ],
                                            "additionalProperties": false
                                          }
                                        },
                                        "required": [
                                          "id",
                                          "content",
                                          "feedback"
                                        ],
                                        "additionalProperties": false,
                                        "title": "proposal"
                                      }
                                    },
                                    "solution": {
                                      "type": "string",
                                      "format": null,
                                      "pattern": "^[0-9]+$"
                                    }
                                  }
                                }
                              },
                              {
                                "type": "object",
                                "properties": {
                                  "id": {
                                    "type": "string",
                                    "format": "uuid"
                                  },
                                  "type": {
                                    "type": "string",
                                    "format": null,
                                    "enum": [
                                      "qcm"
                                    ]
                                  },
                                  "instruction": {
                                    "type": "string",
                                    "format": "jodit"
                                  },
                                  "hasShortProposals": {
                                    "type": "boolean"
                                  },
                                  "proposals": {
                                    "type": "array",
                                    "minItems": 3,
                                    "items": {
                                      "type": "object",
                                      "properties": {
                                        "id": {
                                          "type": "string",
                                          "format": null,
                                          "pattern": "^[0-9]+$"
                                        },
                                        "content": {
                                          "type": "string",
                                          "format": "jodit"
                                        }
                                      },
                                      "required": [
                                        "id",
                                        "content"
                                      ],
                                      "additionalProperties": false,
                                      "title": "proposal"
                                    }
                                  },
                                  "feedbacks": {
                                    "type": "object",
                                    "properties": {
                                      "valid": {
                                        "type": "object",
                                        "properties": {
                                          "state": {
                                            "type": "string",
                                            "format": "jodit"
                                          },
                                          "diagnosis": {
                                            "type": "string",
                                            "format": "jodit"
                                          }
                                        },
                                        "required": [
                                          "state",
                                          "diagnosis"
                                        ],
                                        "additionalProperties": false
                                      },
                                      "invalid": {
                                        "type": "object",
                                        "properties": {
                                          "state": {
                                            "type": "string",
                                            "format": "jodit"
                                          },
                                          "diagnosis": {
                                            "type": "string",
                                            "format": "jodit"
                                          }
                                        },
                                        "required": [
                                          "state",
                                          "diagnosis"
                                        ],
                                        "additionalProperties": false
                                      }
                                    },
                                    "additionalProperties": false
                                  },
                                  "solutions": {
                                    "type": "array",
                                    "minItems": 2,
                                    "items": {
                                      "type": "string",
                                      "format": null,
                                      "pattern": "^[0-9]+$",
                                      "title": "solution"
                                    }
                                  }
                                },
                                "required": [
                                  "id",
                                  "type",
                                  "instruction",
                                  "hasShortProposals",
                                  "proposals",
                                  "feedbacks",
                                  "solutions"
                                ],
                                "additionalProperties": false,
                                "title": "qcm",
                                "if": {
                                  "properties": {
                                    "hasShortProposals": {
                                      "const": true
                                    }
                                  }
                                },
                                "then": {
                                  "properties": {
                                    "id": {
                                      "type": "string",
                                      "format": "uuid"
                                    },
                                    "type": {
                                      "type": "string",
                                      "format": null,
                                      "enum": [
                                        "qcm"
                                      ]
                                    },
                                    "instruction": {
                                      "type": "string",
                                      "format": "jodit"
                                    },
                                    "hasShortProposals": {
                                      "type": "boolean"
                                    },
                                    "proposals": {
                                      "type": "array",
                                      "minItems": 3,
                                      "items": {
                                        "type": "object",
                                        "properties": {
                                          "id": {
                                            "type": "string",
                                            "format": null,
                                            "pattern": "^[0-9]+$"
                                          },
                                          "content": {
                                            "type": "string",
                                            "format": null,
                                            "maxLength": 20
                                          }
                                        },
                                        "required": [
                                          "id",
                                          "content"
                                        ],
                                        "additionalProperties": false,
                                        "title": "proposal"
                                      }
                                    },
                                    "feedbacks": {
                                      "type": "object",
                                      "properties": {
                                        "valid": {
                                          "type": "object",
                                          "properties": {
                                            "state": {
                                              "type": "string",
                                              "format": "jodit"
                                            },
                                            "diagnosis": {
                                              "type": "string",
                                              "format": "jodit"
                                            }
                                          },
                                          "required": [
                                            "state",
                                            "diagnosis"
                                          ],
                                          "additionalProperties": false
                                        },
                                        "invalid": {
                                          "type": "object",
                                          "properties": {
                                            "state": {
                                              "type": "string",
                                              "format": "jodit"
                                            },
                                            "diagnosis": {
                                              "type": "string",
                                              "format": "jodit"
                                            }
                                          },
                                          "required": [
                                            "state",
                                            "diagnosis"
                                          ],
                                          "additionalProperties": false
                                        }
                                      },
                                      "additionalProperties": false
                                    },
                                    "solutions": {
                                      "type": "array",
                                      "minItems": 2,
                                      "items": {
                                        "type": "string",
                                        "format": null,
                                        "pattern": "^[0-9]+$",
                                        "title": "solution"
                                      }
                                    }
                                  }
                                }
                              },
                              {
                                "type": "object",
                                "properties": {
                                  "id": {
                                    "type": "string",
                                    "format": "uuid"
                                  },
                                  "type": {
                                    "type": "string",
                                    "format": null,
                                    "enum": [
                                      "qrocm"
                                    ]
                                  },
                                  "instruction": {
                                    "type": "string",
                                    "format": "jodit"
                                  },
                                  "proposals": {
                                    "type": "array",
                                    "items": {
                                      "oneOf": [
                                        {
                                          "type": "object",
                                          "properties": {
                                            "type": {
                                              "type": "string",
                                              "format": null,
                                              "enum": [
                                                "text"
                                              ]
                                            },
                                            "content": {
                                              "type": "string",
                                              "format": "jodit"
                                            }
                                          },
                                          "required": [
                                            "type"
                                          ],
                                          "additionalProperties": false,
                                          "title": "text"
                                        },
                                        {
                                          "type": "object",
                                          "properties": {
                                            "input": {
                                              "type": "string",
                                              "format": null
                                            },
                                            "type": {
                                              "type": "string",
                                              "format": null,
                                              "enum": [
                                                "input"
                                              ]
                                            },
                                            "inputType": {
                                              "type": "string",
                                              "format": null,
                                              "enum": [
                                                "text",
                                                "number"
                                              ]
                                            },
                                            "size": {
                                              "type": "number",
                                              "minimum": 1
                                            },
                                            "display": {
                                              "type": "string",
                                              "format": null,
                                              "enum": [
                                                "inline",
                                                "block"
                                              ]
                                            },
                                            "placeholder": {
                                              "type": "string",
                                              "format": null
                                            },
                                            "ariaLabel": {
                                              "type": "string",
                                              "format": null
                                            },
                                            "tolerances": {
                                              "type": "array",
                                              "uniqueItems": true,
                                              "items": {
                                                "type": "string",
                                                "format": null,
                                                "enum": [
                                                  "t1",
                                                  "t2",
                                                  "t3"
                                                ],
                                                "title": "tolerance"
                                              }
                                            },
                                            "solutions": {
                                              "type": "array",
                                              "items": {
                                                "oneOf": [
                                                  {
                                                    "type": "string",
                                                    "format": null,
                                                    "minLength": 1
                                                  },
                                                  {
                                                    "type": "number",
                                                    "minimum": 1
                                                  }
                                                ],
                                                "title": "solution"
                                              }
                                            }
                                          },
                                          "required": [
                                            "input",
                                            "type",
                                            "inputType",
                                            "size",
                                            "display",
                                            "placeholder",
                                            "ariaLabel",
                                            "tolerances",
                                            "solutions"
                                          ],
                                          "additionalProperties": false,
                                          "title": "input"
                                        },
                                        {
                                          "type": "object",
                                          "properties": {
                                            "input": {
                                              "type": "string",
                                              "format": null
                                            },
                                            "type": {
                                              "type": "string",
                                              "format": null,
                                              "enum": [
                                                "select"
                                              ]
                                            },
                                            "display": {
                                              "type": "string",
                                              "format": null,
                                              "enum": [
                                                "inline",
                                                "block"
                                              ]
                                            },
                                            "placeholder": {
                                              "type": "string",
                                              "format": null
                                            },
                                            "ariaLabel": {
                                              "type": "string",
                                              "format": null
                                            },
                                            "tolerances": {
                                              "type": "array"
                                            },
                                            "options": {
                                              "type": "array",
                                              "items": {
                                                "type": "object",
                                                "properties": {
                                                  "id": {
                                                    "type": "string",
                                                    "format": null,
                                                    "pattern": "^[0-9]+$"
                                                  },
                                                  "content": {
                                                    "type": "string",
                                                    "format": null
                                                  }
                                                },
                                                "required": [
                                                  "content"
                                                ],
                                                "additionalProperties": false,
                                                "title": "option"
                                              }
                                            },
                                            "solutions": {
                                              "type": "array",
                                              "items": {
                                                "type": "string",
                                                "format": null,
                                                "pattern": "^[0-9]+$",
                                                "title": "solution"
                                              }
                                            }
                                          },
                                          "required": [
                                            "input",
                                            "type",
                                            "display",
                                            "placeholder",
                                            "ariaLabel",
                                            "tolerances",
                                            "options",
                                            "solutions"
                                          ],
                                          "additionalProperties": false,
                                          "title": "select"
                                        }
                                      ],
                                      "title": "proposal"
                                    }
                                  },
                                  "feedbacks": {
                                    "type": "object",
                                    "properties": {
                                      "valid": {
                                        "type": "object",
                                        "properties": {
                                          "state": {
                                            "type": "string",
                                            "format": "jodit"
                                          },
                                          "diagnosis": {
                                            "type": "string",
                                            "format": "jodit"
                                          }
                                        },
                                        "required": [
                                          "state",
                                          "diagnosis"
                                        ],
                                        "additionalProperties": false
                                      },
                                      "invalid": {
                                        "type": "object",
                                        "properties": {
                                          "state": {
                                            "type": "string",
                                            "format": "jodit"
                                          },
                                          "diagnosis": {
                                            "type": "string",
                                            "format": "jodit"
                                          }
                                        },
                                        "required": [
                                          "state",
                                          "diagnosis"
                                        ],
                                        "additionalProperties": false
                                      }
                                    },
                                    "additionalProperties": false
                                  }
                                },
                                "required": [
                                  "id",
                                  "type",
                                  "instruction",
                                  "proposals",
                                  "feedbacks"
                                ],
                                "additionalProperties": false,
                                "title": "qrocm"
                              },
                              {
                                "type": "object",
                                "properties": {
                                  "id": {
                                    "type": "string",
                                    "format": "uuid"
                                  },
                                  "type": {
                                    "type": "string",
                                    "format": null,
                                    "enum": [
                                      "separator"
                                    ]
                                  }
                                },
                                "required": [
                                  "id",
                                  "type"
                                ],
                                "additionalProperties": false,
                                "title": "separator"
                              },
                              {
                                "type": "object",
                                "properties": {
                                  "id": {
                                    "type": "string",
                                    "format": "uuid"
                                  },
                                  "type": {
                                    "type": "string",
                                    "format": null,
                                    "enum": [
                                      "short-video"
                                    ]
                                  },
                                  "title": {
                                    "type": "string",
                                    "format": null
                                  },
                                  "url": {
                                    "type": "string",
                                    "format": "uri"
                                  },
                                  "transcription": {
                                    "type": "string",
                                    "format": "jodit"
                                  }
                                },
                                "required": [
                                  "id",
                                  "type",
                                  "title",
                                  "url"
                                ],
                                "additionalProperties": false,
                                "title": "short-video"
                              },
                              {
                                "type": "object",
                                "properties": {
                                  "id": {
                                    "type": "string",
                                    "format": "uuid"
                                  },
                                  "type": {
                                    "type": "string",
                                    "format": null,
                                    "enum": [
                                      "text"
                                    ]
                                  },
                                  "content": {
                                    "type": "string",
                                    "format": "jodit"
                                  }
                                },
                                "required": [
                                  "id",
                                  "type"
                                ],
                                "additionalProperties": false,
                                "title": "text"
                              },
                              {
                                "type": "object",
                                "properties": {
                                  "id": {
                                    "type": "string",
                                    "format": "uuid"
                                  },
                                  "type": {
                                    "type": "string",
                                    "format": null,
                                    "enum": [
                                      "video"
                                    ]
                                  },
                                  "title": {
                                    "type": "string",
                                    "format": null
                                  },
                                  "url": {
                                    "type": "string",
                                    "format": "uri"
                                  },
                                  "poster": {
                                    "type": "string",
                                    "format": "uri"
                                  },
                                  "subtitles": {
                                    "type": "string",
                                    "format": "uri"
                                  },
                                  "transcription": {
                                    "type": "string",
                                    "format": "jodit"
                                  }
                                },
                                "required": [
                                  "id",
                                  "type",
                                  "title",
                                  "url",
                                  "subtitles"
                                ],
                                "additionalProperties": false,
                                "title": "video"
                              }
                            ]
                          }
                        },
                        "required": [
                          "type",
                          "element"
                        ],
                        "additionalProperties": false,
                        "title": "element"
                      },
                      {
                        "type": "object",
                        "properties": {
                          "type": {
                            "type": "string",
                            "format": null,
                            "enum": [
                              "stepper"
                            ]
                          },
                          "steps": {
                            "type": "array",
                            "minItems": 2,
                            "items": {
                              "type": "object",
                              "properties": {
                                "elements": {
                                  "type": "array",
                                  "items": {
                                    "oneOf": [
                                      {
                                        "type": "object",
                                        "properties": {
                                          "id": {
                                            "type": "string",
                                            "format": "uuid"
                                          },
                                          "type": {
                                            "type": "string",
                                            "format": null,
                                            "enum": [
                                              "audio"
                                            ]
                                          },
                                          "title": {
                                            "type": "string",
                                            "format": null
                                          },
                                          "url": {
                                            "type": "string",
                                            "format": "uri"
                                          },
                                          "transcription": {
                                            "type": "string",
                                            "format": "jodit"
                                          }
                                        },
                                        "required": [
                                          "id",
                                          "type",
                                          "title",
                                          "url",
                                          "transcription"
                                        ],
                                        "additionalProperties": false,
                                        "title": "audio"
                                      },
                                      {
                                        "oneOf": [
                                          {
                                            "type": "object",
                                            "properties": {
                                              "id": {
                                                "type": "string",
                                                "format": "uuid"
                                              },
                                              "type": {
                                                "type": "string",
                                                "format": null,
                                                "enum": [
                                                  "custom"
                                                ]
                                              },
                                              "instruction": {
                                                "type": "string",
                                                "format": "jodit"
                                              },
                                              "tagName": {
                                                "type": "string",
                                                "format": null,
                                                "enum": [
                                                  "calcul-impact"
                                                ]
                                              },
                                              "props": {
                                                "type": "object",
                                                "properties": {
                                                  "titleLevel": {
                                                    "type": "number"
                                                  }
                                                },
                                                "additionalProperties": false
                                              }
                                            },
                                            "required": [
                                              "id",
                                              "type",
                                              "instruction",
                                              "tagName"
                                            ],
                                            "additionalProperties": false,
                                            "title": "calcul-impact"
                                          },
                                          {
                                            "type": "object",
                                            "properties": {
                                              "id": {
                                                "type": "string",
                                                "format": "uuid"
                                              },
                                              "type": {
                                                "type": "string",
                                                "format": null,
                                                "enum": [
                                                  "custom"
                                                ]
                                              },
                                              "instruction": {
                                                "type": "string",
                                                "format": "jodit"
                                              },
                                              "tagName": {
                                                "type": "string",
                                                "format": null,
                                                "enum": [
                                                  "capacity-calculation"
                                                ]
                                              },
                                              "props": {
                                                "type": "object",
                                                "properties": {
                                                  "titleLevel": {
                                                    "type": "number"
                                                  },
                                                  "capacityImage": {
                                                    "type": "string",
                                                    "format": null
                                                  }
                                                },
                                                "required": [
                                                  "capacityImage"
                                                ],
                                                "additionalProperties": false
                                              }
                                            },
                                            "required": [
                                              "id",
                                              "type",
                                              "instruction",
                                              "tagName"
                                            ],
                                            "additionalProperties": false,
                                            "title": "capacity-calculation"
                                          },
                                          {
                                            "type": "object",
                                            "properties": {
                                              "id": {
                                                "type": "string",
                                                "format": "uuid"
                                              },
                                              "type": {
                                                "type": "string",
                                                "format": null,
                                                "enum": [
                                                  "custom"
                                                ]
                                              },
                                              "instruction": {
                                                "type": "string",
                                                "format": "jodit"
                                              },
                                              "tagName": {
                                                "type": "string",
                                                "format": null,
                                                "enum": [
                                                  "clickable-image"
                                                ]
                                              },
                                              "props": {
                                                "type": "object",
                                                "properties": {
                                                  "image": {
                                                    "type": "object",
                                                    "properties": {
                                                      "src": {
                                                        "type": "string",
                                                        "format": null
                                                      },
                                                      "alt": {
                                                        "type": "string",
                                                        "format": null
                                                      },
                                                      "width": {
                                                        "type": "number"
                                                      },
                                                      "height": {
                                                        "type": "number"
                                                      }
                                                    },
                                                    "required": [
                                                      "src",
                                                      "alt"
                                                    ],
                                                    "additionalProperties": true
                                                  },
                                                  "areas": {
                                                    "type": "array",
                                                    "minItems": 1,
                                                    "items": {
                                                      "type": "object",
                                                      "properties": {
                                                        "coords": {
                                                          "type": "object",
                                                          "properties": {
                                                            "x1": {
                                                              "type": "number"
                                                            },
                                                            "y1": {
                                                              "type": "number"
                                                            },
                                                            "x2": {
                                                              "type": "number"
                                                            },
                                                            "y2": {
                                                              "type": "number"
                                                            }
                                                          },
                                                          "required": [
                                                            "x1",
                                                            "y1",
                                                            "x2",
                                                            "y2"
                                                          ],
                                                          "additionalProperties": false
                                                        },
                                                        "spot": {
                                                          "type": "object",
                                                          "properties": {
                                                            "x": {
                                                              "type": "number"
                                                            },
                                                            "y": {
                                                              "type": "number"
                                                            }
                                                          },
                                                          "additionalProperties": false
                                                        },
                                                        "info": {
                                                          "type": "string",
                                                          "format": null
                                                        },
                                                        "tooltipPosition": {
                                                          "type": "string",
                                                          "format": null,
                                                          "enum": [
                                                            "bottom"
                                                          ]
                                                        }
                                                      },
                                                      "required": [
                                                        "coords",
                                                        "info"
                                                      ],
                                                      "additionalProperties": false,
                                                      "title": "area"
                                                    }
                                                  }
                                                },
                                                "required": [
                                                  "image",
                                                  "areas"
                                                ],
                                                "additionalProperties": false
                                              }
                                            },
                                            "required": [
                                              "id",
                                              "type",
                                              "instruction",
                                              "tagName"
                                            ],
                                            "additionalProperties": false,
                                            "title": "clickable-image"
                                          },
                                          {
                                            "type": "object",
                                            "properties": {
                                              "id": {
                                                "type": "string",
                                                "format": "uuid"
                                              },
                                              "type": {
                                                "type": "string",
                                                "format": null,
                                                "enum": [
                                                  "custom"
                                                ]
                                              },
                                              "instruction": {
                                                "type": "string",
                                                "format": "jodit"
                                              },
                                              "tagName": {
                                                "type": "string",
                                                "format": null,
                                                "enum": [
                                                  "complete-phrase"
                                                ]
                                              },
                                              "props": {
                                                "type": "object",
                                                "properties": {
                                                  "titleLevel": {
                                                    "type": "number"
                                                  },
                                                  "listOfProbabilityBarsLists": {
                                                    "type": "array",
                                                    "items": {
                                                      "type": "array",
                                                      "items": {
                                                        "type": "object",
                                                        "properties": {
                                                          "name": {
                                                            "type": "string",
                                                            "format": null
                                                          },
                                                          "percent": {
                                                            "type": "integer"
                                                          }
                                                        },
                                                        "required": [
                                                          "name",
                                                          "percent"
                                                        ],
                                                        "additionalProperties": false
                                                      },
                                                      "title": "listOfProbabilityBarsList"
                                                    }
                                                  },
                                                  "userMessage": {
                                                    "type": "string",
                                                    "format": null
                                                  },
                                                  "llmMessage": {
                                                    "type": "string",
                                                    "format": null
                                                  },
                                                  "wordsToAdd": {
                                                    "type": "array",
                                                    "items": {
                                                      "type": "string",
                                                      "format": null,
                                                      "title": "wordsToAdd"
                                                    }
                                                  }
                                                },
                                                "required": [
                                                  "listOfProbabilityBarsLists",
                                                  "userMessage",
                                                  "llmMessage",
                                                  "wordsToAdd"
                                                ],
                                                "additionalProperties": false
                                              }
                                            },
                                            "required": [
                                              "id",
                                              "type",
                                              "instruction",
                                              "tagName"
                                            ],
                                            "additionalProperties": false,
                                            "title": "complete-phrase"
                                          },
                                          {
                                            "type": "object",
                                            "properties": {
                                              "id": {
                                                "type": "string",
                                                "format": "uuid"
                                              },
                                              "type": {
                                                "type": "string",
                                                "format": null,
                                                "enum": [
                                                  "custom"
                                                ]
                                              },
                                              "instruction": {
                                                "type": "string",
                                                "format": "jodit"
                                              },
                                              "tagName": {
                                                "type": "string",
                                                "format": null,
                                                "enum": [
                                                  "flip-cards"
                                                ]
                                              },
                                              "props": {
                                                "type": "object",
                                                "properties": {
                                                  "titleLevel": {
                                                    "type": "number"
                                                  },
                                                  "name": {
                                                    "type": "string",
                                                    "format": null
                                                  },
                                                  "cardList": {
                                                    "type": "array",
                                                    "items": {
                                                      "type": "object",
                                                      "properties": {
                                                        "name": {
                                                          "type": "string",
                                                          "format": null
                                                        },
                                                        "description": {
                                                          "type": "string",
                                                          "format": null
                                                        },
                                                        "icon": {
                                                          "type": "string",
                                                          "format": null
                                                        },
                                                        "image": {
                                                          "type": "string",
                                                          "format": null
                                                        }
                                                      },
                                                      "required": [
                                                        "name",
                                                        "description",
                                                        "icon",
                                                        "image"
                                                      ],
                                                      "additionalProperties": false,
                                                      "title": "cardList"
                                                    }
                                                  }
                                                },
                                                "required": [
                                                  "name",
                                                  "cardList"
                                                ],
                                                "additionalProperties": false
                                              }
                                            },
                                            "required": [
                                              "id",
                                              "type",
                                              "instruction",
                                              "tagName"
                                            ],
                                            "additionalProperties": false,
                                            "title": "flip-cards"
                                          },
                                          {
                                            "type": "object",
                                            "properties": {
                                              "id": {
                                                "type": "string",
                                                "format": "uuid"
                                              },
                                              "type": {
                                                "type": "string",
                                                "format": null,
                                                "enum": [
                                                  "custom"
                                                ]
                                              },
                                              "instruction": {
                                                "type": "string",
                                                "format": "jodit"
                                              },
                                              "tagName": {
                                                "type": "string",
                                                "format": null,
                                                "enum": [
                                                  "image-quiz"
                                                ]
                                              },
                                              "props": {
                                                "type": "object",
                                                "properties": {
                                                  "name": {
                                                    "type": "string",
                                                    "format": null
                                                  },
                                                  "multiple": {
                                                    "type": "boolean"
                                                  },
                                                  "context": {
                                                    "type": "string",
                                                    "format": null
                                                  },
                                                  "maxChoicesPerLine": {
                                                    "type": "number"
                                                  },
                                                  "hideChoicesName": {
                                                    "type": "boolean"
                                                  },
                                                  "orderChoices": {
                                                    "type": "boolean"
                                                  },
                                                  "imageChoicesSize": {
                                                    "type": "string",
                                                    "format": null,
                                                    "enum": [
                                                      "icon",
                                                      "medium",
                                                      "large"
                                                    ]
                                                  },
                                                  "choices": {
                                                    "type": "array",
                                                    "items": {
                                                      "type": "object",
                                                      "properties": {
                                                        "name": {
                                                          "type": "string",
                                                          "format": null
                                                        },
                                                        "image": {
                                                          "type": "object",
                                                          "properties": {
                                                            "src": {
                                                              "type": "string",
                                                              "format": null
                                                            }
                                                          },
                                                          "required": [
                                                            "src"
                                                          ],
                                                          "additionalProperties": true
                                                        },
                                                        "response": {
                                                          "type": "string",
                                                          "format": null
                                                        }
                                                      },
                                                      "required": [
                                                        "name"
                                                      ],
                                                      "additionalProperties": false,
                                                      "title": "choice"
                                                    }
                                                  }
                                                },
                                                "required": [
                                                  "name",
                                                  "choices"
                                                ],
                                                "additionalProperties": false
                                              }
                                            },
                                            "required": [
                                              "id",
                                              "type",
                                              "instruction",
                                              "tagName",
                                              "props"
                                            ],
                                            "additionalProperties": false,
                                            "title": "image-quiz"
                                          },
                                          {
                                            "type": "object",
                                            "properties": {
                                              "id": {
                                                "type": "string",
                                                "format": "uuid"
                                              },
                                              "type": {
                                                "type": "string",
                                                "format": null,
                                                "enum": [
                                                  "custom"
                                                ]
                                              },
                                              "instruction": {
                                                "type": "string",
                                                "format": "jodit"
                                              },
                                              "tagName": {
                                                "type": "string",
                                                "format": null,
                                                "enum": [
                                                  "image-quizzes"
                                                ]
                                              },
                                              "props": {
                                                "type": "object",
                                                "properties": {
                                                  "quizzes": {
                                                    "type": "array",
                                                    "items": {
                                                      "type": "object",
                                                      "properties": {
                                                        "name": {
                                                          "type": "string",
                                                          "format": null
                                                        },
                                                        "multiple": {
                                                          "type": "boolean"
                                                        },
                                                        "context": {
                                                          "type": "string",
                                                          "format": null
                                                        },
                                                        "maxChoicesPerLine": {
                                                          "type": "number"
                                                        },
                                                        "hideChoicesName": {
                                                          "type": "boolean"
                                                        },
                                                        "orderChoices": {
                                                          "type": "boolean"
                                                        },
                                                        "imageChoicesSize": {
                                                          "type": "string",
                                                          "format": null,
                                                          "enum": [
                                                            "icon",
                                                            "medium",
                                                            "large"
                                                          ]
                                                        },
                                                        "choices": {
                                                          "type": "array",
                                                          "items": {
                                                            "type": "object",
                                                            "properties": {
                                                              "name": {
                                                                "type": "string",
                                                                "format": null
                                                              },
                                                              "image": {
                                                                "type": "object",
                                                                "properties": {
                                                                  "src": {
                                                                    "type": "string",
                                                                    "format": null
                                                                  }
                                                                },
                                                                "required": [
                                                                  "src"
                                                                ],
                                                                "additionalProperties": true
                                                              },
                                                              "response": {
                                                                "type": "string",
                                                                "format": null
                                                              }
                                                            },
                                                            "required": [
                                                              "name"
                                                            ],
                                                            "additionalProperties": false,
                                                            "title": "choice"
                                                          }
                                                        }
                                                      },
                                                      "required": [
                                                        "name",
                                                        "choices"
                                                      ],
                                                      "additionalProperties": false,
                                                      "title": "quizze"
                                                    }
                                                  }
                                                },
                                                "required": [
                                                  "quizzes"
                                                ],
                                                "additionalProperties": false
                                              }
                                            },
                                            "required": [
                                              "id",
                                              "type",
                                              "instruction",
                                              "tagName",
                                              "props"
                                            ],
                                            "additionalProperties": false,
                                            "title": "image-quizzes"
                                          },
                                          {
                                            "type": "object",
                                            "properties": {
                                              "id": {
                                                "type": "string",
                                                "format": "uuid"
                                              },
                                              "type": {
                                                "type": "string",
                                                "format": null,
                                                "enum": [
                                                  "custom"
                                                ]
                                              },
                                              "instruction": {
                                                "type": "string",
                                                "format": "jodit"
                                              },
                                              "tagName": {
                                                "type": "string",
                                                "format": null,
                                                "enum": [
                                                  "message-conversation"
                                                ]
                                              },
                                              "props": {
                                                "type": "object",
                                                "properties": {
                                                  "title": {
                                                    "type": "string",
                                                    "format": null
                                                  },
                                                  "messages": {
                                                    "type": "array",
                                                    "items": {
                                                      "oneOf": [
                                                        {
                                                          "type": "object",
                                                          "properties": {
                                                            "userName": {
                                                              "type": "string",
                                                              "format": null
                                                            },
                                                            "direction": {
                                                              "type": "string",
                                                              "format": null,
                                                              "enum": [
                                                                "incoming",
                                                                "outgoing"
                                                              ]
                                                            },
                                                            "type": {
                                                              "type": "string",
                                                              "format": null,
                                                              "enum": [
                                                                "Texte"
                                                              ]
                                                            },
                                                            "content": {
                                                              "type": "string",
                                                              "format": null
                                                            }
                                                          },
                                                          "required": [
                                                            "userName",
                                                            "direction",
                                                            "type",
                                                            "content"
                                                          ],
                                                          "additionalProperties": false,
                                                          "title": "Texte"
                                                        },
                                                        {
                                                          "type": "object",
                                                          "properties": {
                                                            "userName": {
                                                              "type": "string",
                                                              "format": null
                                                            },
                                                            "direction": {
                                                              "type": "string",
                                                              "format": null,
                                                              "enum": [
                                                                "incoming",
                                                                "outgoing"
                                                              ]
                                                            },
                                                            "type": {
                                                              "type": "string",
                                                              "format": null,
                                                              "enum": [
                                                                "Texte + Image"
                                                              ]
                                                            },
                                                            "content": {
                                                              "type": "string",
                                                              "format": null
                                                            },
                                                            "image": {
                                                              "type": "object",
                                                              "properties": {
                                                                "src": {
                                                                  "type": "string",
                                                                  "format": null
                                                                },
                                                                "alt": {
                                                                  "type": "string",
                                                                  "format": null
                                                                }
                                                              },
                                                              "required": [
                                                                "src",
                                                                "alt"
                                                              ],
                                                              "additionalProperties": true
                                                            }
                                                          },
                                                          "required": [
                                                            "userName",
                                                            "direction",
                                                            "type",
                                                            "content",
                                                            "image"
                                                          ],
                                                          "additionalProperties": false,
                                                          "title": "Texte + Image"
                                                        },
                                                        {
                                                          "type": "object",
                                                          "properties": {
                                                            "userName": {
                                                              "type": "string",
                                                              "format": null
                                                            },
                                                            "direction": {
                                                              "type": "string",
                                                              "format": null,
                                                              "enum": [
                                                                "incoming",
                                                                "outgoing"
                                                              ]
                                                            },
                                                            "type": {
                                                              "type": "string",
                                                              "format": null,
                                                              "enum": [
                                                                "Image seule"
                                                              ]
                                                            },
                                                            "image": {
                                                              "type": "object",
                                                              "properties": {
                                                                "src": {
                                                                  "type": "string",
                                                                  "format": null
                                                                },
                                                                "alt": {
                                                                  "type": "string",
                                                                  "format": null
                                                                }
                                                              },
                                                              "required": [
                                                                "src",
                                                                "alt"
                                                              ],
                                                              "additionalProperties": true
                                                            }
                                                          },
                                                          "required": [
                                                            "userName",
                                                            "direction",
                                                            "type",
                                                            "image"
                                                          ],
                                                          "additionalProperties": false,
                                                          "title": "Image seule"
                                                        }
                                                      ],
                                                      "title": "message"
                                                    }
                                                  },
                                                  "animationSpeed": {
                                                    "type": "number"
                                                  }
                                                },
                                                "required": [
                                                  "title",
                                                  "messages"
                                                ],
                                                "additionalProperties": false
                                              }
                                            },
                                            "required": [
                                              "id",
                                              "type",
                                              "instruction",
                                              "tagName",
                                              "props"
                                            ],
                                            "additionalProperties": false,
                                            "title": "message-conversation"
                                          },
                                          {
                                            "type": "object",
                                            "properties": {
                                              "id": {
                                                "type": "string",
                                                "format": "uuid"
                                              },
                                              "type": {
                                                "type": "string",
                                                "format": null,
                                                "enum": [
                                                  "custom"
                                                ]
                                              },
                                              "instruction": {
                                                "type": "string",
                                                "format": "jodit"
                                              },
                                              "tagName": {
                                                "type": "string",
                                                "format": null,
                                                "enum": [
                                                  "phishing-message"
                                                ]
                                              },
                                              "props": {
                                                "type": "object",
                                                "properties": {
                                                  "titleLevel": {
                                                    "type": "number"
                                                  }
                                                },
                                                "additionalProperties": false
                                              }
                                            },
                                            "required": [
                                              "id",
                                              "type",
                                              "instruction",
                                              "tagName"
                                            ],
                                            "additionalProperties": false,
                                            "title": "phishing-message"
                                          },
                                          {
                                            "type": "object",
                                            "properties": {
                                              "id": {
                                                "type": "string",
                                                "format": "uuid"
                                              },
                                              "type": {
                                                "type": "string",
                                                "format": null,
                                                "enum": [
                                                  "custom"
                                                ]
                                              },
                                              "instruction": {
                                                "type": "string",
                                                "format": "jodit"
                                              },
                                              "tagName": {
                                                "type": "string",
                                                "format": null,
                                                "enum": [
                                                  "phishing-notification"
                                                ]
                                              },
                                              "props": {
                                                "type": "object",
                                                "properties": {
                                                  "notifications": {
                                                    "type": "array",
                                                    "items": {
                                                      "type": "object",
                                                      "properties": {
                                                        "icon": {
                                                          "type": "string",
                                                          "format": null
                                                        },
                                                        "sender": {
                                                          "type": "string",
                                                          "format": null
                                                        },
                                                        "content": {
                                                          "type": "string",
                                                          "format": null
                                                        },
                                                        "category": {
                                                          "type": "string",
                                                          "format": null
                                                        },
                                                        "time": {
                                                          "type": "object",
                                                          "properties": {
                                                            "hours": {
                                                              "type": "number"
                                                            },
                                                            "minutes": {
                                                              "type": "number"
                                                            }
                                                          },
                                                          "additionalProperties": false
                                                        }
                                                      },
                                                      "required": [
                                                        "icon",
                                                        "sender",
                                                        "content",
                                                        "category",
                                                        "time"
                                                      ],
                                                      "additionalProperties": false,
                                                      "title": "notification"
                                                    }
                                                  },
                                                  "categories": {
                                                    "type": "array",
                                                    "items": {
                                                      "type": "object",
                                                      "properties": {
                                                        "name": {
                                                          "type": "string",
                                                          "format": null
                                                        },
                                                        "icon": {
                                                          "type": "string",
                                                          "format": null
                                                        }
                                                      },
                                                      "required": [
                                                        "name",
                                                        "icon"
                                                      ],
                                                      "additionalProperties": false,
                                                      "title": "categorie"
                                                    }
                                                  },
                                                  "informationMessage": {
                                                    "type": "string",
                                                    "format": null
                                                  },
                                                  "titleLevel": {
                                                    "type": "number"
                                                  }
                                                },
                                                "required": [
                                                  "notifications",
                                                  "categories",
                                                  "informationMessage"
                                                ],
                                                "additionalProperties": false
                                              }
                                            },
                                            "required": [
                                              "id",
                                              "type",
                                              "instruction",
                                              "tagName"
                                            ],
                                            "additionalProperties": false,
                                            "title": "phishing-notification"
                                          },
                                          {
                                            "type": "object",
                                            "properties": {
                                              "id": {
                                                "type": "string",
                                                "format": "uuid"
                                              },
                                              "type": {
                                                "type": "string",
                                                "format": null,
                                                "enum": [
                                                  "custom"
                                                ]
                                              },
                                              "instruction": {
                                                "type": "string",
                                                "format": "jodit"
                                              },
                                              "tagName": {
                                                "type": "string",
                                                "format": null,
                                                "enum": [
                                                  "pix-anonymisation"
                                                ]
                                              },
                                              "props": {
                                                "type": "object",
                                                "properties": {
                                                  "titleLevel": {
                                                    "type": "number"
                                                  },
                                                  "steps": {
                                                    "type": "array",
                                                    "items": {
                                                      "type": "object",
                                                      "properties": {
                                                        "fullSentence": {
                                                          "type": "array",
                                                          "items": {
                                                            "type": "object",
                                                            "properties": {
                                                              "content": {
                                                                "type": "string",
                                                                "format": null
                                                              },
                                                              "isAnonymizable": {
                                                                "type": "boolean"
                                                              }
                                                            },
                                                            "required": [
                                                              "content"
                                                            ],
                                                            "additionalProperties": false,
                                                            "title": "fullSentence"
                                                          }
                                                        },
                                                        "rephrase": {
                                                          "type": "string",
                                                          "format": null
                                                        },
                                                        "feedback": {
                                                          "type": "string",
                                                          "format": null
                                                        }
                                                      },
                                                      "required": [
                                                        "rephrase",
                                                        "feedback"
                                                      ],
                                                      "additionalProperties": false,
                                                      "title": "step"
                                                    }
                                                  }
                                                },
                                                "additionalProperties": false
                                              }
                                            },
                                            "required": [
                                              "id",
                                              "type",
                                              "instruction",
                                              "tagName"
                                            ],
                                            "additionalProperties": false,
                                            "title": "pix-anonymisation"
                                          },
                                          {
                                            "type": "object",
                                            "properties": {
                                              "id": {
                                                "type": "string",
                                                "format": "uuid"
                                              },
                                              "type": {
                                                "type": "string",
                                                "format": null,
                                                "enum": [
                                                  "custom"
                                                ]
                                              },
                                              "instruction": {
                                                "type": "string",
                                                "format": "jodit"
                                              },
                                              "tagName": {
                                                "type": "string",
                                                "format": null,
                                                "enum": [
                                                  "pix-article"
                                                ]
                                              },
                                              "props": {
                                                "type": "object",
                                                "properties": {
                                                  "titleLevel": {
                                                    "type": "number"
                                                  },
                                                  "title": {
                                                    "type": "string",
                                                    "format": null
                                                  },
                                                  "author": {
                                                    "type": "string",
                                                    "format": null
                                                  },
                                                  "date": {
                                                    "type": "string",
                                                    "format": null
                                                  },
                                                  "paragraphs": {
                                                    "type": "array",
                                                    "items": {
                                                      "type": "string",
                                                      "format": null,
                                                      "title": "paragraph"
                                                    }
                                                  },
                                                  "highlightedSentence": {
                                                    "type": "string",
                                                    "format": null
                                                  },
                                                  "colorOfHighlightSentence": {
                                                    "type": "string",
                                                    "format": null
                                                  }
                                                },
                                                "required": [
                                                  "title",
                                                  "author",
                                                  "date"
                                                ],
                                                "additionalProperties": false
                                              }
                                            },
                                            "required": [
                                              "id",
                                              "type",
                                              "instruction",
                                              "tagName"
                                            ],
                                            "additionalProperties": false,
                                            "title": "pix-article"
                                          },
                                          {
                                            "type": "object",
                                            "properties": {
                                              "id": {
                                                "type": "string",
                                                "format": "uuid"
                                              },
                                              "type": {
                                                "type": "string",
                                                "format": null,
                                                "enum": [
                                                  "custom"
                                                ]
                                              },
                                              "instruction": {
                                                "type": "string",
                                                "format": "jodit"
                                              },
                                              "tagName": {
                                                "type": "string",
                                                "format": null,
                                                "enum": [
                                                  "pix-carousel"
                                                ]
                                              },
                                              "props": {
                                                "type": "object",
                                                "properties": {
                                                  "type": {
                                                    "type": "string",
                                                    "format": null,
                                                    "enum": [
                                                      "image",
                                                      "image-text",
                                                      "text"
                                                    ]
                                                  },
                                                  "slides": {
                                                    "oneOf": [
                                                      {
                                                        "type": "array",
                                                        "items": {
                                                          "type": "object",
                                                          "properties": {
                                                            "title": {
                                                              "type": "string",
                                                              "format": null
                                                            },
                                                            "description": {
                                                              "type": "string",
                                                              "format": null
                                                            },
                                                            "displayWidth": {
                                                              "type": "number",
                                                              "minimum": 0
                                                            },
                                                            "image": {
                                                              "type": "object",
                                                              "properties": {
                                                                "src": {
                                                                  "type": "string",
                                                                  "format": null
                                                                },
                                                                "alt": {
                                                                  "type": "string",
                                                                  "format": null
                                                                }
                                                              },
                                                              "required": [
                                                                "src",
                                                                "alt"
                                                              ],
                                                              "additionalProperties": false
                                                            },
                                                            "license": {
                                                              "type": "object",
                                                              "properties": {
                                                                "name": {
                                                                  "type": "string",
                                                                  "format": null
                                                                },
                                                                "attribution": {
                                                                  "type": "string",
                                                                  "format": null
                                                                },
                                                                "url": {
                                                                  "type": "string",
                                                                  "format": null
                                                                }
                                                              },
                                                              "required": [
                                                                "name",
                                                                "attribution",
                                                                "url"
                                                              ],
                                                              "additionalProperties": false
                                                            }
                                                          },
                                                          "required": [
                                                            "title",
                                                            "description",
                                                            "image"
                                                          ],
                                                          "additionalProperties": false
                                                        },
                                                        "title": "image"
                                                      },
                                                      {
                                                        "type": "array",
                                                        "items": {
                                                          "type": "object",
                                                          "properties": {
                                                            "title": {
                                                              "type": "string",
                                                              "format": null
                                                            },
                                                            "description": {
                                                              "type": "string",
                                                              "format": null
                                                            },
                                                            "text": {
                                                              "type": "string",
                                                              "format": null
                                                            },
                                                            "image": {
                                                              "type": "object",
                                                              "properties": {
                                                                "src": {
                                                                  "type": "string",
                                                                  "format": null
                                                                },
                                                                "alt": {
                                                                  "type": "string",
                                                                  "format": null
                                                                }
                                                              },
                                                              "required": [
                                                                "src",
                                                                "alt"
                                                              ],
                                                              "additionalProperties": false
                                                            }
                                                          },
                                                          "required": [
                                                            "title",
                                                            "description",
                                                            "text",
                                                            "image"
                                                          ],
                                                          "additionalProperties": false
                                                        },
                                                        "title": "image-text"
                                                      },
                                                      {
                                                        "type": "array",
                                                        "items": {
                                                          "type": "object",
                                                          "properties": {
                                                            "title": {
                                                              "type": "string",
                                                              "format": null
                                                            },
                                                            "description": {
                                                              "type": "string",
                                                              "format": null
                                                            },
                                                            "text": {
                                                              "type": "string",
                                                              "format": null
                                                            }
                                                          },
                                                          "required": [
                                                            "title",
                                                            "description",
                                                            "text"
                                                          ],
                                                          "additionalProperties": false
                                                        },
                                                        "title": "text"
                                                      }
                                                    ]
                                                  },
                                                  "randomSlides": {
                                                    "type": "boolean"
                                                  },
                                                  "titleLevel": {
                                                    "type": "integer"
                                                  },
                                                  "disableAnimation": {
                                                    "type": "boolean"
                                                  },
                                                  "disableStyleAroundImage": {
                                                    "type": "boolean"
                                                  },
                                                  "enableLoop": {
                                                    "type": "boolean"
                                                  },
                                                  "imageTextDisplay": {
                                                    "type": "string",
                                                    "format": null
                                                  }
                                                },
                                                "required": [
                                                  "type",
                                                  "slides"
                                                ],
                                                "additionalProperties": false
                                              }
                                            },
                                            "required": [
                                              "id",
                                              "type",
                                              "instruction",
                                              "tagName",
                                              "props"
                                            ],
                                            "additionalProperties": false,
                                            "title": "pix-carousel"
                                          },
                                          {
                                            "type": "object",
                                            "properties": {
                                              "id": {
                                                "type": "string",
                                                "format": "uuid"
                                              },
                                              "type": {
                                                "type": "string",
                                                "format": null,
                                                "enum": [
                                                  "custom"
                                                ]
                                              },
                                              "instruction": {
                                                "type": "string",
                                                "format": "jodit"
                                              },
                                              "tagName": {
                                                "type": "string",
                                                "format": null,
                                                "enum": [
                                                  "pix-cursor"
                                                ]
                                              },
                                              "props": {
                                                "type": "object",
                                                "properties": {
                                                  "options": {
                                                    "type": "array",
                                                    "items": {
                                                      "type": "object",
                                                      "properties": {
                                                        "label": {
                                                          "type": "string",
                                                          "format": null
                                                        },
                                                        "feedback": {
                                                          "type": "object",
                                                          "properties": {
                                                            "type": {
                                                              "type": "string",
                                                              "format": null,
                                                              "enum": [
                                                                "bad",
                                                                "neutral",
                                                                "close",
                                                                "good"
                                                              ]
                                                            },
                                                            "text": {
                                                              "type": "string",
                                                              "format": null
                                                            }
                                                          },
                                                          "required": [
                                                            "type",
                                                            "text"
                                                          ],
                                                          "additionalProperties": false
                                                        }
                                                      },
                                                      "required": [
                                                        "label",
                                                        "feedback"
                                                      ],
                                                      "additionalProperties": false,
                                                      "title": "option"
                                                    }
                                                  }
                                                },
                                                "required": [
                                                  "options"
                                                ],
                                                "additionalProperties": false
                                              }
                                            },
                                            "required": [
                                              "id",
                                              "type",
                                              "instruction",
                                              "tagName"
                                            ],
                                            "additionalProperties": false,
                                            "title": "pix-cursor"
                                          },
                                          {
                                            "type": "object",
                                            "properties": {
                                              "id": {
                                                "type": "string",
                                                "format": "uuid"
                                              },
                                              "type": {
                                                "type": "string",
                                                "format": null,
                                                "enum": [
                                                  "custom"
                                                ]
                                              },
                                              "instruction": {
                                                "type": "string",
                                                "format": "jodit"
                                              },
                                              "tagName": {
                                                "type": "string",
                                                "format": null,
                                                "enum": [
                                                  "llm-compare-messages"
                                                ]
                                              },
                                              "props": {
                                                "type": "object",
                                                "properties": {
                                                  "conversation1": {
                                                    "type": "object",
                                                    "properties": {
                                                      "title": {
                                                        "type": "string",
                                                        "format": null
                                                      },
                                                      "llmName": {
                                                        "type": "string",
                                                        "format": null
                                                      }
                                                    },
                                                    "required": [
                                                      "title",
                                                      "llmName"
                                                    ],
                                                    "additionalProperties": false
                                                  },
                                                  "conversation2": {
                                                    "type": "object",
                                                    "properties": {
                                                      "title": {
                                                        "type": "string",
                                                        "format": null
                                                      },
                                                      "llmName": {
                                                        "type": "string",
                                                        "format": null
                                                      }
                                                    },
                                                    "required": [
                                                      "title",
                                                      "llmName"
                                                    ],
                                                    "additionalProperties": false
                                                  },
                                                  "userName": {
                                                    "type": "string",
                                                    "format": null
                                                  },
                                                  "messages": {
                                                    "type": "array",
                                                    "items": {
                                                      "oneOf": [
                                                        {
                                                          "type": "object",
                                                          "properties": {
                                                            "direction": {
                                                              "type": "string",
                                                              "format": null,
                                                              "enum": [
                                                                "outbound"
                                                              ]
                                                            },
                                                            "content": {
                                                              "type": "string",
                                                              "format": null
                                                            }
                                                          },
                                                          "required": [
                                                            "direction",
                                                            "content"
                                                          ],
                                                          "additionalProperties": false
                                                        },
                                                        {
                                                          "type": "array",
                                                          "minItems": 2,
                                                          "items": {
                                                            "type": "object",
                                                            "properties": {
                                                              "direction": {
                                                                "type": "string",
                                                                "format": null,
                                                                "enum": [
                                                                  "inbound"
                                                                ]
                                                              },
                                                              "content": {
                                                                "type": "string",
                                                                "format": null
                                                              }
                                                            },
                                                            "required": [
                                                              "direction",
                                                              "content"
                                                            ],
                                                            "additionalProperties": false
                                                          }
                                                        }
                                                      ],
                                                      "title": "message"
                                                    }
                                                  }
                                                },
                                                "required": [
                                                  "conversation1",
                                                  "conversation2",
                                                  "userName",
                                                  "messages"
                                                ],
                                                "additionalProperties": false
                                              }
                                            },
                                            "required": [
                                              "id",
                                              "type",
                                              "instruction",
                                              "tagName",
                                              "props"
                                            ],
                                            "additionalProperties": false,
                                            "title": "llm-compare-messages"
                                          },
                                          {
                                            "type": "object",
                                            "properties": {
                                              "id": {
                                                "type": "string",
                                                "format": "uuid"
                                              },
                                              "type": {
                                                "type": "string",
                                                "format": null,
                                                "enum": [
                                                  "custom"
                                                ]
                                              },
                                              "instruction": {
                                                "type": "string",
                                                "format": "jodit"
                                              },
                                              "tagName": {
                                                "type": "string",
                                                "format": null,
                                                "enum": [
                                                  "llm-messages"
                                                ]
                                              },
                                              "props": {
                                                "type": "object",
                                                "properties": {
                                                  "messages": {
                                                    "type": "array",
                                                    "items": {
                                                      "type": "object",
                                                      "properties": {
                                                        "direction": {
                                                          "type": "string",
                                                          "format": null,
                                                          "enum": [
                                                            "inbound",
                                                            "outbound"
                                                          ]
                                                        },
                                                        "content": {
                                                          "type": "string",
                                                          "format": null
                                                        }
                                                      },
                                                      "required": [
                                                        "direction",
                                                        "content"
                                                      ],
                                                      "additionalProperties": false,
                                                      "title": "message"
                                                    }
                                                  }
                                                },
                                                "required": [
                                                  "messages"
                                                ],
                                                "additionalProperties": false
                                              }
                                            },
                                            "required": [
                                              "id",
                                              "type",
                                              "instruction",
                                              "tagName",
                                              "props"
                                            ],
                                            "additionalProperties": false,
                                            "title": "llm-messages"
                                          },
                                          {
                                            "type": "object",
                                            "properties": {
                                              "id": {
                                                "type": "string",
                                                "format": "uuid"
                                              },
                                              "type": {
                                                "type": "string",
                                                "format": null,
                                                "enum": [
                                                  "custom"
                                                ]
                                              },
                                              "instruction": {
                                                "type": "string",
                                                "format": "jodit"
                                              },
                                              "tagName": {
                                                "type": "string",
                                                "format": null,
                                                "enum": [
                                                  "llm-prompt-select"
                                                ]
                                              },
                                              "props": {
                                                "type": "object",
                                                "properties": {
                                                  "speed": {
                                                    "type": "number",
                                                    "minimum": 0
                                                  },
                                                  "messages": {
                                                    "type": "array",
                                                    "items": {
                                                      "type": "object",
                                                      "properties": {
                                                        "direction": {
                                                          "type": "string",
                                                          "format": null,
                                                          "enum": [
                                                            "inbound",
                                                            "outbound"
                                                          ]
                                                        },
                                                        "content": {
                                                          "type": "string",
                                                          "format": null
                                                        }
                                                      },
                                                      "required": [
                                                        "direction",
                                                        "content"
                                                      ],
                                                      "additionalProperties": false,
                                                      "title": "message"
                                                    }
                                                  },
                                                  "prompts": {
                                                    "type": "array",
                                                    "items": {
                                                      "type": "object",
                                                      "properties": {
                                                        "prompt": {
                                                          "type": "string",
                                                          "format": null
                                                        },
                                                        "response": {
                                                          "type": "string",
                                                          "format": null
                                                        }
                                                      },
                                                      "required": [
                                                        "prompt",
                                                        "response"
                                                      ],
                                                      "additionalProperties": false,
                                                      "title": "prompt"
                                                    }
                                                  }
                                                },
                                                "required": [
                                                  "messages",
                                                  "prompts"
                                                ],
                                                "additionalProperties": false
                                              }
                                            },
                                            "required": [
                                              "id",
                                              "type",
                                              "instruction",
                                              "tagName",
                                              "props"
                                            ],
                                            "additionalProperties": false,
                                            "title": "llm-prompt-select"
                                          },
                                          {
                                            "type": "object",
                                            "properties": {
                                              "id": {
                                                "type": "string",
                                                "format": "uuid"
                                              },
                                              "type": {
                                                "type": "string",
                                                "format": null,
                                                "enum": [
                                                  "custom"
                                                ]
                                              },
                                              "instruction": {
                                                "type": "string",
                                                "format": "jodit"
                                              },
                                              "tagName": {
                                                "type": "string",
                                                "format": null,
                                                "enum": [
                                                  "qcm-deepfake"
                                                ]
                                              },
                                              "props": {
                                                "type": "object",
                                                "properties": {
                                                  "titleLevel": {
                                                    "type": "number"
                                                  },
                                                  "successImage": {
                                                    "type": "string",
                                                    "format": null
                                                  },
                                                  "failImage": {
                                                    "type": "string",
                                                    "format": null
                                                  },
                                                  "infoImage": {
                                                    "type": "string",
                                                    "format": null
                                                  },
                                                  "searchImage": {
                                                    "type": "string",
                                                    "format": null
                                                  }
                                                },
                                                "required": [
                                                  "successImage",
                                                  "failImage",
                                                  "infoImage",
                                                  "searchImage"
                                                ],
                                                "additionalProperties": false
                                              }
                                            },
                                            "required": [
                                              "id",
                                              "type",
                                              "instruction",
                                              "tagName"
                                            ],
                                            "additionalProperties": false,
                                            "title": "qcm-deepfake"
                                          },
                                          {
                                            "type": "object",
                                            "properties": {
                                              "id": {
                                                "type": "string",
                                                "format": "uuid"
                                              },
                                              "type": {
                                                "type": "string",
                                                "format": null,
                                                "enum": [
                                                  "custom"
                                                ]
                                              },
                                              "instruction": {
                                                "type": "string",
                                                "format": "jodit"
                                              },
                                              "tagName": {
                                                "type": "string",
                                                "format": null,
                                                "enum": [
                                                  "quiz-stepper"
                                                ]
                                              },
                                              "props": {
                                                "type": "object",
                                                "properties": {
                                                  "titleLevel": {
                                                    "type": "number"
                                                  },
                                                  "steps": {
                                                    "type": "array",
                                                    "items": {
                                                      "type": "object",
                                                      "properties": {
                                                        "question": {
                                                          "type": "string",
                                                          "format": null
                                                        },
                                                        "feedback": {
                                                          "type": "object",
                                                          "properties": {
                                                            "success": {
                                                              "type": "string",
                                                              "format": null
                                                            },
                                                            "failed": {
                                                              "type": "string",
                                                              "format": null
                                                            }
                                                          },
                                                          "required": [
                                                            "success",
                                                            "failed"
                                                          ],
                                                          "additionalProperties": false
                                                        },
                                                        "choice1": {
                                                          "type": "object",
                                                          "properties": {
                                                            "title": {
                                                              "type": "string",
                                                              "format": null
                                                            },
                                                            "content": {
                                                              "type": "string",
                                                              "format": null
                                                            },
                                                            "isGoodAnswer": {
                                                              "type": "boolean"
                                                            }
                                                          },
                                                          "additionalProperties": false
                                                        },
                                                        "choice2": {
                                                          "type": "object",
                                                          "properties": {
                                                            "title": {
                                                              "type": "string",
                                                              "format": null
                                                            },
                                                            "content": {
                                                              "type": "string",
                                                              "format": null
                                                            },
                                                            "isGoodAnswer": {
                                                              "type": "boolean"
                                                            }
                                                          },
                                                          "additionalProperties": false
                                                        }
                                                      },
                                                      "required": [
                                                        "question",
                                                        "feedback",
                                                        "choice1",
                                                        "choice2"
                                                      ],
                                                      "additionalProperties": false,
                                                      "title": "step"
                                                    }
                                                  }
                                                },
                                                "additionalProperties": false
                                              }
                                            },
                                            "required": [
                                              "id",
                                              "type",
                                              "instruction",
                                              "tagName"
                                            ],
                                            "additionalProperties": false,
                                            "title": "quiz-stepper"
                                          },
                                          {
                                            "type": "object",
                                            "properties": {
                                              "id": {
                                                "type": "string",
                                                "format": "uuid"
                                              },
                                              "type": {
                                                "type": "string",
                                                "format": null,
                                                "enum": [
                                                  "custom"
                                                ]
                                              },
                                              "instruction": {
                                                "type": "string",
                                                "format": "jodit"
                                              },
                                              "tagName": {
                                                "type": "string",
                                                "format": null,
                                                "enum": [
                                                  "select-conversation"
                                                ]
                                              },
                                              "props": {
                                                "type": "object",
                                                "properties": {
                                                  "titleLevel": {
                                                    "type": "number"
                                                  },
                                                  "incomingMessage": {
                                                    "type": "object",
                                                    "properties": {
                                                      "username": {
                                                        "type": "string",
                                                        "format": null
                                                      },
                                                      "content": {
                                                        "type": "string",
                                                        "format": null
                                                      },
                                                      "time": {
                                                        "type": "object",
                                                        "properties": {
                                                          "days": {
                                                            "type": "number",
                                                            "maximum": -1
                                                          },
                                                          "minutes": {
                                                            "type": "number",
                                                            "maximum": -1
                                                          }
                                                        },
                                                        "additionalProperties": false
                                                      }
                                                    },
                                                    "required": [
                                                      "username",
                                                      "content",
                                                      "time"
                                                    ],
                                                    "additionalProperties": false
                                                  },
                                                  "username": {
                                                    "type": "string",
                                                    "format": null
                                                  },
                                                  "responseChoices": {
                                                    "type": "array",
                                                    "items": {
                                                      "type": "object",
                                                      "properties": {
                                                        "content": {
                                                          "type": "string",
                                                          "format": null
                                                        },
                                                        "goodIdea": {
                                                          "type": "boolean"
                                                        },
                                                        "feedback": {
                                                          "type": "string",
                                                          "format": null
                                                        }
                                                      },
                                                      "required": [
                                                        "content",
                                                        "goodIdea",
                                                        "feedback"
                                                      ],
                                                      "additionalProperties": false,
                                                      "title": "responseChoice"
                                                    }
                                                  }
                                                },
                                                "required": [
                                                  "incomingMessage",
                                                  "username",
                                                  "responseChoices"
                                                ],
                                                "additionalProperties": false
                                              }
                                            },
                                            "required": [
                                              "id",
                                              "type",
                                              "instruction",
                                              "tagName"
                                            ],
                                            "additionalProperties": false,
                                            "title": "select-conversation"
                                          },
                                          {
                                            "type": "object",
                                            "properties": {
                                              "id": {
                                                "type": "string",
                                                "format": "uuid"
                                              },
                                              "type": {
                                                "type": "string",
                                                "format": null,
                                                "enum": [
                                                  "custom"
                                                ]
                                              },
                                              "instruction": {
                                                "type": "string",
                                                "format": "jodit"
                                              },
                                              "tagName": {
                                                "type": "string",
                                                "format": null,
                                                "enum": [
                                                  "template-mail"
                                                ]
                                              },
                                              "props": {
                                                "type": "object",
                                                "properties": {
                                                  "titleLevel": {
                                                    "type": "number"
                                                  },
                                                  "subject": {
                                                    "type": "string",
                                                    "format": null
                                                  },
                                                  "mailAddress": {
                                                    "type": "string",
                                                    "format": null
                                                  },
                                                  "avatarColor": {
                                                    "type": "string",
                                                    "format": null
                                                  },
                                                  "expeditor": {
                                                    "type": "string",
                                                    "format": null
                                                  },
                                                  "content": {
                                                    "type": "string",
                                                    "format": null
                                                  },
                                                  "time": {
                                                    "type": "object",
                                                    "properties": {
                                                      "days": {
                                                        "type": "number",
                                                        "maximum": -1
                                                      },
                                                      "minutes": {
                                                        "type": "number",
                                                        "maximum": -1
                                                      }
                                                    },
                                                    "additionalProperties": false
                                                  },
                                                  "previousMail": {
                                                    "type": "object",
                                                    "properties": {
                                                      "name": {
                                                        "type": "string",
                                                        "format": null
                                                      },
                                                      "content": {
                                                        "type": "string",
                                                        "format": null
                                                      },
                                                      "time": {
                                                        "type": "object",
                                                        "properties": {
                                                          "days": {
                                                            "type": "number",
                                                            "maximum": -1
                                                          },
                                                          "minutes": {
                                                            "type": "number",
                                                            "maximum": -1
                                                          }
                                                        },
                                                        "additionalProperties": false
                                                      }
                                                    },
                                                    "required": [
                                                      "name",
                                                      "content",
                                                      "time"
                                                    ],
                                                    "additionalProperties": false
                                                  }
                                                },
                                                "required": [
                                                  "subject",
                                                  "mailAddress",
                                                  "expeditor",
                                                  "content",
                                                  "time"
                                                ],
                                                "additionalProperties": false
                                              }
                                            },
                                            "required": [
                                              "id",
                                              "type",
                                              "instruction",
                                              "tagName"
                                            ],
                                            "additionalProperties": false,
                                            "title": "template-mail"
                                          },
                                          {
                                            "type": "object",
                                            "properties": {
                                              "id": {
                                                "type": "string",
                                                "format": "uuid"
                                              },
                                              "type": {
                                                "type": "string",
                                                "format": null,
                                                "enum": [
                                                  "custom"
                                                ]
                                              },
                                              "instruction": {
                                                "type": "string",
                                                "format": "jodit"
                                              },
                                              "tagName": {
                                                "type": "string",
                                                "format": null,
                                                "enum": [
                                                  "test-top-mdp"
                                                ]
                                              },
                                              "props": {
                                                "type": "object",
                                                "properties": {
                                                  "titleLevel": {
                                                    "type": "number"
                                                  },
                                                  "passwords": {
                                                    "type": "array",
                                                    "items": {
                                                      "type": "string",
                                                      "format": null,
                                                      "title": "password"
                                                    }
                                                  },
                                                  "expectedPassword": {
                                                    "type": "string",
                                                    "format": null
                                                  }
                                                },
                                                "required": [
                                                  "passwords",
                                                  "expectedPassword"
                                                ],
                                                "additionalProperties": false
                                              }
                                            },
                                            "required": [
                                              "id",
                                              "type",
                                              "instruction",
                                              "tagName"
                                            ],
                                            "additionalProperties": false,
                                            "title": "test-top-mdp"
                                          }
                                        ],
                                        "title": "custom"
                                      },
                                      {
                                        "type": "object",
                                        "properties": {
                                          "id": {
                                            "type": "string",
                                            "format": "uuid"
                                          },
                                          "type": {
                                            "type": "string",
                                            "format": null,
                                            "enum": [
                                              "custom-draft"
                                            ]
                                          },
                                          "title": {
                                            "type": "string",
                                            "format": null
                                          },
                                          "url": {
                                            "type": "string",
                                            "format": "uri"
                                          },
                                          "instruction": {
                                            "type": "string",
                                            "format": "jodit"
                                          },
                                          "height": {
                                            "type": "integer",
                                            "minimum": 0,
                                            "maximum": 550
                                          }
                                        },
                                        "required": [
                                          "id",
                                          "type",
                                          "title",
                                          "url",
                                          "instruction",
                                          "height"
                                        ],
                                        "additionalProperties": false,
                                        "title": "custom-draft"
                                      },
                                      {
                                        "type": "object",
                                        "properties": {
                                          "id": {
                                            "type": "string",
                                            "format": "uuid"
                                          },
                                          "type": {
                                            "type": "string",
                                            "format": null,
                                            "enum": [
                                              "download"
                                            ]
                                          },
                                          "files": {
                                            "type": "array",
                                            "items": {
                                              "type": "object",
                                              "properties": {
                                                "url": {
                                                  "type": "string",
                                                  "format": "uri"
                                                },
                                                "format": {
                                                  "type": "string",
                                                  "format": null
                                                }
                                              },
                                              "required": [
                                                "url",
                                                "format"
                                              ],
                                              "additionalProperties": false,
                                              "title": "file"
                                            }
                                          }
                                        },
                                        "required": [
                                          "id",
                                          "type",
                                          "files"
                                        ],
                                        "additionalProperties": false,
                                        "title": "download"
                                      },
                                      {
                                        "type": "object",
                                        "properties": {
                                          "id": {
                                            "type": "string",
                                            "format": "uuid"
                                          },
                                          "type": {
                                            "type": "string",
                                            "format": null,
                                            "enum": [
                                              "embed"
                                            ]
                                          },
                                          "isCompletionRequired": {
                                            "type": "boolean"
                                          },
                                          "title": {
                                            "type": "string",
                                            "format": null
                                          },
                                          "url": {
                                            "type": "string",
                                            "format": "uri"
                                          },
                                          "instruction": {
                                            "type": "string",
                                            "format": "jodit"
                                          },
                                          "solution": {
                                            "type": "string",
                                            "format": null
                                          },
                                          "height": {
                                            "type": "number",
                                            "minimum": 0
                                          }
                                        },
                                        "required": [
                                          "id",
                                          "type",
                                          "isCompletionRequired",
                                          "title",
                                          "url",
                                          "height"
                                        ],
                                        "additionalProperties": false,
                                        "title": "embed"
                                      },
                                      {
                                        "type": "object",
                                        "properties": {
                                          "id": {
                                            "type": "string",
                                            "format": "uuid"
                                          },
                                          "type": {
                                            "type": "string",
                                            "format": null,
                                            "enum": [
                                              "expand"
                                            ]
                                          },
                                          "title": {
                                            "type": "string",
                                            "format": null
                                          },
                                          "content": {
                                            "type": "string",
                                            "format": "jodit"
                                          }
                                        },
                                        "required": [
                                          "id",
                                          "type",
                                          "title",
                                          "content"
                                        ],
                                        "additionalProperties": false,
                                        "title": "expand"
                                      },
                                      {
                                        "type": "object",
                                        "properties": {
                                          "id": {
                                            "type": "string",
                                            "format": "uuid"
                                          },
                                          "type": {
                                            "type": "string",
                                            "format": null,
                                            "enum": [
                                              "image"
                                            ]
                                          },
                                          "url": {
                                            "type": "string",
                                            "format": "uri"
                                          },
                                          "alt": {
                                            "type": "string",
                                            "format": null
                                          },
                                          "alternativeText": {
                                            "type": "string",
                                            "format": "jodit"
                                          },
                                          "legend": {
                                            "type": "string",
                                            "format": null
                                          },
                                          "licence": {
                                            "type": "string",
                                            "format": null
                                          }
                                        },
                                        "required": [
                                          "id",
                                          "type",
                                          "url",
                                          "alt"
                                        ],
                                        "additionalProperties": false,
                                        "title": "image"
                                      },
                                      {
                                        "type": "object",
                                        "properties": {
                                          "id": {
                                            "type": "string",
                                            "format": "uuid"
                                          },
                                          "type": {
                                            "type": "string",
                                            "format": null,
                                            "enum": [
                                              "qcu"
                                            ]
                                          },
                                          "instruction": {
                                            "type": "string",
                                            "format": "jodit"
                                          },
                                          "hasShortProposals": {
                                            "type": "boolean"
                                          },
                                          "proposals": {
                                            "type": "array",
                                            "items": {
                                              "type": "object",
                                              "properties": {
                                                "id": {
                                                  "type": "string",
                                                  "format": null,
                                                  "pattern": "^[0-9]+$"
                                                },
                                                "content": {
                                                  "type": "string",
                                                  "format": "jodit"
                                                },
                                                "feedback": {
                                                  "type": "object",
                                                  "properties": {
                                                    "state": {
                                                      "type": "string",
                                                      "format": "jodit"
                                                    },
                                                    "diagnosis": {
                                                      "type": "string",
                                                      "format": "jodit"
                                                    }
                                                  },
                                                  "required": [
                                                    "state",
                                                    "diagnosis"
                                                  ],
                                                  "additionalProperties": false
                                                }
                                              },
                                              "required": [
                                                "id",
                                                "content",
                                                "feedback"
                                              ],
                                              "additionalProperties": false,
                                              "title": "proposal"
                                            }
                                          },
                                          "solution": {
                                            "type": "string",
                                            "format": null,
                                            "pattern": "^[0-9]+$"
                                          }
                                        },
                                        "required": [
                                          "id",
                                          "type",
                                          "instruction",
                                          "hasShortProposals",
                                          "proposals",
                                          "solution"
                                        ],
                                        "additionalProperties": false,
                                        "title": "qcu",
                                        "if": {
                                          "properties": {
                                            "hasShortProposals": {
                                              "const": true
                                            }
                                          }
                                        },
                                        "then": {
                                          "properties": {
                                            "id": {
                                              "type": "string",
                                              "format": "uuid"
                                            },
                                            "type": {
                                              "type": "string",
                                              "format": null,
                                              "enum": [
                                                "qcu"
                                              ]
                                            },
                                            "instruction": {
                                              "type": "string",
                                              "format": "jodit"
                                            },
                                            "hasShortProposals": {
                                              "type": "boolean"
                                            },
                                            "proposals": {
                                              "type": "array",
                                              "items": {
                                                "type": "object",
                                                "properties": {
                                                  "id": {
                                                    "type": "string",
                                                    "format": null,
                                                    "pattern": "^[0-9]+$"
                                                  },
                                                  "content": {
                                                    "type": "string",
                                                    "format": null,
                                                    "maxLength": 20
                                                  },
                                                  "feedback": {
                                                    "type": "object",
                                                    "properties": {
                                                      "state": {
                                                        "type": "string",
                                                        "format": "jodit"
                                                      },
                                                      "diagnosis": {
                                                        "type": "string",
                                                        "format": "jodit"
                                                      }
                                                    },
                                                    "required": [
                                                      "state",
                                                      "diagnosis"
                                                    ],
                                                    "additionalProperties": false
                                                  }
                                                },
                                                "required": [
                                                  "id",
                                                  "content",
                                                  "feedback"
                                                ],
                                                "additionalProperties": false,
                                                "title": "proposal"
                                              }
                                            },
                                            "solution": {
                                              "type": "string",
                                              "format": null,
                                              "pattern": "^[0-9]+$"
                                            }
                                          }
                                        }
                                      },
                                      {
                                        "type": "object",
                                        "properties": {
                                          "id": {
                                            "type": "string",
                                            "format": "uuid"
                                          },
                                          "type": {
                                            "type": "string",
                                            "format": null,
                                            "enum": [
                                              "qcu-declarative"
                                            ]
                                          },
                                          "instruction": {
                                            "type": "string",
                                            "format": "jodit"
                                          },
                                          "hasShortProposals": {
                                            "type": "boolean"
                                          },
                                          "proposals": {
                                            "type": "array",
                                            "items": {
                                              "type": "object",
                                              "properties": {
                                                "id": {
                                                  "type": "string",
                                                  "format": null,
                                                  "pattern": "^[0-9]+$"
                                                },
                                                "content": {
                                                  "type": "string",
                                                  "format": "jodit"
                                                },
                                                "feedback": {
                                                  "type": "object",
                                                  "properties": {
                                                    "diagnosis": {
                                                      "type": "string",
                                                      "format": "jodit"
                                                    }
                                                  },
                                                  "required": [
                                                    "diagnosis"
                                                  ],
                                                  "additionalProperties": false
                                                }
                                              },
                                              "required": [
                                                "id",
                                                "content",
                                                "feedback"
                                              ],
                                              "additionalProperties": false,
                                              "title": "proposal"
                                            }
                                          }
                                        },
                                        "required": [
                                          "id",
                                          "type",
                                          "instruction",
                                          "hasShortProposals",
                                          "proposals"
                                        ],
                                        "additionalProperties": false,
                                        "title": "qcu-declarative",
                                        "if": {
                                          "properties": {
                                            "hasShortProposals": {
                                              "const": true
                                            }
                                          }
                                        },
                                        "then": {
                                          "properties": {
                                            "id": {
                                              "type": "string",
                                              "format": "uuid"
                                            },
                                            "type": {
                                              "type": "string",
                                              "format": null,
                                              "enum": [
                                                "qcu-declarative"
                                              ]
                                            },
                                            "instruction": {
                                              "type": "string",
                                              "format": "jodit"
                                            },
                                            "hasShortProposals": {
                                              "type": "boolean"
                                            },
                                            "proposals": {
                                              "type": "array",
                                              "items": {
                                                "type": "object",
                                                "properties": {
                                                  "id": {
                                                    "type": "string",
                                                    "format": null,
                                                    "pattern": "^[0-9]+$"
                                                  },
                                                  "content": {
                                                    "type": "string",
                                                    "format": null,
                                                    "maxLength": 20
                                                  },
                                                  "feedback": {
                                                    "type": "object",
                                                    "properties": {
                                                      "diagnosis": {
                                                        "type": "string",
                                                        "format": "jodit"
                                                      }
                                                    },
                                                    "required": [
                                                      "diagnosis"
                                                    ],
                                                    "additionalProperties": false
                                                  }
                                                },
                                                "required": [
                                                  "id",
                                                  "content",
                                                  "feedback"
                                                ],
                                                "additionalProperties": false,
                                                "title": "proposal"
                                              }
                                            }
                                          }
                                        }
                                      },
                                      {
                                        "type": "object",
                                        "properties": {
                                          "id": {
                                            "type": "string",
                                            "format": "uuid"
                                          },
                                          "type": {
                                            "type": "string",
                                            "format": null,
                                            "enum": [
                                              "qcu-discovery"
                                            ]
                                          },
                                          "instruction": {
                                            "type": "string",
                                            "format": "jodit"
                                          },
                                          "hasShortProposals": {
                                            "type": "boolean"
                                          },
                                          "proposals": {
                                            "type": "array",
                                            "items": {
                                              "type": "object",
                                              "properties": {
                                                "id": {
                                                  "type": "string",
                                                  "format": null,
                                                  "pattern": "^[0-9]+$"
                                                },
                                                "content": {
                                                  "type": "string",
                                                  "format": "jodit"
                                                },
                                                "feedback": {
                                                  "type": "object",
                                                  "properties": {
                                                    "diagnosis": {
                                                      "type": "string",
                                                      "format": "jodit"
                                                    }
                                                  },
                                                  "required": [
                                                    "diagnosis"
                                                  ],
                                                  "additionalProperties": false
                                                }
                                              },
                                              "required": [
                                                "id",
                                                "content",
                                                "feedback"
                                              ],
                                              "additionalProperties": false,
                                              "title": "proposal"
                                            }
                                          },
                                          "solution": {
                                            "type": "string",
                                            "format": null,
                                            "pattern": "^[0-9]+$"
                                          }
                                        },
                                        "required": [
                                          "id",
                                          "type",
                                          "instruction",
                                          "hasShortProposals",
                                          "proposals",
                                          "solution"
                                        ],
                                        "additionalProperties": false,
                                        "title": "qcu-discovery",
                                        "if": {
                                          "properties": {
                                            "hasShortProposals": {
                                              "const": true
                                            }
                                          }
                                        },
                                        "then": {
                                          "properties": {
                                            "id": {
                                              "type": "string",
                                              "format": "uuid"
                                            },
                                            "type": {
                                              "type": "string",
                                              "format": null,
                                              "enum": [
                                                "qcu-discovery"
                                              ]
                                            },
                                            "instruction": {
                                              "type": "string",
                                              "format": "jodit"
                                            },
                                            "hasShortProposals": {
                                              "type": "boolean"
                                            },
                                            "proposals": {
                                              "type": "array",
                                              "items": {
                                                "type": "object",
                                                "properties": {
                                                  "id": {
                                                    "type": "string",
                                                    "format": null,
                                                    "pattern": "^[0-9]+$"
                                                  },
                                                  "content": {
                                                    "type": "string",
                                                    "format": null,
                                                    "maxLength": 20
                                                  },
                                                  "feedback": {
                                                    "type": "object",
                                                    "properties": {
                                                      "diagnosis": {
                                                        "type": "string",
                                                        "format": "jodit"
                                                      }
                                                    },
                                                    "required": [
                                                      "diagnosis"
                                                    ],
                                                    "additionalProperties": false
                                                  }
                                                },
                                                "required": [
                                                  "id",
                                                  "content",
                                                  "feedback"
                                                ],
                                                "additionalProperties": false,
                                                "title": "proposal"
                                              }
                                            },
                                            "solution": {
                                              "type": "string",
                                              "format": null,
                                              "pattern": "^[0-9]+$"
                                            }
                                          }
                                        }
                                      },
                                      {
                                        "type": "object",
                                        "properties": {
                                          "id": {
                                            "type": "string",
                                            "format": "uuid"
                                          },
                                          "type": {
                                            "type": "string",
                                            "format": null,
                                            "enum": [
                                              "qcm"
                                            ]
                                          },
                                          "instruction": {
                                            "type": "string",
                                            "format": "jodit"
                                          },
                                          "hasShortProposals": {
                                            "type": "boolean"
                                          },
                                          "proposals": {
                                            "type": "array",
                                            "minItems": 3,
                                            "items": {
                                              "type": "object",
                                              "properties": {
                                                "id": {
                                                  "type": "string",
                                                  "format": null,
                                                  "pattern": "^[0-9]+$"
                                                },
                                                "content": {
                                                  "type": "string",
                                                  "format": "jodit"
                                                }
                                              },
                                              "required": [
                                                "id",
                                                "content"
                                              ],
                                              "additionalProperties": false,
                                              "title": "proposal"
                                            }
                                          },
                                          "feedbacks": {
                                            "type": "object",
                                            "properties": {
                                              "valid": {
                                                "type": "object",
                                                "properties": {
                                                  "state": {
                                                    "type": "string",
                                                    "format": "jodit"
                                                  },
                                                  "diagnosis": {
                                                    "type": "string",
                                                    "format": "jodit"
                                                  }
                                                },
                                                "required": [
                                                  "state",
                                                  "diagnosis"
                                                ],
                                                "additionalProperties": false
                                              },
                                              "invalid": {
                                                "type": "object",
                                                "properties": {
                                                  "state": {
                                                    "type": "string",
                                                    "format": "jodit"
                                                  },
                                                  "diagnosis": {
                                                    "type": "string",
                                                    "format": "jodit"
                                                  }
                                                },
                                                "required": [
                                                  "state",
                                                  "diagnosis"
                                                ],
                                                "additionalProperties": false
                                              }
                                            },
                                            "additionalProperties": false
                                          },
                                          "solutions": {
                                            "type": "array",
                                            "minItems": 2,
                                            "items": {
                                              "type": "string",
                                              "format": null,
                                              "pattern": "^[0-9]+$",
                                              "title": "solution"
                                            }
                                          }
                                        },
                                        "required": [
                                          "id",
                                          "type",
                                          "instruction",
                                          "hasShortProposals",
                                          "proposals",
                                          "feedbacks",
                                          "solutions"
                                        ],
                                        "additionalProperties": false,
                                        "title": "qcm",
                                        "if": {
                                          "properties": {
                                            "hasShortProposals": {
                                              "const": true
                                            }
                                          }
                                        },
                                        "then": {
                                          "properties": {
                                            "id": {
                                              "type": "string",
                                              "format": "uuid"
                                            },
                                            "type": {
                                              "type": "string",
                                              "format": null,
                                              "enum": [
                                                "qcm"
                                              ]
                                            },
                                            "instruction": {
                                              "type": "string",
                                              "format": "jodit"
                                            },
                                            "hasShortProposals": {
                                              "type": "boolean"
                                            },
                                            "proposals": {
                                              "type": "array",
                                              "minItems": 3,
                                              "items": {
                                                "type": "object",
                                                "properties": {
                                                  "id": {
                                                    "type": "string",
                                                    "format": null,
                                                    "pattern": "^[0-9]+$"
                                                  },
                                                  "content": {
                                                    "type": "string",
                                                    "format": null,
                                                    "maxLength": 20
                                                  }
                                                },
                                                "required": [
                                                  "id",
                                                  "content"
                                                ],
                                                "additionalProperties": false,
                                                "title": "proposal"
                                              }
                                            },
                                            "feedbacks": {
                                              "type": "object",
                                              "properties": {
                                                "valid": {
                                                  "type": "object",
                                                  "properties": {
                                                    "state": {
                                                      "type": "string",
                                                      "format": "jodit"
                                                    },
                                                    "diagnosis": {
                                                      "type": "string",
                                                      "format": "jodit"
                                                    }
                                                  },
                                                  "required": [
                                                    "state",
                                                    "diagnosis"
                                                  ],
                                                  "additionalProperties": false
                                                },
                                                "invalid": {
                                                  "type": "object",
                                                  "properties": {
                                                    "state": {
                                                      "type": "string",
                                                      "format": "jodit"
                                                    },
                                                    "diagnosis": {
                                                      "type": "string",
                                                      "format": "jodit"
                                                    }
                                                  },
                                                  "required": [
                                                    "state",
                                                    "diagnosis"
                                                  ],
                                                  "additionalProperties": false
                                                }
                                              },
                                              "additionalProperties": false
                                            },
                                            "solutions": {
                                              "type": "array",
                                              "minItems": 2,
                                              "items": {
                                                "type": "string",
                                                "format": null,
                                                "pattern": "^[0-9]+$",
                                                "title": "solution"
                                              }
                                            }
                                          }
                                        }
                                      },
                                      {
                                        "type": "object",
                                        "properties": {
                                          "id": {
                                            "type": "string",
                                            "format": "uuid"
                                          },
                                          "type": {
                                            "type": "string",
                                            "format": null,
                                            "enum": [
                                              "qrocm"
                                            ]
                                          },
                                          "instruction": {
                                            "type": "string",
                                            "format": "jodit"
                                          },
                                          "proposals": {
                                            "type": "array",
                                            "items": {
                                              "oneOf": [
                                                {
                                                  "type": "object",
                                                  "properties": {
                                                    "type": {
                                                      "type": "string",
                                                      "format": null,
                                                      "enum": [
                                                        "text"
                                                      ]
                                                    },
                                                    "content": {
                                                      "type": "string",
                                                      "format": "jodit"
                                                    }
                                                  },
                                                  "required": [
                                                    "type"
                                                  ],
                                                  "additionalProperties": false,
                                                  "title": "text"
                                                },
                                                {
                                                  "type": "object",
                                                  "properties": {
                                                    "input": {
                                                      "type": "string",
                                                      "format": null
                                                    },
                                                    "type": {
                                                      "type": "string",
                                                      "format": null,
                                                      "enum": [
                                                        "input"
                                                      ]
                                                    },
                                                    "inputType": {
                                                      "type": "string",
                                                      "format": null,
                                                      "enum": [
                                                        "text",
                                                        "number"
                                                      ]
                                                    },
                                                    "size": {
                                                      "type": "number",
                                                      "minimum": 1
                                                    },
                                                    "display": {
                                                      "type": "string",
                                                      "format": null,
                                                      "enum": [
                                                        "inline",
                                                        "block"
                                                      ]
                                                    },
                                                    "placeholder": {
                                                      "type": "string",
                                                      "format": null
                                                    },
                                                    "ariaLabel": {
                                                      "type": "string",
                                                      "format": null
                                                    },
                                                    "tolerances": {
                                                      "type": "array",
                                                      "uniqueItems": true,
                                                      "items": {
                                                        "type": "string",
                                                        "format": null,
                                                        "enum": [
                                                          "t1",
                                                          "t2",
                                                          "t3"
                                                        ],
                                                        "title": "tolerance"
                                                      }
                                                    },
                                                    "solutions": {
                                                      "type": "array",
                                                      "items": {
                                                        "oneOf": [
                                                          {
                                                            "type": "string",
                                                            "format": null,
                                                            "minLength": 1
                                                          },
                                                          {
                                                            "type": "number",
                                                            "minimum": 1
                                                          }
                                                        ],
                                                        "title": "solution"
                                                      }
                                                    }
                                                  },
                                                  "required": [
                                                    "input",
                                                    "type",
                                                    "inputType",
                                                    "size",
                                                    "display",
                                                    "placeholder",
                                                    "ariaLabel",
                                                    "tolerances",
                                                    "solutions"
                                                  ],
                                                  "additionalProperties": false,
                                                  "title": "input"
                                                },
                                                {
                                                  "type": "object",
                                                  "properties": {
                                                    "input": {
                                                      "type": "string",
                                                      "format": null
                                                    },
                                                    "type": {
                                                      "type": "string",
                                                      "format": null,
                                                      "enum": [
                                                        "select"
                                                      ]
                                                    },
                                                    "display": {
                                                      "type": "string",
                                                      "format": null,
                                                      "enum": [
                                                        "inline",
                                                        "block"
                                                      ]
                                                    },
                                                    "placeholder": {
                                                      "type": "string",
                                                      "format": null
                                                    },
                                                    "ariaLabel": {
                                                      "type": "string",
                                                      "format": null
                                                    },
                                                    "tolerances": {
                                                      "type": "array"
                                                    },
                                                    "options": {
                                                      "type": "array",
                                                      "items": {
                                                        "type": "object",
                                                        "properties": {
                                                          "id": {
                                                            "type": "string",
                                                            "format": null,
                                                            "pattern": "^[0-9]+$"
                                                          },
                                                          "content": {
                                                            "type": "string",
                                                            "format": null
                                                          }
                                                        },
                                                        "required": [
                                                          "content"
                                                        ],
                                                        "additionalProperties": false,
                                                        "title": "option"
                                                      }
                                                    },
                                                    "solutions": {
                                                      "type": "array",
                                                      "items": {
                                                        "type": "string",
                                                        "format": null,
                                                        "pattern": "^[0-9]+$",
                                                        "title": "solution"
                                                      }
                                                    }
                                                  },
                                                  "required": [
                                                    "input",
                                                    "type",
                                                    "display",
                                                    "placeholder",
                                                    "ariaLabel",
                                                    "tolerances",
                                                    "options",
                                                    "solutions"
                                                  ],
                                                  "additionalProperties": false,
                                                  "title": "select"
                                                }
                                              ],
                                              "title": "proposal"
                                            }
                                          },
                                          "feedbacks": {
                                            "type": "object",
                                            "properties": {
                                              "valid": {
                                                "type": "object",
                                                "properties": {
                                                  "state": {
                                                    "type": "string",
                                                    "format": "jodit"
                                                  },
                                                  "diagnosis": {
                                                    "type": "string",
                                                    "format": "jodit"
                                                  }
                                                },
                                                "required": [
                                                  "state",
                                                  "diagnosis"
                                                ],
                                                "additionalProperties": false
                                              },
                                              "invalid": {
                                                "type": "object",
                                                "properties": {
                                                  "state": {
                                                    "type": "string",
                                                    "format": "jodit"
                                                  },
                                                  "diagnosis": {
                                                    "type": "string",
                                                    "format": "jodit"
                                                  }
                                                },
                                                "required": [
                                                  "state",
                                                  "diagnosis"
                                                ],
                                                "additionalProperties": false
                                              }
                                            },
                                            "additionalProperties": false
                                          }
                                        },
                                        "required": [
                                          "id",
                                          "type",
                                          "instruction",
                                          "proposals",
                                          "feedbacks"
                                        ],
                                        "additionalProperties": false,
                                        "title": "qrocm"
                                      },
                                      {
                                        "type": "object",
                                        "properties": {
                                          "id": {
                                            "type": "string",
                                            "format": "uuid"
                                          },
                                          "type": {
                                            "type": "string",
                                            "format": null,
                                            "enum": [
                                              "separator"
                                            ]
                                          }
                                        },
                                        "required": [
                                          "id",
                                          "type"
                                        ],
                                        "additionalProperties": false,
                                        "title": "separator"
                                      },
                                      {
                                        "type": "object",
                                        "properties": {
                                          "id": {
                                            "type": "string",
                                            "format": "uuid"
                                          },
                                          "type": {
                                            "type": "string",
                                            "format": null,
                                            "enum": [
                                              "short-video"
                                            ]
                                          },
                                          "title": {
                                            "type": "string",
                                            "format": null
                                          },
                                          "url": {
                                            "type": "string",
                                            "format": "uri"
                                          },
                                          "transcription": {
                                            "type": "string",
                                            "format": "jodit"
                                          }
                                        },
                                        "required": [
                                          "id",
                                          "type",
                                          "title",
                                          "url"
                                        ],
                                        "additionalProperties": false,
                                        "title": "short-video"
                                      },
                                      {
                                        "type": "object",
                                        "properties": {
                                          "id": {
                                            "type": "string",
                                            "format": "uuid"
                                          },
                                          "type": {
                                            "type": "string",
                                            "format": null,
                                            "enum": [
                                              "text"
                                            ]
                                          },
                                          "content": {
                                            "type": "string",
                                            "format": "jodit"
                                          }
                                        },
                                        "required": [
                                          "id",
                                          "type"
                                        ],
                                        "additionalProperties": false,
                                        "title": "text"
                                      },
                                      {
                                        "type": "object",
                                        "properties": {
                                          "id": {
                                            "type": "string",
                                            "format": "uuid"
                                          },
                                          "type": {
                                            "type": "string",
                                            "format": null,
                                            "enum": [
                                              "video"
                                            ]
                                          },
                                          "title": {
                                            "type": "string",
                                            "format": null
                                          },
                                          "url": {
                                            "type": "string",
                                            "format": "uri"
                                          },
                                          "poster": {
                                            "type": "string",
                                            "format": "uri"
                                          },
                                          "subtitles": {
                                            "type": "string",
                                            "format": "uri"
                                          },
                                          "transcription": {
                                            "type": "string",
                                            "format": "jodit"
                                          }
                                        },
                                        "required": [
                                          "id",
                                          "type",
                                          "title",
                                          "url",
                                          "subtitles"
                                        ],
                                        "additionalProperties": false,
                                        "title": "video"
                                      }
                                    ],
                                    "title": "element"
                                  }
                                }
                              },
                              "required": [
                                "elements"
                              ],
                              "additionalProperties": false,
                              "title": "step"
                            }
                          }
                        },
                        "required": [
                          "type",
                          "steps"
                        ],
                        "additionalProperties": false,
                        "title": "stepper"
                      }
                    ],
                    "title": "component"
                  }
                }
              },
              "required": [
                "id",
                "type",
                "title"
              ],
              "additionalProperties": false,
              "title": "grain"
            }
          }
        },
        "required": [
          "id",
          "type",
          "grains"
        ],
        "additionalProperties": false,
        "title": "section"
      }
    }
  },
  "required": [
    "id",
    "shortId",
    "slug",
    "title",
    "isBeta",
    "visibility",
    "details",
    "sections"
  ],
  "additionalProperties": false
};
