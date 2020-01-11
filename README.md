# ROKS Method Application

This is the Github repository for the ROKS method application made by the students from Fontys for [JUGO](https://jugo.nl/en/) and [Made To Measure KPIs](https://madetomeasurekpis.com/).

# Table of Contents
1. [The project](#project)
2. [The ROKS method](#method)
3. [Documentation](#documentation)
4. [Technical stuff](#technical)
5. [Setup](#setup)
6. [Content and features](#content)

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

Note: The documentation is generated automatically by the comments in the projects files by the [esdoc](https://esdoc.org/) plugin. Its settings are available in `source/.esdoc.json` and the generated files are available `docs`

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

This application runs on [NodeJS](https://nodejs.org/en/) >v10.15.1 using the [Express](https://expressjs.com/) >v4.16.1 framework.

To create, synchronize and use the database models, we use [Sequelize](https://sequelize.org/) v5.21.2 and the drivers to connect to a PostgreSQL database.

#### File structure:

- **bin/**
- **client/**
- **models/**
- **routes/**
    - **utils/**

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

## Content and features <a name="content"></a>

The user can use the three main parts of the application : The `Longlist`, `Shortlist` and `Definition` steps.

In the `Longlist`, the application allows the user to import its KPI tree as an XML file or enter KPIs manually. The user can then check which KPIs he wants to save in the database by checking / unchecking them, he can also rename the KPIs by double-clicking on the item in the list.

In the `Shortlist`, the user can place the imported KPI on a board based on their importance and their ease of measure. He can add a comment to the KPI to add notes about their ranking. On saving, the shortlisted KPIs are the one scoring above five in the two criteria.

In the `Definition`, the user can define the shortlisted KPI on multiple topics. He can also use the visualization panel to see have some insights about the KPI in the application.

### To be developed

- The authentication of user

For now the authentication of user is done by sending a default company and user in the API requests (companyId 1, userId 1) created in the synchronization with the database. The SignIn and SignUp form are already created and the model for the User table in the database already exists. A backend authentication and login sessions have to be created as well as better check on API calls.

- A better shortlisting

For now, the shortlist phase only consists of placing KPIs on a board based on their Ease of Measure and Importance. Only the KPIs which score above 5 in the 2 criteria are shortlisted and go to the definition phase.
A better shortlisting phase would include a second page after the currently existing one featuring 3 columns, a "To be discarded" (left), "To be Shortlisted" (right) and to be decided KPIs (middle). Only the KPIs present in the right column would be kept after this step.
The left column would be pre-filled with KPIs which were in the bottom left corner of the board and the right colum with KPIs from the up-right corner. KPIs which were in the two other corners (in other words, more than 5 in a criteria but below 5 in the other) would be placed in the middle column. Every KPIs could be moved from one column to another so the user can decide more precesily and per KPI which one to keep to the definition phase.

- A better definition and visualization

The 2 charts which currently exists show the definition completion percentage and score ranking of the KPIs. Other charts ideas would be to display to the number of KPI assigned per person of the company, the workload per employee (using a frequency of update of a KPI field in the definition and the ease of measure score, a workload score can be calculated), and the average completion of partially defined KPIs.
New optional fields could be added to the Definition screen for more infos about the KPIs to be used in the visualization

- Multiple projects per user

Now, the application only supports one project per company, so each user can only have one project. Multiple projects per user could be allowed so the users of a company can work on multiple KPIs trees for multiple departments.

- KPI tree creation

The application currently relies on exports from the visio software for its KPI trees. Next versions of the application should allow the users to import from others sources of diagramming software (Omnigraffle, Draw.io...) as well as allowing them to create and edit KPI trees in a in-app tool.