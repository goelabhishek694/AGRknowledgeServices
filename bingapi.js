let https = require('https');
let subscriptionKey = 'f741943e17b445549501042909a249cd';
let host = 'api.cognitive.microsoft.com';
let path = '/bing/v7.0/news/search';
let fs = require('fs');

let term = 'construction tenders india';

let response_handler = function(response) {
    let body = '';
    response.on('data', function(d) {
        body += d;
    });
    response.on('end', function() {
        console.log('\nRelevant Headers:\n');
        for (var header in response.headers)
        // header keys are lower-cased by Node.js
            if (header.startsWith("bingapis-") || header.startsWith("x-msedge-"))
                console.log(header + ": " + response.headers[header]);
        body = JSON.stringify(JSON.parse(body), null, '  ');
        console.log('\nJSON Response:\n');
        console.log(body);
        return body;
        /*        fs.writeFile('outputdg.json', body, 'utf8', function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("The file was saved!");
                });
        */
    });
};

var bing_news_search = function(search) {
    console.log('Searching news for: ' + term);
    let request_params = {
        method: 'GET',
        hostname: host,
        path: path + '?q=' + encodeURIComponent(search),
        headers: {
            'Ocp-Apim-Subscription-Key': subscriptionKey,
        }
    };

    let req = https.request(request_params, response_handler);
    req.end();
}

exports.bing_news_search = bing_news_search;