var moment = require('moment');

var now = moment();
console.log(now.format());
now.subtract(1, 'year');
console.log(now.format('X')); //unix timestamp
console.log(now.format('x')); // javascript timestamp

var timestamp = 1423469548704 ;
var timestampMoment = moment.utc(timestamp);

console.log(timestampMoment.local().format('h:mm a'));

console.log(now.format('MMM Do YYYY, h:mma'));