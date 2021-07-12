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
      console.log('created')
      
      var settings = booleanoptions[this.type]()
      settings = settings.concat(freetext[this.type]())
      settings = settings.concat(dropdowns[this.type]())
      if (this.type.indexOf('storyboard') > -1){
          settings.append({'name': 'additionalinfo',
          'option': 'id for HTML object',
          'description': 'Is the id for an HTML object whose innerHTML will be loaded into the info tab. This HTML object should have a title tag.'})
          settings.append({'name': 'tagscolor',
          'option': 'JSON object',
          'description': "String in JSON format. Should have tag with corresponding color. Any CSS color can be used. i.e. {'tag name': 'color', 'tag name 2': 'color2'}. See single annotation settings for an example."})
          settings.append({'name': 'overlaycolor',
          'option': 'Hex or RGB color',
          'description': "change the overlay color; default is #00bfff. See single annotation settings for an example."})
          settings.append({'name': 'activecolor',
          'option': 'Hex or RGB color',
          'description': "change active color; default is lightgreen. See single annotation settings for an example."})
      }
      this.settings = _.sortBy(settings, 'name');
      console.log(this.settings)
  }
}
</script>