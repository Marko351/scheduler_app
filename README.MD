# Scheduler App

> Application for scheduling events

## Pre-requisites:

- Postgresql
- Node.js

## Database + .env

After successfully instaled pre-requisites you have to create database for this project. Type commands in your terminal:

```sh
sudo -i -u postgres psql
```

```sh
CREATE DATABASE <database name>
```

Create `.env` file in the root project directory with following variables:

![.env](https://i.ibb.co/GHch5pt/env.png)

## Run App Locally

In the root project directory run commands:

```sh
npm install
```

```sh
npm run client-install
```

that will install all necessary packages. To run both frontend and backend execute command:

```sh
npm run dev
```

## Documentation

Documentation for this app is exposed on `localhost:5555/docs`

![docs](https://i.ibb.co/8DL1VXt/docs.png)
