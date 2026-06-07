const fs = require('fs');

const { FILE_DIRECTORIES } = require('../constants/global.constant');

const { PUBLIC_DIR, ASSETS_DIR, EXCELS_DIR, FILES_DIR, JSONS_DIR } = FILE_DIRECTORIES;

let dir = `./${PUBLIC_DIR}`;
let subDir = `${dir}/${ASSETS_DIR}`;
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
    fs.mkdirSync(`${subDir}`);
    fs.mkdirSync(`${subDir}/${FILES_DIR}`);
    fs.mkdirSync(`${subDir}/${EXCELS_DIR}`);
    fs.mkdirSync(`${subDir}/${JSONS_DIR}`);
}

if (!fs.existsSync(`${subDir}`)) {
    fs.mkdirSync(`${subDir}`);
    fs.mkdirSync(`${subDir}/${EXCELS_DIR}`);
    fs.mkdirSync(`${subDir}/${FILES_DIR}`);
    fs.mkdirSync(`${subDir}/${JSONS_DIR}`);
}

if (!fs.existsSync(`${subDir}/${FILES_DIR}`)) {
    fs.mkdirSync(`${subDir}/${FILES_DIR}`);
}

if (!fs.existsSync(`${subDir}/${EXCELS_DIR}`)) {
    fs.mkdirSync(`${subDir}/${EXCELS_DIR}`);
}

if (!fs.existsSync(`${subDir}/${JSONS_DIR}`)) {
    fs.mkdirSync(`${subDir}/${JSONS_DIR}`);
}