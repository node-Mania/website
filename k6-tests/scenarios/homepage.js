import http from 'k6/http';
import { check } from 'k6';
import { BASE_URL } from '../config.js';
import { randomSleep } from '../utils.js';

export default function () {
    let res = http.get(BASE_URL);

    check(res, {
        'homepage status 200': (r) => r.status === 200,
        'homepage fast (<1s)': (r) => r.timings.duration < 1000,
    });

    randomSleep();
}