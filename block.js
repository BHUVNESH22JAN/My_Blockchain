const hextobinary=require("hex-to-binary");
const {GENESIS_DATA}= require('./config');
const cryptohash=require('./crypto-hash');

class Block{
    constructor({timestamp,prevhash,hash,data,nonce,difficulty}){
        this.timestamp=timestamp;
        this.prevhash=prevhash;
        this.hash=hash;
        this.data=data;
        this.nonce=nonce;
        this.difficulty=difficulty; 

    }
    static genesis() {
        return new this(GENESIS_DATA);
    }
    static mineBlock({prevblock,data}){
        let hash,timestamp;
        const prevhash=prevblock.hash;
        let {difficulty}=prevblock;
        let nonce=0;
        do{
            nonce++;
            timestamp=Date.now();
            difficulty=Block.adjustDifficulty({
                originalBlock:prevblock,
                timestamp,
            });

            hash=cryptohash(timestamp,prevhash,data,nonce,difficulty);

        }while(hextobinary(hash).substring(0,difficulty)!=='0'.repeat(difficulty));

        return new this ({  //this ki jagah Block bhi likh skte the idhar
            timestamp,prevhash,data,nonce,difficulty,hash,
        });
         
    }
    static adjustDifficulty({originalBlock,timestamp,MINE_RATE}){
        const {difficulty}=originalBlock;
        if(difficulty<1) return 1;
        const difference = timestamp - originalBlock.timestamp;
        if(difference>MINE_RATE) return difficulty-1;
        return difficulty+1;

    }
}

const block1= new Block({timestamp : '2/09/21',prevhash : '0*123',hash : '0*abd',data : 'hello'});

//const genesisBlock=Block.genesis();
//console.log(genesisBlock);

//const result=Block.mineBlock({prevblock:block1,data:'Ansh'});
//console.log(result);
//console.log(block1);
module.exports=Block;
