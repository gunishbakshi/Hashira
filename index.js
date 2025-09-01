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
    // ✨ REFINEMENT: Added validation for the base.
    if (base < 2 || base > 36) {
        throw new Error(`Invalid base: ${base}. Base must be between 2 and 36.`);
    }

    const digits = '0123456789abcdefghijklmnopqrstuvwxyz';
    let result = 0n; // 'n' denotes a BigInt literal
    const baseBigInt = BigInt(base);

    for (let char of str.toLowerCase()) {
        const digitValue = digits.indexOf(char);
        if (digitValue === -1 || digitValue >= base) { // Also check if digit is valid for the base
            throw new Error(`Invalid character '${char}' for base ${base}`);
        }
        result = result * baseBigInt + BigInt(digitValue);
    }
    return result;
}

/**
 * Parses all points from the JSON object using a modern functional approach.
 * @param {object} jsonData The parsed JSON data.
 * @returns {Array<object>} An array of point objects with {x, y} as BigInts.
 */
function parseAllPoints(jsonData) {
    // ✨ REFINEMENT: Using Object.entries and map for a cleaner implementation.
    return Object.entries(jsonData)
        .filter(([key]) => key !== "keys")
        .map(([key, pointObj]) => {
            const x = BigInt(key);
            const y = parseBigInt(pointObj.value, parseInt(pointObj.base, 10));
            return { x, y };
        });
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

        // 🐛 FIX: Check for a zero denominator to prevent crashing.
        if (denominator === 0n) {
            throw new Error(
                `Invalid data: Found duplicate x-coordinate at x = ${xj}. ` +
                `Cannot compute a unique polynomial.`
            );
        }
        
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
