export const schema = {
  "type": "object",
  "properties": {
    "id": {
      "type": "string",
      "format": "uuid"
    },
    "slug": {
      "type": "string",
      "pattern": "^[a-z0-9-]+$"
    },
    "title": {
      "type": "string"
    },
    "isBeta": {
      "type": "boolean"
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
          "enum": [
            "Débutant",
            "Intermédiaire",
            "Avancé",
            "Expert"
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
            "enum": [
              "lesson",
              "activity",
              "discovery",
              "challenge",
              "summary",
              "transition"
            ]
          },
          "title": {
            "type": "string"
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
                      "enum": ["element"]
                    },
                    "element": {
                      "$ref": "#/$defs/element"
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
                      "enum": ["stepper"]
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
                              "$ref": "#/$defs/element"
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
    "slug",
    "title",
    "isBeta",
    "details",
    "grains"
  ],
  "additionalProperties": false,
  "$defs": {
    "element": {
      "oneOf": [
        {
          "title": "custom",
          "oneOf": [
            {
              "$ref": "#/$defs/custom",
              "title": "message-conversation",
              "properties": {
                "tagName": {
                  "enum": ["message-conversation"]
                },
                "props": {
                  "properties": {
                    "title": {
                      "type": "string"
                    },
                    "messages": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "userName": {
                            "type": "string"
                          },
                          "direction": {
                            "type": "string",
                            "enum": [
                              "incoming",
                              "outgoing"
                            ]
                          },
                          "content": {
                            "type": "string"
                          }
                        },
                        "required": [
                          "userName",
                          "direction",
                          "content"
                        ],
                        "additionalProperties": false,
                        "title": "message"
                      },
                      "minItems": 2
                    }
                  },
                  "required": [
                    "title",
                    "messages"
                  ],
                  "additionalProperties": false
                }
              }
            },
            {
              "$ref": "#/$defs/custom",
              "title": "qcu-image",
              "properties": {
                "tagName": {
                  "enum": ["qcu-image"]
                },
                "props": {
                  "properties": {
                    "name": {
                      "type": "string"
                    },
                    "maxChoicesPerLine": {
                      "type": "number",
                      "minimum": 1,
                      "maximum": 4
                    },
                    "imageChoicesSize": {
                      "type": "string",
                      "enum": ["icon", "medium", "large"]
                    },
                    "hideChoicesName": {
                      "type": "boolean"
                    },
                    "orderChoices": {
                      "type": "boolean"
                    },
                    "choices": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "name": {
                            "type": "string"
                          },
                          "image": {
                            "type": "object",
                            "properties": {
                              "src": {
                                "type": "string",
                                "format": "uri"
                              }
                            },
                            "required": [
                              "src"
                            ],
                            "additionalProperties": {
                              "type": "string"
                            }
                          },
                          "response": {
                            "type": "string"
                          }
                        },
                        "required": [
                          "name"
                        ],
                        "additionalProperties": false
                      },
                      "minItems": 2
                    }
                  },
                  "required": [
                    "name",
                    "choices"
                  ],
                  "additionalProperties": false
                }
              }
            }
          ]
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
                    "type": "string"
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
              "enum": [
                "embed"
              ]
            },
            "isCompletionRequired": {
              "type": "boolean"
            },
            "title": {
              "type": "string"
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
              "type": "string"
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
              "enum": [
                "expand"
              ]
            },
            "title": {
              "type": "string"
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
              "enum": [
                "flashcards"
              ]
            },
            "instruction": {
              "type": "string",
              "format": "jodit"
            },
            "title": {
              "type": "string"
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
                        "type": "string"
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
              "enum": [
                "image"
              ]
            },
            "url": {
              "type": "string",
              "format": "uri"
            },
            "alt": {
              "type": "string"
            },
            "alternativeText": {
              "type": "string",
              "format": "jodit"
            },
            "legend": {
              "type": "string"
            },
            "licence": {
              "type": "string"
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
                    "type": "string"
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
                        "format": "uri"
                      }
                    },
                    "required": [
                      "url",
                      "altText"
                    ],
                    "additionalProperties": false
                  },
                  "proposalA": {
                    "type": "string"
                  },
                  "proposalB": {
                    "type": "string"
                  },
                  "solution": {
                    "type": "string"
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
            }
          },
          "required": [
            "id",
            "type",
            "instruction",
            "cards"
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
              "enum": [
                "qcu"
              ]
            },
            "instruction": {
              "type": "string",
              "format": "jodit"
            },
            "proposals": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "string",
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
              "pattern": "^[0-9]+$"
            }
          },
          "required": [
            "id",
            "type",
            "instruction",
            "proposals",
            "solution"
          ],
          "additionalProperties": false,
          "title": "qcu"
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
              "enum": [
                "qcu-declarative"
              ]
            },
            "instruction": {
              "type": "string",
              "format": "jodit"
            },
            "proposals": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "string",
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
            }
          },
          "required": [
            "id",
            "type",
            "instruction",
            "proposals"
          ],
          "additionalProperties": false,
          "title": "qcu-declarative"
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
              "enum": [
                "qcm"
              ]
            },
            "instruction": {
              "type": "string",
              "format": "jodit"
            },
            "proposals": {
              "type": "array",
              "minItems": 3,
              "items": {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "string",
                    "pattern": "^[0-9]+$"
                  },
                  "content": {
                    "type": "string",
                    "format": "jodit"
                  }
                },
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
                "pattern": "^[0-9]+$",
                "title": "solution"
              }
            }
          },
          "required": [
            "id",
            "type",
            "instruction",
            "proposals",
            "feedbacks",
            "solutions"
          ],
          "additionalProperties": false,
          "title": "qcm"
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
                        "type": "string"
                      },
                      "type": {
                        "type": "string",
                        "enum": [
                          "input"
                        ]
                      },
                      "inputType": {
                        "type": "string",
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
                        "enum": [
                          "inline",
                          "block"
                        ]
                      },
                      "placeholder": {
                        "type": "string"
                      },
                      "ariaLabel": {
                        "type": "string"
                      },
                      "defaultValue": {
                        "type": "string"
                      },
                      "tolerances": {
                        "type": "array",
                        "uniqueItems": true,
                        "items": {
                          "type": "string",
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
                      "defaultValue",
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
                        "type": "string"
                      },
                      "type": {
                        "type": "string",
                        "enum": [
                          "select"
                        ]
                      },
                      "display": {
                        "type": "string",
                        "enum": [
                          "inline",
                          "block"
                        ]
                      },
                      "placeholder": {
                        "type": "string"
                      },
                      "ariaLabel": {
                        "type": "string"
                      },
                      "defaultValue": {
                        "type": "string"
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
                              "pattern": "^[0-9]+$"
                            },
                            "content": {
                              "type": "string"
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
                      "defaultValue",
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
              "enum": [
                "video"
              ]
            },
            "title": {
              "type": "string"
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
    },
    "custom": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string",
          "format": "uuid"
        },
        "type": {
          "type": "string",
          "enum": ["custom"]
        },
        "tagName": {
          "type": "string"
        },
        "props": {
          "type": "object"
        }
      },
      "required": [
        "id",
        "type",
        "tagName",
        "props"
      ],
      "additionalProperties": false
    }
  }
};
