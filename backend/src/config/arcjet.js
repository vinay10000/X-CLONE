import arcjet, { tokenBucket, shield, detectBot } from "@arcjet/node";
import { ENV } from "./env.js";

//initialize arcjet with security rules
export const aj = arcjet({
  key: ENV.ARCJET_KEY,
  characteristics: ["ip.src"],
  rules: [
    //shield protects your app from common attacks e.g. DDoS, SQL INJECTION ,XSS, CSRF, etc.
    shield({ mode: "LIVE" }),
    //bot detection protects your app from bots and bloks all bots excepot search engine
    detectBot({ mode: "LIVE", allow: ["CATEGORY:SEARCH_ENGINE"] }),

    //rate limiting protects your app from abuse and DDOS attacks
    tokenBucket({
      mode: "LIVE",
      refillRate: 10,
      interval: 10,
      capacity: 15
    })
  ],
});
