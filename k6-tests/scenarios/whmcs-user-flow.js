import http from 'k6/http';
import { check } from 'k6';
import { CLIENT_URL, TEST_USERS } from '../config.js';
import { randomSleep } from '../utils.js';

export default function () {
    let pages = [
        '/',
        '/store/basic-website-hosting',
        '/store/business-web-hosting',
        '/store/wordpress-hosting',
        '/store/domain',
        '/store/business-hosting',
        '/store/email-services',
        '/store/ssl-certificates',
        '/store/professional-email',
        '/store/nordvpn',
        '/store/codeguard',
        '/store/360monitoring',
        '/store/SocialBee',
        '/store/cloud-servers',
        '/announcements',
        '/knowledgebase',
        '/contact.php',
        '/submitticket.php?step=2&deptid=2'

    ];

    pages.forEach((page) => {
        let res = http.get(`${CLIENT_URL}${page}`);

        check(res, {
            [`${page} loaded`]: (r) => r.status === 200,
        });

        randomSleep(1, 2);
    });
}