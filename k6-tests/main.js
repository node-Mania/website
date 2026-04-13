import homepage from './scenarios/homepage.js';
import browsing from './scenarios/browsing.js';
import userFlow from './scenarios/whmcs-user-flow.js';

export const options = {
    scenarios: {
        homepage_test: {
            executor: 'ramping-vus',
            exec: 'homepage',
            startVUs: 0,
            stages: [
                { duration: '2m', target: 50 },
                { duration: '3m', target: 100 },
                { duration: '2m', target: 0 },
            ],
        },

        browsing_test: {
            executor: 'constant-vus',
            exec: 'browsing',
            vus: 30,
            duration: '5m',
            startTime: '30s',
        },

        whmcs_user_flow: {
            executor: 'ramping-vus',
            exec: 'userFlow',
            stages: [
                { duration: '2m', target: 20 },
                { duration: '3m', target: 50 },
            ],
            startTime: '2m',
        },
    },

    thresholds: {
        http_req_duration: ['p(95)<2000'], // 95% under 2s
        http_req_failed: ['rate<0.05'],    // <5% errors
    },
};

export { homepage, browsing, userFlow };