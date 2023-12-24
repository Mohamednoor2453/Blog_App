const fs = require('fs');
const { fileURLToPath } = require('url');


// // read file
// fs.readFile('people.js', (err, data) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(data.toString());

// });

//directory

// if (!fs.existsSync('./asset')){
//     fs.mkdir('./asset', (err)=>{
//         if(err){
//             console.log(err)
//         }
//         console.log('folder created')
//     })

// }else{
    // fs.rmdir('./asset', (err)=>{
    //     if(err){
    //         console.log(err)
                
    //         }
    //     console.log("folder removed")    
        
    // })

    //deleting a file

    const filePath = './global.js;'

if (fs.existsSync(filePath)) {
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error('Error deleting file:', err);
        } else {
            console.log('File deleted successfully.');
        }
    });
} else {
    console.log('File does not exist.');
}
