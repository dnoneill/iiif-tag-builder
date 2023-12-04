<template>
  <div>
    <div v-if="this.$route.path != '/display'">
      <div class="form">
        <div class="examples" v-if="env.NODE_ENV != 'flask'">
          <a v-bind:href="baseurl + '#/tag-builder?url=https://dnoneill.github.io/annotate/annotations/wh234bz9013-0001-list.json&viewtype=iiif-storyboard'">
          Example with tags</a><br>
          <a v-bind:href="baseurl + '#/tag-builder?url=https%3A%2F%2Fdnoneill.github.io%2Fannotate%2Franges%2Frange.json&viewtype=iiif-storyboard'">
          Example with range. Storyboards have layers.</a><br>
        </div>
      </div>
      <div class="requiredfields">
        <span v-for="(n, index) in urllength " v-bind:key="index + '_urls'">
          <input v-bind:aria-label="'Annotation URL ' + index" v-model="url[index]" value="" placeholder="Annotation URL or Manifest" v-bind:key="index + '_link'" v-on:change="updateListType()">
          <button @click="deleteField('url', index, 'urllength')" v-if="index != 0">
            Delete Annotation URL
          </button>
        </span>
        <span v-if="viewtype == 'iiif-storyboard'">
          <button @click="urllength += 1" aria-label="Add Annotation URL">
            Add Annotation URL
          </button>
        </span>
        <select v-model="viewtype" v-on:change="updateListType()" aria-label="dropdown for storyboard, imageviewer, multistoryboard, range storyboard">
          <option disabled value="">Please select one</option>
          <option value="iiif-storyboard">Storyboard</option>
          <option value="iiif-annotation">Image Viewer</option>
        </select>
        <textarea aria-label="Annotation JSON to be used instead of annotation URL; Will convert to data URI." type=text v-model="annotationtext" placeholder="Annotation JSON to be used instead of annotation URL; Will convert to data URI." v-on:keyup.enter.exact="buildTags()" @keydown.enter.exact.prevent/>
        <div class="savebutton" v-if="tag && apiurl">
          <label for="savetoapi"><b>Filename:</b></label>
          <input id="savetoapi" v-model="apifilename" placeholder="filename for created file">
          <button v-on:click="savetoapi()">Save</button>
        </div>
        <div class="savecollection" v-if="tag && collectionurl && viewtype != 'iiif-rangestoryboard'">
          <label for="savecollection"><b>Collection:</b></label>
          <select v-model="savecollection['title']" aria-label="collection">
            <option value="">New Collection</option>
            <option v-for="collection in parsecollections" v-bind:key="collection" v-bind:value="collection">{{collection}}</option>
          </select>
          <input v-model="savecollection['annotitle']" placeholder="Annotation title" aria-label="annotation title">
          <input v-model="savecollection['description']" placeholder="Annotation description" aria-label="annotation title">
          <input v-model="savecollection['thumbnail']" placeholder="Annotation Thumbnail" aria-label="annotation title">
          <button v-on:click="savetocollection()">Add to Collection</button>
        </div>
      </div>
      <div class="tagfield" v-if="tag && !apiurl" aria-label="copy tag button">
        <div class="tagfieldline">
          <input id="tagdata" v-if="tag" v-bind:value="tag">
          <button v-clipboard="tag">Copy Tag</button>
        </div>
        <hr>
        <div class="tagfieldline">
          <a v-bind:href="displayURL" target="_blank">Static URL</a>
          <button v-clipboard="displayURL">Copy URL</button>
        </div>
      </div>
      <div class="boardbuttons" style="float:right;padding-bottom:20px;">
        <!-- <button v-on:click="undo('last')" class="undobuttons">Undo</button> -->
        <button v-on:click="undo('reset')" class="undobuttons">Reset</button>
      </div>
    </div>
    <div id="livedemo">
      <span v-if="removebuttons.length > 0" style="width: 100%;display: -webkit-box;display: -ms-flexbox;display: flex;height: 22px;">
        <span v-for="button in removebuttons" v-bind:id="'remove' + button" v-bind:key="button"  style="font-size: 2rem;
background-color: #f0f0f0;
color: red;
height: 20px;
font-size: 14px;
border: 2px solid #d3d3d3;
width: 100%;
margin-right: 2px;
position: relative;
width: 100%;
padding: 0;">
          <span v-on:click="removeItem(button)"><i class="fas fa-times"></i></span>
        </span>
      </span>
      <span v-html="comptagcss"></span>
      <span v-html="initialtag" v-bind:key="initialtag"></span>
    </div>
    </div>
</template>
<script>
import shared from './shared';
import axios from 'axios';
// import booleanoptions from '../assets/booleanoptions.js'
// import freetext from '../assets/freetext.js'
// import dropdowns from '../assets/dropdowns.js'
// import cssfields from '../assets/cssfields.js'

var _ = require('lodash');

export default {
  name: 'tagbuilder',
  props: ['apiurl', 'collectionurl', 'collections'],
  data: function() {
    return {
      url: '',
      env: process.env,
      baseurl: '',
      annotationtext: '',
      removebuttons: [],
      settings: {},
      tag: '',
      tagcss: '',
      tagshown: false,
      'savecollection': {'title': '', 'annotitle': '', 'description': '', 'thumbnail': ''}
    }
  },
  created() {
    shared.redirect();
    if (this.$route.path != '/display'){
      window.addEventListener("change", this.changeInSettings);
      window.addEventListener("click", this.changeInSettings);
      window.addEventListener("wheel", this.changeInSettings);
    }
    this.collections ? this.parsecollections = this.parseJSON(this.collections) : '';
    const collectionscript = document.getElementById('collections');
    collectionscript ? this.parsecollections = this.parseJSON(collectionscript.innerHTML) : '';
    this.baseurl = process.env['BASE_URL'];
    this.initialtag = this.buildTags();
  },
  watch: {
     settings: {
      deep: true, 
      handler: function() {
        this.tag = this.buildTags();
        this.updateRouter();
      }
     },
     url: {
      deep: true, 
      handler: function(newVal, oldVal) {
        if (JSON.stringify(newVal) != JSON.stringify(oldVal)) {
           this.initialtag = this.buildTags();
         }
      }
     },
     '$route.query': {
       handler: function(newVal, oldVal) {
         if (JSON.stringify(newVal) != JSON.stringify(oldVal)) {
           this.setParams();
         }
       },
       immediate: true,
       deep: true
     }
  },
  computed: {
    comptagcss: function() {
      return `<style>${this.tagcss}</style>`
    },
    displayURL: function() {
      var settings = JSON.parse(JSON.stringify(this.settings));
      settings['fullpage'] = true;
      var params = {
          url: this.url.join(";"),
          viewtype: this.viewtype,
          manifesturl: this.manifesturl,
          apiurl: this.apiurl,
          settings: JSON.stringify(settings),
      }
      
      const host = window.location.protocol + "//" + location.hostname+(location.port ? ':'+location.port: '');
      const display = this.env.NODE_ENV != 'flask' ? `${host}${this.$router.resolve({ name: 'display', query: params}).href}` : `https://ncsu-libraries.github.io/annona/tools/#/tag-builder${this.$router.resolve({ name: 'display', query: params}).href}`
      return display;
    }
  },
  methods: {
    changeInSettings: function(e) {
      //const basecomp = e.target.id ? e.target : e.target.offsetParent ? e.target.offsetParent : '';
      if (window.annonasettings){
        const newsettings = {...this.settings, ...JSON.parse(JSON.stringify(window.annonasettings))};
        const cleansetting = this.cleanSettings(newsettings);
        this.settings = cleansetting;
      }
    },
    updateListType: function() {
      this.props = {};
      this.settings = {};
      this.url = this.url.length > 1 && this.viewtype == 'iiif-storyboard' ? this.url : [this.url[0]];
      this.url.length > 1 && this.viewtype == 'iiif-storyboard' ? this.url.length : 1;
      this.initialtag = this.buildTags();
    },
    cleanSettings: function(settings) {
      const deleteif = {'toggletextoverlay': [false], 'toggleoverlay': [false],
      'truncate_length': [2], 'autorun_interval': [3], 'startposition': [0], 'zoom': [false], 'startenddisplay': [false,'anno'],
      'title': [settings['title']]
      }
      for (var key in deleteif){
        if (deleteif[key].indexOf(settings[key]) > -1){
          delete settings[key];
        }
      }
      return settings;
    },
    savetoapi: function(){
      axios.post(this.apiurl, {'tag': this.tag, 'slug': this.apifilename, 'url': this.$route.fullPath})
      .then(function (response) {
        console.log(response);
        alert(response.statusText)
      }).catch(function (error) {
        alert(error)
      });
    },
    savetocollection: function() {
      const data = {'add': true, 'annotations': [{'board': this.tag, 'description': this.savecollection['description'],'thumbnail': this.savecollection['thumbnail'], 'title': this.savecollection['annotitle'], 'url': this.url.join(';'), 'viewtype': this.viewtype, 'annotation': ''}], 'title': this.savecollection['title']}
      if (this.annotationtext){
        data['annotations'][0]['annotation'] = this.annotationtext;
        data['annotations'][0]['board'] = this.tag.split('<\/script>')[1];
      }
      if (this.savecollection['title']){
      axios.post(this.collectionurl, data)
      .then(function (response) {
        console.log(response);
        alert('Success!')
      }).catch(function (error) {
        alert(error)
      });
      } else {
        location.href = `${this.collectionurl}?tag=${data['annotations'][0]['board']}&viewtype=${this.viewtype}&url=${this.url.join(';')}&desc=${this.savecollection['description']}&annotitle=${this.savecollection['annotitle']}&annotation=${this.annotationtext}`;
      }
    },
    undo: function(which) {
      const settings = this.parseJSON(JSON.stringify(this.settings));
      if (which == 'last') {
        const key = Object.keys(this.settings).slice(-1)[0];
        delete settings[key];
        this.settings = settings;
      } else if (which == 'reset'){
        this.settings = {};
        this.tagcss = '';
        window.annonasettings = {};
        this.initialtag = this.buildTags();
      }
    },
    setParams: function() {
      var params = this.$route.query;
      this.url = params.url ? params.url.split(';') : [];
      this.urllength = this.url.length > 1 ? this.url.length : 1;
      var viewtype = params.viewtype ? params.viewtype : '';
      viewtype = viewtype.replace('range', '').replace('multi', '')
      this.viewtype = viewtype;
      this.manifesturl = params.manifesturl ? params.manifesturl : '';
      const paramsettings = params.settings ? JSON.parse(params.settings) : {};
      params.apiurl ? this.apiurl = params.apiurl : '';
      this.settings = paramsettings;
      params.props ? this.props = JSON.parse(params.props) : '';
      params.css ? this.css = Object.assign(this.css, JSON.parse(params.css)) : '';
    },
    parseJSON: function(stringjson) {
      try {
        return JSON.parse(stringjson)
      } catch {
        return []
      }
    },
    removeItem: function(button) {
      let settings = this.parseJSON(JSON.stringify(this.settings));
      //this.settings = {}
      if (button == 'prev' || button == 'next'){
        settings[`hide_nextbuttons`] = true;
        this.settings = settings;
        this.tagcss += `#prevButton, #removeprev, #nextButton, #removenext {display: none;}`;
      } else {
        settings[`hide_${button}button`] = true;
        this.settings = settings;
        this.tagcss += `#${button}Button, #remove${button} {display: none;}`;
      }
      //this.$set(this.settings, settings);
    },
    getsettings: function() {
      var settingstring = ''
      for (var setting in this.settings) {
        const settingkeys = Object.keys(this.settings[setting]);
        if (settingkeys.length > 0 && settingkeys[0] != "0"){
            settingstring += `${setting}: ${JSON.stringify(this.settings[setting])};`
        } else {
          settingstring += `${setting}: ${this.settings[setting]};`
        }
      }
      return settingstring
    },
    updateRouter: function() {
      const settings = JSON.stringify(this.settings);
      var params = {
          url: this.url.join(";"),
          viewtype: this.viewtype,
          manifesturl: this.manifesturl,
          apiurl: this.apiurl,
          settings: settings,
      }
      if (JSON.stringify(this.$route.query) != JSON.stringify(params)){
        this.$router.push({
          name: this.$route.name,
          query: params
        }).catch(err => {console.log('router error'); console.log(err)});
      } else {
        return false;
      }
    },
    buildTags: function() {
      if ((this.url.length > 0  || this.annotationtext.length > 0) && this.viewtype != ''){
        var scriptTag;
        if (this.annotationtext) {
          var dataUri = "base64," + btoa(unescape(encodeURIComponent(this.annotationtext)));
          this.url = [dataUri];
        }
        if (this.apiurl && !this.apifilename){
          this.apifilename = this.url[0].split('/').slice(-1)[0].replace('.json', '')
        } 
        var urlprop = 'annotationurl'
        if (this.viewtype == 'iiif-storyboard'){
          urlprop = 'url';
        }
        var tag = `<${this.viewtype} ${urlprop}='${this.url.join(";")}'`;
        var settings = this.getsettings();
        //var propstring = this.getpropstring();
        this.manifesturl ? tag += ` manifesturl='${this.manifesturl}'` : '';
        // propstring ? tag += `${propstring}` : '';
        settings ? tag += ` styling='${settings}'` : '' ;
        tag += `></${this.viewtype}>`;
        
        var vue = this;
        setTimeout(() => {
          var toolbarbutton = document.getElementsByClassName('toolbaractive');
          vue.removebuttons = [];
          for (var tb=0; tb<toolbarbutton.length; tb++){
            vue.removebuttons.push(toolbarbutton[tb].id.replace('Button', ''));
          }
        }, "220")
        return tag.trim();
      }
    },
    

  }
}
</script>
<style scoped>
.headerblock {
  display:block;
  font-weight: bold;

}
.iiif-annotation#settings {
  grid-template-columns: auto auto auto auto;
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
  position: fixed;
  top: 40px;
  right: 20px;
  z-index: 400000;
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
  position: relative;
}

.savebutton input {
  max-width: 50%;
}
.savebutton button {
  background-color:teal;
  border: none;
  color: white;
  padding: 10px 32px;
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

.site-footer {
  display: none;
}

.infobutton {
  background: none;
  color: inherit;
	border: none;
	padding: 0;
	font: inherit;
	cursor: pointer;
	outline: inherit;
}
.collapsible {
  background-color: #d8f8ea;
  color: black;
  cursor: pointer;
  padding: 18px;
  border: none;
  text-align: left;
  outline: none;
}

.content {
  padding: 0 18px;
  overflow: hidden;
  background-color: #eefcf6;
}
</style>