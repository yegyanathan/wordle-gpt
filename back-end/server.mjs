import cors from 'cors';
import express, { urlencoded, json } from 'express';
import { config } from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

config();

const app = express();

app.use(urlencoded({ extended: false }));
app.use(json());

const origin_port = process.env.O_PORT
const corsOptions = {
  origin: `http://localhost:${origin_port}`
};
app.use((req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Origin', 
    `http://localhost:${origin_port}`
  );
  next();
});
app.use(cors(corsOptions));


app.post("/api/v1/generate", async (req, res) => {

  const prompt = `
  Please generate comma separated 5 letter words that are unique and meaningful, 
  based on the given topic. The words must not contain acronyms or phrases. ### 
  Topic: ${req.body.topic}`;

  try{
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
  
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: prompt}],
    });
  
    var response = completion.data.choices[0].message["content"];
    var words = response.split(', ')
    var targetWord = '';

    while(true){
      targetWord = words[Math.floor(Math.random() * words.length)]
      if(targetWord){
        if(targetWord.length > 5){
          const id = words.indexOf(targetWord);
          words.splice(id,  1);
        }
        else{
          break;
        }
      }
      else{
        targetWord = "sorry";
      }
    }
    console.log("target word is ", targetWord)
    res.json({ targetWord });
  }
  catch (error) {
    console.error('Error processing the request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

})

app.post("/api/v1/validate", async (req, res) => {
  const prompt = `
  Respond 'YES' if the given word is meaningful and respond 'NO' if it's not. ### Word: ${req.body.word}`;

  try{
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
  
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: prompt}],
    });
  
    var isValid = completion.data.choices[0].message["content"];
    console.log("response is ", isValid)
    res.json({ isValid });
  }
  catch (error) {
    console.error('Error processing the request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

})


const server_port = process.env.S_PORT || 3000;
app.listen(server_port, () => {
  console.log(`Server is running on port ${server_port}`);
});





























//   const options = {
//     method: 'POST',
//     headers: {
//       "content-type": 'application/json',
//       // We specify the Content-Type header as application/json to indicate that we're sending JSON data. 
//       "authorization": `Bearer ${openai_api_key}`
//     },
//     body: JSON.stringify({
//       "model": "text-davinci-003",
//       "prompt": prompt,
//       "max_tokens": 250,
//       "temperature": 0.60,
//       "top_p": 1,
//       "n": 1,
//       "stream": false,
//       "logprobs": null
//     })
//     // We're sending some JSON data in the request body.
//     // We use the JSON.stringify() method to convert a 
//     // JavaScript object to a JSON string before sending it in the request body.
//   };
  
//   // Make a request to the external API
//   // fetch(openai_endpoint, options)
//   // // returns a promise object.
//   // .then(
//   //   res => res.json()
//   // )
//   // .then(
//   //   json => {
//   //     console.log('data:', json);
//   //     res.send(json);
//   // })
//   // .catch(
//   //   error => {
//   //     console.error('error:' + error)
//   //     res.status(500).send('Error fetching data from external API');
//   // });

//   res.send({
//     "id": "cmpl-6oazmYQfbkOr2FPAbi8hFDm2rB9Iu",
//     "object": "text_completion",
//     "created": 1677516630,
//     "model": "text-davinci-003",
//     "choices": [
//         {
//             "text": "Hi buddy i love you so much. now come to me hehe.",//`${between(10, 200)}`,
//             "index": 0,
//             "logprobs": null,
//             "finish_reason": "length"
//         }
//     ],
//     "usage": {
//         "prompt_tokens": 4,
//         "completion_tokens": 11,
//         "total_tokens": 11
//     }
//   })
// });




