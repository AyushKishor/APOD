const express = require("express");
const BodyParser = require("body-parser");
const https = require("https")
const request = require("request");

const app = express();
app.use(BodyParser.urlencoded({extended: true}))
app.use(express.static("public"));
app.set("view engine", "ejs");


app.get("/",function(req,res)
{
	const url = "https://api.nasa.gov/planetary/apod?api_key=";

	https.get(url, function(response)
	{
		response.on("data",function(data)
		{
			const ImageData = JSON.parse(data);
			var ImageUrl = "";
			ImageUrl = ImageData.url;
			const explanation = ImageData.explanation;
			res.render("index",
			{
				ImageUrl: ImageUrl,
				explanation: explanation
			});
		});
		
	});
});


app.listen(process.env.PORT || 3000,function(req,res)
{
	console.log("Server is running");
});
