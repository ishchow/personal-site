const luxon = require("luxon");
const yaml = require("yaml");
const slugify = require("slugify");
const util = require("util");
const fs = require('fs');
const path = require('path');

let args = require("yargs")
    .option("title", {
        default: "New Post",
        describe: "Title of Post",
        type: "string",
    })
    .parse();

let tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
let date = luxon.DateTime.local()
    .setZone(tz)
    .setLocale("en")
    .startOf("day");

let obj = {
    title: args.title,
    date: date.toISO({ suppressMilliseconds: true }),
};

var files = fs.readdirSync(path.join(__dirname, "..", "src", "posts"));
var postCount = files.filter(f => f.endsWith(".md")).length
var newPostNum = postCount + 1;

let frontmatter = util.format("---\n%s---", yaml.stringify(obj));
let slug = newPostNum.toString() + "__" + slugify(args.title, { lower: true });
let filename = path.join(__dirname, "..", "src", "posts", slug + ".md");
let fd = fs.openSync(filename, "w");

console.log(util.format("Writing to %s ...", filename));
console.log(frontmatter);
fs.writeSync(fd, frontmatter);
