let express = require('express');
let app = express();
const {BigQuery} = require('@google-cloud/bigquery');

app.use(express.static(__dirname + "/public"));


app.get('/data', async (req, res) => {
  const query_options = {
    keyFilename: __dirname + '/sa.json',
    projectId: 'korona-data',
  };
  const bigquery = new BigQuery(query_options);
  let query = "SELECT * FROM `bigquery-public-data.covid19_jhu_csse_eu.summary` WHERE country_region = 'Finland'";

  // For all options, see https://cloud.google.com/bigquery/docs/reference/rest/v2/jobs/query
  const options = {
    query: query,
    // Location must match that of the dataset(s) referenced in the query.
    location: 'EU',
  };

  // Run the query as a job
  const [job] = await bigquery.createQueryJob(options)
  .catch(err => err);
  if (!job){
    return res.send ("ERROR")
  }
  console.log(`Job ${job.id} started.`);

  // Wait for the query to finish
  const [rows] = await job.getQueryResults()
  .catch(err => err);
  if (!rows){
    return res.send ("NO ROWS")
}

  // Print the results
  console.log('Rows:');
  rows.forEach(row => console.log(row));
  res.send(JSON.stringify(rows))
}
);

app.get('/index', function(req, res){
    res.sendFile(__dirname + '/index.html');
   
});

app.get('/districts', function(req, res){
    res.sendFile(__dirname + '../public/districts.html');
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