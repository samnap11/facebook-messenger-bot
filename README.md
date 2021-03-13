# Mask Facebook Messenger Bot

## Description

A simple Facebook Messenger bot created with NodeJS. Currently, **Mask** is deployed on [this site](https://sampul-mask-bot.herokuapp.com). You can also visit **Mask** and chat with it from [here](https://www.facebook.com/Mask-Bot-101291058714028).

P.S. **Mask** is currently deployed on a Heroku free plan, so you might have a hard time when you're trying to chat with it for the first time due to the inactivity.

## Requirements

There are a couple of requirements that you have to have first before you can run this application locally.

- NodeJS (tested and run on `v14.16.0`)
- yarn
- Ngrok

## Install Instructions

1. You can clone this repo or download this as a `.zip` to your local machine.

2. Then, you should go to the root of this directory.

3. Install the project dependencies using `yarn`

```shell
$ yarn
```

4. By default, this app runs on `PORT: 3030`. So, make sure you run your `Ngrok` on that port.

```shell
$ ./path/to/ngrok http 3030
```

5. Copy `.env.example` file to the root directory as `.env`.

```shell
$ cp .env.example .env
```

6. Open your `Messenger` app in your Facebook for Developers account. On `Access Token` field, `Generate Token` from a page that you would like to choose as the bot. Then, paste the access token onto the `ACCESS_TOKEN` variable inside the `.env` file.

7. Fill in the rest of the variables in `.env` file.

- `VERIFY_TOKEN`: random string
- `MONGODB_URI`: URI to connect to your MongoDB cluster
- `GRAPH_URL`: Facebook GraphQL API URL. You can look more into it from [here](https://developers.facebook.com/docs/graph-api)

8. Run the application. There are two options to run the application.

- Running the TypeScript version with `ts-node`

```shell
$ yarn dev
```

- Running the JavaScript version
  - To do this, you have to transpile the codes first to JavaScript
  ```shell
  $ yarn postinstall
  ```
  - Start the `express` server on `PORT: 3030`
  ```shell
  yarn start
  ```

9. Scroll down onto the `Webhooks` section on the `Messenger` app settings in your Facebook for Developers page. Choose `Edit Callback URL`. Fill in the `Callback URL` with the `Forwarding` section on your `Ngrok` terminal. Make sure you choose the HTTPS version because the webhook won't run properly on top of an HTTP connection. Don't forget to append `/webhook` to the end of the URL. Example: `https://122d0a41e7cf.ngrok.io/webhook`. Then, fill in the `Verify Token` field with the verify token that you have chosen before and used it in `VERIFY_TOKEN` variable in the `.env` file.

10. Press `save`.
11. Now, you can go to the page and have a chat with **Mask** from the `Messenger`.

## How to Chat with `Mask`

1. You can initiate the conversation first with **Mask** by typing anything you want and send it to **Mask**. Currently, there is no profanity filter installed on **Mask**, so you have to be mindful with your language.

2. **Mask** will ask for your first name. You can reply to him with your first name. If you reply to him with more than one word, **Mask** will only take in the first word as your first name.

3. **Mask** will ask for your birth date. You can reply to him with your birth date in `YYYY-MM-DD` format.
4. **Mask** will ask you whether you want to know how long it will be until your next birthday. You can choose from one of the quick reply options or you can type in your own answer. For affirmative answers, there are `'yes', 'yeah', 'yup', 'uh-huh', 'y', 'yep'`. For negative answers, there are `'no', 'nah', 'n', 'nope', 'nuh-uh'`. If you answer other than the available options, **Mask** won't be able to recognize your response and will ask you to answer it again.
5. After you answer the final prompt, whether with an affirmative or a negative, **Mask** will reset and act as if the conversation before never happened. You will go back to step 1 and repeat the process.

## Endpoints

[POST] `/webhook`: Handle incoming messages from `Messenger`
[GET] `/webhook`: Create a connection with `Messenger` and verify the challenge from `Messenger`
[GET] `/messages`: Get all messages
[GET] `/messages/:id`: Get a message with an id of `id`
[DELETE] `/messages/:id`: Delete a message with an id of `id`

## Disclaimer

Your message with **Mask** will be recorded and saved to the database.
