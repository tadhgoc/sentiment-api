import ResourceNotFoundError from "../../errors/resource-not-found";
import ParamMissingError from "../../errors/param-missing";

import { MAP_KEY } from "./__key";

const https = require("https");

export default async ctx => {
    const { lat, lon } = ctx.query;

    const RADIUS = 500;
    const LIMIT = 10;

    if (!lat) ctx.throw(new ParamMissingError("lat"));
    if (!lon) ctx.throw(new ParamMissingError("lon"));

    const url = `https://api.tomtom.com/search/2/poiSearch/coffee.json?key=${MAP_KEY}&limit=${LIMIT}&lat=${lat}&lon=${lon}&radius=${RADIUS}`;

    const results = await foo(url);

    ctx.body = { results };
};

const foo = async url => {
    return new Promise((resolve, reject) => {
        https.get(url, res => {
            res.setEncoding("utf8");
            let body = "";
            res.on("data", data => {
                body += data;
            });
            res.on("end", () => {
                body = JSON.parse(body);
                console.log(body.results);

                if (!body.results) {
                    reject();
                }
                resolve(body.results);
            });
        });
    });
};

// https://api.tomtom.com/search/2/poiSearch/coffee.json?key=zpZURMfFKhVx78J0AhMPveUGJvX5KPF3&limit=10&lat=-33.864963&lon=151.207781&radius=500
