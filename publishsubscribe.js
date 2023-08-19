const redis = require('redis');

const CHANNELS ={
    TEST:'TEST',
    BLOCKCHAIN :'BLOCKCHAIN'

}

class PubSub{
    constructor({Blockchain}){
        this.Blockchain = Blockchain;
        this.publisher = redis.createClient();
        this.subscriber = redis.createClient();

        this.subscriber.subscribe(CHANNELS.TEST);
        this.subscriber.subscribe(CHANNELS.BLOCKCHAIN);
        this.subscriber.on("message",(channel,message)=>this.handleMessage(channel,message));

    }
    handleMessage(channel,message){
        console.log(`Message recieved.Channel : ${channel} Message:${message}`);
        const parseMessage= JSON.parse(message);
        if(channel===CHANNELS.BLOCKCHAIN){
            this.Blockchain.replaceChain(parseMessage);
        }
    }
    publish({channel,message}){
        this.publisher.publish(channel,message);
    }
    broadcastchain(){
        this.publish({
            channel:CHANNELS.BLOCKCHAIN,
            message: JSON.stringify(this.Blockchain.chain),

        });
    }
}

// const checkPubSub = new PubSub();
// setTimeout(()=>checkPubSub.publisher.publish(CHANNELS.TEST,"HELLOOOO"),1000); 

module.exports = PubSub;