# ROKS Method Application

This is the Github repository for the ROKS method application made by the students from Fontys for [JUGO](https://jugo.nl/en/) and [Made To Measure KPIs](https://madetomeasurekpis.com/).

# Table of Contents
1. [The project](#project)
2. [The ROKS method](#method)
3. [Documentation](#documentation)
4. [Technical stuff](#technical)
4. [Setup](#setup)

## The project <a name="project"></a>

This project is a proof of concept demonstrating the feasability of digitalizing the process of the method.
The team was made of 7 Fontys students for their Data Driven Business Lab semester.

### The team <a name="team"></a>

- [Timothy Cabaret](https://github.com/Haukain)
- [Lionel Fayolle](https://github.com/lionel438)
- [Béatrice Tésor](https://github.com/Beatrice1234)
- Wouter Mertens
- Joep van Gennip
- Tom Messie
- Geert Roozen

### The ROKS method <a name="method"></a>

The Result Orient KPI System (ROKS) is a KPI definition mathod created by Bernie Smith, you can learn more about it [on this website](https://madetomeasurekpis.com/roks-kpi-method-overview/)
It consists of 7 steps to design a KPI system for a company. This project creates a digital tool for the Longlist, Shortlist and Definition (3rd, 4th and 5th) steps of the method.

## Documentation <a name="documentation"></a>

The documentation of this application can be found [here](*TBD*)

## Technical stuff <a name="technical"></a>

This application runs on NodeJS and is connected to a PostgreSQL database.
The web client is created using React.

### The front-end 

The React application has been made using [React](https://reactjs.org/) v16.9.0 and we used [Material-UI](https://material-ui.com/) v4.4.2 for the styling.
Some other library are used for some parts of the front-end :
- [xml2js](https://www.npmjs.com/package/xml2js) (v0.4.22): Access data from XML based files uploaded by the client
- [immutability-helper](https://github.com/kolodny/immutability-helper) (v3.0.1): Symplifying the mutability of array, maps and other structures of Data in React states
- chart.js (v2.9.2) & [react-chartjs-2](https://www.npmjs.com/package/react-chartjs-2) (v2.8.0): Creation of charts for a dashboard
- [react-draggable](https://www.npmjs.com/package/react-draggable) (v4.0.3): Draggable elements

#### File structure:

- **public/**
    - **images/**
    - **svg_icon/**
- **src/**
    - **components/**
        - **DefinitionStep/**
        - **LonglistStep/**
        - **ShortlistStep/**
        - **VisualizationStep/**
        - **utils/**
    - **utils/**

### The back-end 

*TBD*

#### File structure:

*TBD*

## Setup <a name="setup"></a>

### Local installation

Please install locally:
- [NodeJS](https://nodejs.org/en/) (>v10.15.1) and npm (>v6.4.1)
- [PostgreSQL](https://www.postgresql.org/) (>v11)

On a local PostgreSQL server, create a database called `ddbl_web_app` and a user `ddbl_web_app` (password: `ddbl`) and give him the rights to read and write on the previously create database.

Clone this repository on your computer, open tabs in your terminal and move to the `source/` folder in the first one and to the `source/client/` folder in the second.

Run the command `npm install` in both tabs, this will install the dependencies of the project.

Once the installation done you can run `npm start` in both tabs. You can then go to http://localhost:3000 to access the web application or http://localhost:4000 to access the API.

### Deployment

*Here will be described the deployment of the application on the Heroku cloud platform*

Please create an account on the Heroku platform and download the Heroku CLI locally.

Move to the `source/` folder and run `npm run-script build`, this will build the React application for production.

Then [follow this guide](https://devcenter.heroku.com/articles/git) from Heroku for creating and deploying an application using Git.

Go to your Heroku dashboard and add a PostgreSQL database plugin to your application

Once the process is done you should be able to go to the url of your heroku-hosted application and use the production version of the ROKS method application.