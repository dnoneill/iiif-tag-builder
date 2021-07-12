<template>
<table summary="Settings for Annona"> 
    <caption>Annona settings for {{type}}</caption> 
    <tr> 
        <th scope="col">Setting name</th> 
        <th scope="col">Setting options</th> 
        <th scope="col">Setting description</th>
    </tr> 
    <tr v-for="setting in settings" v-bind:key="setting.name"> 
        <td>{{setting.name}}</td>
        <td v-if="setting.options && setting.options.constructor.name == 'Array'">
            {{setting.options.join(", ")}}
        </td>
        <td v-else-if="setting.options">
            {{setting.options}}
        </td>
        <td v-else>
            true/false
        </td>
        <td v-html="setting.description"></td>
    </tr>
</table> 
</template>
<script>
import booleanoptions from '../assets/booleanoptions.js'
import freetext from '../assets/freetext.js'
import dropdowns from '../assets/dropdowns.js'
var _ = require('lodash');
export default {
  name: 'tagbuilder',
  props: {'type': String},
  data: function() {
      return {
          settings: []
      }
  },
  created() {
      var settings = booleanoptions[this.type]()
      settings = settings.concat(freetext[this.type]())
      settings = settings.concat(dropdowns[this.type]())
      this.settings = _.sortBy(settings, 'name');
  }
}
</script>