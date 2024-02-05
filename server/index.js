//index.js 
const fs = require("fs");
const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json())
app.use(cors());


async function textToImage(prompt) {
	const path =
		"https://api.stability.ai/v1/generation/stable-diffusion-v1-6/text-to-image";
	const key = process.env.KEY
	const headers = {
		"Content-Type": "application/json",
		"Accept": "application/json",
		"Authorization": `${key}`
	};

	// let prompt = 'a ' + zodiac + ' ' + action +' with a '+ symbol + 'in' + tattoStyle
	const body = {
		steps: 40,
		width: 512,
		height: 512,
		seed: 0,
		cfg_scale: 5,
		samples: 1,
		text_prompts: [
			{
				"text": prompt,
				"weight": 1
			},
			{
				"text": "blurry, bad, human body",
				"weight": -1
			}
		],
	};
	console.log(prompt)
	const response = await fetch(
		path,
		{
			headers,
			method: "POST",
			body: JSON.stringify(body),
		}
	);
	var ret = {}
	if (!response.ok) {
		ret.status = '401'
		ret.message = 'Performance issue'
	} else {
		const responseJSON  = await response.json()
		const HOST = process.env.HOST
		const PORT = process.env.FRONT_PORT
		responseJSON.artifacts.forEach((image, index) => {
			const id = Math.floor(Math.random() * 1024)
			const fileName = `tattoo/v1_txt2img_${id}.png`
			const fullPath = `../zodiac-client/public/${fileName}`
			fs.writeFileSync(
				fullPath,
			  Buffer.from(image.base64, 'base64')
			)
			ret.image  = `http://${HOST}:${PORT}/${fileName}`
			ret.description = prompt
			ret.id = id
			ret.name = prompt.substring(0,10)
		  })
	}
	console.log(ret)
	return ret
};


// REST API to get all products details at once 
// With this api the frontend will only get the data 
// The frontend cannot modify or update the data 
// Because we are only using the GET method here. 


app.get("/api/tattoo", (req, res) => {
	textToImage(req.query.prompt).then((data)=>{
		res.json(data) 
	})
});

app.post("/api/tattos", (req, res) => {

})

app.listen(process.env.PORT, () => {
	console.log('Server started on port 5000');
}); 
