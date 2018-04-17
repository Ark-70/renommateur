class FichierCustom {
  constructor(fileObj) {
    // variables partagées entre toutes les instances de la classes, qui ne changeront pas
    // Pas sûr que le static variable soit pris en compte en ES6
    // static prefix = undefined;
    // static suffix = undefined;
    // static forbiddenWords = [];


    this.originalName = fileObj.name;
    this.originalSize = fileObj.size;
    this.originalDate = fileObj.name;
    this.ext;
    this.newName;
    this.betterSize;
    this.betterDate;
  }

  getBetterSize(){
    mySize = this.originalSize;
    if(mySize>=(Math.pow(1024,2))){
      mySize = Number(mySize/(Math.pow(1024,2))).toFixed(2) + " Mo";
    }else if(mySize>=(1024)){
      mySize = Number(mySize/(1024)).toFixed(2) + " Ko";
    }else{
      mySize+=" octets"
    }
    this.betterSize = mySize;
    return this.betterSize;
  }

  getWithoutExt(str){
    let strNoExt = "";
    strNoExt = str.split(".");
    strNoExt.splice(strNoExt.length-1,1);
    strNoExt = strNoExt.join(".");
    return strNoExt;
  }

  getExt(str){
    let ext = str.split(".");
    ext = strNoExt.slice();
    ext.splice(ext.length-2,ext.length-1);
    this.ext = "."+ext;
    return this.ext;
  }

  generateNewName(){
    this.newName = this.beautifyName(this.normalizeNameToArr(this.originalName));
    return this.newName;
  }

  normalizeNameToArr(fileName){
    fileName.split()
    let arrName = fileName.split(/[\s,\-_]+/);
    console.log(arrName);
    for (var i = 0; i < arrName.length; i++) {
      arrName[i] = arrName[i].toLowerCase();
    }

    return arrName;
  }

  beautifyName(arrName){
    let tmpI = arrName.indexOf("cv");
    if(tmpI!=-1) arrName.splice(tmpI, 1);
    // Enlever des mots

    // Mettre le premier mot (supposé NOM) en maj
    arrName[0] = arrName[0].toUpperCase();
    console.log(arrName);
    if (arrName.length>=2) {
      // arrName[1][0] = arrName[1][0].toUpperCase(); //marche pas ???
      arrName[1] = arrName[1][0].toUpperCase()+arrName[1].slice(1, arrName[1].length);
      console.log(arrName[1][0]);
    }
    let beautifiedName = arrName.join(' ');
    return beautifiedName;
  }

  // static set prefix(prefix){
  //   console.log("allo allo");
  //   FichierCustom.prefix = prefix;
  // }
  // static set suffix(suffix){
  //   FichierCustom.suffix = suffix;
  // }
  // static set forbiddenWords(forbiddenWords){
  //   FichierCustom.forbiddenWords = forbiddenWords;
  // }


}
