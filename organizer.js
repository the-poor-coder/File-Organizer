let path = require("path");
let fs = require("fs");

let type = {

    program: ['js','cpp','c','java'],
    video: ["mp4", "mkv"],

    document: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex', 'jpg', 'png'],

    archives: ['zip', 'rar', '7z', 'tar', 'gz', 'ar', 'iso', 'xz'],

    app: ['exe', 'dmg', 'pkg', 'deb']

}

 

let input_arr = process.argv.slice(2);


let command = input_arr[0];



switch (command) {
    

    case "organize":

        organizeFn(input_arr[1]);


        break;

    case "help":

        helpFn();


        break;

    default:
        console.log("enter valid command");



}



function organizeFn(dir_path) {

    if (dir_path == undefined) {
        console.log("enter destination path");
        return;
    }

    

    let does_dir_exist = fs.existsSync(dir_path);
    if (does_dir_exist) {
        let check_organize_file = path.join(dir_path, "organize_files");

        if (fs.existsSync(check_organize_file) == false) {
            fs.mkdirSync(check_organize_file);
        }

        let file_arr = fs.readdirSync(dir_path);

        for (let i = 0; i < file_arr.length; i++) {

            let child_address = path.join(dir_path, file_arr[i]);

            

            if (fs.lstatSync(child_address).isFile()) {
                let category = category_check(child_address, dir_path);

                console.log(file_arr[i], " belogs to -> ", category);

                let folder = path.join(dir_path, "organize_files", category);

                
                if (fs.existsSync(folder) == false) {

                    fs.mkdirSync(folder);
                }
                folder = path.join(folder, path.basename(child_address));

                fs.copyFileSync(child_address, folder);
                fs.unlinkSync(child_address);


            }

        }

    }


}

function helpFn() {
    console.log(`


      for organize-> node main.js organize directory_path

      for help->  node main.js help

    `)
}

function category_check(child_address, dir_path) {
    let ext = path.extname(child_address);
    ext = ext.slice(1);

    console.log(ext);

    for (let i in type) {

        for (let j = 0; j < type[i].length; j++) {
            console.log(type[i][j]);
            if (type[i][j] == ext) {
        
                return i;
            }
        }
    }

    return "others";

}
