const http = require('http');
const secret = require('secret');

module.exports.function = function callApi(input) {
  const apiKey = secret.get('APIKEY');

  // const options = {
  //   hostname: 'api.example.com',
  //   path: '/api/v1/example',
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${apiKey}`
  //   }
  const options = {
    url: 'https://api.openai.com/v1/engines/davinci-codex/completions',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    json: {
      prompt: input,
      max_tokens: 60,
      temperature: 0.5,
      n: 1,
      stop: '\n',
    } 

  };

  const requestData = {
    text: input.text
  };

  const request = http.request(options, response => {
    let data = '';

    response.on('data', chunk => {
      data += chunk;
    });

    response.on('end', () => {
      const result = JSON.parse(data);
      const responseText = result.response;
      return {
        response: responseText
      };
    });
  });

  request.write(JSON.stringify(requestData));
  request.end();
}