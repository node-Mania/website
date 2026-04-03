// scratch script to test WHMCS Whois
const { checkDomainAvailability } = require('./src/lib/services/whmcs.service.ts');

require('dotenv').config({ path: '.env.local' });

async function test() {
    try {
        const res1 = await checkDomainAvailability('google.com');
        console.log('google.com:', res1);

        const res2 = await checkDomainAvailability('someweirdname12345.com');
        console.log('someweirdname12345.com:', res2);
    } catch (e) {
        console.error(e);
    }
}
test();
