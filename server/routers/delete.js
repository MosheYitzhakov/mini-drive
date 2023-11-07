const express = require('express');

const fsP = require('fs/promises')
const router = express.Router();
const path = require('path');



router.delete('/*',async(req,res)=>{
    try {
        const data = await fsP.stat(path.join(__dirname,'../userData',req.url))
        if(data.isFile()){
            await fsP.unlink(path.join(__dirname,'../userData',req.url));

        }else if (data.isDirectory()) {
            await fsP.rm(path.join(__dirname,'../userData',req.url),{ recursive: true, force: true })
           
        } else {
            
        }

    } catch (error) {
        console.log(error);
    }
res.send('delete')
})
module.exports = router;