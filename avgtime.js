const Block = require('./block.js')
const blockchain = require('./Blockchain');
const Blockchain = new blockchain();

Blockchain.addBlock({data : "new data"});
console.log(Blockchain.chain[Blockchain.chain.length-1]);
let prevtimestamp,nexttimestamp,nextblock,timediff,averagetime;

const times=[];
for(let i=0; i<1000;i++){
    prevtimestamp=Blockchain.chain[Blockchain.chain.length -1].timestamp;
    Blockchain.addBlock({data:`block ${i}`});
    nextblock=Blockchain.chain[Blockchain.chain.length-1];
    nexttimestamp=nextblock.timestamp;

    timediff=nexttimestamp - prevtimestamp;
    times.push(timediff);

    averagetime = times.reduce((total,num)=> (total+num))/times.length;

    console.log(`Time to mine block : ${timediff}ms, Difficlty:${nextblock.difficulty}, Average Time : ${averagetime}ms`);

}

