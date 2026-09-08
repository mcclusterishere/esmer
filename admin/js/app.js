(function(){
  'use strict';

  var OWNER='justinesmer@gmail.com';
  var login=document.getElementById('login-shell');
  var app=document.getElementById('admin-app');
  var form=document.getElementById('login-form');
  var email=document.getElementById('owner-email');
  var message=document.getElementById('login-message');
  var google=document.getElementById('google-login');
  var currentView='overview';
  var tenantState=null;

  function callbackUrl(){
    var u=new URL('../auth/',location.href);
    u.searchParams.set('next',new URL('./',location.href).pathname);
    return u.toString();
  }

  function setMessage(text){message.textContent=text||'';}
  function normalize(v){return String(v||'').trim().toLowerCase();}
  function text(id,value){var node=document.getElementById(id);if(node)node.textContent=value==null?'—':String(value);}
  function setSave(value){text('save-state',value);}

  function showLogin(copy){
    app.hidden=true;
    login.hidden=false;
    if(copy)setMessage(copy);
  }

  function showApp(user,state){
    tenantState=state;
    login.hidden=true;
    app.hidden=false;
    text('rail-email',user.email||OWNER);
    text('settings-email',user.email||OWNER);
    text('settings-role',(state&&state.tenant&&state.tenant.role)||'owner');
    var publicRoot=new URL('../',location.href);
    text('site-host',publicRoot.host+publicRoot.pathname.replace(/\/$/,''));
    text('settings-host',publicRoot.host+publicRoot.pathname.replace(/\/$/,''));
    bootstrap();
  }

  form.addEventListener('submit',function(e){
    e.preventDefault();
    var value=normalize(email.value);
    if(value!==OWNER){setMessage('That email is not authorized for the Esmer owner console.');return;}
    setMessage('Sending secure sign-in link…');
    MCC.signInWithEmail(value,callbackUrl()).then(function(){
      setMessage('Check '+OWNER+' for the sign-in link.');
    }).catch(function(err){
      setMessage(err.message||'Could not send the sign-in link.');
    });
  });

  google.addEventListener('click',function(){
    setMessage('Opening Google sign in…');
    MCC.signInWithGoogle(callbackUrl()).catch(function(err){
      setMessage(err.message||'Could not start Google sign in.');
    });
  });

  document.getElementById('sign-out').addEventListener('click',function(){
    EsmerAdminAPI.logout().finally(function(){location.reload();});
  });

  function activate(view){
    if(view==='more'){
      var sheet=document.getElementById('more-sheet');
      sheet.hidden=!sheet.hidden;
      return;
    }
    currentView=view;
    document.getElementById('more-sheet').hidden=true;
    document.querySelectorAll('[data-admin-view]').forEach(function(el){
      el.hidden=el.getAttribute('data-admin-view')!==view;
    });
    document.querySelectorAll('[data-view]').forEach(function(btn){
      if(btn.closest('.more-sheet'))return;
      btn.removeAttribute('aria-current');
      if(btn.getAttribute('data-view')===view)btn.setAttribute('aria-current','page');
    });
    var labels={
      overview:['Owner console','Overview'],site:['Public property','Site'],music:['Catalog','Music'],
      logs:['Content','Logs'],media:['Library','Media'],bookings:['Pipeline','Bookings'],
      contacts:['People','Contacts'],analytics:['Performance','Analytics'],press:['Authority','Press / SEO'],
      network:['McCluster','Network'],settings:['Owner account','Settings']
    };
    var pair=labels[view]||['Owner console',view];
    text('view-kicker',pair[0]);
    text('view-title',pair[1]);
    window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
  }

  document.addEventListener('click',function(e){
    var viewBtn=e.target.closest('[data-view]');
    if(viewBtn){activate(viewBtn.getAttribute('data-view'));return;}
    var jump=e.target.closest('[data-jump]');
    if(jump)activate(jump.getAttribute('data-jump'));
  });

  function node(tag,className,copy){
    var el=document.createElement(tag);
    if(className)el.className=className;
    if(copy!=null)el.textContent=copy;
    return el;
  }

  function emptyRow(host,copy){
    host.innerHTML='';
    var row=node('div','content-row');
    var thumb=node('div','content-thumb','—');
    var body=node('div');
    body.appendChild(node('strong',null,copy));
    body.appendChild(node('small',null,'Nothing to show yet.'));
    row.appendChild(thumb);row.appendChild(body);
    host.appendChild(row);
  }

  function renderReleases(payload){
    var host=document.getElementById('release-list');
    var releases=payload&&payload.releases||[];
    host.innerHTML='';
    releases.forEach(function(r,i){
      var row=node('div','content-row');
      row.appendChild(node('div','content-thumb',String(i+1).padStart(2,'0')));
      var body=node('div');
      body.appendChild(node('strong',null,r.title));
      body.appendChild(node('small',null,[r.format,r.releaseDate,r.label].filter(Boolean).join(' · ')));
      row.appendChild(body);
      row.appendChild(node('span','content-state','Verified'));
      var link=node('a',null,'↗');
      link.href='../music/'+r.slug+'/';
      link.target='_blank';
      link.rel='noopener';
      link.setAttribute('aria-label','Open '+r.title);
      row.appendChild(link);
      host.appendChild(row);
    });
  }

  function renderBookings(payload){
    var host=document.getElementById('booking-list');
    var items=payload&&payload.items||[];
    text('booking-count',items.length+' total');
    text('metric-inquiries',items.filter(function(x){return x.status==='new'||x.status==='needs-reply';}).length);
    text('task-inquiries',items.some(function(x){return x.status==='new'||x.status==='needs-reply';})?'REPLY':'CLEAR');
    document.querySelectorAll('.nav-count').forEach(function(n){n.textContent=items.filter(function(x){return x.status==='new'||x.status==='needs-reply';}).length;});
    if(!items.length){emptyRow(host,'No inquiries yet');return;}
    host.innerHTML='';
    var states=['new','needs-reply','qualified','date-proposed','confirmed','completed','archived','declined'];
    items.forEach(function(item,i){
      var row=node('div','content-row');
      row.appendChild(node('div','content-thumb',String(i+1).padStart(2,'0')));
      var body=node('div');
      body.appendChild(node('strong',null,item.name||item.email));
      var detail=[item.email,item.want,item.at?new Date(item.at).toLocaleDateString():null].filter(Boolean).join(' · ');
      var small=node('small',null,detail);
      if(item.note)small.title=item.note;
      body.appendChild(small);
      row.appendChild(body);
      var select=node('select','content-state');
      select.setAttribute('aria-label','Status for '+(item.name||item.email));
      states.forEach(function(state){
        var option=node('option',null,state.replace(/-/g,' '));
        option.value=state;
        option.selected=state===item.status;
        select.appendChild(option);
      });
      select.addEventListener('change',function(){
        var desired=select.value;
        select.disabled=true;
        setSave('Saving inquiry…');
        EsmerAdminAPI.updateInquiry(item.id,desired).then(function(){
          item.status=desired;
          setSave('Saved just now');
          return loadBookings();
        }).catch(function(err){
          select.value=item.status;
          setSave(err.message||'Could not save');
        }).finally(function(){select.disabled=false;});
      });
      row.appendChild(select);
      host.appendChild(row);
    });
  }

  function renderContacts(payload){
    var host=document.getElementById('contact-list');
    var items=payload&&payload.items||[];
    text('contact-count',items.length+' people');
    if(!items.length){emptyRow(host,'No contacts yet');return;}
    host.innerHTML='';
    items.forEach(function(item,i){
      var row=node('div','content-row');
      row.appendChild(node('div','content-thumb',String(i+1).padStart(2,'0')));
      var body=node('div');
      body.appendChild(node('strong',null,item.name||item.email));
      body.appendChild(node('small',null,[item.email,item.last_interest,item.last_interaction?new Date(item.last_interaction).toLocaleDateString():null].filter(Boolean).join(' · ')));
      row.appendChild(body);
      row.appendChild(node('span','content-state',String(item.status||'contact').replace(/-/g,' ')));
      host.appendChild(row);
    });
  }

  function renderMedia(payload){
    var host=document.getElementById('media-list');
    var items=payload&&payload.items||[];
    text('media-count',items.length+' assets');
    if(!items.length){emptyRow(host,'No tenant media uploaded yet');return;}
    host.innerHTML='';
    items.forEach(function(item,i){
      var row=node('div','content-row');
      row.appendChild(node('div','content-thumb',String(i+1).padStart(2,'0')));
      var body=node('div');
      body.appendChild(node('strong',null,item.role||item.asset_type||'Media asset'));
      body.appendChild(node('small',null,[item.mime_type,item.created_at?new Date(item.created_at).toLocaleDateString():null].filter(Boolean).join(' · ')));
      row.appendChild(body);
      var rights=item.metadata&&item.metadata.rights_state?item.metadata.rights_state:'review rights';
      row.appendChild(node('span','content-state',rights));
      host.appendChild(row);
    });
  }

  function renderAnalytics(data){
    data=data||{};
    text('metric-visitors',data.visitors30d);
    text('metric-clicks',data.musicClicks||0);
    text('analytics-pageviews',data.pageViews30d||0);
    text('analytics-bookviews',data.bookViews||0);
    text('analytics-inquiries',data.inquiries30d||0);
    text('analytics-new',data.newInquiries||0);
  }

  function applyContent(payload){
    var content=payload&&payload.content||{};
    var home=content.home||{};
    var values=home.draft||home.published||{};
    if(values.openingLine)document.getElementById('opening-line').value=values.openingLine;
    if(values.featuredRelease)document.getElementById('featured-release').value=values.featuredRelease;
    var dirty=home.draft&&JSON.stringify(home.draft)!==JSON.stringify(home.published||null);
    text('home-publish-state',dirty?'Unpublished changes':'Published');
    text('site-state',dirty?'Draft changes':'Published');
    text('site-state-copy',dirty?'You have saved changes that are not public yet.':'Public content is synchronized with the last published tenant state.');
  }

  function homeDraft(){
    return {
      openingLine:document.getElementById('opening-line').value.trim(),
      featuredRelease:document.getElementById('featured-release').value
    };
  }

  function saveHome(){
    var button=document.getElementById('save-home');
    var status=document.getElementById('editor-message');
    button.disabled=true;
    status.textContent='Saving draft…';
    setSave('Saving draft…');
    return EsmerAdminAPI.saveContent('home',homeDraft()).then(function(result){
      status.textContent='Draft saved.';
      text('home-publish-state','Unpublished changes');
      text('site-state','Draft changes');
      setSave('Saved just now');
      return result;
    }).catch(function(err){
      status.textContent=err.message||'Could not save draft.';
      setSave('Save failed');
      throw err;
    }).finally(function(){button.disabled=false;});
  }

  function publishHome(){
    var button=document.getElementById('publish-home');
    var status=document.getElementById('editor-message');
    button.disabled=true;
    status.textContent='Publishing…';
    setSave('Publishing…');
    return saveHome().then(function(){return EsmerAdminAPI.publish('home');}).then(function(){
      status.textContent='Published. The public site will pick up the new tenant content.';
      text('home-publish-state','Published');
      text('site-state','Published');
      text('site-state-copy','Public content is synchronized with the last published tenant state.');
      setSave('Published just now');
      var frame=document.getElementById('site-preview-frame');
      frame.src='../?preview_refresh='+Date.now();
    }).catch(function(err){
      status.textContent=err.message||'Could not publish.';
      setSave('Publish failed');
    }).finally(function(){button.disabled=false;});
  }

  document.getElementById('save-home').addEventListener('click',saveHome);
  document.getElementById('publish-home').addEventListener('click',publishHome);

  function loadBookings(){return EsmerAdminAPI.inquiries().then(renderBookings);}

  function bootstrap(){
    text('data-mode','Production tenant');
    setSave('Live data');
    Promise.allSettled([
      EsmerAdminAPI.releases().then(renderReleases),
      EsmerAdminAPI.content().then(applyContent),
      loadBookings(),
      EsmerAdminAPI.contacts().then(renderContacts),
      EsmerAdminAPI.analytics().then(renderAnalytics),
      EsmerAdminAPI.media().then(renderMedia)
    ]).then(function(results){
      var failures=results.filter(function(r){return r.status==='rejected';});
      if(failures.length){
        setSave(failures.length+' data source'+(failures.length===1?'':'s')+' unavailable');
      }else{
        setSave('Live data');
      }
    });
  }

  MCC.user().then(function(user){
    if(!user){showLogin();return;}
    if(normalize(user.email)!==OWNER){
      return MCC.signOut().finally(function(){showLogin('This signed-in account is not authorized. Use '+OWNER+'.');});
    }
    return EsmerAdminAPI.bootstrap().then(function(state){
      showApp(user,state);
    }).catch(function(err){
      if(err&&err.status===403){
        showLogin('This account is signed in but its Esmer owner invitation has not attached yet. Open the newest sign-in link from '+OWNER+' and try again.');
      }else{
        showLogin((err&&err.message)||'Could not verify Esmer tenant access.');
      }
    });
  }).catch(function(){
    showLogin('Could not verify the current session. Please sign in again.');
  });
})();
