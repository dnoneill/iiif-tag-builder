<template>
  <div>
    <div class="form" v-if="this.$route.path != '/display'">
    <button @click="closeFullpage" class="buttons closebutton" v-if="settings.fullpage && fullpage">Close <i class="fa fa-times"></i></button>
    <div class="examples" v-if="env.NODE_ENV != 'flask'">
      <a v-bind:href="baseurl + '#/tag-builder?url=https%3A%2F%2Fdnoneill.github.io%2Fannotate%2Fannotations%2Ffullbayeux-list.json&viewtype=iiif-storyboard&listtype=annotationlist&settings=%7B%22tagscolor%22%3A%5B%7B%22tagvalue%22%3A%22%22,%22color%22%3A%22%22%7D%5D,%22additionalinfo%22%3A%22%22,%22fit%22%3A%22horizontal%22%7D&props=%7B%22layers%22%3A%5B%7B%22label%22%3A%22%22,%22xywh%22%3A%22%22,%22image%22%3A%22%22,%22section%22%3A%22%22,%22rotation%22%3A%22%22%7D%5D,%22images%22%3A%5B%5D%7D'">
      Bayeux Example</a><br>
      <a v-bind:href="baseurl + '#/tag-builder?url=https://dnoneill.github.io/annotate/annotations/wh234bz9013-0001-list.json&viewtype=iiif-storyboard&listtype=annotationlist'">
      Example with tags</a><br>
      <a v-bind:href="baseurl + '#/tag-builder?url=https://dnoneill.github.io/annotate/annotations/ba-obj-722-conservation-list.json&viewtype=iiif-storyboard&listtype=annotationlist'">
      Example with layers</a><br>
      <a v-bind:href="baseurl + '#/tag-builder?url=https%3A%2F%2Fdnoneill.github.io%2Fannotate%2Fannotations%2F131424-list.json&viewtype=iiif-storyboard&listtype=annotationlist&manifesturl=&settings=%7B%22tagscolor%22%3A%5B%7B%22tagvalue%22%3A%22%22,%22color%22%3A%22%23add8e6%22%7D%5D,%22additionalinfo%22%3A%22%22,%22overlaycolor%22%3A%22%23add8e6%22,%22activecolor%22%3A%22%2390ee90%22%7D&props=%7B%22layers%22%3A%5B%7B%22label%22%3A%22%3Ca%20href%3D%5C%5C%27https%3A%2F%2Fwww.wikidata.org%2Fwiki%2FQ4792194%5C%5C%27%3EView%20from%20Arles%3C%2Fa%3E%22,%22xywh%22%3A%22200,200,4750,6513%22,%22image%22%3A%22https%3A%2F%2Ftools.wmflabs.org%2Fzoomviewer%2Fproxy.php%3Fiiif%3DVan_Gogh_-_Weizenfeld_mit_Blick_auf_Arles.jpeg%2Finfo.json%22,%22section%22%3A%22%22,%22rotation%22%3A%22%22%7D%5D,%22images%22%3A%5B%5D%7D'">
      Example with custom layers (Van Gogh)</a><br>
      <a v-bind:href="baseurl + '#/tag-builder?url=https%3A%2F%2Fdnoneill.github.io%2Fannotate%2Fannotations%2F04fbbb28-d5a7-4408-b7da-800c4e65eda3-list.json&viewtype=iiif-storyboard&listtype=annotationlist&manifesturl=&settings=%7B%22tagscolor%22%3A%5B%7B%22tagvalue%22%3A%22%22,%22color%22%3A%22%23add8e6%22%7D%5D,%22additionalinfo%22%3A%22%22,%22overlaycolor%22%3A%22%23add8e6%22,%22activecolor%22%3A%22%2390ee90%22,%22togglelayers%22%3Atrue%7D&props=%7B%22layers%22%3A%5B%7B%22label%22%3A%22x-ray%22,%22xywh%22%3A%22%22,%22image%22%3A%22https%3A%2F%2Fdlcs.io%2Fiiif-img%2F3%2F2%2F8034eb5b-9c90-4471-ad68-52124232ec0c%2Finfo.json%22,%22section%22%3A%22%22,%22rotation%22%3A%22%22%7D%5D,%22images%22%3A%5B%5D%7D'">
      Example with custom layers (x-ray image)</a><br>
      <a v-bind:href="baseurl + '#/tag-builder?url=https%3A%2F%2Fncsu-libraries.github.io%2Fannona%2Fwebannotations%2Fmc00084-001-te0159-000-001-0001-list.json%3Bhttps%3A%2F%2Fncsu-libraries.github.io%2Fannona%2Fwebannotations%2Fua023-015-003-bx0002-004-026-list.json&viewtype=iiif-multistoryboard&listtype=annotationlists&manifesturl=&settings=%7B%22tagscolor%22%3A%5B%7B%22tagvalue%22%3A%22%22,%22color%22%3A%22%23add8e6%22%7D%5D,%22additionalinfo%22%3A%22%22,%22overlaycolor%22%3A%22%23add8e6%22,%22activecolor%22%3A%22%2390ee90%22,%22matchclick%22%3Atrue%7D&props=%7B%22layers%22%3A%5B%5D,%22images%22%3A%5B%22%22%5D%7D&css=%7B%22.content%22%3A%7B%22font-size%22%3A%22%22%7D,%22.annotation%22%3A%7B%22width%22%3A%22%22,%22height%22%3A%22%22,%22margin%22%3A%22%22%7D%7D'">
      Multistoryboard Example</a><br>
      <a href='#/tag-builder?url=https%3A%2F%2Fdnoneill.github.io%2Fannotate%2Fannotations%2F04fbbb28-d5a7-4408-b7da-800c4e65eda3-list.json&viewtype=iiif-multistoryboard&listtype=annotationlists&manifesturl=&settings=%7B%22tagscolor%22%3A%5B%7B%22tagvalue%22%3A%22%22,%22color%22%3A%22%23add8e6%22%7D%5D,%22additionalinfo%22%3A%22%22,%22overlaycolor%22%3A%22%23add8e6%22,%22activecolor%22%3A%22%2390ee90%22%7D&props=%7B%22layers%22%3A%5B%5D,%22images%22%3A%5B%22https%3A%2F%2Fdlcs.io%2Fiiif-img%2F3%2F2%2F8034eb5b-9c90-4471-ad68-52124232ec0c%2Finfo.json%22%5D%7D&css=%7B%22.content%22%3A%7B%22font-size%22%3A%22%22%7D,%22.annotation%22%3A%7B%22width%22%3A%22%22,%22height%22%3A%22%22,%22margin%22%3A%22%22%7D%7D'>
      Multistoryboard Example with custom image</a><br>
      <a v-bind:href="baseurl + '#/tag-builder?url=https%3A%2F%2Fdnoneill.github.io%2Fannotate%2Franges%2Frange.json&viewtype=iiif-rangestoryboard&listtype=rangeurl'">
      Example with range. Storyboards have layers.</a><br>
    </div>
    <div class="savebutton" v-if="tag && apiurl">
      <input v-model="apifilename" placeholder="filename for created file">
      <button v-on:click="savetoapi()">Save</button>
    </div>
    <div class="requiredfields">
      <span v-for="(n, index) in urllength " v-bind:key="index + '_urls'">
        <input v-bind:aria-label="'Annotation URL ' + index" v-model="url[index]" value="" placeholder="Annotation URL " v-bind:key="index + '_link'" v-on:change="updateRouter();">
        <button @click="deleteField('url', index, 'urllength')" v-if="index != 0">
          Delete Annotation URL
        </button>
      </span>
      <span v-if="viewtype == 'iiif-multistoryboard'">
        <button @click="urllength += 1" aria-label="Add Annotation URL">
          Add Annotation URL
        </button>
      </span>
      <input v-model="manifesturl" id="manifesturl" v-on:change="updateRouter();" aria-label="Manifest URL (Optional)" placeholder="Manifest URL (Optional)">
      <select v-model="viewtype" v-on:change="updateListType()" aria-label="dropdown for storyboard, imageviewer, multistoryboard, range storyboard">
        <option disabled value="">Please select one</option>
        <option value="iiif-storyboard">Storyboard</option>
        <option value="iiif-annotation">Image Viewer</option>
        <option value="iiif-multistoryboard">Multistoryboard Viewer</option>
        <option value="iiif-rangestoryboard">Range Storyboard</option>
      </select>
      <select v-model="listtype" v-on:change="updateRouter()" v-if="this.listoptions.length > 0" aria-label="List type (annotation url/list, range url, etc.) dropdown">
        <option v-for="option in listoptions" :value="option.value" v-bind:key="option.value">
          {{ option.text }}
        </option>
      </select>
      <textarea aria-label="Annotation JSON to be used instead of annotation URL; Will not save in the URL parameters so it is unfortunately not shareable." type=text v-model="annotationtext" placeholder="Annotation JSON to be used instead of annotation URL; Will not save in the URL parameters so it is unfortunately not shareable." v-on:keyup.enter.exact="buildTags()" @keydown.enter.exact.prevent/>
    </div>
    <button @click="updateListType" class="buttons clearbutton" v-if="viewtype">Clear all settings</button>

    <h2 v-if="viewtype">Settings</h2>
    <div id="settings" v-if="viewtype" v-bind:class="viewtype">
    <div class="groupings" v-if="booleanoptions.length > 0">
      <h2>Boolean Settings</h2>
      <div v-for="option in booleanoptions" v-bind:key="option">
        <input type="checkbox" v-bind:id="option" v-bind:value="option" v-model="settings[option]" v-on:change="updateRouter()">
        <label v-bind:for="option">{{option}}</label>
      </div>
    </div>
    <div class="groupings">
      <h2>Free Text fields</h2>
      <div v-for="setting in textsettings" v-bind:key="setting">
        <input v-model="settings[setting]" v-bind:placeholder="setting" v-bind:aria-label="setting" v-on:change="updateRouter()">
      </div>
      <input v-model="props['ws']" placeholder="websocket" v-if="viewtype && viewtype != 'iiif-annotation'"  v-on:change="updateRouter()" aria-label="websocket">
      <span id="additionalinfo" v-if="viewtype && viewtype != 'iiif-annotation'">
        <span v-for="(item, index) in additionalinfo" v-bind:key="index + '_additionalinfo'">
          <h3>Additional Info</h3>
          <textarea v-bind:aria-label="'Additional Info ' + key + '; Shift+Enter creates a new line'" v-for="(value, key) in item" type=text v-model="additionalinfo[index][key]" v-bind:placeholder="'Additional Info ' + key + '; Shift+Enter creates a new line'" v-bind:key="key" v-on:keyup.enter.exact="buildTags()" @keydown.enter.exact.prevent/>
        </span>
      </span>
      <span id="additionalinfo" v-if="viewtype && viewtype == 'iiif-storyboard'">
        <div v-for="(layer, index) in props.layers" v-bind:key="index + '_layers'">
          <h4>Layer {{index+1}}</h4>
          <input v-for="(value, key) in layer" v-model="props.layers[index][key]" v-bind:aria-label="'Layer ' + (index+1) + ' ' + key" v-bind:placeholder="'Layer ' + (index+1) + ' ' + key" v-bind:key="key" v-on:change="updateRouter()">
          <button @click="deleteField('props', index, 'layers')" aria-label="delete layer">
            Delete Layer
          </button>
        </div>
        <button aria-label="add additional layer" @click="addListField('props', 'layers', {'label':'', 'xywh': '', 'image':'', 'section':'', 'rotation': ''})">
        Add Additional Layer
        </button>
      </span>
      <span id="additionalinfo" v-if="viewtype && viewtype == 'iiif-multistoryboard'">
        <div v-for="(image, index) in props.images" v-bind:key="index + '_images'">
          <h4>Image {{index+1}}</h4>
          <input v-bind:aria-label="'Image ' + (index+1) + ' '" v-model="props.images[index]" v-bind:placeholder="'Image ' + (index+1) + ' '" v-on:change="updateRouter()">
          <button @click="deleteField('props', index, 'images')">
            Delete Image
          </button>
        </div>
        <button @click="addListField('props', 'images', '')">
        Add Additional Image
        </button>
      </span>
    </div>
    <div class="groupings" v-if="viewtype">
      <h2>CSS</h2>
      <div v-for="(style, index) in cssfields" v-bind:key="index + '_css'">
        <span v-if="style.icon">
        <input type="checkbox" v-bind:id="style.tag" v-model="css[style.tag]" v-on:change="updateRouter()">
        <label v-bind:for="style.tag" v-bind:aria-label="'hide ' + style.tag">Hide <span v-html="style.icon"></span></label>
        </span>
        <span v-else-if="style.field" v-for="field in style.field" v-bind:key="field">
          <input v-if="field && style.tag" v-bind:aria-label="style.tag + '(css class/tag) ' + field + '(css field)'" v-bind:placeholder="style.tag + ' ' + field" v-model="css[style.tag][field]" v-bind:id="style.tag + ' ' + field" v-on:change="updateRouter()">
        </span>
      </div>
      <textarea aria-label="Free text CSS field. Add any css. Shift+Enter creates a new line" placeholder="Free text CSS field. Add any css. Shift+Enter creates a new line" type=text v-model="css['freetextcss']" v-on:keyup.enter.exact="buildTags()" @keydown.enter.exact.prevent/>
    </div>
    <div class="groupings" v-if="viewtype && viewtype != 'iiif-annotation'">
      <h2>Dropdowns</h2>
      <p>Choose from one of the options</p>
      <div v-for="dropdown in dropdowns" v-bind:key="dropdown.field">
        <label v-bind:for="dropdown.field">{{dropdown.field}}:</label>
        <select v-bind:id="dropdown.field" v-on:change="updateRouter()" v-model="settings[dropdown.field]">
          <option value=""></option>
          <option v-for="option in dropdown.options" v-bind:key="option">{{option}}</option>
        </select>
      </div>
    </div>
    <div class="groupings" v-if="viewtype && viewtype != 'iiif-annotation'">
      <h2>Color Choosers</h2>
      <div v-for="colorfield in colorpickers" v-bind:key="colorfield.field">
        <span class="headerblock">{{colorfield.field}}</span>
        <color-picker v-model="settings[colorfield.field]" v-if="viewtype && viewtype != 'iiif-annotation'" v-on:color-change="updateRouter()" v-bind:startColor="colorfield.default" :width=100 :height=100></color-picker>
      </div>
    </div>
    <div class="groupings">
      <h2>Tag Color Coding</h2>
      <div v-for="(n, index) in settings.tagscolor" v-bind:key="index + '_tagscolor'">
        <input v-model="settings.tagscolor[index].tagvalue" placeholder="tag field" v-bind:aria-label="'tag field ' + index+1" v-on:change="updateRouter()">
        <color-picker v-model="settings.tagscolor[index].color" v-on:color-change="updateRouter()" :width=100 :height=100 v-bind:startColor="colorpickers[0].default" ></color-picker>
        <button style="vertical-align: top" @click="deleteField('settings', index, 'tagscolor')">
        Delete Tag
        </button>
      </div>
      <button @click="addListField('settings', 'tagscolor', {'tagvalue': '', 'color': ''})">
      New Tag
      </button>
    </div>
    </div>
    <div class="tagfield" v-if="tag" aria-label="copy tag button">
      <div class="tagfieldline">
        <div id="tagdata">{{tag}}</div>
        <button v-clipboard="tag">Copy Tag</button>
      </div>
      <hr>
      <div class="tagfieldline">
        <a v-bind:href="displayURL" target="_blank">Display URL</a>
        <button v-clipboard="displayURL">Copy URL</button>
      </div>
      
    </div>
    </div>
    <div id="livedemo">
      <span v-html="tag"></span>
    </div>
  </div>
</template>

<script>
import ColorPicker from 'vue-color-picker-wheel';
import shared from './shared';
import axios from 'axios';

export default {
  name: 'tagbuilder',
  components: {
    ColorPicker
  },
  props: ['apiurl'],
  data: function() {
    return {
      'url': [],
      'apifilename': '',
      'manifesturl': '',
      'viewtype': '',
      'props': {},
      'listoptions': [],
      'listtype': '',
      'settings': {'tagscolor': [{'tagvalue': '', 'color': ''}]},
      'tag': '',
      'annotationtext':'',
      'booleanoptions': [],
      'textsettings': [],
      'dropdowns': [],
      "overlay": "",
      "colorpickers": [{'field': 'overlaycolor', 'default': '#add8e6'}, {'field' :'activecolor', 'default': '#90ee90'}],
      "additionalinfo": [{'title': '', 'content': ''}],
      "cssfields": [],
      "css": {},
      "urllength": 1,
      "fullpage": true,
      "baseurl": '',
      "env": process.env
    }
  },
  created() {
    shared.redirect();
    this.baseurl = process.env['BASE_URL'];
    if (this.$route.path == '/display') {
      const header = document.getElementsByTagName('header')[0];
      const footer = document.getElementsByTagName('footer')[0];
      if (header){
        header.style.display = 'none';
        footer.style.display = 'none';
      }
    }
  },
  mounted() {
  },
  watch: {
     '$route.query': {
       handler: function(newVal, oldVal) {
         if (JSON.stringify(newVal) != JSON.stringify(oldVal)) {
           this.setParams();
         }
       },
       immediate: true
     }
  },
  methods: {
    deleteField: function(field, index, count) {
      var secondary = this[count] ? this[count] -= 1 : 'issecondary';
      secondary == 'issecondary' ? this[field][count].splice(index, 1) : this[field].splice(index, 1);
      this.updateRouter();
    },
    setParams: function() {
      var params = this.$route.query;
      this.listtype = params.listtype ? params.listtype : '';
      this.url = params.url ? params.url.split(';') : [];
      this.urllength = this.url.length > 1 ? this.url.length : 1;
      this.viewtype = params.viewtype ? params.viewtype : '';
      this.manifesturl = params.manifesturl ? params.manifesturl : '';
      this.setDefaults();
      params.apiurl ? this.apiurl = params.apiurl : '';
      params.settings ? this.settings = JSON.parse(params.settings) : '';
      params.props ? this.props = JSON.parse(params.props) : '';
      params.css ? this.css = JSON.parse(params.css) : '';
      this.buildTags();
    },
    addListField: function(dict, dictfield, data) {
      this[dict][dictfield].push(data);
      this.updateRouter();
    },
    setDefaults: function() {
      this.tag = '';
      if (this.viewtype == 'iiif-annotation' || this.viewtype == 'iiif-storyboard') {
        this.listoptions = [{'value': 'annotationlist', 'text': 'Annotation List', 'selected': true}, {'value': 'annotationurl', 'text': 'Single Annotation'}]
      }
      if (this.viewtype == 'iiif-multistoryboard') {
        this.listoptions = [{'value': 'annotationlists', 'text': 'Annotation List', 'selected': true}, {'value': 'annotationurls', 'text': 'Single Annotation'}]
      }
      if (this.viewtype == 'iiif-rangestoryboard') {
        this.listoptions = [{'value': 'rangeurl', 'text': 'Range URL', 'selected': true}]
      }
      this.booleanoptions = this.viewtype == 'iiif-annotation' ? ['hide_viewlarger', 'hide_fullobject', 'hide_tags', 'image_only', 'text_only', 'hide_tagcount', 'hide_beforeafter', 'table_view'] : ['autorun_onload',
      'fullpage', 'toggleoverlay', 'controller', 'togglelayers', 'hide_tagcount', 'overlaynext', 'hide_annocontrols', 'hide_toolbar',
      'hide_tagsbutton', 'hide_autorunbutton', 'hide_infobutton', 'hide_overlaybutton', 'hide_layersbutton', 'hide_nextbuttons', 'hide_fullscreenbutton', 'hide_shortcutbutton', 'hide_annotationtext', 'transcription', 'textfirst']
      this.viewtype == 'iiif-multistoryboard' ? this.booleanoptions.push('matchclick') : ''
      this.textsettings = this.viewtype == 'iiif-annotation' ? ['height', 'width'] : ['autorun_interval', 'mapmarker', 'tts', 'truncate_length', 'customid','imagecrop','title', 'startposition']
      this.dropdowns = this.viewtype == 'iiif-annotation' ? [] : [{'field': 'fit', 'options': ['fill', 'horizontal']},
        {'field': 'panorzoom', 'options': ['pan']}, {'field': 'textposition', 'options': ['top', 'bottom', 'right', 'left']},
        {'field': 'startenddisplay', 'options': ['tags', 'info', 'transcription', 'keyboard']}, {'field': 'annoview', 'options': ['sidebyside', 'collapse']}, {'field': 'toolbarposition', 'options': ['bottom']}]
      this.props.layers = this.viewtype == 'iiif-storyboard' ? [{'label':'', 'xywh': '', 'image':'', 'section':'', 'rotation': ''}] : [];
      this.props.images = this.viewtype == 'iiif-multistoryboard' ?  [''] : [];
      this.cssfields = this.viewtype == 'iiif-annotation' ? [{'tag': '#content', 'field': ['font-size']}, {'tag': '#tags', 'field': ['font-size']}] : [
        {'tag': '#zoomInButton', 'icon':'<i class="fas fa-search-plus"></i>'},
        {'tag': '#zoomOutButton', 'icon':'<i class="fas fa-search-minus"></i>'},{'tag': '#homeZoomButton', 'icon':'<i class="fas fa-home"></i>'},
        {'tag': '.fullcontent', 'icon':'Content Box'},
        {'tag': '.content', 'field': ['font-size']}, {'tag': '.annotation', 'field': ['width', 'height', 'margin']}]
      this.css = {}
      for (var cf=0; cf<this.cssfields.length; cf++){
        var element = this.cssfields[cf]
        element.field ? this.css[element.tag] = {} : ''
        if (element.field){
          for (var ef=0; ef<element.field.length; ef++){
            this.css[element.tag][element.field[ef]] = '';
          }
        }
      }
    },
    updateListType: function() {
      this.props = {};
      this.settings = {'tagscolor': [{'tagvalue': '', 'color': ''}]};
      this.additionalinfo = [{'title': '', 'content': ''}];
      this.url = this.url.length > 1 && this.viewtype == 'iiif-multistoryboard' ? this.url : [this.url[0]];
      this.url.length > 1 && this.viewtype == 'iiif-multistoryboard' ? this.url.length : 1;
      this.setDefaults();
      var keepexisting = this.listoptions.filter(element => element.value == this.listtype);
      this.listtype = keepexisting.length > 0 ? this.listtype : this.listoptions[0]['value'];
      this.updateRouter();
    },
    savetoapi: function(){
      axios.post(this.apiurl, {'tag': this.tag, 'slug': this.apifilename})
      .then(function (response) {
        console.log(response);
      }).catch(function (error) {
        alert(error)
      });
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
              tagscolordict[fields['tagvalue'].trim()] = fields['color'];
            }
          }
          if (Object.keys(tagscolordict).length > 0){
            settingstring += `${field}: ${JSON.stringify(tagscolordict)};`
          }
        } else {
          settingstring += `${field}: ${fieldvalue};`
        }
        if (field == 'fullpage') {
          this.fullpage = true;
        }
      }
      return settingstring;
    },
    closeFullpage: function() {
      this.fullpage = false;
      document.getElementsByTagName(this.viewtype)[0].childNodes[0].setAttribute("class", "storyboard_viewer");
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
          divs += `<div id="${itemid}" title="${infodict['title']}">${infodict['content'].replace(/\n/g, "<br />")}</div>`
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
        value = key == 'layers' ? JSON.stringify(value).replace(/'/g, '\\"') : value;
        if (hasvalue && hasvalue.length > 0){
          propstring += ` ${key}='${value}'`
        }
      }
      return propstring
    },
    buildCSS: function() {
      var style = ''
      for (var key in this.css){
        if (this.css[key] == true) {
          style += `${key} {display: none!important;}`
        } else if (key != 'freetextcss') {
          for (var cssfield in this.css[key]){
            var value = this.css[key][cssfield];
            if (value){
              key = cssfield == 'font-size' ? `${key} > * > *` : key;
              style += `${key} {${cssfield}: ${value}!important}`
            }
          }
        } else {
          style += this.css[key];
        }
      }
      style = style != '' ? '<style>' + style + '</style>' : style;
      return style;
    },
    updateRouter: function() {
      var params = {
          url: this.url.join(";"),
          viewtype: this.viewtype,
          listtype: this.listtype,
          manifesturl: this.manifesturl,
          apiurl: this.apiurl,
          settings: JSON.stringify(this.settings),
          props: JSON.stringify(this.props),
          css: JSON.stringify(this.css)
      }
      if (JSON.stringify(this.$route.query) != JSON.stringify(params)){
        this.$router.push({
          name: 'tagbuilder',
          query: params
        }).catch(err => {console.log('router error'); console.log(err)});
      } else {
        return false;
      }
    },
    buildTags: function() {
      if (this.url.length > 0 && this.listoptions.length>0 || this.annotationtext.length > 0 && this.listoptions.length>0){
        var scriptTag;
        if (this.annotationtext) {
          scriptTag = shared.createScriptTag(this.annotationtext);
          this.url = [scriptTag['id']];
        }
        if (this.apiurl){
          this.apifilename = this.url[0].split('/').slice(-1)[0].replace('.json', '')
        } 
        var additionalinfo = this.getAdditionalInfo();
        var getcss = this.buildCSS();
        var tag = `${additionalinfo ? additionalinfo + '\n' : ''}
          ${getcss ? getcss + '\n' : ''}<${this.viewtype} ${this.listtype}='${this.url.join(";")}'`;
        var settings = this.getsettings();
        var propstring = this.getpropstring();
        this.manifesturl ? tag += ` manifesturl='${this.manifesturl}'` : '';
        propstring ? tag += `${propstring}` : '';
        settings ? tag += ` styling='${settings}'` : '' ;
        tag += `></${this.viewtype}>`;
        this.tag = '';
        this.tag = scriptTag ? `${scriptTag['outerHTML']}${tag.trim()}` : tag.trim();
      }
    }
  },
  computed: {
    displayURL: function() {
      const params = this.$route.query;
      const host = window.location.protocol + "//" + location.hostname+(location.port ? ':'+location.port: '');
      return `${host}${this.$router.resolve({ name: 'display', query: params}).href}`;
    },
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

#color-wheel {
  display: inline-block;
  width: 100%!important;
}
#settings {
  display: inline-flex;
  text-align: center;
  width: 100%;
}



.groupings {
  height: auto;
  max-height: 50vh;
  overflow: scroll;
  width: 16.6666%;
}

.groupings > * {
  width: 100%;
  word-break: break-word;
}

.groupings input:not([type='checkbox']), textarea {
  width: 95%!important;
}
.headerblock {
  display:block;
  font-weight: bold;

}
.iiif-annotation .groupings {
  width: 50%;
}

.tagfield {
  width: calc(100% - 30px);
  display: grid;
  padding: 15px;
  white-space: pre-line;
  overflow: scroll;
  outline: 2px solid black;
  margin: 20px 0px 20px;

}

.tagfield div {
  overflow-wrap: break-word;
}

.tagfieldline {
  display: flex;
  align-items: center;
  justify-content: center;
}

.tagfield button {
  margin-left: 15px;
  text-align: center;
  -ms-align-items: center;
  -ms-justify-content: center;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  width: 10%;
  border-radius: 12px;
  font-weight: 900;
  position: sticky;
  top: 0;
}

.buttons {
  z-index: 1000;
  margin-left: 15px;
  text-align: center;
  -ms-align-items: center;
  -ms-justify-content: center;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  width: 10%;
  border-radius: 12px;
  font-weight: 900;
}

.closebutton {
  position: absolute;
  right: 20px;
  bottom: 20px;
}

.clearbutton {
  float: right;
  margin: 20px 0px 0px;
  width: auto!important;
}

.form {
  width: 100%;
}
input[type="text"]{
border: 1px solid #ddd;

}
input:not([type='checkbox']), textarea, button {
  -webkit-appearance: initial;
}
select {
  -webkit-appearance: menulist-button;
}

.savebutton {
  position: fixed;
  right: 1em;
  top: 5em;
  z-index: 400000;
}

.savebutton button {
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}



hr {
  border:solid 1px black;
  width: 96%;
}


</style>
