<template>
  <div class="form">
  <span v-for="(n, index) in urllength " v-bind:key="index + '_urls'">
    <input v-model="url[index]" value="" placeholder="Annotation URL " v-bind:id="index + '_link'" v-on:change="buildTags();">
  </span>
  <span v-if="viewtype == 'iiif-multistoryboard'">
    <button @click="urllength += 1">
      Add Annotation URL
    </button>
  </span>
  <input v-model="props['manifesturl']" placeholder="Manifest URL (OPTIONAL)" v-on:change="buildTags();">
  <select v-model="viewtype" v-on:change="updateListType()">
    <option disabled value="">Please select one</option>
    <option value="iiif-storyboard">Storyboard</option>
    <option value="iiif-annotation">Image Viewer</option>
    <option value="iiif-multistoryboard">Multistoryboard Viewer</option>
    <option value="iiif-rangestoryboard">Range Storyboard</option>
  </select>
  <select v-model="listtype" v-on:change="buildTags()" v-if="this.listoptions.length > 0">
    <option v-for="option in listoptions" :value="option.value" v-bind:key="option.value">
      {{ option.text }}
    </option>
  </select>
  <h2 v-if="viewtype">Settings</h2>
  <div id="settings" v-if="viewtype" v-bind:class="viewtype">
  <div class="groupings" v-if="booleanoptions.length > 0">
    <h2>Boolean Settings</h2>
    <div v-for="option in booleanoptions" v-bind:key="option">
      <input type="checkbox" id="option" v-bind:value="option" v-model="settings[option]" v-on:change="buildTags()">
      <label v-bind:for="option">{{option}}</label>
    </div>
  </div>
  <div class="groupings">
    <h2>Free Text fields</h2>
    <div v-for="setting in textsettings" v-bind:key="setting">
      <input v-model="settings[setting]" v-bind:placeholder="setting" v-on:change="buildTags()">
    </div>
    <input v-model="props['ws']" placeholder="websocket" v-if="viewtype && viewtype != 'iiif-annotation'"  v-on:change="buildTags()">
    <span id="additionalinfo" v-if="viewtype && viewtype != 'iiif-annotation'">
      <span v-for="(item, index) in additionalinfo" v-bind:key="index + '_additionalinfo'">
        <h3>Additional Info</h3>
        <input v-for="(value, key) in item" v-model="additionalinfo[index][key]" v-bind:placeholder="'Additional Info ' + key" v-bind:key="key">
      </span>
    </span>
    <span id="additionalinfo" v-if="viewtype && viewtype == 'iiif-storyboard'">
      <div v-for="(layer, index) in props.layers" v-bind:key="index + '_layers'">
        <h4>Layer {{index+1}}</h4>
        <input v-for="(value, key) in layer" v-model="props.layers[index][key]" v-bind:placeholder="'Layer ' + (index+1) + ' ' + key" v-bind:key="key" v-on:change="buildTags()">
      </div>
      <button @click="addLayer">
       Add Additional Layer
      </button>
    </span>
    <span id="additionalinfo" v-if="viewtype && viewtype == 'iiif-multistoryboard'">
      <div v-for="(image, index) in props.images" v-bind:key="index + '_images'">
        <h4>Image {{index+1}}</h4>
        <input v-model="props.images[index]" v-bind:placeholder="'Image ' + (index+1) + ' '" v-on:change="buildTags()">
      </div>
      <button @click="addListField('props', 'images', '')">
       Add Additional Image
      </button>
    </span>
  </div>
  <div class="groupings" v-if="viewtype && viewtype != 'iiif-annotation'">
    <h2>CSS</h2>
    <div v-for="(style, index) in cssfields" v-bind:key="index + '_css'">
      <input type="checkbox" id="style.tag" v-bind:value="style.tag" v-model="css" v-on:change="buildTags()">
      <label v-bind:for="style.tag">Hide <span v-html="style.icon"></span></label>
    </div>
  </div>
  <div class="groupings" v-if="viewtype && viewtype != 'iiif-annotation'">
    <h2>Dropdowns</h2>
    <p>Choose from one of the options</p>
    <div v-for="dropdown in dropdowns" v-bind:key="dropdown.field">
      {{dropdown.field}}: <select  v-on:change="buildTags()" v-model="settings[dropdown.field]">
        <option value=""></option>
        <option v-for="option in dropdown.options" v-bind:key="option">{{option}}</option>
      </select>
    </div>
  </div>
  <div class="groupings" v-if="viewtype && viewtype != 'iiif-annotation'">
    <h2>Color Choosers</h2>
    <div v-for="colorfield in colorpickers" v-bind:key="colorfield.field">
      <span class="headerblock">{{colorfield.field}}</span>
      <color-picker v-model="settings[colorfield.field]" v-if="viewtype && viewtype != 'iiif-annotation'" v-on:color-change="buildTags()" v-bind:startColor="colorfield.default" :width=100 :height=100></color-picker>
    </div>
  </div>
  <div class="groupings" v-if="viewtype && viewtype != 'iiif-annotation'" >
    <h2>Tag Color Coding</h2>
    <div v-for="(n, index) in settings.tagscolor" v-bind:key="index + '_tagscolor'">
      <input v-model="settings.tagscolor[index].tagvalue" placeholder="tag field" v-on:change="buildTags()">
      <color-picker v-model="settings.tagscolor[index].color" v-on:color-change="buildTags()" :width=100 :height=100 v-bind:startColor="colorpickers[0].default" ></color-picker>
    </div>
    <button @click="addListField('settings', 'tagscolor', {'tagvalue': '', 'color': ''})" v-if="viewtype && viewtype != 'iiif-annotation'">
     New Tag
    </button>
  </div>
  </div>
  <p class="tagfield">
    {{tag}}
  </p>
  <span v-html="tag"></span>
  </div>
</template>

<script>
import ColorPicker from 'vue-color-picker-wheel';
export default {
  name: 'tagbuilder',
  components: {
    ColorPicker
  },
  data: function() {
    return {
      'url': [],
      'manifesturl': '',
      'viewtype': '',
      'props': {},
      'listoptions': [],
      'listtype': '',
      'settings': {},
      'tag': '',
      'booleanoptions': [],
      'textsettings': [],
      'dropdowns': [],
      "overlay": "",
      "colorpickers": [],
      "additionalinfo": [{'title': '', 'content': ''}],
      "cssfields": [],
      "css": [],
      "urllength": 1
    }
  },
  created() {
  },
  methods: {
    addListField: function(dict, dictfield, data) {
      this[dict][dictfield].push(data);
      this.buildTags();
    },
    addLayer: function() {
      this.props.layers.push({'label':'', 'xywh': '', 'image':'', 'section':'', 'rotation': ''})
    },
    addImage: function() {
      this.props.images.push('')
    },
    updateListType: function() {
      this.css = [];
      this.props = {};
      this.urllength = 1;
      this.url = this.url.length > 0 ? [this.url[0]] : [];
      this.settings = {'tagscolor': [{'tagvalue': '', 'color': ''}]};
      this.additionalinfo = [{'title': '', 'content': ''}];
      if (this.viewtype == 'iiif-annotation' || this.viewtype == 'iiif-storyboard') {
        this.listoptions = [{'value': 'annotationlist', 'text': 'Annotation List', 'selected': true}, {'value': 'annotationurl', 'text': 'Single Annotation'}]
      }
      if (this.viewtype == 'iiif-multistoryboard') {
        this.listoptions = [{'value': 'annotationlists', 'text': 'Annotation List', 'selected': true}, {'value': 'annotationurls', 'text': 'Single Annotation'}]
      }
      if (this.viewtype == 'iiif-rangestoryboard') {
        this.listoptions = [{'value': 'rangeurl', 'text': 'Range URL', 'selected': true}]
      }
      this.listtype = this.listoptions[0]['value'];
      this.booleanoptions = this.viewtype == 'iiif-annotation' ? ['hide_viewlarger', 'hide_fullobject', 'hide_tags', 'image_only', 'text_only', 'hide_tagcount'] : ['autorun_onload', 'hide_toolbar',
      'fullpage', 'hide_annocontrols', 'toggleoverlay', 'hide_tags', 'controller', 'togglelayers', 'hide_tagcount']
      this.textsettings = this.viewtype == 'iiif-annotation' ? ['height', 'width'] : ['autorun_interval', 'mapmarker', 'tts', 'truncate_length', 'customid','imagecrop','title']
      this.dropdowns = this.viewtype == 'iiif-annotation' ? [] : [{'field': 'fit', 'options': ['fill']},
        {'field': 'panorzoom', 'options': ['pan']}, {'field': 'textposition', 'options': ['top', 'bottom', 'right', 'left']},
        {'field': 'startenddisplay', 'options': ['tags', 'info']}]
      this.colorpickers = this.viewtype == 'iiif-annotation' ? [] : [{'field': 'overlaycolor', 'default': '#add8e6'}, {'field' :'activecolor', 'default': '#90ee90'}];
      this.props.layers = this.viewtype == 'iiif-storyboard' ? [{'label':'', 'xywh': '', 'image':'', 'section':'', 'rotation': ''}] : [];
      this.props.images = this.viewtype == 'iiif-multistoryboard' ?  [''] : [];
      this.cssfields = this.viewtype == 'iiif-annotation' ? [] : [{'tag': '#header_toolbar', 'icon':'Toolbar'},
        {'tag': '#autoRunButton', 'icon':'<i class="fas fa-magic"></i>'},{'tag': '#infoButton', 'icon':'<i class="fas fa-info-circle"></i>'},
        {'tag': '#overlayButton', 'icon':'<i class="fas fa-toggle-on"></i>'},{'tag': '#zoomInButton', 'icon':'<i class="fas fa-search-plus"></i>'},
        {'tag': '#zoomOutButton', 'icon':'<i class="fas fa-search-minus"></i>'},{'tag': '#homeZoomButton', 'icon':'<i class="fas fa-home"></i>'},
        {'tag': '#previousButton', 'icon':'<i class="fa fa-arrow-left"></i>'},{'tag': '#nextButton', 'icon':'<i class="fa fa-arrow-right"></i>'},
        {'tag': '#fullScreenButton', 'icon':'<i class="fas fa-expand"></i>'},{'tag': '.annotation', 'icon':'Annotation Box'}]
      this.buildTags()
    },
    getsettings: function() {
      var defaultcolors = this.colorpickers.map(element => element.default);
      var activesettings = Object.keys(this.settings).filter(element => this.settings[element] != '' && defaultcolors.indexOf(this.settings[element]) == -1);
      var settingstring = ''
      for (var as=0; as<activesettings.length; as++){
        var field = activesettings[as];
        var fieldvalue = this.settings[field];
        if (field === 'tagscolor') {
          var tagscolordict = {}
          for (var tc=0; tc<fieldvalue.length; tc++){
            var fields = fieldvalue[tc];
            if (fields['tagvalue'] != '') {
              tagscolordict[fields['tagvalue']] = fields['color'];
            }
          }
          if (Object.keys(tagscolordict).length > 0){
            settingstring += `${field}: ${JSON.stringify(tagscolordict)};`
          }
        } else {
          settingstring += `${field}: ${fieldvalue};`
        }
      }
      return settingstring;
    },
    getAdditionalInfo: function() {
      var divs = '';
      var id = this.url ? this.url[0].split('/').slice(-1)[0].replace('.json', '') : '';
      var ids = ''
      for (var ai=0; ai<this.additionalinfo.length; ai++){
        var infodict = this.additionalinfo[ai];
        var itemid = `${id}_${ai}_additionalinfo`;
        if (infodict['content'] && infodict['title']){
          ids += `${itemid};`
          divs += `<div id="${itemid}" title="${infodict['title']}">${infodict['content']}</div>`
        }
      }
      this.settings['additionalinfo'] = ids.slice(0,-1);
      return divs
    },
    getpropstring: function() {
      var propstring = ''
      for (var key in this.props) {
        var value = this.props[key];
        value = key == 'images' ? value.join(";") : value;
        var hasvalue = key == 'layers' && value.length > 0 ? value[0].image :  key == 'images' && value.length > 0 ? value [0]: value;
        value = key == 'layers' ? JSON.stringify(value) : value;
        if (hasvalue && hasvalue.length > 0){
          propstring += ` ${key}='${value}'`
        }
      }
      return propstring
    },
    buildCSS: function() {
      var style = ''
      for (var cs=0; cs<this.css.length; cs++){
        style += cs == 0 ? '<style>' : '' ;
        style += `${this.css[cs]} {display: none;}`
        style += cs == this.css.length - 1 ? '</style>' : '' ;
      }
      return style;
    },
    buildTags: function() {
      if (this.url.length > 0 && this.listoptions.length>0){
        var additionalinfo = this.getAdditionalInfo();
        var getcss = this.buildCSS();
        var tag = `${additionalinfo ? additionalinfo + '<br>' : ''}
          ${getcss ? getcss + '\n' : ''}
          <${this.viewtype} ${this.listtype}='${this.url.join(";")}'`;
        var settings = this.getsettings();
        var propstring = this.getpropstring();
        propstring ? tag += `${propstring}` : '';
        settings ? tag += ` styling='${settings}'` : '' ;
        tag += `></${this.viewtype}>`;
        this.tag = '';
        this.tag = tag;
      }

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#color-wheel {
  display: inline-block;
}
#settings {
  display: inline-flex;
  text-align: center;
}

.tagfield {
  white-space: pre-line;
}

.groupings {
  height: auto;
  max-height: 50vh;
  overflow: scroll;
  width: 20%;
}

.headerblock {
  display:block;
  font-weight: bold;

}
.iiif-annotation .groupings {
  width: 50%;
}

</style>
