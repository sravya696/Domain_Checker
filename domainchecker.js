var express = require('express');
var app = express();
var ejs = require('ejs');
var mysql = require('mysql');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));


//taking the 'url-exists' module
var urlexits = require('url-exists');
var sleep = require('sleep');
var request = require('request');
var deasync = require('deasync');


//the array for checking domains
var domain=['.com','.org','.in','.club.in','.club'];


//reading the first html page
app.get('/home',function(req,res,next)
    {
        res.sendfile('domainchecker.html');
    });
    var name,a,b;
    var array=[];
//action when check button is selected.
app.post('/check', function(req, res)
{
    array=[];
        name = req.body.input;

        //running loop of domain array
    for(var i =0;i<domain.length;i++)
    {
        var value=domain[i];
        var url = "http://"+name + value;
        function foo(err,exits)
        {
            if (exits) {
                array.push('url -'+value);

            }
            else {
                array.push('Not a URl -' + value);

            }
        }


        function syncFunc()
        {
            var ret = null;
            urlexits(url, function(err, result){
                ret = {err : err, result : result}
            });

            while((ret == null))
            {
                deasync.runLoopOnce();
            }

            return (ret.err || ret.result);
        }

        array.push(syncFunc());

    }



    console.log(array);
    res.sendfile('domainchecker.html');
});



//serving on the localhost
app.listen(8082);
