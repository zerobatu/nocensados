exports.index = function(req, res){
  res.render('index', { count: count });    
};

// ntwitter
var count = 0;
var twitter = require('ntwitter');
var twit = new twitter({
  consumer_key: 'Twitter',
  consumer_secret: 'API',
  access_token_key: 'keys',
  access_token_secret: 'go here'
});

setInterval(function() {
  console.log("reload twit");
  twit.search('nomecensaron OR #nomecensaron', function(err, data) {
  if (err) {
    console.log('Twitter search failed!');
  }
  else {
    count = 0;
    for(i = 0; i < data.results.length; i++){
      str = data.results[i].text;
      str = str.toLowerCase();
      ini = str.indexOf("nomecensaron") + "nomecensaron".length;
      ini = str.indexOf("#", ini) +1;
      fin = str.indexOf(" ", ini);
      if (fin < 0)
        fin = str.length;
      if(!isNaN(parseInt(str.substr(ini, fin-ini))))
        // esto lo coloco por si alguien empieza a trolear
        // despues le voy a dar otra vuelta para filtrar por usuario
        if(parseInt(str.substr(ini, fin-ini)) < 10)
          count += parseInt(str.substr(ini, fin-ini));
        else
          count++;
      else
        count++;
      }
    }
  });
}, 10000 );
