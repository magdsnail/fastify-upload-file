'use strict'

const fs = require('fs');
const crypto = require('crypto');

class UploadFile {
    constructor(filePath){
        this.__path = filePath;
        this.mkdirsSync(this.__path);
    }

    mkdirsSync(dirname) {
        if (fs.existsSync(dirname)) {
            return true
        } else {
            fs.mkdirSync(dirname)
            return true
        }
    }

    get path () {
        return this.__path;
    }

    set path(path) {
        this.__path = path;
    }
    
    /**
     * 获取上传文件的后缀名
     * @param {string} fileName  获取上传文件的后缀名 
     * @return {string}          文件后缀名
     */
    getSuffixName(fileName) {
        let nameList = fileName.split('.');
        const type = nameList.pop();
        if(type) {
            return type;
        } else {
            return false;
        }
    }

    /**
     * 获取文件信息
     * @param {obj} files 
     */
    getFileItems(files) {
        const fileItems = [];
        for(let key in files) {
            const { name, data } = files[key];
            const fileType = this.getSuffixName(name);
            fileItems.push({
                name,
                fileType,
                index: crypto.randomBytes(8).toString('hex'),
                data,
                size: data.length
            });
        }
        return fileItems;
    }

    /**
     * 存储文件信息
     * @param {*} info 
     */
    storeFile(info) {
        const file = `${this.__path}/${info.index}.${info.fileType}`;
        fs.writeFile(file, info.data, (err) => {
            if (err) {
                return err;
            } else {
                return true;
            }
        });
    }

}

module.exports = UploadFile;