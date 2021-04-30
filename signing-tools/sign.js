const sigutil = require('eth-sig-util')
var argv = require('minimist')(process.argv.slice(2));

if(argv.p !== undefined && argv.m !== undefined){
    const privKeyHex = argv.p;
    const privKey = Buffer.from(privKeyHex, 'hex');
    const message = argv.m;
    const msgParams = { data: message };

    const signed = sigutil.personalSign(privKey, msgParams);
    console.log('SIGNATURE: ', signed)
    msgParams.sig = signed;
    const recovered = sigutil.recoverPersonalSignature(msgParams);

    console.log('SIGNED BY ADDRESS:', recovered)
} else {
    console.log('MUST DEFINE -m PARAM and -p PARAM FIRST')
    console.log('EXAMPLE:')
    console.log('node sign -p=4af1bceebf7f3634ec3cff8a2c38e51178d5d4ce585c52d6043e5e2cc3418bb0 -m=Hello')
}