import { URL } from "url";

export const myUrl1 = new URL(
  "http://localhost:3000/search?term=nodejs&limit=10"
);

console.log(myUrl1.hostname);
console.log(myUrl1.pathname);
console.log(myUrl1.protocol);
console.log(myUrl1.search);
console.log(myUrl1.hash);

export const myUrl12 = new URL(
  "https://site.com/products?id=15&type=book&lang=en"
);
console.log(`ID: ${myUrl12.searchParams.get("id")}`);
console.log(`Type: ${myUrl12.searchParams.get("type")}`);
console.log(`Language: ${myUrl12.searchParams.get("lang")}`);

const urlStr = "https://app.com/search?query=node&sort=asc";
const myUrl = new URL(urlStr);
myUrl.searchParams.set("sort" , "desc");
myUrl.searchParams.append("page", "3");
myUrl.searchParams.delete("query");
console.log(myUrl)