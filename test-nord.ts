import { getProductsByPids } from './src/lib/services/whmcs.service';

getProductsByPids([26]).then(res => console.log(JSON.stringify(res, null, 2))).catch(console.error);
