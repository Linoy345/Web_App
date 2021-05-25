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

![WhatsApp Image 2021-04-14 at 14 46 20](https://user-images.githubusercontent.com/59093573/114705659-a197c000-9d30-11eb-9fe0-e7c373cb07cc.jpeg)

Make sure to click the ```Fly``` button and wait to see the following screen before you continue:

![WhatsApp Image 2021-04-14 at 14 34 38](https://user-images.githubusercontent.com/59093573/114744166-13363500-9d56-11eb-853f-10d9413cc543.jpeg)

Now, in the ```Visual Studio``` click the ```Start``` button to clean and build the project, and the following window will pop up:

![Screenshot 2021-04-14 231655](https://user-images.githubusercontent.com/59093573/114773305-8f8d4000-9d77-11eb-9725-c69ab06d2868.jpg)




## Features
- Choosing CSV - click on the ```Open CSV``` button to start your flight. You will be asked to choose a CSV file that contains the flight info (a CSV file in which flight data sampled at some rate is recorded).
  You can use one of our demo CSV files: 
  1. https://github.com/Gitit-Shapira/Flightgear/blob/main/anomaly_flight.csv - file that containing the anomaly.
  2. that is located in the following path:  https://github.com/Gitit-Shapira/Flightgear/blob/main/reg_flight.csv - file that not containing the anomaly. 
- Choosing XML - click on the ```Open XML``` button and choose XML file from your system :
- Joystick - the movements of the flight is done according to the X and Y coordinates (from the CSV file)
- Flight Data - This Lets you see some different data:
    - Flight altitude
    - Flight speed
    - Flight direction
    - Yaw, roll, and pitch info
- Control bar:
    - Speed value - you can set the speed of the flight by selecting an option in the right corner drop-down button called ```Play Speed```

    - Play button - Use the ```Play``` button to resume the flight after the ```Stop``` or ```Pause``` button was clicked.
    - Pause button - Click the ```Pause``` button to freeze the flight.
    - Stop button - When the ```Stop``` button is pressed, the flight is being frozen, but now by clicking the ```Play``` button the flight will start from the beginning.
    - Slide bar - Allow you to move the tick along with the slider, and then the flight will jump to the corresponding time CSV line according to its position you chose.
- Flight parameters graphs: The graph is affected by the values of the flight parameter, so you can play with them and then the graph will be updated accordingly, which is presenting the progression of its value through the flight.
- Anomaly detector - This allows you to select an anomaly detection algorithm. The algorithm will detect at what moments in time an anomaly occurred and will mark it prominently so that you can effectively jump into that moment in time and investigate it.



## Project Hierarchy

The main files in our project are as follow:

- Model:
    - IFlightgearMonitorModel.cs - interface for the model in the architecture MVVM
    - MyFlightgearMonitorModel - class which implements the IFlightgearMonitorModel interface
- View Model
    - ViewModel.cs -  All other ViewModels inherit this ViewModel class.
    - MainWindowViewModel.cs - The main view model
    - FlightDataViewModel.cs - The view model of flight information.
    - FlightgearMonitorViewModel.cs - viewModel of the control bar (Playback speed, play/stop buttons, playback slider).
    - GraphsViewModel.cs - The view model of graphs presented to the user.
    - JoystickViewModel.cs - The view model of the Joystick    -
- View:
    - GraphsView - responsible to display the graphs
    - FlightDetails - responsible to display the flight information.
    - ControlBar - responsible to display the control bar, which consists of the Play, Pause, Stop buttons, the slider, and the play speed.
    - Joystick - responsible to display the joystick
    - MainWindow -  responsible to display the main screen which contains the menu.

## More documentation
- UML: https://github.com/Gitit-Shapira/Flightgear/blob/main/uml%20flightgear%20project.pdf
- Control Bar: https://github.com/Gitit-Shapira/Flightgear/blob/main/FlightMonitor/ControlBar.md
- Joystick: https://github.com/Gitit-Shapira/Flightgear/blob/main/FlightMonitor/Joystick.md
- Graph: https://github.com/Gitit-Shapira/Flightgear/blob/main/FlightMonitor/Graph.md



## Demo video
https://youtu.be/lSMXU8fLzJ0


## Writers
- Gitit Shapira
- Roey Peleg
- Dvir Asaf
- Or Memia












#
