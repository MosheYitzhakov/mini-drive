const express = require('express');

const fsP = require('fs/promises')
const router = express.Router();
const path = require('path');
module.exports = router;



 const getData = async (url) => {
    const data = await fsP.readdir(url)
    const organizedFolder = { files: [], folders: [] };
    try {
        for (v of data) {
            const dataV = await fsP.stat(path.join(url, v));
            const info = {
                type: dataV.isFile() ? 'file' : 'folder',
                size: dataV.size,
                atime: dataV.atime,
                created: dataV.birthtime
            }
            if (dataV.isDirectory()) {
                organizedFolder.folders.push({ name: v, ...info })
            }
            else {
                organizedFolder.files.push({ name: v, ...info })
            }
        }
    } catch (error) {
        return error.message;
    }

    return organizedFolder;
}

router.get('/*', async (req, res) => {
console.log(req.url);

    const namePath = path.join(__dirname, '..', 'userData', req.url)
    const slicePath = namePath.slice(0, -1)
    // console.log(slicePath);
    //   const  replace = slicePath.replaceAll(" ", "")
    // console.log(replace)
    try {
        const data = await getData(slicePath);
        res.send(data)

    } catch (err) {
        console.error(err.message);
        res.status(404).send("no such file or directory" + req.url);
    }
})
