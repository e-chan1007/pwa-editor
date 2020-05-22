const fs = require("fs");
// this will look for the dist generated after running nuxt build
const dir = `${process.cwd()}/dist/_nuxt/`;
const purpose = ["any", "maskable"];

fs.readdir(dir, (err, files) => {
  if (err) console.log("error: " + err);
  else
    files.forEach((file) => {
      if (file.includes("manifest")) {
        const manifestPath = `${process.cwd()}/dist/_nuxt/${file}`;
        let manifest = fs.readFileSync(manifestPath, "utf8");
        const manifestObj = JSON.parse(manifest);
        manifestObj.icons.forEach((icon) => {
          icon.purpose = purpose.join(" ");
        });
        manifest = JSON.stringify(manifestObj);
        fs.writeFileSync(manifestPath, manifest, "utf8");
        manifest = fs.readFileSync(manifestPath, "utf8");
      }
    });
});
