var urls = ['image/1.jpg','image/2.jpg','image/3.jpg','image/4.jpg','image/5.jpg','image/6.jpg','image/7.jpg'];

appcan.image.preload(urls,function(image){

  var btn = document.getElementById('clickme');

  btn.addEventListener('click', function(){
    var newImages = image.newImages;
    var imgWraps = document.getElementsByClassName('img-wrap');
    var i = 0, length = newImages.length;
    for(; i < length; i++ ) {
      newImages[i].className = 'u-img';
      newImages[i].alt = 'first picture';
      imgWraps[0].appendChild(newImages[i]);
    }

  });

});