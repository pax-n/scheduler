# Interview Scheduler

## Overview

Interview Scheduler is a Single Page Application (SPA) that tracks and books interviews. This app allows users to add, edit, and delete appointments in real time. The data is persisted by the API server using PostgresSQL database and the client application communicartes with the API server over HTTP, using JSON format.

## Project Features

- Appointment days from Monday to Friday are diplayed on the left
- Each day displays the amount of spots available underneath the day
- A user can switch between days to see which spots are open or taken
- A user can book interviews by clicking an open day (plus sign) and typing their name along with choosing an interviewer
- A user can hover over an interview to edit or delete their interview on the bottom right of the panel
- Upon deleting an interview, the user will be prompted with a confirmation screen

## Demo

![demo-desktop-gif](https://raw.githubusercontent.com/pax-n/lighthouse-labs-scheduler/public/images/demo.gif)

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## API server

The client and API must run simultaneously in order for full functionality. Follow the README.md outlined [here](https://github.com/lighthouse-labs/scheduler-api) to install and setup the database server.

## Project Stack

**Front-End:** React, Axios, JSX, HTML, SASS, JavaScript

**Back-End:** Express, Node.js, PostgreSQL

**Testing:** Storybook, Webpack Dev Server, Jest, Testing Library and Cypress

## Dependencies

- Babel/Core
- Storybook
- Jest
- React
- Node-sass
- Prop-types
- React-test-renderer
