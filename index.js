// Import the built-in 'fs' (File System) module to read files
const fs = require('fs');

/**
 * A custom function to parse a string into a BigInt from an arbitrary base.
 * JavaScript's BigInt doesn't have a built-in multi-base constructor like Java.
 * @param {string} str The string to parse.
 * @param {number} base The numerical base (2-36).
 * @returns {BigInt}
 */
function parseBigInt(str, base) {
    const digits = '0123456789abcdefghijklmnopqrstuvwxyz';
    let result = 0n; // 'n' denotes a BigInt literal
    const baseBigInt = BigInt(base);

    for (let char of str.toLowerCase()) {
        const digitValue = digits.indexOf(char);
        if (digitValue === -1) {
            throw new Error(`Invalid character '${char}' for base ${base}`);
        }
        result = result * baseBigInt + BigInt(digitValue);
    }
    return result;
}

/**
 * Parses all points from the JSON object.
 * @param {object} jsonData The parsed JSON data.
 * @returns {Array<object>} An array of point objects with {x, y} as BigInts.
 */
function parseAllPoints(jsonData) {
    const points = [];
    for (const key in jsonData) {
        if (key === "keys") {
            continue;
        }
        
        const pointObj = jsonData[key];
        const x = BigInt(key);
        const y = parseBigInt(pointObj.value, parseInt(pointObj.base, 10));
        
        points.push({ x, y });
    }
    return points;
}

/**
 * Calculates the constant 'c' using the generalized Lagrange Interpolation formula.
 * @param {Array<object>} points An array of point objects.
 * @returns {BigInt} The calculated constant 'c'.
 */
function findConstantC(points) {
    let constantC = 0n;

    for (let j = 0; j < points.length; j++) {
        const { x: xj, y: yj } = points[j];
        
        let numerator = 1n;
        let denominator = 1n;

        for (let i = 0; i < points.length; i++) {
            if (i === j) {
                continue;
            }
            const { x: xi } = points[i];
            numerator *= -xi;
            denominator *= (xj - xi);
        }
        
        // Since the final result is an integer, we can do multiplication first
        // and then integer division.
        const term = yj * numerator / denominator;
        constantC += term;
    }
    
    return constantC;
}

/**
 * Main function to run the solver.
 */
function main() {
    try {
        // 1. Read and parse the data file.
        const fileContent = fs.readFileSync('data.json', 'utf8');
        const jsonData = JSON.parse(fileContent);

        // 2. Extract and convert all points.
        const points = parseAllPoints(jsonData);
        console.log(`✅ Successfully loaded and parsed ${points.length} points.`);

        // 3. Calculate the constant 'c'.
        const constantC = findConstantC(points);

        // 4. Print the result.
        console.log("\n------------------------------------");
        console.log(`🎯 The calculated constant C is: ${constantC}`);
        console.log("------------------------------------");

    } catch (error) {
        console.error("❌ An error occurred:", error.message);
    }
}

// Run the main function
main();
