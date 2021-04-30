const sigutil = require('eth-sig-util')
var argv = require('minimist')(process.argv.slice(2), { string: 's' });

if (argv.s !== undefined && argv.m !== undefined) {
    const message = argv.m;
    const msgParams = { data: message };
    msgParams.sig = argv.s;
    const recovered = sigutil.recoverPersonalSignature(msgParams);
    console.log('THIS MESSAGE WAS SIGNED BY ADDRESS:', recovered)
} else {
    console.log('MUST DEFINE -m PARAM and -s PARAM FIRST')
    console.log('EXAMPLE:')
    console.log('node verify -s=0xba6797251e73472b8415d5cce13efb29126f929513121593d9a203dd87e8254350b053515724b41098c910d5956693e7bb24d9125f191c3c90008eba443b44701b -m=Hello')
}