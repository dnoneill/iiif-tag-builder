export default {
    iiifstoryboard: function () {
        return [
            {
              "icon": "<i class='fas fa-search-plus'></i>",
              "tag": "#zoomInButton",
              "description": `Hide the Zoom in Button`
            },
            {
              "icon": "<i class='fas fa-search-minus'></i>",
              "tag": "#zoomOutButton",
              "description": `Hide the Zoom out Button`
            },
            {
              "icon": "<i class='fas fa-home'></i>",
              "tag": "#homeZoomButton",
              "description": `Hide the Home Button`
            },
            {
              "icon": "Content Box",
              "tag": ".fullcontent",
              "description": `Hide the annotation content box.`
            },
            {
              "field": [
                "font-size"
              ],
              "tag": ".content",
              "description": `change the content box font size`
            },
            {
              "field": [
                "width",
                "height",
                "margin"
              ],
              "tag": ".annotation",
              "description": `change the content box width, height and margins.`
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
        return [
            {
              "field": [
                "font-size"
              ],
              "tag": "#content"
            },
            {
              "field": [
                "font-size"
              ],
              "tag": "#tags"
            }
          ]
    }
}