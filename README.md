# Polynomial Constant Solver (Node.js)

This is a command-line Node.js application that calculates the constant term 'c' of a polynomial. It determines the unique polynomial that passes through all points defined in a JSON data file.

A key feature of this application is its ability to parse input points where the y-values are represented as very large numbers in arbitrary numerical bases (e.g., base-3, base-15, or hexadecimal).

---

## ## Features

* Parses complex JSON data from a local file.
* Converts large numbers from any base (2-36) into a `BigInt`.
* Uses Lagrange Interpolation to find the polynomial that fits all given points.
* Calculates the constant term 'c' using `BigInt` arithmetic for perfect precision.

---

## ## Requirements

* **Node.js**: Version 12.x or newer (for `BigInt` support).

---

## ## Setup and Installation

1.  **Get the Code**: Clone the repository or download the source files.
2.  **Install Dependencies**: Open your terminal in the project's root directory and run `npm install`. (Note: This project has no external dependencies, but this is good practice).

---

## ## How to Run

1.  **Prepare the Data File**:
    * Ensure the **`data.json`** file is in the root directory of the project.
    * Populate it with your data. The script will use all points found in the file.

2.  **Run the Application**:
    * Open your terminal in the project's root directory.
    * Run the command:
        ```sh
        npm start
        ```
    * Alternatively, you can run `node index.js`.

3.  **View the Output**:
    * The calculated constant 'c' will be printed to your terminal.
