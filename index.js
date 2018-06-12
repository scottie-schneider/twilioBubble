// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
const accountSid = 'ACde1a258b0739ab5329d862519e4f16f6';
const authToken = '70a625b9522cb1e511f60afaebfde860';
const client = require('twilio')(accountSid, authToken);
const express = require('express');
const jsonParser = require('body-parser').json;

const app = express();
app.use(jsonParser());

//first route goes here
app.get('/', function(req,res){
  client.messages
    .create({
       body: 'This is generated from Node. Please eat ${numDicks} dicks, Davis!',
       from: '+15126472652',
       to: '+15128176776'
     })
    .then(message => console.log(message.sid))
    .done();
  res.send('great success')
})

app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();

  twiml.message('The Robots are coming! Head for the hills!');

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});


const port = process.env.PORT || 3000;

app.listen(port, function(){
  console.log(`booting up on port ${port} commander!`)
})
