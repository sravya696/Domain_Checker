//1.
var csv = require('csv-parser')
var fs = require('fs')
var arr = [];
var deasync = require('deasync');
function domainlist(){
    fs.createReadStream('topleveldomain.csv')
        .pipe(csv())

        .on('data', function (data) {


            arr.push(data.Domain);



                deasync.runLoopOnce();

        })
}
console.log(domainlist());
console.log(arr);
/*const tldEnum = require('tld-enum');
console.log(tldEnum.list.length);*/
