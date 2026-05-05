const fs = require('fs');
const path = require('path');

// Manually load .env since dotenv is not available
function loadEnv() {
    const envPath = path.resolve(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
        const envConfig = fs.readFileSync(envPath, 'utf8');
        envConfig.split('\n').forEach(line => {
            const [key, value] = line.split('=');
            if (key && value) {
                process.env[key.trim()] = value.trim();
            }
        });
    }
}

loadEnv();

const WHMCS_BASE_URL = process.env.WHMCS_BASE_URL || "";
const WHMCS_API_IDENTIFIER = process.env.WHMCS_API_IDENTIFIER || "";
const WHMCS_API_SECRET = process.env.WHMCS_API_SECRET || "";
const API_ENDPOINT = `${WHMCS_BASE_URL}/includes/api.php`;

console.log("WHMCS_BASE_URL:", WHMCS_BASE_URL);
console.log("API_ENDPOINT:", API_ENDPOINT);

async function test() {
    const body = new URLSearchParams({
        action: "GetProducts",
        identifier: WHMCS_API_IDENTIFIER,
        secret: WHMCS_API_SECRET,
        responsetype: "json"
    });

    try {
        console.log("Sending request to WHMCS...");
        const response = await fetch(API_ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: body.toString()
        });

        console.log("Status:", response.status, response.statusText);
        const text = await response.text();
        console.log("Raw Response:", text);

        try {
            const json = JSON.parse(text);
            console.log("Parsed JSON:", JSON.stringify(json, null, 2));
        } catch (e) {
            console.log("Response is not JSON");
        }
    } catch (err) {
        console.error("Fetch Error:", err);
    }
}

test();
