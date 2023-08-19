const bodyParser=require('body-parser');
const express =require("express");
const request=require("request");
const blockchain = require('./Blockchain');
const PubSub = require("./publishsubscribe");

const app = express();
const Blockchain = new blockchain();
const pubsub = new PubSub(({Blockchain}));

const DEFAULT_PORT = 3000;
const ROOT_NODE_ADDRESS=`http://localhost:${DEFAULT_PORT}`;
setTimeout(()=>pubsub.broadcastchain(),1000);

app.use(bodyParser.json());
app.get('/api/blocks',(req,res)=>{
    res.json(Blockchain.chain);  //ye javascript ka object hai toh isse hume json me convert krna padega to read
});

app.post("/api/mine",(req,res)=>{
    const {data} = req.body;

    Blockchain.addBlock({data});
    pubsub.broadcastchain();
    res.redirect('/api/blocks');
});

const synChains=()=>{
    request({url:`${ROOT_NODE_ADDRESS}/api/blocks`},(error,response,body)=>{
        if(!error && response.statusCode===200){
            const rootChain = JSON.parse(body);
            console.log('Replace chain on sync with',rootChain);
            Blockchain.replaceChain(rootChain);
        }
    });
};


let PEER_PORT;
if(process.env.GENERATE_PEER_PORT ==="true"){
    PEER_PORT=DEFAULT_PORT + Math.ceil(Math.random()*1000);
}
const PORT=PEER_PORT || DEFAULT_PORT ;
app.listen(PORT,()=>{
    console.log(`listening to PORT:${PORT}`);
    synChains();
});
