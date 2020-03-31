export default {
  createScriptTag: function(annotation){
    var id =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    let scripttag = document.createElement('script');
    scripttag.setAttribute('type', 'application/json');
    scripttag.id = id;
    scripttag.innerHTML = annotation;
    return {'id': id, 'outerHTML': scripttag.outerHTML}
  },
  redirect: function(){
    var url = window.location.href;
    if (url.indexOf('/iiif-annotation/') > -1){
      location.href = url.replace(/\/iiif-annotation\//g, '/annona/')
    }
  }
}
