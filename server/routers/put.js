const express = require('express');

const fsP = require('fs/promises')
const router = express.Router();
const path = require('path');
module.exports = router;
const data = async(url)=>{
   try {
      const data = await fsP.stat(url)
   const info = {
      type: data.isFile() ? 'file' : 'folder',
      size: data.size,
      atime: data.atime,
      created: data.birthtime
  } 
   } catch (error) {
      return error
   }
  
  return info;
}

router.put('/*', (req, res) => {
   const command = req.body.command;
   console.log(command);
   let filePath = path.join(__dirname, '../userData' + req.url);
   const index = filePath.lastIndexOf('\\');
   const newName = path.join(filePath.slice(0, index), req.body.name)

   console.log(filePath);
   console.log(newName);


   if (command === 'rename') {
      fsP.rename(filePath, newName)
         .then(() => {
            res.send("success")
         }).catch((err) => console.error(err));
   } else if (command === 'copy') {
      if (req.body.name.includes('.')) {
         fsP.copyFile(filePath, newName).then(() => {
         //  const nD =  data(newName).then(()=>{
         //     res.send(nD)

         //  });
         res.sendFile(newName)
         }).catch((err) => console.error(err));
      } else {
         fsP.cp(filePath, newName, { recursive: true })
         .then(() => {
            res.send(req.body.name)
         }).catch((err) => console.error(err));
      }
   

} 
})