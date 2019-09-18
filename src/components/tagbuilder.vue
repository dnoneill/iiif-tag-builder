<template>
  <div class="form">
  <input v-model="url" placeholder="Annotation URL" v-on:change="buildTags();">
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
  <div class="groupings">
    <h2>Boolean Settings</h2>
    <p>Multiple can be chosen at the same time; hold down Command (Mac) and Control (Windows) key when clicking on options</p>
    <select v-on:change="buildTags()" multiple="true" v-model="settings['boolean']" v-if="this.booleanoptions.length > 0">
      <option v-for="option in booleanoptions" :value="option" v-bind:key="option">
        {{ option }}
      </option>
    </select>
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
    <div v-for="colorfield in colorpickers" v-bind:key="colorfield">
      <span class="headerblock">{{colorfield}}</span>
      <color-picker v-model="settings[colorfield]" v-if="viewtype && viewtype != 'iiif-annotation'" v-on:color-change="buildTags()" startColor="none" :width=100 :height=100></color-picker>
    </div>
  </div>
  <div class="groupings" v-if="viewtype && viewtype != 'iiif-annotation'" >
    <h2>Tag Color Coding</h2>
    <div v-for="(n, index) in settings.tagscolor" v-bind:key="index + '_tagscolor'">
      <input v-model="settings.tagscolor[index].tagvalue" placeholder="tag field">
      <color-picker v-model="settings.tagscolor[index].color" v-on:color-change="buildTags()" :width=100 :height=100 ></color-picker>
    </div>
    <button @click="addListField('settings', 'tagscolor', {'tagvalue': '', 'color': ''})" v-if="viewtype && viewtype != 'iiif-annotation'">
     New Tag
    </button>
  </div>
  </div>
  {{tag}}
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
      'url': '',
      'manifesturl': '',
      'viewtype': '',
      'props': {},
      'listoptions': [],
      'listtype': '',
      'settings': {'tagscolor': [{'tagvalue': '', 'color': ''}], 'boolean': []},
      'tag': '',
      'booleanoptions': [],
      'boolean': [],
      'textsettings': [],
      'dropdowns': [],
      "overlay": "",
      "colorpickers": [],
      "additionalinfo": [{'title': '', 'content': ''}]
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
      this.booleanoptions = this.viewtype == 'iiif-annotation' ? ['hide_viewlarger', 'hide_fullobject', 'hide_tags', 'image_only', 'text_only'] : ['autorun_onload', 'hide_toolbar',
      'fullpage', 'hide_annocontrols', 'toggleoverlay', 'hide_tags', 'controller', 'togglelayers']
      this.textsettings = this.viewtype == 'iiif-annotation' ? ['height', 'width'] : ['autorun_interval', 'mapmarker', 'tts', 'truncate_length', 'customid','imagecrop','title']
      this.dropdowns = this.viewtype == 'iiif-annotation' ? [] : [{'field': 'fit', 'options': ['fill']},
        {'field': 'panorzoom', 'options': ['pan']}, {'field': 'textposition', 'options': ['top', 'bottom', 'right', 'left']},
        {'field': 'startenddisplay', 'options': ['tags', 'info']}]
      this.colorpickers = this.viewtype == 'iiif-annotation' ? [] : ['overlaycolor', 'activecolor'];
      this.props.layers = this.viewtype == 'iiif-storyboard' ? [{'label':'', 'xywh': '', 'image':'', 'section':'', 'rotation': ''}] : [];
      this.props.images = this.viewtype == 'iiif-multistoryboard' ?  [''] : [];
      this.buildTags()
    },
    getsettings: function() {
      var activesettings = Object.keys(this.settings).filter(element => this.settings[element] != '' && this.settings[element] != 'none');
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
        } else if (field === 'boolean') {
          for (var bool=0; bool<fieldvalue.length; bool++){
            settingstring += `${fieldvalue[bool]}: true;`
          }
        } else {
          settingstring += `${field}: ${fieldvalue};`
        }
      }
      return settingstring;
    },
    getAdditionalInfo: function() {
      var divs = '';
      var id = this.url.split('/').slice(-1)[0].replace('.json', '');
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
    buildTags: function() {
      if (this.url && this.listoptions.length>0){
        var additionalinfo = this.getAdditionalInfo();
        var tag = `${additionalinfo ? additionalinfo : ''}<${this.viewtype} ${this.listtype}='${this.url}'`;
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


.groupings {
  height: 50vh;
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
