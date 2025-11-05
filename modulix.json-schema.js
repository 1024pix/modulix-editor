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
                  "enum": [
                    "lesson",
                    "activity",
                    "discovery",
                    "challenge",
                    "summary",
                    "transition",
                    "short-lesson"
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
                                    "enum": [
                                      "calcul-impact",
                                      "capacity-calculation",
                                      "clickable-image",
                                      "complete-phrase",
                                      "flip-cards",
                                      "image-quiz",
                                      "image-quizzes",
                                      "message-conversation",
                                      "pix-article",
                                      "pix-carousel",
                                      "pix-cursor",
                                      "llm-compare-messages",
                                      "llm-messages",
                                      "llm-prompt-select",
                                      "qcm-deepfake"
                                    ]
                                  },
                                  "props": {
                                    "oneOf": [
                                      {
                                        "type": "object",
                                        "properties": {
                                          "titleLevel": {
                                            "type": "number"
                                          }
                                        },
                                        "additionalProperties": false,
                                        "title": "calcul-impact"
                                      },
                                      {
                                        "type": "object",
                                        "properties": {
                                          "titleLevel": {
                                            "type": "number"
                                          },
                                          "capacityImage": {
                                            "type": "string"
                                          }
                                        },
                                        "required": [
                                          "capacityImage"
                                        ],
                                        "additionalProperties": false,
                                        "title": "capacity-calculation"
                                      },
                                      {
                                        "type": "object",
                                        "properties": {
                                          "image": {
                                            "type": "object",
                                            "properties": {
                                              "src": {
                                                "type": "string"
                                              },
                                              "alt": {
                                                "type": "string"
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
                                                "shape": {
                                                  "type": "string",
                                                  "enum": [
                                                    "rect"
                                                  ]
                                                },
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
                                                "info": {
                                                  "type": "string"
                                                },
                                                "tooltipPosition": {
                                                  "type": "string",
                                                  "enum": [
                                                    "bottom"
                                                  ]
                                                }
                                              },
                                              "required": [
                                                "shape",
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
                                        "additionalProperties": false,
                                        "title": "clickable-image"
                                      },
                                      {
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
                                                    "type": "string"
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
                                            "type": "string"
                                          },
                                          "llmMessage": {
                                            "type": "string"
                                          },
                                          "wordsToAdd": {
                                            "type": "array",
                                            "items": {
                                              "type": "string",
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
                                        "additionalProperties": false,
                                        "title": "complete-phrase"
                                      },
                                      {
                                        "type": "object",
                                        "properties": {
                                          "titleLevel": {
                                            "type": "number"
                                          },
                                          "name": {
                                            "type": "string"
                                          },
                                          "cardList": {
                                            "type": "array",
                                            "items": {
                                              "type": "object",
                                              "properties": {
                                                "name": {
                                                  "type": "string"
                                                },
                                                "description": {
                                                  "type": "string"
                                                },
                                                "icon": {
                                                  "type": "string"
                                                },
                                                "image": {
                                                  "type": "string"
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
                                        "additionalProperties": false,
                                        "title": "flip-cards"
                                      },
                                      {
                                        "type": "object",
                                        "properties": {
                                          "name": {
                                            "type": "string"
                                          },
                                          "multiple": {
                                            "type": "boolean"
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
                                                  "type": "string"
                                                },
                                                "image": {
                                                  "type": "object",
                                                  "properties": {
                                                    "src": {
                                                      "type": "string"
                                                    }
                                                  },
                                                  "required": [
                                                    "src"
                                                  ],
                                                  "additionalProperties": true
                                                },
                                                "response": {
                                                  "type": "string"
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
                                        "title": "image-quiz"
                                      },
                                      {
                                        "type": "object",
                                        "properties": {
                                          "quizzes": {
                                            "type": "array",
                                            "items": {
                                              "type": "object",
                                              "properties": {
                                                "name": {
                                                  "type": "string"
                                                },
                                                "multiple": {
                                                  "type": "boolean"
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
                                                        "type": "string"
                                                      },
                                                      "image": {
                                                        "type": "object",
                                                        "properties": {
                                                          "src": {
                                                            "type": "string"
                                                          }
                                                        },
                                                        "required": [
                                                          "src"
                                                        ],
                                                        "additionalProperties": true
                                                      },
                                                      "response": {
                                                        "type": "string"
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
                                        "additionalProperties": false,
                                        "title": "image-quizzes"
                                      },
                                      {
                                        "type": "object",
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
                                                },
                                                "image": {
                                                  "type": "object",
                                                  "properties": {
                                                    "src": {
                                                      "type": "string"
                                                    },
                                                    "alt": {
                                                      "type": "string"
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
                                                "content"
                                              ],
                                              "additionalProperties": false,
                                              "title": "message"
                                            }
                                          }
                                        },
                                        "required": [
                                          "title",
                                          "messages"
                                        ],
                                        "additionalProperties": false,
                                        "title": "message-conversation"
                                      },
                                      {
                                        "type": "object",
                                        "properties": {
                                          "titleLevel": {
                                            "type": "number"
                                          },
                                          "title": {
                                            "type": "string"
                                          },
                                          "author": {
                                            "type": "string"
                                          },
                                          "date": {
                                            "type": "string"
                                          },
                                          "paragraphs": {
                                            "type": "array",
                                            "items": {
                                              "type": "string",
                                              "title": "paragraph"
                                            }
                                          },
                                          "highlightedSentence": {
                                            "type": "string"
                                          },
                                          "colorOfHighlightSentence": {
                                            "type": "string"
                                          }
                                        },
                                        "required": [
                                          "title",
                                          "author",
                                          "date",
                                          "highlightedSentence",
                                          "colorOfHighlightSentence"
                                        ],
                                        "additionalProperties": false,
                                        "title": "pix-article"
                                      },
                                      {
                                        "type": "object",
                                        "properties": {
                                          "type": {
                                            "type": "string",
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
                                                      "type": "string"
                                                    },
                                                    "description": {
                                                      "type": "string"
                                                    },
                                                    "displayWidth": {
                                                      "type": "number",
                                                      "minimum": 0
                                                    },
                                                    "image": {
                                                      "type": "object",
                                                      "properties": {
                                                        "src": {
                                                          "type": "string"
                                                        },
                                                        "alt": {
                                                          "type": "string"
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
                                                          "type": "string"
                                                        },
                                                        "attribution": {
                                                          "type": "string"
                                                        },
                                                        "url": {
                                                          "type": "string"
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
                                                      "type": "string"
                                                    },
                                                    "description": {
                                                      "type": "string"
                                                    },
                                                    "text": {
                                                      "type": "string"
                                                    },
                                                    "image": {
                                                      "type": "object",
                                                      "properties": {
                                                        "src": {
                                                          "type": "string"
                                                        },
                                                        "alt": {
                                                          "type": "string"
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
                                                      "type": "string"
                                                    },
                                                    "description": {
                                                      "type": "string"
                                                    },
                                                    "text": {
                                                      "type": "string"
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
                                          "disableLoop": {
                                            "type": "boolean"
                                          },
                                          "imageTextDisplay": {
                                            "type": "string"
                                          }
                                        },
                                        "required": [
                                          "type",
                                          "slides",
                                          "randomSlides",
                                          "disableAnimation"
                                        ],
                                        "additionalProperties": false,
                                        "title": "pix-carousel"
                                      },
                                      {
                                        "type": "object",
                                        "properties": {
                                          "options": {
                                            "type": "array",
                                            "items": {
                                              "type": "object",
                                              "properties": {
                                                "label": {
                                                  "type": "string"
                                                },
                                                "feedback": {
                                                  "type": "object",
                                                  "properties": {
                                                    "type": {
                                                      "type": "string",
                                                      "enum": [
                                                        "bad",
                                                        "neutral",
                                                        "close",
                                                        "good"
                                                      ]
                                                    },
                                                    "text": {
                                                      "type": "string"
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
                                        "additionalProperties": false,
                                        "title": "pix-cursor"
                                      },
                                      {
                                        "type": "object",
                                        "properties": {
                                          "conversation1": {
                                            "type": "object",
                                            "properties": {
                                              "title": {
                                                "type": "string"
                                              },
                                              "llmName": {
                                                "type": "string"
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
                                                "type": "string"
                                              },
                                              "llmName": {
                                                "type": "string"
                                              }
                                            },
                                            "required": [
                                              "title",
                                              "llmName"
                                            ],
                                            "additionalProperties": false
                                          },
                                          "userName": {
                                            "type": "string"
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
                                                      "enum": [
                                                        "outbound"
                                                      ]
                                                    },
                                                    "content": {
                                                      "type": "string"
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
                                                        "enum": [
                                                          "inbound"
                                                        ]
                                                      },
                                                      "content": {
                                                        "type": "string"
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
                                        "additionalProperties": false,
                                        "title": "llm-compare-messages"
                                      },
                                      {
                                        "type": "object",
                                        "properties": {
                                          "messages": {
                                            "type": "array",
                                            "items": {
                                              "type": "object",
                                              "properties": {
                                                "direction": {
                                                  "type": "string",
                                                  "enum": [
                                                    "inbound",
                                                    "outbound"
                                                  ]
                                                },
                                                "content": {
                                                  "type": "string"
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
                                        "additionalProperties": false,
                                        "title": "llm-messages"
                                      },
                                      {
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
                                                  "enum": [
                                                    "inbound",
                                                    "outbound"
                                                  ]
                                                },
                                                "content": {
                                                  "type": "string"
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
                                                  "type": "string"
                                                },
                                                "response": {
                                                  "type": "string"
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
                                        "additionalProperties": false,
                                        "title": "llm-prompt-select"
                                      },
                                      {
                                        "type": "object",
                                        "properties": {
                                          "titleLevel": {
                                            "type": "number"
                                          },
                                          "successImage": {
                                            "type": "string"
                                          },
                                          "failImage": {
                                            "type": "string"
                                          },
                                          "infoImage": {
                                            "type": "string"
                                          },
                                          "searchImage": {
                                            "type": "string"
                                          }
                                        },
                                        "required": [
                                          "successImage",
                                          "failImage",
                                          "infoImage",
                                          "searchImage"
                                        ],
                                        "additionalProperties": false,
                                        "title": "qcm-deepfake"
                                      }
                                    ]
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
                                    "enum": [
                                      "custom-draft"
                                    ]
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
                                              "type": "string"
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
                                      "qcu-discovery"
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
                                "title": "qcu-discovery"
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
                                      "short-video"
                                    ]
                                  },
                                  "title": {
                                    "type": "string"
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
                                            "enum": [
                                              "calcul-impact",
                                              "capacity-calculation",
                                              "clickable-image",
                                              "complete-phrase",
                                              "flip-cards",
                                              "image-quiz",
                                              "image-quizzes",
                                              "message-conversation",
                                              "pix-article",
                                              "pix-carousel",
                                              "pix-cursor",
                                              "llm-compare-messages",
                                              "llm-messages",
                                              "llm-prompt-select",
                                              "qcm-deepfake"
                                            ]
                                          },
                                          "props": {
                                            "oneOf": [
                                              {
                                                "type": "object",
                                                "properties": {
                                                  "titleLevel": {
                                                    "type": "number"
                                                  }
                                                },
                                                "additionalProperties": false,
                                                "title": "calcul-impact"
                                              },
                                              {
                                                "type": "object",
                                                "properties": {
                                                  "titleLevel": {
                                                    "type": "number"
                                                  },
                                                  "capacityImage": {
                                                    "type": "string"
                                                  }
                                                },
                                                "required": [
                                                  "capacityImage"
                                                ],
                                                "additionalProperties": false,
                                                "title": "capacity-calculation"
                                              },
                                              {
                                                "type": "object",
                                                "properties": {
                                                  "image": {
                                                    "type": "object",
                                                    "properties": {
                                                      "src": {
                                                        "type": "string"
                                                      },
                                                      "alt": {
                                                        "type": "string"
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
                                                        "shape": {
                                                          "type": "string",
                                                          "enum": [
                                                            "rect"
                                                          ]
                                                        },
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
                                                        "info": {
                                                          "type": "string"
                                                        },
                                                        "tooltipPosition": {
                                                          "type": "string",
                                                          "enum": [
                                                            "bottom"
                                                          ]
                                                        }
                                                      },
                                                      "required": [
                                                        "shape",
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
                                                "additionalProperties": false,
                                                "title": "clickable-image"
                                              },
                                              {
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
                                                            "type": "string"
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
                                                    "type": "string"
                                                  },
                                                  "llmMessage": {
                                                    "type": "string"
                                                  },
                                                  "wordsToAdd": {
                                                    "type": "array",
                                                    "items": {
                                                      "type": "string",
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
                                                "additionalProperties": false,
                                                "title": "complete-phrase"
                                              },
                                              {
                                                "type": "object",
                                                "properties": {
                                                  "titleLevel": {
                                                    "type": "number"
                                                  },
                                                  "name": {
                                                    "type": "string"
                                                  },
                                                  "cardList": {
                                                    "type": "array",
                                                    "items": {
                                                      "type": "object",
                                                      "properties": {
                                                        "name": {
                                                          "type": "string"
                                                        },
                                                        "description": {
                                                          "type": "string"
                                                        },
                                                        "icon": {
                                                          "type": "string"
                                                        },
                                                        "image": {
                                                          "type": "string"
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
                                                "additionalProperties": false,
                                                "title": "flip-cards"
                                              },
                                              {
                                                "type": "object",
                                                "properties": {
                                                  "name": {
                                                    "type": "string"
                                                  },
                                                  "multiple": {
                                                    "type": "boolean"
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
                                                          "type": "string"
                                                        },
                                                        "image": {
                                                          "type": "object",
                                                          "properties": {
                                                            "src": {
                                                              "type": "string"
                                                            }
                                                          },
                                                          "required": [
                                                            "src"
                                                          ],
                                                          "additionalProperties": true
                                                        },
                                                        "response": {
                                                          "type": "string"
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
                                                "title": "image-quiz"
                                              },
                                              {
                                                "type": "object",
                                                "properties": {
                                                  "quizzes": {
                                                    "type": "array",
                                                    "items": {
                                                      "type": "object",
                                                      "properties": {
                                                        "name": {
                                                          "type": "string"
                                                        },
                                                        "multiple": {
                                                          "type": "boolean"
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
                                                                "type": "string"
                                                              },
                                                              "image": {
                                                                "type": "object",
                                                                "properties": {
                                                                  "src": {
                                                                    "type": "string"
                                                                  }
                                                                },
                                                                "required": [
                                                                  "src"
                                                                ],
                                                                "additionalProperties": true
                                                              },
                                                              "response": {
                                                                "type": "string"
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
                                                "additionalProperties": false,
                                                "title": "image-quizzes"
                                              },
                                              {
                                                "type": "object",
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
                                                        },
                                                        "image": {
                                                          "type": "object",
                                                          "properties": {
                                                            "src": {
                                                              "type": "string"
                                                            },
                                                            "alt": {
                                                              "type": "string"
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
                                                        "content"
                                                      ],
                                                      "additionalProperties": false,
                                                      "title": "message"
                                                    }
                                                  }
                                                },
                                                "required": [
                                                  "title",
                                                  "messages"
                                                ],
                                                "additionalProperties": false,
                                                "title": "message-conversation"
                                              },
                                              {
                                                "type": "object",
                                                "properties": {
                                                  "titleLevel": {
                                                    "type": "number"
                                                  },
                                                  "title": {
                                                    "type": "string"
                                                  },
                                                  "author": {
                                                    "type": "string"
                                                  },
                                                  "date": {
                                                    "type": "string"
                                                  },
                                                  "paragraphs": {
                                                    "type": "array",
                                                    "items": {
                                                      "type": "string",
                                                      "title": "paragraph"
                                                    }
                                                  },
                                                  "highlightedSentence": {
                                                    "type": "string"
                                                  },
                                                  "colorOfHighlightSentence": {
                                                    "type": "string"
                                                  }
                                                },
                                                "required": [
                                                  "title",
                                                  "author",
                                                  "date",
                                                  "highlightedSentence",
                                                  "colorOfHighlightSentence"
                                                ],
                                                "additionalProperties": false,
                                                "title": "pix-article"
                                              },
                                              {
                                                "type": "object",
                                                "properties": {
                                                  "type": {
                                                    "type": "string",
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
                                                              "type": "string"
                                                            },
                                                            "description": {
                                                              "type": "string"
                                                            },
                                                            "displayWidth": {
                                                              "type": "number",
                                                              "minimum": 0
                                                            },
                                                            "image": {
                                                              "type": "object",
                                                              "properties": {
                                                                "src": {
                                                                  "type": "string"
                                                                },
                                                                "alt": {
                                                                  "type": "string"
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
                                                                  "type": "string"
                                                                },
                                                                "attribution": {
                                                                  "type": "string"
                                                                },
                                                                "url": {
                                                                  "type": "string"
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
                                                              "type": "string"
                                                            },
                                                            "description": {
                                                              "type": "string"
                                                            },
                                                            "text": {
                                                              "type": "string"
                                                            },
                                                            "image": {
                                                              "type": "object",
                                                              "properties": {
                                                                "src": {
                                                                  "type": "string"
                                                                },
                                                                "alt": {
                                                                  "type": "string"
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
                                                              "type": "string"
                                                            },
                                                            "description": {
                                                              "type": "string"
                                                            },
                                                            "text": {
                                                              "type": "string"
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
                                                  "disableLoop": {
                                                    "type": "boolean"
                                                  },
                                                  "imageTextDisplay": {
                                                    "type": "string"
                                                  }
                                                },
                                                "required": [
                                                  "type",
                                                  "slides",
                                                  "randomSlides",
                                                  "disableAnimation"
                                                ],
                                                "additionalProperties": false,
                                                "title": "pix-carousel"
                                              },
                                              {
                                                "type": "object",
                                                "properties": {
                                                  "options": {
                                                    "type": "array",
                                                    "items": {
                                                      "type": "object",
                                                      "properties": {
                                                        "label": {
                                                          "type": "string"
                                                        },
                                                        "feedback": {
                                                          "type": "object",
                                                          "properties": {
                                                            "type": {
                                                              "type": "string",
                                                              "enum": [
                                                                "bad",
                                                                "neutral",
                                                                "close",
                                                                "good"
                                                              ]
                                                            },
                                                            "text": {
                                                              "type": "string"
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
                                                "additionalProperties": false,
                                                "title": "pix-cursor"
                                              },
                                              {
                                                "type": "object",
                                                "properties": {
                                                  "conversation1": {
                                                    "type": "object",
                                                    "properties": {
                                                      "title": {
                                                        "type": "string"
                                                      },
                                                      "llmName": {
                                                        "type": "string"
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
                                                        "type": "string"
                                                      },
                                                      "llmName": {
                                                        "type": "string"
                                                      }
                                                    },
                                                    "required": [
                                                      "title",
                                                      "llmName"
                                                    ],
                                                    "additionalProperties": false
                                                  },
                                                  "userName": {
                                                    "type": "string"
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
                                                              "enum": [
                                                                "outbound"
                                                              ]
                                                            },
                                                            "content": {
                                                              "type": "string"
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
                                                                "enum": [
                                                                  "inbound"
                                                                ]
                                                              },
                                                              "content": {
                                                                "type": "string"
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
                                                "additionalProperties": false,
                                                "title": "llm-compare-messages"
                                              },
                                              {
                                                "type": "object",
                                                "properties": {
                                                  "messages": {
                                                    "type": "array",
                                                    "items": {
                                                      "type": "object",
                                                      "properties": {
                                                        "direction": {
                                                          "type": "string",
                                                          "enum": [
                                                            "inbound",
                                                            "outbound"
                                                          ]
                                                        },
                                                        "content": {
                                                          "type": "string"
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
                                                "additionalProperties": false,
                                                "title": "llm-messages"
                                              },
                                              {
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
                                                          "enum": [
                                                            "inbound",
                                                            "outbound"
                                                          ]
                                                        },
                                                        "content": {
                                                          "type": "string"
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
                                                          "type": "string"
                                                        },
                                                        "response": {
                                                          "type": "string"
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
                                                "additionalProperties": false,
                                                "title": "llm-prompt-select"
                                              },
                                              {
                                                "type": "object",
                                                "properties": {
                                                  "titleLevel": {
                                                    "type": "number"
                                                  },
                                                  "successImage": {
                                                    "type": "string"
                                                  },
                                                  "failImage": {
                                                    "type": "string"
                                                  },
                                                  "infoImage": {
                                                    "type": "string"
                                                  },
                                                  "searchImage": {
                                                    "type": "string"
                                                  }
                                                },
                                                "required": [
                                                  "successImage",
                                                  "failImage",
                                                  "infoImage",
                                                  "searchImage"
                                                ],
                                                "additionalProperties": false,
                                                "title": "qcm-deepfake"
                                              }
                                            ]
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
                                            "enum": [
                                              "custom-draft"
                                            ]
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
                                              "qcu-discovery"
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
                                        "title": "qcu-discovery"
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
                                              "short-video"
                                            ]
                                          },
                                          "title": {
                                            "type": "string"
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
    "slug",
    "title",
    "isBeta",
    "details",
    "sections"
  ],
  "additionalProperties": false
};
