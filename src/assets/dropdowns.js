

export default {
    iiifstoryboard: function () {
      return [
        {
          "field": "fit",
          "options": [
            "fill",
            "horizontal"
          ],
          "description": `By default the image is fit vertically 
          to the viewer. 
          <b>Horizontal: </b>Fits the image to the viewer on the horizontal (x-axis).
          <b>Fill: </b> Fits the image to the viewer so there is no margins.
          These options can mean poritions of the image are not visible based on your image.`
        },
        {
          "field": "panorzoom",
          "options": [
            "pan"
          ],
          "description": `By default when clicking or tabbing through
           annotations the viewer will zoom into the annotated area. 
            Updating this setting to “pan”
            will keep the current zoom level and 
            recenter the image to the clicked annotation`
        },
        {
          "field": "textposition",
          "options": [
            "top",
            "bottom",
            "right",
            "left"
          ],
          "description": `By default this option is
           and the annotation text appears in the top left hand corner of the viewer. 
          This setting moves the box where the annotation appears 
          to the left, right, bottom, or top of annotated area.
           Each option has a dedicated CSS class based on the option name (.top, .right, etc.)`
        },
        {
          "field": "startenddisplay",
          "options": [
            "tags",
            "info",
            "transcription",
            "keyboard"
          ],
          "description": `By default the first and last items are the full image
           without a text box. 
           This setting allows for the option selected to be shown
          for the first and last item.`
        },
        {
          "field": "annoview",
          "options": [
            "sidebyside",
            "collapse"
          ],
          "description": ` Will change how the annotation and information box style. 
          <b>Collapse:<b> positions the box on top of the viewer and allows for the bar to collapse. 
          <b>Side by side:</b> is similar to the default but it is positioned next to the viewer`
        },
        {
          "field": "toolbarposition",
          "options": [
            "bottom"
          ],
          "description": `
          Will move the toolbar to the bottom of the viewer. 
          The default is the top of the viewer`
        }
      ]
  },
  iiifmultistoryboard: function() {
      return this.iiifstoryboard();
    },
    iiifrangestoryboard: function() {
      return this.iiifstoryboard();
    },
    iiifannotation: function() {
      return []
    }
  }