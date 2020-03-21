import * as functions from "firebase-functions";
import * as rp from "request-promise";
import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();
const sett = { timestampsInSnapshots: true };
db.settings(sett);

export const InstagramPhotos = functions.https.onRequest((req, res) => {
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
      variables: "{%22id%22:%226237745333%22,%22first%22:51,%22after%22:null}"
    },
    // method: "GET",
    json: true // Automatically parses the JSON string in the response
  };

  rp(options)
    .then(async results => {
      console.log("Girls => %d", results["results"]["status"]);
    })
    .then(() => {
      res.send(
        "<html><head><title>Installing Images</title><style>body{background-color: #000; color: #FFF; font-size: 20px;}</style></head><body>" +
          "<b> All Images Installed successfully" +
          // results["results"][i]["id"] +
          "</b><br />" +
          "</body></html>"
      );
    })
    .catch(err => {
      res.send(err);
    });
});
