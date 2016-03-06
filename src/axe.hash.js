window.onload = adapter;
window.onhashchange = adapter;

function adapter() {
  var hash = window.location.hash || '#index';
  switch (hash) {
    case '#index' :
      alert('done index');
      break;
    case '#a' :
      alert('done a');
      break;
    case '#b' :
      alert('done b');
      break;
  }

}