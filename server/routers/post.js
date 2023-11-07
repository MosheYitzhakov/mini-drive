const express = require('express');

const fsP = require('fs/promises')
const router = express.Router();
const path = require('path');
module.exports = router;

router.post('/*', async (req, res) => {
    try {
        const pathUrl = path.join(__dirname, '../userData' + req.url)
        const data = await fsP.stat(pathUrl)
        let createDir;
        console.log(data.isFile());
        if (!data.isDirectory()) {
            console.log(); ("This is not a directory");
        } else {
            if (req.body.command === 'file') {
                //create file in the folder
                console.log(path.join(pathUrl, req.body.name));
                createDir = await fsP.open(path.join(pathUrl, req.body.name),'w');
            } else if (req.body.command === 'folder') {

                createDir = await fsP.mkdir(path.join(pathUrl, req.body.name), { recursive: true });
                //create folder in the folder
            }
        }

        console.log(`created ${createDir}`);
    } catch (err) {
        console.error(err.message);
    }
    res.send('/index.html');
})