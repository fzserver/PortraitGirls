"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const rp = require("request-promise");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();
const sett = { timestampsInSnapshots: true };
db.settings(sett);
exports.InstagramPhotos = functions.https.onRequest((req, res) => {
    const options = {
        headers: {
            "User-Agent": "Request-Promise"
        },
        /* https://www.instagram.com/graphql/query/?
            query_id=17888483320059182
            &
            variables={
                "id":"6237745333",
                "first":51,
                "after":null
            }
        */
        url: "https://www.instagram.com/graphql/query/?",
        qs: {
            query_id: "17888483320059182",
            variables: '{"id":"6237745333","first":51,"after":null}'
        }
        // method: "GET",
        // json: true // Automatically parses the JSON string in the response
    };
    rp(options)
        .then(async (results) => {
        res.send("<html><head><title>Installing Images</title><style>body{background-color: #000; color: #FFF; font-size: 20px;}</style></head><body>" +
            "<b>" +
            results["data"]["user"]["edge_owner_to_timeline_media"]["count"] +
            "</b><br />" +
            "</body></html>");
        // FireStore Settings
        // const images = [];
        //   for (let i = 0; i <= results["results"][""])
    })
        .then(() => {
        //   res.send(
        //     "<html><head><title>Installing Images</title><style>body{background-color: #000; color: #FFF; font-size: 20px;}</style></head><body>" +
        //       "<b> All Images Installed successfully" +
        //       // results["results"][i]["id"] +
        //       "</b><br />" +
        //       "</body></html>"
        //   );
    })
        .catch(err => {
        res.send(err);
    });
});
//# sourceMappingURL=index.js.map