Quadratic Constant Solver
This is a command-line Java application that calculates the constant term 'c' of a quadratic equation (F(x)=ax 
2
 +bx+c). It determines the unique quadratic function that passes through the first three points defined in a JSON data file.

A key feature of this application is its ability to parse input points where the y-values are represented as very large numbers in arbitrary numerical bases (e.g., base-3, base-15, or hexadecimal).

## Features
Parses complex JSON data to extract numerical points.

Converts large numbers from any base (2-36) into standard decimal representation.

Uses Lagrange Interpolation to find the polynomial that fits the given points.

Calculates the constant term 'c' using high-precision BigDecimal arithmetic to handle very large numbers accurately.

## Requirements
Java Development Kit (JDK): Version 17 or newer.

Apache Maven: To manage project dependencies.

An IDE like Eclipse, IntelliJ IDEA, or VS Code is recommended.

## Setup and Installation
Get the Code: Place the project files on your local machine.

Open as Maven Project: Open the folder in your Java IDE. It should automatically recognize it as a Maven project.

Dependencies: The IDE will read the pom.xml file and automatically download the required org.json dependency. If it doesn't, manually trigger a Maven update (e.g., in Eclipse, right-click project > Maven > Update Project).

## How to Run
Prepare the Data File:

Create a file named data.json in the root directory of the project (at the same level as pom.xml).

Populate it with your data according to the format described below.

Run the Application:

Navigate to the QuadraticSolver.java file within your IDE.

Right-click on the file and select Run As > Java Application.

View the Output:

The calculated constant 'c' will be printed to the console.

## Input Data Format
The data.json file must be a single JSON object. The keys "1", "2", "3", etc., represent the points, where the key itself serves as the x-coordinate. The application will use the first three points it finds.

Each point object must contain two fields:

"base": A string representing the numerical base of the value.

"value": A string containing the number represented in the given base.

Example data.json
JSON

{
  "1": {
    "base": "6",
    "value": "13444211440455345511"
  },
  "2": {
    "base": "15",
    "value": "aed7015a346d635"
  },
  "3": {
    "base": "15",
    "value": "6aeeb69631c227c"
  }
}
