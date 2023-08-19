const crypto = require('crypto');

const cryptohash=(...inputs)=>{
    const hash=crypto.createHash('sha256');
    hash.update(inputs.sort().join('')); //helloworld
    return hash.digest('hex');
};

result=cryptohash('world','hello');
module.exports=cryptohash;
//console.log(result);