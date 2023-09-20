
# Ai.VideoTools backend using Fastify Api
Ai.VideoTools is an application that uses Artificial Intelligence (AI) to generate title and description suggestions for videos. It analyzes the spoken content of the uploaded video to provide accurate suggestions.

How does it work?

1. The user uploads an MP4 video and adds some keywords;
2. The application uses OpenAI's AI to convert the speech from the video into written text;
3. The user selects whether they want to generate title suggestions or descriptions;
4. The user selects the level of creativity of the AI;
5. The user can customize the requests to generate results that are closer to their reality;
6. The results are shown on the screen once the user clicks on the "Generate" button.

## The backend
This project integrates the web application, OpenAI's artificial intelligence, and the database. Used the Fastify Node.js backend framework with TypeScript to develop the API, and integrated it with an SQLite database using Prisma. Used Zod library to handle with API requests validations.

## Where is the frontend?
Ai.VideoTools Web repository:
https://github.com/dwtoledo/ai-video-tools-web

## Run locally:
 1. Clone the repository;
 2. On the project folder create a .env file and add the following code to it:

	```javascript
	DATABASE_URL="file:./dev.db"
	OPENAI_KEY="PLACE YOUR OPENAI API KEY HERE"
	``` 
	If you have any questions about generating an API Key, please refer to the following link for guidance: https://help.openai.com/en/articles/4936850-where-do-i-find-my-secret-api-key

 3. (OPTIONAL) Change the server port on /src/server.ts file:
    ```javascript
      app
      .listen({
        port:  3333, //CHANGE HERE
      })
      .then(() => {
        console.log('Ai VideoTools API Running!')
      })
    ```
 
 5. Open the project folder in a terminal and install the necessary dependencies by using the following command:
	```console
	npm install
	```
 6. Run the project with the command:
	```console
	npm run dev
	```
 7. *Upload AI API Running!* message indicates that the project has started successfully.

## Contact me:
Feel free to contact me in case of questions: dwtoledo@outlook.com

## Contributing:
Contributions are welcome! Please keep me in touch in case of improvements or fixes.
