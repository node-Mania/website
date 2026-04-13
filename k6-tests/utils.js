import { sleep } from 'k6';

export function randomSleep(min = 1, max = 3) {
    sleep(Math.random() * (max - min) + min);
}