// 1) create a three file. write any file name in the first one, then read this file and delete exact file.

const fs = require("fs");

fs.writeFileSync("file1.txt", "file2.txt");
fs.writeFileSync("file2.txt", "This is file 2.");
fs.writeFileSync("file3.txt", "This is file 3.");

fs.readFile("file1.txt", "utf8", (err, data) => {
  if (err) throw err;

  const fileToDelete = data.trim();
  fs.unlink(fileToDelete, (err) => {
    if (!err) {
      console.log(`${fileToDelete} has been deleted.`);
    }
  });
});

// 2) create a files and folders in root directory, make some nested direcotirs with some files, then write a script that deletes only .txt files from directories.

const pathh = require('path');

function createFilesAndDirs() {
  const base = "./rootdir";
  const structure = [
    "file1.txt",
    "file2.md",
    "dir1/file3.txt",
    "dir1/dir1a/file4.txt",
    "dir1/dir1a/file5.js",
    "dir2/file6.txt",
    "dir2/file7.py",
  ];

  structure.forEach((file) => {
    const filePath = pathh.join(base, file);
    fs.mkdirSync(pathh.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, "sample content");
  });
}
function deleteTxtFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (let entry of entries) {
    const fullPath = pathh.join(dir, entry.name);

    if (entry.isDirectory()) {
      deleteTxtFiles(fullPath);
    } else if (entry.isFile() && entry.name.endsWith(".txt")) {
      fs.unlinkSync(fullPath);
      console.log(`${fullPath}`);
    }
  }
}

createFilesAndDirs();
deleteTxtFiles("./rootdir");

// 3) Print all files in a folder along with size and last modified time.
// index.js - 2.1 KB - modified: 2024-01-01, you can use moment js.

const path = require("path");
const moment = require("moment");

const folderPath = "./";

fs.readdir(folderPath, (err, files) => {
  if (err) throw err;

  files.forEach((file) => {
    const filePath = path.join(folderPath, file);
    fs.stat(filePath, (err, stats) => {
      if (err) throw err;
      if (stats.isFile()) {
        const sizeInKB = (stats.size / 1024).toFixed(1);
        const modifiedDate = moment(stats.mtime).format("YYYY-MM-DD");
        console.log(`${file} - ${sizeInKB} KB - modified: ${modifiedDate}`);
      }
    });
  });
});

// 4) create a product.json files where should be some products with folowing properties: name, description, price, color, id. When you run next command " node main.js ASC" it should return all sorted products with price ascending. "node main.js  DESC"  => sorted products with price descending.

const order = process.argv[2];
const data = fs.readFileSync("product.json", "utf8");
const products = JSON.parse(data);

if (order === "ASC") {
  products.sort((a, b) => a.price - b.price);
} else if (order === "DESC") {
  products.sort((a, b) => b.price - a.price);
}

console.log(products);
