const http = require('http');
http.get('http://localhost:3000/api/domains/check?domain=mytestdomainapp', res => {
    let raw = '';
    res.on('data', c => raw += c);
    res.on('end', () => console.log(JSON.stringify(JSON.parse(raw), null, 2)));
});
