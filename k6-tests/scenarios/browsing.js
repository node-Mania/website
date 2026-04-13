import http from 'k6/http';
import { check } from 'k6';
import { BASE_URL } from '../config.js';
import { randomSleep } from '../utils.js';

export default function () {
    let pages = [
        '/',
        '/web-hosting',
        '/wordpress-hosting',
        '/domains',
        '/business-hosting',
        '/email-services',
        '/web-security/ssl-certificate',
        '/web-security/nordvpn',
        '/web-security/codeguard',
        '/web-security/site-monitoring',
        '/social-bee',
        '/blog',
        '/legal',
        '/about',
        '/contact',
    ];

    pages.forEach((page) => {
        let res = http.get(`${BASE_URL}${page}`);

        check(res, {
            [`${page} loaded`]: (r) => r.status === 200,
        });

        randomSleep(1, 2);
    });
}