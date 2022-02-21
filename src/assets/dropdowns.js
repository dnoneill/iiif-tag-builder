

export default {
    iiifstoryboard: function () {
      return [
        {
          "name": "fit",
          "options": [
            "fill",
            "horizontal",
            "vertical"
          ],
          "description": `By default the image is fit whichever side of the image has longest edge. 
          <b>Horizontal: </b>Fits the image to the viewer on the horizontal (x-axis).
          <b>Vertical: </b>Fits the image to the viewer on the vertical (y-axis).
          <b>Fill: </b> Fits the image to the viewer so there is no margins.
          These options can mean poritions of the image are not visible based on your image.`
        },
        {
          "name": "sortannos",
          "options": [
            "horizontal",
            "vertical",
            "longedge"
          ],
          "description": `By default the annotations are sorted by the order in the annotation list. This setting allows you to tab through annotations based on their position on the image instead of their position in the list.  
          <b>Horizontal: </b>Goes through annotations based on position on the x-axis.
          <b>Vertical: </b>Goes through annotations based on position on the y-axis.
          <b>Longedge: </b> Figures out the longest edge on the image (x/y axis). Goes through annotations based on longest edge.`
        },
        {
          "name": "panorzoom",
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
          "name": "textposition",
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
          "name": "startenddisplay",
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
          "name": "annoview",
          "options": [
            "sidebyside",
            "collapse",
            "scrollview"
          ],
          "description": ` Will change how the annotation and information box style. 
          <b>Collapse:<b> positions the box on top of the viewer and allows for the bar to collapse. 
          <b>Side by side:</b> is similar to the default but it is positioned next to the viewer`
        },
        {
          "name": "toolbarposition",
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