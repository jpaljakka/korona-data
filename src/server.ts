let express = require('express');
let app = express();
const {BigQuery} = require('@google-cloud/bigquery');
app.get('/data', async (req, res) => {
  

  
  const bigqueryOptions = {
    keyFilename: __dirname + '/sa.json',
    projectId: 'korona-data',
  };
  const bigquery = new BigQuery(bigqueryOptions);
  const query = "SELECT * FROM `bigquery-public-data.covid19_jhu_csse_eu.confirmed_cases` WHERE country_region = 'Finland'";

  // For all options, see https://cloud.google.com/bigquery/docs/reference/rest/v2/jobs/query
  const options = {
    query: query,
    // Location must match that of the dataset(s) referenced in the query.
    location: 'EU',
  };

  // Run the query as a job
  const [job] = await bigquery.createQueryJob(options).catch(e => e);
  if (!job){
    return res.send ("nojob")
  }
  console.log(`Job ${job.id} started.`);

  // Wait for the query to finish
  const [rows] = await job.getQueryResults().catch(e => []);
  if (!rows){
    return res.send ("NO ROWS")
}

  // Print the results
  console.log('Rows:');
  rows.forEach(row => console.log(row));
  res.send(JSON.stringify(rows))
}
);

app.use(express.static(__dirname + "/public"));

app.get('/', function(req, res){
    //res.sendFile(__dirname + '../index.html');
    res.send ("lol")
});

app.get('/districts', function(req, res){
    res.sendFile(__dirname + '/public/districts.html');
});

app.get('/zero', function(req, res){
    res.sendFile(__dirname + '/public/zero.html');
});

app.get("*", function(req, res){
    res.status(404).sendFile(__dirname + "/public/404.html"); 
});


let server = app.listen(8081, function(){
    let port = server.address().port;
    console.log("Server started at http://localhost:%s", port);
});