const Block = require('./block');
const cryptohash=require('./crypto-hash');

class Blockchain{
    constructor(){
        this.chain=[Block.genesis()];
    }

    addBlock({data}){
        const newBlock=Block.mineBlock({
            prevblock: this.chain[this.chain.length-1],
            data,
        });
        this.chain.push(newBlock);
    }

    replaceChain(chain){
        if(chain.length<=this.chain.length){
            console.error("the incoming chain is not longer");
            return;
        }
        if(!Blockchain.isValidchain(chain)){
            console.error("the incoming chain is not valid");
            return;
        }
        this.chain=chain;
    }

    static isValidchain(chain){
        if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())){  // json.stringfy isliye kiya kyuki dono alag alag instant pe hai
            return false;
        }
        for(let i=1; i<chain.length; i++){
            const {timestamp,prevhash,hash,nonce,difficulty,data}=chain[i];
            const realLasthash=chain[i-1].hash;
            const lastDifficulty=chain[i-1].difficulty;
            
            if(prevhash!==realLasthash) return false;
            const validatedhash = cryptohash(timestamp,prevhash,nonce,difficulty,data);
            if(hash!==validatedhash) return false;
            if(Math.abs(lastDifficulty-difficulty) > 1) return false;
        }
        return true;
    }
}

const blockchain=new Blockchain();
blockchain.addBlock({data:'Block1'});
blockchain.addBlock({data:'Block2'});
const result=Blockchain.isValidchain(blockchain.chain);
console.log(blockchain.chain);
console.log(result);

//console.log(blockchain);
module.exports=Blockchain; 

