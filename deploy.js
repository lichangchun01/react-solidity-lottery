//部署智能合约到真实的rankeby网络
const Web3 = require('web3');
const {interface,bytecode} = require('./compile');
const HDWalletProvider = require('truffle-hdwallet-provider');
const mnemonic = "ticket glow capital lamp infant attack excite mango cement forum fade celery";
const provider = new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/ef44e06e50eb469e941106b074179053");
const web3 = new Web3(provider);

deploy =async ()=>{
    const accounts = await web3.eth.getAccounts();
    console.log(accounts[0]);
    const result =await new web3.eth.Contract(JSON.parse(interface))
        .deploy({
            data:bytecode
        }).send({
            from:accounts[0],
            gas:'1000000',
        });
    console.log('address:'+result.options.address);

    console.log(interface);
};
deploy();