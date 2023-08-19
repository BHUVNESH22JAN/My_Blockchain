const MINE_RATE=1000; //1sec=1000ms
const INITIAL_DIFFICULTY =2;

const GENESIS_DATA = {
    timestamp : 1,
    prevhash : '0*000',
    hash : '0*123',
    difficulty: INITIAL_DIFFICULTY,
    nonce: 0,
    data : [],
};

module.exports = {GENESIS_DATA,MINE_RATE};