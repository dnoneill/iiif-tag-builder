<template>
  <div class="form">
    <div class="requiredfields">
      <input aria-label="Annotation URL" v-model="url" value="" placeholder="Annotation URL" v-on:change="updateRouter();">
      <input v-model="manifesturl" id="manifesturl" v-on:change="updateRouter();" aria-label="Manifest URL (Optional)" placeholder="Manifest URL (Optional)">
      <input v-model="endpointapi" id="endpointapi" v-on:change="updateRouter();" aria-label="Endpoint URL (Optional)" placeholder="Endpoint URL (Optional)">
      <div v-for="(annotation, index) in annotations">
        <span v-html="annotation.tag"></span>
        <div class="annotationtext" v-for="(value, key) in annotation.singlefields">
          <label>{{key}}</label>
          <input v-model="annotation['singlefields'][key]"></input>
          {{annotation[key]}}
        </div>
        <div class="annotationtext" v-for="(value, key) in annotation.listfields">
          <label>{{key}}</label>
          <div v-for="(listvalue, listkey) in value">
          {{listvalue}}
          {{listkey}}

          <input v-model="annotation['listfields'][key][listkey]"></input>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import shared from './shared';

export default {
  name: 'annotationeditor',
  data: function() {
    return {
      'url': '',
      'manifesturl': '',
      'endpointapi': '',
      'annotations': [],
      'originalannotation': '',

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
      axios.get(this.url).then(response => {
        this.parseAnnotation(response.data)
      })
    },
    getDict: function(anno){
      var id = anno['@id'] ? anno['@id'] : anno['id'] ? anno['id'] : 0
      var targetarea = anno['on'] ? anno['on'] : anno['target']
      var canvas = targetarea.constructor == Array ? targetarea : [targetarea]
      var res = anno['body'] ? anno['body'] : anno['resource'];
      res = res.constructor == Array ? res : [res];
      var chars = []
      var all_keys = []
      for (var re=0; re<res.length; re++){
        !res[re]['language'] ? res[re]['language'] = "" : ""
        chars.push(res[re])
      }
      var creator = anno['creator'] && anno['creator'].length > 0 ? anno['creator'].join(", ") : ''
      var rights = anno['rights'] ? anno['rights'] : ''
      return {'singlefields': {'id': id, 'creator': creator, 'idurl': id.split("/")[-1], 'rights': rights},
      'listfields': {'chars': chars, 'anno': anno}}
    },
    parseAnnotation(data) {
      var annolist = data.constructor == String ?  [data] : data;
      this.originalannotation = annolist;
      for (var i=0; i<data.length;i++){
        var dictionary = this.getDict(data[i])
        var scriptTag = shared.createScriptTag(JSON.stringify(data[i]));
        dictionary['tag'] = scriptTag['outerHTML'] + `<iiif-annotation annotationurl='${scriptTag['id']}' styling='image_only:true'></iiifannotation>`;
        this.annotations.push(dictionary)
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
</style>
