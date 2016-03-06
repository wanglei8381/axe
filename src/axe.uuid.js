/*
 appcan.define('uuid', function(exports,module){

 });
 */

/*
 var  _rnds = new Array(16);
 var fn = function() {

 for (var i = 0, r; i < 16; i++) {
 if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
 console.log(r);
 _rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
 }

 return _rnds;
 };

 console.log(fn());

 */

function parse(s, buf, offset) {
  var i = (buf && offset) || 0, ii = 0;

  buf = buf || [];
  s.toLowerCase().replace(/[0-9a-f]{2}/g, function (oct) {
    if (ii < 16) { // Don't overflow!
      buf[i + ii++] = _hexToByte[oct];
    }
  });

  // Zero out remaining bytes if string was short
  while (ii < 16) {
    buf[i + ii++] = 0;
  }

  return buf;
}

console.log(parse('wanglei'));