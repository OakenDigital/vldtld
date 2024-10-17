import * as https from "https";
import * as fs from "fs";
import * as path from "path";

const TLD_URL = "https://data.iana.org/TLD/tlds-alpha-by-domain.txt";
const outputPath = path.resolve(__dirname, "../tlds.ts");

https
  .get(TLD_URL, (res) => {
    let data = "";

    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      const tldsArray = data
        .split("\n")
        .map((tld) => tld.trim())
        .filter((tld) => tld && !tld.startsWith("#"));

      const fileContent = `export default ${JSON.stringify(
        tldsArray
      )} as string[];`;
      fs.writeFileSync(outputPath, fileContent);
      console.log("TLDs fetched and tlds.ts generated successfully.");
    });
  })
  .on("error", (err) => {
    console.error("Error fetching TLDs:", err.message);
  });
