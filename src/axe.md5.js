var crypto = require('crypto');

//解密
function decode(cryptkey, iv, secretdata) {
  var
    decipher = crypto.createDecipheriv('aes-256-cbc', cryptkey, iv),
    decoded  = decipher.update(secretdata, 'base64', 'utf8');

  decoded += decipher.final( 'utf8' );
  return decoded;
}
//解密
function encode(cryptkey, iv, cleardata) {
  var
    encipher = crypto.createCipheriv('aes-256-cbc', cryptkey, iv),
    encoded  = encipher.update(cleardata, 'utf8', 'base64');

  encoded += encipher.final( 'base64' );
  return encoded;
}

var
  cryptkey   = crypto.createHash('sha256').update('appcan').digest(),
  iv         = '1234567890000000',
  buf        = "wanglei",
  enc        = encode( cryptkey, iv, buf );

var dec        = decode(cryptkey, iv, enc);
console.log("cryptkey: ", cryptkey);
function b64enc(data) {
  var b   = new Buffer(data, 'binary');
  return b.toString('base64');
}

console.log("Encoded length: ", enc);
console.log("Decoded all: " + dec);

console.log(new Buffer('appcan'));
//console.log(crypto.getHashes());