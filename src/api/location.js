import https from 'https'
import secretKeys from '../__key'

const RADIUS = 500;
const LIMIT = 10;
const baseUrl = 'https://api.tomtom.com/search/2/';

export default (lat, lon) => {
    const url = `${baseUrl}poiSearch/coffee.json?key=${secretKeys.map}&limit=${LIMIT}&radius=${RADIUS}&lat=${lat}&lon=${lon}`;

    return new Promise((resolve, reject) => {
        https.get(url, response => {
            response.setEncoding("utf8");
            let result = "";
            response.on("data", data => {
                result += data;
            });
            response.on("end", () => {
                result = JSON.parse(result);

                if (!result.results) {
                    reject();
                }
                resolve(result.results);
            });
        });
    });
};

export const addressLookup = (address) => {
    const url = `${baseUrl}geocode/${address}.json?key=${secretKeys.map}`;

    return new Promise((resolve, reject) => {
        https.get(url, response => {
            response.setEncoding("utf8");
            let result = "";
            response.on("data", data => {
                result += data;
            });
            response.on("end", () => {
                result = JSON.parse(result);

                if (result.results.length === 0) {
                    reject();
                }
                resolve(result.results[0].position);
            });
        });
    });
};
