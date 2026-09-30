(function () {
  var form = document.getElementById('contact-form');
  var status = document.getElementById('form-status');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.checkValidity()) {
      status.textContent = 'Please fill in your name, a valid email and a message.';
      return;
    }
    status.textContent = 'This is a design preview, so nothing was sent. Connect a form service to receive messages.';
  });

  /* project screenshots and demo videos */
  var dlg = document.getElementById('media-dialog');
  var body = document.getElementById('media-body');
  var title = document.getElementById('media-title');

  function clearBody() {
    var vids = body.querySelectorAll('video');
    for (var i = 0; i < vids.length; i++) { vids[i].pause(); vids[i].removeAttribute('src'); vids[i].load(); }
    body.innerHTML = '';
  }

  function openMedia(btn) {
    var items = JSON.parse(btn.getAttribute('data-media'));
    title.textContent = btn.getAttribute('data-title');
    clearBody();
    items.forEach(function (it) {
      var fig = document.createElement('figure');
      var el;
      if (it.type === 'video') {
        el = document.createElement('video');
        el.controls = true;
        el.preload = 'metadata';
        el.playsInline = true;
        if (it.poster) el.poster = it.poster;
        el.src = it.src;
      } else {
        el = document.createElement('img');
        el.src = it.src;
        el.alt = it.alt || '';
        el.addEventListener('load', function () { if (el.naturalHeight > el.naturalWidth * 1.2) el.className = 'portrait'; });
      }
      fig.appendChild(el);
      if (it.label) {
        var cap = document.createElement('figcaption');
        cap.textContent = it.label;
        fig.appendChild(cap);
      }
      body.appendChild(fig);
    });
    if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', '');
  }

  var btns = document.querySelectorAll('.project-media');
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', function () { openMedia(this); });
  }
  dlg.querySelector('.dlg-close').addEventListener('click', function () { dlg.close(); });
  dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener('close', clearBody);
})();
