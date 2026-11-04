import fs, { writeFile } from "fs";

// 🟢 Beginner Level
// 1
function readFilePromise(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
// readFilePromise("file1.txt").then(data=>{
// console.log(data)
// })
2;
async function readFileAsync(path) {
  return fs.promises.readFile(path, "utf8");
}
// readFileAsync("file1.txt").then(data=>{
//   console.log(data)
// });
// 🟡 Intermediate Level
// 3
async function getFileSize(path) {
  return fs.promises.stat(path);
}
// getFileSize("file1.txt").then(size=>{
//   console.log(size.size);
// });
// 4
async function listFiles(dir) {
  return fs.promises.readdir(dir);
}
// listFiles(".").then(files=>{
//   console.log(files);
// })
// 5
async function readFilesInOrder(files) {
  for (let i = 0; i < files.length; i++) {
    const data = await readFileAsync(files[i]);
    console.log(data);
  }
}

// readFilesInOrder(["file1.txt", "file2.txt"]).then(() => {
//   console.log("All files read");
// });

// 🔵 Advanced Level
// 6
async function readFilesParallel(files){
    return Promise.all(
      files.map(file=>readFileAsync(file)))
}
readFilesParallel(["file1.txt", "file2.txt"]).then(data=>{ 
  console.log(data);
})
7
function fileExists(path){
    return new Promise((resolve, reject) => {
        if(fs.access(path, fs.constants.F_OK, (err) => {
            if (err) {
                reject(false);
            } else {
                resolve(true);
            }
        }));
    })
}
// fileExists("file1.txt").then(exists=>{
//     console.log(exists);
// })
// 8
async function copyFile(src, dest){
   const data= fs.promises.readFile(src, "utf8");
    fs.promises.writeFile(dest, await data);
}
// copyFile("file1.txt", "file1_copy.txt").then(()=>{
//     console.log("File copied");
// })
// 🔴 Expert Level
// 9
async function mergeFiles(files, output){
    const data=readFilesParallel(files).then(data=>{
        return data;
    })
    const mergeFiles=(await data).join("\n");
    await fs.promises.writeFile(output, mergeFiles);

}
mergeFiles(["file1.txt", "file2.txt"], "merged.txt").then(()=>{
    console.log("Files merged");
})
// 10
async function searchWordInFiles(dir, word){
    listFiles(dir).then(files=>{
        files.foreach(async file=>{
            const data=await readFileAsync(file);
            if(data.includes(word)){
                console.log(`${file} contains ${word}`);
            }
        })  
    })
}
searchWordInFiles(".", "hello").then(()=>{
    console.log("Search completed");
});