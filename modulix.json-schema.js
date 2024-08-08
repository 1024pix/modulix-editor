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
    "details": {
      "type": "object",
      "properties": {
        "image": {
          "type": "string",
          "format": "uri"
        },
        "description": {
          "type": "string"
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
            "type": "string"
          }
        }
      },
      "required": [
        "image",
        "description",
        "duration",
        "level",
        "objectives"
      ],
      "additionalProperties": false
    },
    "transitionTexts": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "grainId": {
            "type": "string",
            "format": "uuid"
          },
          "content": {
            "type": "string",
            "format": "jodit"
          }
        },
        "required": [
          "grainId"
        ],
        "additionalProperties": false
      }
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
              "activity"
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
                  "title": "element",
                  "type": "object",
                  "properties": {
                    "type": {
                      "type": "string",
                      "enum": [
                        "element"
                      ]
                    },
                    "element": {
                      "oneOf": [
                        {
                          "title": "text",
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
                          "additionalProperties": false
                        },
                        {
                          "title": "image",
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
                            }
                          },
                          "required": [
                            "id",
                            "type",
                            "url",
                            "alt"
                          ],
                          "additionalProperties": false
                        },
                        {
                          "title": "qcu",
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
                                  }
                                },
                                "additionalProperties": false
                              }
                            },
                            "feedbacks": {
                              "type": "object",
                              "properties": {
                                "valid": {
                                  "type": "string",
                                  "format": "jodit"
                                },
                                "invalid": {
                                  "type": "string",
                                  "format": "jodit"
                                }
                              },
                              "additionalProperties": false
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
                            "feedbacks"
                          ],
                          "additionalProperties": false
                        },
                        {
                          "title": "qcm",
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
                                "additionalProperties": false
                              }
                            },
                            "feedbacks": {
                              "type": "object",
                              "properties": {
                                "valid": {
                                  "type": "string",
                                  "format": "jodit"
                                },
                                "invalid": {
                                  "type": "string",
                                  "format": "jodit"
                                }
                              },
                              "additionalProperties": false
                            },
                            "solutions": {
                              "type": "array",
                              "minItems": 2,
                              "items": {
                                "type": "string",
                                "pattern": "^[0-9]+$"
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
                          "additionalProperties": false
                        },
                        {
                          "title": "qrocm",
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
                                    "title": "text",
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
                                    "additionalProperties": false
                                  },
                                  {
                                    "title": "input",
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
                                          ]
                                        }
                                      },
                                      "solutions": {
                                        "type": "array",
                                        "items": {
                                          "type": "string"
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
                                    "additionalProperties": false
                                  },
                                  {
                                    "title": "select",
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
                                          "additionalProperties": false
                                        }
                                      },
                                      "solutions": {
                                        "type": "array",
                                        "items": {
                                          "type": "string",
                                          "pattern": "^[0-9]+$"
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
                                    "additionalProperties": false
                                  }
                                ]
                              }
                            },
                            "feedbacks": {
                              "type": "object",
                              "properties": {
                                "valid": {
                                  "type": "string",
                                  "format": "jodit"
                                },
                                "invalid": {
                                  "type": "string",
                                  "format": "jodit"
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
                          "additionalProperties": false
                        },
                        {
                          "title": "video",
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
                          "additionalProperties": false
                        },
                        {
                          "title": "embed",
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
                              "oneOf": [
                                null
                              ]
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
                          "additionalProperties": false
                        },
                        {
                          "title": "download",
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
                                "additionalProperties": false
                              }
                            }
                          },
                          "required": [
                            "id",
                            "type",
                            "files"
                          ],
                          "additionalProperties": false
                        }
                      ]
                    }
                  },
                  "required": [
                    "type",
                    "element"
                  ],
                  "additionalProperties": false
                },
                {
                  "title": "stepper",
                  "type": "object",
                  "properties": {
                    "type": {
                      "type": "string",
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
                                  "title": "text",
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
                                  "additionalProperties": false
                                },
                                {
                                  "title": "image",
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
                                    }
                                  },
                                  "required": [
                                    "id",
                                    "type",
                                    "url",
                                    "alt"
                                  ],
                                  "additionalProperties": false
                                },
                                {
                                  "title": "qcu",
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
                                          }
                                        },
                                        "additionalProperties": false
                                      }
                                    },
                                    "feedbacks": {
                                      "type": "object",
                                      "properties": {
                                        "valid": {
                                          "type": "string",
                                          "format": "jodit"
                                        },
                                        "invalid": {
                                          "type": "string",
                                          "format": "jodit"
                                        }
                                      },
                                      "additionalProperties": false
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
                                    "feedbacks"
                                  ],
                                  "additionalProperties": false
                                },
                                {
                                  "title": "qcm",
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
                                        "additionalProperties": false
                                      }
                                    },
                                    "feedbacks": {
                                      "type": "object",
                                      "properties": {
                                        "valid": {
                                          "type": "string",
                                          "format": "jodit"
                                        },
                                        "invalid": {
                                          "type": "string",
                                          "format": "jodit"
                                        }
                                      },
                                      "additionalProperties": false
                                    },
                                    "solutions": {
                                      "type": "array",
                                      "minItems": 2,
                                      "items": {
                                        "type": "string",
                                        "pattern": "^[0-9]+$"
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
                                  "additionalProperties": false
                                },
                                {
                                  "title": "qrocm",
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
                                            "title": "text",
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
                                            "additionalProperties": false
                                          },
                                          {
                                            "title": "input",
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
                                                  ]
                                                }
                                              },
                                              "solutions": {
                                                "type": "array",
                                                "items": {
                                                  "type": "string"
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
                                            "additionalProperties": false
                                          },
                                          {
                                            "title": "select",
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
                                                  "additionalProperties": false
                                                }
                                              },
                                              "solutions": {
                                                "type": "array",
                                                "items": {
                                                  "type": "string",
                                                  "pattern": "^[0-9]+$"
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
                                            "additionalProperties": false
                                          }
                                        ]
                                      }
                                    },
                                    "feedbacks": {
                                      "type": "object",
                                      "properties": {
                                        "valid": {
                                          "type": "string",
                                          "format": "jodit"
                                        },
                                        "invalid": {
                                          "type": "string",
                                          "format": "jodit"
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
                                  "additionalProperties": false
                                },
                                {
                                  "title": "video",
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
                                  "additionalProperties": false
                                },
                                {
                                  "title": "embed",
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
                                      "oneOf": [
                                        null
                                      ]
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
                                  "additionalProperties": false
                                },
                                {
                                  "title": "download",
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
                                        "additionalProperties": false
                                      }
                                    }
                                  },
                                  "required": [
                                    "id",
                                    "type",
                                    "files"
                                  ],
                                  "additionalProperties": false
                                }
                              ]
                            }
                          }
                        },
                        "required": [
                          "elements"
                        ],
                        "additionalProperties": false
                      }
                    }
                  },
                  "required": [
                    "type",
                    "steps"
                  ],
                  "additionalProperties": false
                }
              ]
            }
          }
        },
        "required": [
          "id",
          "type",
          "title"
        ],
        "additionalProperties": false
      }
    }
  },
  "required": [
    "id",
    "slug",
    "title",
    "details",
    "grains"
  ],
  "additionalProperties": false
};
