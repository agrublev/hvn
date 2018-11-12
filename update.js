const json5Writer = require("json5-writer");
const fs = require("fs");
const del = require("del");
const newConf = JSON.parse(fs.readFileSync("package.json", "utf-8"));
let oldConf;
if (fs.existsSync("package.json5")) {
    oldConf = fs.readFileSync("package.json5", "utf-8");
    const writer = json5Writer.load(oldConf);
    writer.write(newConf);
    fs.writeFileSync("package.json5", writer.toSource({
        quote: "double",
        trailingComma: false,
        quoteKeys: true
    }), "utf-8");
} else if (fs.existsSync("package.json")) {
    fs.writeFileSync("package.json5", JSON.stringify(newConf), "utf-8");
} else if (fs.existsSync(".packageJsonBack")) {
    const getBack = JSON.parse(fs.readFileSync(".packageJsonBack", "utf-8"));
    fs.writeFileSync("package.json5", JSON.stringify(".packageJsonBack"), "utf-8");
}
process.exit();
//



// del("./package.json5");
// confWrite = confWrite.replace("x=", "");
// confWrite = confWrite.replace(/'/g, "");
// const CreateFiles = fs.createWriteStream('./package.json5', {
//     flags: 'a' //flags: 'a' preserved old data
// });
// CreateFiles.write(confWrite);

// fs.writeFile('package.json5', confWrite);
// )
// ;