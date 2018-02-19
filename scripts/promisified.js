const http = require('http');
const https = require('https');
const { promisify } = require('util');

http.get[promisify.custom] = function getAsync(options) {
  return new Promise((resolve, reject) => {
    http.get(options, (response) => {
      response.end = new Promise((resolve) => response.on('end', resolve)); // eslint-disable-line
      resolve(response);
    }).on('error', reject);
  });
};

https.request[promisify.custom] = function getAsync(options) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (response) => {
      response.end = new Promise((resolve) => response.on('end', resolve)); // eslint-disable-line
      resolve(response);
    }).on('error', reject);
    req.write(options.data);
    req.end();
  });
};

http.request[promisify.custom] = function getAsync(options) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (response) => {
      response.end = new Promise((resolve) => response.on('end', resolve)); // eslint-disable-line
      resolve(response);
    }).on('error', reject);
    req.write(options.data);
    req.end();
  });
};

module.exports.get = promisify(http.get);
module.exports.request = promisify(http.request);
module.exports.httpsRequest = promisify(https.request);

// (async () => {
//   try {
//     const response = await get('http://krnl.de/');
//     let body = '';
//     response.on('data', (chunk) => { body += chunk; return body; });
//     await response.end;
//     console.log(body);
//   } catch (e) {
//     // statements
//     console.log(e);
//   }
// })();
