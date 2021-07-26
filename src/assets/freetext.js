export default {
    iiifstoryboard: function () {
      return [
      {"name": "autorun_interval",
          "description": `Time between when the autorun functionality will 
          go to the next annotation in seconds, 
          e.g. 4 will go to the next annotation after four seconds; 
          Default is 3 seconds.`,
          "options": "any number"
      },
      {"name": "mapmarker",
          "description": `For annotations with a height and width of 0 
          or items that have a pin specification (often those annotations created in Mirador 2)
          The default view for these items is: <i class="fas fa-map-marker-alt"></i>. 
          This can be overridden by entering new HTML icon or SVG element in this field.`,
          "options": "HTML icon or SVG element"
      },
      {"name": "tts",
          "description": `Any ISO language code. 
          This will provide text to speech for the annotation. 
          It will only read the main content, not the tags or labels. 
          If the language is set in the individual annotations 
          it will set the language automatically and this can field can be set to true.
          A list of language codes can be found here: http://www.lingoes.net/en/translator/langcode.htm. 
          If you are implementing autorun_onload and tts together it will not work in Chrome. 
          It requires user activation (clicking the Auto Run button) to work in Chrome 
          but should work fine in Safari and Firefox. 
          It does not work with Internet Explorer.`,
          "options": "language code"
      },
      {"name": "truncate_length",
          "description": `This can be set to any Integer. 
          By default it is set to 2; 
          This determines how many words appear when the hide button (<i class="fas fa-caret-up"></i>) is clicked. 
          The hide button will only show words in the annotation and will truncate the annotation and hide the tags. 
          If you are looking for a way to hide the tags 
          listed in the annotation (not the tags button) add to css to .tags {display: none;}`,
          "options": "any number"
      },
      {"name": "maplayer",
          "description": `This can be set to any Leaflet compatible map tile. 
          The corresponding mapattribution setting needs to be filled out for this to work.
          By default it is set to https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png; 
          This only works if your annotation has GeoJSON and you have the <b>mapattribution setting enabled</b>.`,
          "options": "Leaflet compatible map tile"
      },
      {"name": "mapattribution",
          "description": `This needs to be set to the correct attribution for the map you are using. 
          If it is not loaded your custom map layer will not load. 
          By default it is set to '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'.
          This only works if your annotation has GeoJSON`,
          "options": "Leaflet compatible map tile"
      },
      {"name": "customid",
          "description": `If for some reason you would like to customize
           the identifier which gets automatically generated 
           from the annotation filename use this setting. 
           This setting is necessary if two storyboards with the same annotation 
           get added to the same page.`,
           "options": "any combination of letters and numbers"
      },
      {"name": "textoverlayopacity",
          "description": `Allows you to set the default opacity for text overlay when the storyboard loads. 100 is no opacity, 0 is invisible. Default is 100.`,
           "options": "any number between 1-100"
      },
      {"name": "textoverlayfontcolor",
          "description": `Allows you to set the default text color for text overlay when the storyboard loads. Default is #000000.`,
           "options": "HEX color code"
      },
      {"name": "textoverlaybackground",
      "description": `Allows you to set the default background color for text overlay when the storyboard loads. Default is none;`,
           "options": "HEX color code"
      },
      {"name": "imagecrop",
          "description": ` X,Y,W,H coordinates on the image in the following format “x,y,w,h”, 
          e.g. “200,300,600,400”. 
          This will crop the image to a box 
          that is created starting from the upper left hand corner at the x coordinate 200, y coordinate 300,
          with a width of 600 and height of 400.  
          Make sure not to crop out any annotations you have created.`,
          "options": "x,y,w,h coordinates"
      }, {"name": "title",
      "description": `Allows for a custom title to be placed in the info box.`,
      "options": "any combination of letters and numbers"
    },{"name": "startposition",
    "description": `Any number that is within the length of your annotation.
    It will set where the view starts. By default this is 0. 
    If you set this to 1, it will go the first annotation in your list on load.
    `,
    "options": "any number that is less than or equal to the number of annotations."
    }
    ]
  },
    iiifmultistoryboard: function() {
      return this.iiifstoryboard()
    },
    iiifrangestoryboard: function() {
      return this.iiifstoryboard();
    },
    iiifannotation: function() {
      return [
        {"name": "width",
          "description": `Any width dimension in pixels. 
          Changes annotation and full size image size.`,
          "options": "number"
        },
        {"name": "height",
          "description": `Any height dimension in pixels. 
          Changes annotation and full size image size.`,
          "options": "number"
        }
      ]
    }
  }