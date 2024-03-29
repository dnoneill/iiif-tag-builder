export default {
  iiifstoryboard: function () {
    return [
    {"name": "autorun_onload",
        "description": `When enabled, this function has the storyboard auto run through
         the annotations when the storyboard loads on the page. 
         The autorun functionality is avaliable through the toolbar, so this functionality should only be
         enabled if you want the functionality to start on page load.`
    },
    {"name": "fullpage",
        "description": `This will only fill the browser window. 
        It will only work with a single storyboard. 
        This will not display the storyboard full screen, due to the basic structure of the internet this can not be automated.
         This will only fill the browser window`
    },
    {"name": "toggleoverlay",
        "description": `This setting shows the overlays on load.
        The overlays are the shape of the annotations on the image.`
    },
    {"name": "controller",
        "description": `Should only be instantiated if property of ws is also used.
        The ws property can be seen in the Free text field section. 
        This setting sets the storyboard with the setting enabled 
        as being able to control other storyboards connected to the web socket server.`
    },
    {"name": "togglelayers",
        "description": `This setting only works if there are layers in your storyboard.
        If there are layers in your storyboard a <i class="fas fa-layer-group"></i> button
        will appear in the toolbar. When enabled all the layers will automatically be loaded 
        in the viewer. By default the user has to toggle these layers.`
    },
    {"name": "hide_tagcount",
        "description": `This only works if there are tags in your annotation (<i class="fas fa-tags"></i> in toolbar).
        By default, the viewer will the show the number of times each tag appears in the tag box.
        This setting removes that count from view.
        `,
        "icon": "Tag count (in tag box)"
    },
    {"name": "overlaynext",
        "description": `When overlays have not been toggled, this will toggle only the overlay of the current annotation.
        This feature is extremely useful for highlighting the specific feature of the annotation.
        `
    },
    {"name": "hide_annocontrols",
        "description": `This setting hides <i class="fas fa-times close_button"></i>, <i class="fas fa-caret-square-up close_button"></i> 
        and any other icons in annotation box.`,
        "icon": "<i class='fas fa-times close_button'></i><i class='fas fa-caret-square-up close_button'></i>"
    },
    {"name": "hide_toolbar",
        "description": `This setting will hide the toolbar. 
        If you enable this setting it is recommended you enable toggle_overlays so users can interact with the storyboard.`,
        "icon": "entire toolbar"
    },
    {"name": "hide_tagsbutton",
        "description": `If there are tags in the annotation, 
        this will hide the tags button (<i class="fas fa-tags"></i>) in the toolbar
        and stop keyboard shortcuts from rendering.`,
        "icon": "<i class='fas fa-tags'></i> button"
    },
    {"name": "hide_autorunbutton",
        "description": `Will stop the autorun button (<i class="fas fa-magic"></i>) from rendering and
         will not allow the keyboard shortcuts to render.`,
         "icon": `<i class="fas fa-magic"></i>`
    },
    {"name": "hide_infobutton",
        "description": `Will stop the info button (<i class="fas fa-info"></i>) from rendering and
        will not allow the keyboard shortcuts to render.`,
        "icon": `<i class="fas fa-info"></i>`
    },
    {"name": "hide_overlaybutton",
        "description": `Will stop the info button (<i class="fas fa-toggle-on"></i>) from rendering and
        will not allow the keyboard shortcuts to render.`,
        "icon": `<i class="fas fa-toggle-on"></i>`
    },
    {"name": "hide_reloadbutton",
        "description": `Hides the reload button`,
        "icon": `<i class="fas fa-redo"></i>`
    },
    {"name": "hide_layersbutton",
        "description":  `Will stop the info button (<i class="fas fa-layer-group"></i>) from rendering and
        will not allow the keyboard shortcuts to render.`,
        "icon": `<i class="fas fa-layer-group"></i>`
    },
    {"name": "hide_nextbuttons",
        "description": `Will stop the prev (<i class="fas fa-arrow-left"></i>) 
        and next buttons (<i class="fas fa-arrow-right"></i>) from rendering 
        and will not allow the keyboard shortcuts to render.`,
        "icon": `<i class="fas fa-arrow-left"></i><i class="fas fa-arrow-right"></i>`
    },
    {"name": "hide_fullscreenbutton",
        "description": `Will stop the fullscreen button (<i class="fas fa-expand"></i>) from rendering and
        will not allow the keyboard shortcuts to render.`,
        "icon": `<i class="fas fa-expand"></i>`
    },
    {"name": "hide_shortcutbutton",
        "description": `Will stop the shortcuts button (<i class="fas fa-keyboard"></i>) from rendering and
        will not allow the keyboard shortcuts to render.`,
        "icon": `<i class="fas fa-keyboard"></i>`
    },
    {"name": "hide_textoverlaybutton",
        "description": `Will stop the textoverlay button (<i class="fas fa-align-justify"></i>) from rendering and
        will not allow the keyboard shortcuts to render.`,
        "icon": `<i class="fas fa-align-justify"></i>`
    },
    {"name": "hide_annotationtext",
        "description": `This will hide the annotation text 
        associated with annotation while still allowing for the box to
        appear for overlays and tags`,
        "icon": 'annotation text'
    },
    {"name": "transcription",
        "description": `For annotations that contain transcriptions. 
        This will combine all annotations that the annotation recognizes as a transcription. 
        This requires a purpose of transcribing in W3 annotations 
        or a type of cnt:ContentAsText in OpenAnnotation standards. 
        If there are multiple annotations the transcription will display 
        first with this setting. 
        Enable the textfirst setting to set the comments first.`
    },
    {"name": "textfirst",
        "description": `Will show the commenting annotations before the transcription. 
        Is only effective if used when the transcription setting is enabled.`
    },
    {"name": "toggletextoverlay",
        "description": `Will have the text overlay toggled on the storyboard load. 
        This only works with Annotations that have a OCR text annotations. In OpenAnnotation 
        it is Cnt:ContentAsText with sc:paiting.
        In W3 web annotations it is anything with a purpose of transcribing or supplementing.
        
        `
    }
  ]
},
  iiifmultistoryboard: function() {
    var options = this.iiifstoryboard();
    options.push({
      'name': 'matchclick',
      'description': `When clicking overlays the default is the match
       the position on the image. 
       If you would like to match position in annotation set this to true.`
    })
    options.push({
      'name': 'continousboard',
      'description': `Instead of having annotations being tabbed together, this setting allows
      the users to view all annotations in order (based on board order). All of the annotaitons 
      in the first board will be run through, then the next board, etc.
      `
    })
    return options;
  },
  iiifrangestoryboard: function() {
    return this.iiifstoryboard();
  },
  iiifannotation: function() {
    return [
      {"name": "hide_viewlarger",
        "description": `Hides the “View Full Image” button`,
      },
      {"name": "hide_fullobject",
        "description": `Hides the full object url`
      },
      {"name": "hide_tags",
        "description": `Hides the tags if they exists in the annotation.`
      },
      {"name": "image_only",
        "description": "Will only show the annotated image."
      },
      {"name": "text_only",
        "description": "Will only show the text and tags"
      },
      {"name": "hide_tagcount",
        "description": "Will hide the count number in the tag."
      },
      {"name": "hide_beforeafter",
        "description": "Will hide the before and after results from search views."
      },
      {"name": "table_view",
        "description": `Displays annotations in a table. 
        tagscolor, hide_tagcount do not work with this view`
      },
    ]
  }
}