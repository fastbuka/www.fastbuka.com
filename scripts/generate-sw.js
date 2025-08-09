const fs = require("fs");
const path = require("path");

const templatePath = path.join(
  __dirname,
  "../firebase-messaging-sw.template.js"
);
const outputPath = path.join(__dirname, "../public/firebase-messaging-sw.js");

const replacements = {
  "<API_KEY>": process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  "<AUTH_DOMAIN>": process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  "<PROJECT_ID>": process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  "<STORAGE_BUCKET>": process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  "<MESSAGING_SENDER_ID>": process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  "<APP_ID>": process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  "<MEASUREMENT_ID>": process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

let content = fs.readFileSync(templatePath, "utf-8");
for (const [key, value] of Object.entries(replacements)) {
  content = content.replace(new RegExp(key, "g"), value);
}

fs.writeFileSync(outputPath, content);
console.log("firebase-messaging-sw.js generated.");
