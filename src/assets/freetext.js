export default {
    iiifstoryboard: function () {
      return [
      {"name": "autorun_interval",
          "description": `Time between when the autorun functionality will 
          go to the next annotation in seconds, 
          e.g. 4 will go to the next annotation after four seconds; 
          Default is 3 seconds.`
      },
      {"name": "mapmarker",
          "description": `For annotations with a height and width of 0 
          or items that have a pin specification (often those annotations created in Mirador 2)
          The default view for these items is: <i class="fas fa-map-marker-alt"></i>. 
          This can be overridden by entering new HTML icon or SVG element in this field.`
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
          It does not work with Internet Explorer.`
      },
      {"name": "truncate_length",
          "description": `This can be set to any Integer. 
          By default it is set to 2; 
          This determines how many words appear when the hide button (<i class="fas fa-caret-up"></i>) is clicked. 
          The hide button will only show words in the annotation and will truncate the annotation and hide the tags. 
          If you are looking for a way to hide the tags 
          listed in the annotation (not the tags button) add to css to .tags {display: none;}`
      },
      {"name": "customid",
          "description": `If for some reason you would like to customize
           the identifier which gets automatically generated 
           from the annotation filename use this setting. 
           This setting is necessary if two storyboards with the same annotation 
           get added to the same page.`
      },
      {"name": "imagecrop",
          "description": ` X,Y,W,H coordinates on the image in the following format “x,y,w,h”, 
          e.g. “200,300,600,400”. 
          This will crop the image to a box 
          that is created starting from the upper left hand corner at the x coordinate 200, y coordinate 300,
          with a width of 600 and height of 400.  
          Make sure not to crop out any annotations you have created.`
      }, {"name": "title",
      "description": `Allows for a custom title to be placed in the info box.`
    },{"name": "startposition",
    "description": `Any number that is within the length of your annotation.
    It will set where the view starts. By default this is 0. 
    If you set this to 1, it will go the first annotation in your list on load.
    `
    }
    ]
  },
    iiifmultistoryboard: function() {
      return this.storyboardoptions()
    },
    iiifrangestoryboard: function() {
      return this.storyboardoptions();
    },
    iiifannotation: function() {
      return [
        {"name": "width",
          "description": `Any width dimension in pixels. 
          Changes annotation and full size image size.`
        },
        {"name": "height",
          "description": `Any height dimension in pixels. 
          Changes annotation and full size image size.`
        }
      ]
    }
  }