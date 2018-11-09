const prompt = require("prompt");
const mkdirp = require("mkdirp");
const moment = require("moment");
const _ = require("underscore.string");
const yaml = require("js-yaml");
const fs = require("fs");
const ncp = require("copy-paste");

prompt.start();
prompt.get(["title"], (err, result) => {
  "use strict";
  const dir = `./entries/${moment().format("YYYY-MM-DD")}-${_.slugify(
    result.title
  )}`;
  mkdirp.sync(dir);

  const postFileStr = "---\n";

  const frontmatter = {
    title: result.title,
    date: moment().toJSON(),
    layout: "post"
  };

  postFileStr += yaml.safeDump(frontmatter);
  postFileStr += "---\n";

  const fileContents = `${postFileStr}${yaml.safeDump(
    frontmatter
  )}${postFileStr}`;

  fs.writeFileSync(`${dir}/index.md`, fileContents, {
    encoding: "utf-8"
  });

  ncp.copy(`${dir}/index.md`, () => {
    console.log("copied to clipboard");
  });

  if (err) {
    console.log("Error:", err);
  }

  return console.log(dir);
});
