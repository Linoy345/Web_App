# Web Flight App
##### Advanced Programming 2 - Assignment 2



This Java script code is a web app for analyzing flights.
This web app connects to a server, and display in a graphic way information regarding the flight
Also, there is an option of choosing an anomaly detection algorithm to display the anomalies that were found during the flight.

## Application description and goal
Our users are flight researchers or pilots who want to learn from flight data.
The flight data includes the steering mode, speed, altitude direction, etc.
This app allows a user to upload to our server a training and flight data file. Then an anomaly detection algorithm learn the given info and detect anomalies found in the flight data file. The anomalies are displayed in the app in a list in which the user can see exactly where and when the anomaly has occurred.

## Prerequisites

- Download WebStrom/VS Code to run the server.
- Java Script- Node JS.

## Getting Started

Clone the project via the command line:
```sh
git clone https://github.com/yair2121/Web_App.git
```

Now, open the ```Server.js``` source file and run the code to open the server.

Now to use the app go to your favorite web browser and connect to the server with: localhost:8080:

A screenshot is attached:

![Main_Screen.png](Images/Main_Screen.png)

Make sure to click the ```Submit``` button after uploading files and choosing algorithm setting.

## Features
- Choosing Learn file CSV - click on the ```Choose Learn File```. You will be asked to choose a CSV file that contains the flight info (a CSV file in which flight data sampled at some rate is recorded).
  You can use one of our demo CSV files: 
  1. https://github.com/Gitit-Shapira/Flightgear/blob/main/anomaly_flight.csv - file that containing the learning data.
  2. https://github.com/Gitit-Shapira/Flightgear/blob/main/reg_flight.csv - real Flight Data for anomalies detection. 
- Anomaly detector - This allows you to select an anomaly detection algorithm. The algorithm will detect at what moments in time an anomaly occurred and will display it in a list.

## Project Hierarchy

The main files in our project are as follow:

- Controller:
    - Server.js - Web app server.
- Model



- View:
    - index.html - Display the app screen.

## More documentation
- UML:



## Demo video
https://youtu.be/lSMXU8fLzJ0


## Writers
- Gitit Shapira
- Roey Peleg
- Linoy Sela
- Yair Yardeni












#
