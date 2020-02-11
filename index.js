"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.post("/echo", function(req, res) {
  var speech = "Seems like some problem. Speak again.";
  if(req.body.queryResult &&
    req.body.queryResult.parameters &&
    req.body.queryResult.parameters.echoText){
    if(req.body.queryResult.parameters.echoText.indexOf('apply leave') !== -1){
      speech = 'leave_application';
    }else if(req.body.queryResult.parameters.echoText.indexOf('apply leave') !== -1){
      speech = 'permission_application';
    }
  }
   
  
  var speechResponse = {
    google: {
      expectUserResponse: true,
      richResponse: {
        items: [
          {
            simpleResponse: {
              textToSpeech: speech
            }
          }
        ]
      }
    }
  };
  
  return res.json({
    payload: speechResponse,
    fulfillmentText: speech,
    speech: speech,
    displayText: speech,
    source: "Dialogflow-usis"
  });
});




restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
