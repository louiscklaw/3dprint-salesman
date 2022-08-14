const NodeStl = require('node-stl');
const request = require('request');

const requestSettings = {
  method: 'GET',
  url: 'https://s3.amazonaws.com/minifactory-stl/WALLY_1plate.stl',
  encoding: null,
};

request(requestSettings, function (error, response, body) {
  var stl = new NodeStl(body);
  // console.assert.equal(stl.volume, 21.87511539650792);
  console.log({ stl });
  done(null);
});
