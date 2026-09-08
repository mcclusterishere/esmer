(function(root){
  'use strict';

  var TENANT='esmer';

  function parse(res){
    if(!res.ok){
      return res.text().then(function(text){
        var detail=null;
        try{detail=text?JSON.parse(text):null}catch(_e){detail=text}
        var message=detail&&detail.error?detail.error:'Request failed';
        throw Object.assign(new Error(message),{status:res.status,detail:detail});
      });
    }
    return res.status===204?null:res.json();
  }

  function control(path,init){
    return root.MCC.api(path,init).then(parse);
  }

  function client(path,init){
    return control('/v1/clients/'+TENANT+(path||''),init);
  }

  var API={
    tenant:TENANT,

    bootstrap:function(){
      return client('/me').then(function(data){
        return {mode:'production',tenant:data.tenant,user:data.user};
      });
    },

    summary:function(){
      return Promise.allSettled([
        client('/inquiries'),
        client('/analytics')
      ]).then(function(results){
        return {
          inquiries:results[0].status==='fulfilled'?results[0].value:null,
          analytics:results[1].status==='fulfilled'?results[1].value:null
        };
      });
    },

    inquiries:function(){return client('/inquiries');},
    inquiry:function(id){return client('/inquiries/'+encodeURIComponent(id));},
    updateInquiry:function(id,status){
      return client('/inquiries/'+encodeURIComponent(id),{
        method:'PATCH',
        body:{status:status}
      });
    },

    contacts:function(){return client('/contacts');},
    analytics:function(){return client('/analytics');},
    media:function(){return client('/media');},
    content:function(){return client('/content');},
    saveContent:function(key,draft){
      return client('/content/'+encodeURIComponent(key),{
        method:'PATCH',
        body:{draft:draft}
      });
    },
    publish:function(key){
      return client('/publish',{
        method:'POST',
        body:{key:key}
      });
    },

    releases:function(){return fetch('../data/releases.json').then(parse);},
    logout:function(){return root.MCC.signOut();}
  };

  root.EsmerAdminAPI=API;
})(window);
