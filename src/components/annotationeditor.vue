<template>
  <div class="form">
    <div class="requiredfields">
      <input aria-label="Annotation URL" v-model="url" value="" placeholder="Annotation URL" v-on:change="updateRouter();">
      <input v-model="manifesturl" id="manifesturl" v-on:change="updateRouter();" aria-label="Manifest URL (Optional)" placeholder="Manifest URL (Optional)">
      <input v-model="endpointapi" id="endpointapi" v-on:change="updateRouter();" aria-label="Endpoint URL (Optional)" placeholder="Endpoint URL (Optional)">
      <button v-if="originalannotation" v-on:click="downloadAnnotation()">Download Annotation</button>
      <div class="annotationlistcontent" v-if="originalannotation">
        <h2>Annotation List Fields</h2>
        <div v-for="(value, key) in originalannotation"  v-if="value.constructor == String" class="annotationlistfields">
          <label>{{key}}</label>
          <input v-model="originalannotation[key]"></input>
        </div>
      </div>
      <draggable v-model="annotations" draggable=".item" v-bind:id="hasbeenupdated" @change="hasbeenupdated += 1">
        <div v-for="(annotation, index) in originalannotation[bodykey]" :key="index" class="item">
          <button v-on:click="deleteField(index)" v-if="originalannotation[bodykey].length > 1" class="annotationbutton">Delete Annotation {{index + 1}}</button>
          <h2>Annotation {{index + 1}} <i class="fas fa-arrows-alt-v"></i></h2>
          <span v-if="annotation['@id']" v-html="annotations[annotation['@id']]"></span>
          <span v-if="annotation['id']" v-html="annotations[annotation['id']]"></span>
          <div class="annotationtext" v-for="(value, key) in annotation" v-if="value.constructor == String">
            <label>{{key}}</label>
            <input v-model="originalannotation[bodykey][index][key]"></input>
          </div>
          <div v-for="(anno, charindex) in annotation[format['body']]" v-if="annotation[format['body']]" class="annotationbody">
            <h3>Body field {{charindex +1}}</h3>
            <button v-on:click="deleteField(index, charindex)" v-if="annotation[format['body']].length > 1" class="deletebodyfield">Delete body field {{charindex + 1}}</button>
            <div v-for="(value, key) in anno">
              <div class="singleitems" v-if="key != 'items' && key != 'selector'">
                <label>{{key}}</label>
                <input v-if="key.indexOf('type') == -1 && key != 'purpose'" v-model="originalannotation[bodykey][index][format['body']][charindex][key]"></input>
                <select v-if="key.indexOf('type') > -1" v-model="originalannotation[bodykey][index][format['body']][charindex][key]" v-on:change="switchType(index, charindex)">
                  <option v-for="typechoice in format['typechoices']" v-bind:value="typechoice">{{typechoice}}</option>
                </select>
                <select v-if="key == 'purpose'" v-model="originalannotation[bodykey][index][format['body']][charindex][key]">
                  <option v-for="purpose in purposes" v-bind:value="purpose">{{purpose}}</option>
                </select>
              </div>
              <div class="choicefield" v-if="key == 'items'">
                <div v-for="(item, choiceindex) in anno[key]" v-bind:id="'choice_' + choiceindex" class="choiceindex">
                  <h4>Choice {{choiceindex + 1}}</h4>
                  <button v-on:click="deleteField(index, charindex, choiceindex)" v-if="anno[key].length > 1">Delete {{choiceindex + 1}}</button>
                  <span v-for="(choicevalue, choicekey) in item">
                    <div v-if="choicekey != 'selector'">
                      <label>{{choicekey}}</label>
                      <input v-if="choicekey.indexOf('type') == -1 && choicekey != 'purpose'" v-model="item[choicekey]"></input>
                      <select v-if="choicekey.indexOf('type') > -1" v-model="originalannotation[bodykey][index][format['body']][charindex][key][choiceindex][choicekey]" v-on:change="switchType(index, charindex)">
                        <option v-for="typechoice in format['typechoices']" v-bind:value="typechoice">{{typechoice}}</option>
                      </select>
                      <select v-if="choicekey == 'purpose'" v-model="originalannotation[bodykey][index][format['body']][charindex][key][choiceindex][choicekey]">
                        <option v-for="purpose in purposes" v-bind:value="purpose">{{purpose}}</option>
                      </select>
                    </div>
                  </span>
                </div>
                <button v-on:click="addField(index, charindex)">Add Choice Field</button>
              </div>
            </div>
          </div>
          <button v-on:click="addField(index)">Add Another Body Field</button>
        </div>
      </draggable>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import shared from './shared';
import draggable from 'vuedraggable'

export default {
  name: 'annotationeditor',
  components: {
    draggable,
  },
  data: function() {
    return {
      'url': '',
      'manifesturl': '',
      'endpointapi': '',
      'annotations': {},
      'originalannotation': '',
      'annotationorder': [],
      'bodykey': '',
      'update': true,
      'purposes': ['assessing', 'bookmarking', 'classifying', 'commenting', 'describing', 'editing', 'highlighting', 'identifying', 'linking', 'moderating', 'questioning', 'replying', 'tagging'],
      'bodyfields': ['language', 'rights', 'creator', 'textDirection'],
      'w3oakey': {'w3':
        {'type': 'w3', 'body': 'body',
          'typechoices': ['TextualBody', 'Choice', 'Dataset', 'Image', 'Video', 'Sound', 'Text'],
          'fields': ['modified', 'created', 'label'],
          'value': 'value'
        },
        'oa': {'type': 'oa','body':'resource',
          'typechoices':['cnt:ContentAsText', 'oa:Choice', 'dctypes:Dataset', 'dctypes:Image', 'dctypes:Video', 'dctypes:Sound', 'dctypes:Text', 'oa:Tag'],
          'value': 'chars', 'fields': ['oa:annotatedAt', 'oa:serializedAt', 'label']}
      },
      'formats': {},
      'hasbeenupdated': 0
    }
  },
  created() {
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
    addField: function(index, charindex='false') {
      var body = charindex != 'false' ? this.originalannotation.resources[index][this.format['body']][charindex].items : this.originalannotation.resources[index][this.format['body']];
      var originalvalue = Object.keys(body[0]);
      var newVal = {}
      for (var nv=0; nv<originalvalue.length; nv++){
        var key = originalvalue[nv];
        var value = key != 'value' && key != 'chars'? body[0][key] : "";
        newVal[key] = value;
      }
      if (charindex != 'false'){
        this.originalannotation.resources[index][this.format['body']][charindex].items.push(newVal);
      } else {
        this.originalannotation.resources[index][this.format['body']].push(newVal);
      }
      this.hasbeenupdated += 1
    },
    deleteField: function(index, charindex='false', choiceindex='false'){
      if (choiceindex != 'false'){
        this.originalannotation.resources[index][this.format['body']][charindex].items.splice(choiceindex,1)
      } else if (charindex != 'false' && choiceindex == 'false'){
        this.originalannotation.resources[index][this.format['body']].splice(charindex,1)
      } else if (charindex == 'false' && choiceindex == 'false'){
        this.originalannotation.resources.splice(index,1)
      }
      this.hasbeenupdated += 1
    },
    setParams: function() {
      var params = this.$route.query;
      this.url = params.url ? params.url : '';
      this.manifesturl = params.manifesturl ? params.manifesturl : '';
      this.endpointapi = params.endpointapi ? params.endpointapi : '';
      this.buildView();
    },
    updateRouter: function() {
      var params = {
          url: this.url,
          manifesturl: this.manifesturl,
          endpointapi: this.endpointapi
      }
      if (JSON.stringify(this.$route.query) != JSON.stringify(params)){
        this.$router.push({
          name: 'annotationeditor',
          query: params
        }).catch(err => {console.log('router error'); console.log(err)});
      } else {
        return false;
      }
      this.buildView();
    },
    buildView: function() {
      if (this.url){
        axios.get(this.url).then(response => {
          this.parseAnnotation(response.data);
        })
      }
    },
    downloadAnnotation: function(){
      var ids = this.annotations.map(elem => elem.id);
      var correctorder = []
      for (var id=0; id<ids.length; id++){
        var correctfield = this.originalannotation[this.bodykey].filter(element => element['@id'] == ids[id])[0];
        correctorder.push(correctfield)
      }
      this.originalannotation[this.bodykey] = correctorder;
      const data = JSON.stringify(this.originalannotation);
      const blob = new Blob([data], {type: 'application/json'})
      const e = document.createEvent('MouseEvents'),
      a = document.createElement('a');
      a.download = this.url.split("/").slice(-1)[0];
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
      e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      a.dispatchEvent(e);
    },
    switchType: function(index, charindex){
      var bodyfield = this.format['body'];
      var annotation = this.originalannotation[this.bodykey][index][bodyfield][charindex];
      var typefield = Object.keys(annotation).filter(element => element.indexOf('type') > -1)[0];
      var type = annotation[typefield];
      if (type.indexOf('Choice') == -1 && Object.keys(annotation).indexOf('items') > -1) {
        var valuedict = annotation['items'][0];
        delete this.originalannotation[this.bodykey][index][bodyfield][charindex]['items'];
        this.originalannotation[this.bodykey][index][bodyfield][charindex] = valuedict;
        annotation = this.originalannotation[this.bodykey][index][bodyfield][charindex]
      }
      var valuefield = this.format['value'];
      var value = annotation[valuefield];
      if (type.indexOf('Text') == -1 && type != 'TextualBody' && type != 'cnt:ContentAsText' && type.indexOf('Choice') == -1) {
        if (value) {
          this.originalannotation[this.bodykey][index][bodyfield][charindex]['@id'] = value;
          delete this.originalannotation[this.bodykey][index][bodyfield][charindex][valuefield];
        }
      } else {
        if (!value) {
          this.originalannotation[this.bodykey][index][bodyfield][charindex][valuefield] = annotation['@id'];
          delete this.originalannotation[this.bodykey][index][bodyfield][charindex]["@id"];
        }
      }
      if (type.indexOf('Choice') > -1) {
        this.annotationvalue = annotation;
        var originaltypevalue = annotation[typefield];
        annotation[typefield] = this.format['typechoices'][0];
        this.originalannotation[this.bodykey][index][bodyfield][charindex] = {'items': [annotation]}
        this.originalannotation[this.bodykey][index][bodyfield][charindex][typefield] = originaltypevalue
      }
      this.originalannotation[this.bodykey][index][bodyfield][charindex][typefield] = type;
      this.hasbeenupdated += 1;
    },
    parseAnnotation(data) {
      this.originalannotation = data;
      var annoitems = data.resources ? data.resources : [data];
      this.bodykey = data.resources ? 'resources': '';
      var type = data['@context'].indexOf('w3') > -1 ? 'w3' : 'oa';
      this.format = this.w3oakey[type];
      type == 'w3' ? this.bodyfields.push('purpose') : '';
      for (var i=0; i<annoitems.length;i++){
        var anno = annoitems[i];
        var dictionary = {}
        var id = anno['@id'] ? anno['@id'] : anno['id'] ? anno['id'] : i.toString();
        var scriptTag = shared.createScriptTag(JSON.stringify(anno));
        this.annotations[id] = scriptTag['outerHTML'] + `<iiif-annotation annotationurl='${scriptTag['id']}' styling='image_only:true'></iiifannotation>`;
        for (var f=0; f<this.bodyfields.length; f++){
          var field = this.format['fields'][f];
          if (field){
            var fielddata = data[field] ? data[field] : '';
            data[field] = fielddata ? fielddata : "";
          }
          var body = this.format['body'];
          for (var bf=0; bf<anno[body].length; bf++){
            var fieldkey = this.bodyfields[f];
            if (fieldkey){
              var fieldvalue = anno[body][bf][fieldkey] ? anno[body][bf][fieldkey] : '';
              anno[body][bf][fieldkey] = fieldvalue;
            }
          }
        }
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
  display: flex;
  padding: 15px;
  white-space: pre-line;
  overflow: scroll;
  outline: 2px solid black;
  margin: 20px 0px 20px;

}

.tagfield div {
  width: 88%;
  overflow-wrap: break-word;
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
.item {
  border: 2px solid darkgrey;
  background-color:lightgrey;
  text-transform: capitalize;
  margin-top: 20px;
}

.item > div {
  padding: 0px 5% 20px;
}

label {
  font-size: larger;
  font-weight: bold;
  display: block;
}

.item input {
  width: 100%;
  display: block;
}

.choicefield {
  padding: 20px;
}

.annotationbody {
  padding: 0px 40px 0px;
}

.annotationlistfields {
  display: inline-block;
  width: 33%;
}
img {
  display: block;

  /* This rule is very important, please don't ignore this */
  max-width: 100%;
}

button {
  -webkit-appearance: button;
  -moz-appearance: button;
  appearance: button;
  text-align: center;
  padding: 2px;
  text-decoration: none;
  font-weight: 900;
  width: 90px;
  color: black;
  background: white;
}

.annotationbutton {
  float: right;
  margin: 20px;
}

.deletebodyfield {
  float: right
}
</style>
