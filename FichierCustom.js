class FichierCustom {

  constructor(fileObj) {
    // variables partagées entre toutes les instances de la classes, qui ne changeront pas
    // Pas sûr que le static variable soit pris en compte en ES6

    // static forbiddenWords
    // static prefix
    // static suffix
    // static separator

    this.originalName = fileObj.name;
    this.originalSize = fileObj.size;
    this.originalDate = fileObj.lastModified;
    this.originalType = fileObj.type;
    this.ext;
    this.newName;
    this.betterSize;
    this.betterDate;
  }

  getBetterSize(){
    let mySize = this.originalSize;
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

  getExt(str = this.originalName){
    console.log(str);
    let ext = str.split(".");
    // Je retire de tout le tableau, tout de 0 jusqu'au mot après le dernier "."
    ext.splice(0, ext.length-1);
    console.log("ext ", ext);
    ext = "."+ext;
    this.ext = ext;
    return this.ext;
  }


  generateNewName(){

    let name = this.originalName;
    name = this.cleanForbiddenWords(name);
    name = this.getWithoutExt(name);
    name = this.normalizeNameToArr(name);
    name = this.upperCaseNorm(name);
    name = this.addPrefixSuffix(name);
    name = this.joinWithSeparator(name);
    // this.newName = this.upperCaseNorm(this.normalizeNameToArr(this.getWithoutExt(this.originalName)));
    this.newName = name;
    return this.newName;
  }


  cleanForbiddenWords(fileName){
    fileName = fileName.toLowerCase();
    for (let word of FichierCustom.forbiddenWords) {
      let indexWord = fileName.search(word);
      if (indexWord!=-1) {
        console.log(fileName);

        fileName = fileName.slice(0,indexWord)+fileName.slice(indexWord+word.length);

        console.log(fileName);
      }
    }
    return fileName;
  }

  normalizeNameToArr(fileName){
    let arrName = fileName.split(/[\s,\-_.]+/);
    while (arrName.indexOf("")!=-1){
      arrName.splice(arrName.indexOf(""),1);
    }
    console.log("ici normalement tous les vides sont enlevés : ",arrName);

    return arrName;
  }

  upperCaseNorm(arrName){
    // Mettre le premier mot (supposé NOM) en maj
    arrName[0] = arrName[0].toUpperCase();
    // console.log(arrName);
    if (arrName.length>=2) {
      arrName[1] = this.upperFirstLetter(arrName[1])
      console.log(arrName);
      if(arrName.length>2) {
        arrName[2] = this.upperFirstLetter(arrName[2])
        console.log("gsdfg2");
      }
    }
    return arrName;
  }

  upperFirstLetter(word){
    return word[0].toUpperCase()+word.slice(1, word.length);
  }

  addPrefixSuffix(arrName){
    // Si prefix exite et Si il n'est pas vide, on l'insère
    if(FichierCustom.hasOwnProperty('prefix')) if(FichierCustom.prefix.trim()!=="") arrName.unshift(FichierCustom.prefix);
    if(FichierCustom.hasOwnProperty('suffix')) if(FichierCustom.prefix.trim()!=="") arrName.push(FichierCustom.suffix);
    return arrName;
  }

  joinWithSeparator(arrName){
    let hasPrefix = false;
    if (FichierCustom.hasOwnProperty('separator')){if(FichierCustom.prefix!="") hasPrefix = true}
    let shlasseur = (hasPrefix) ? FichierCustom.separator : " ";
    console.log("L'heure est grave");
    console.log("hasPrefix ", hasPrefix);
    console.log("shlasseur ", shlasseur);
    console.log("arrName ", arrName);
    return arrName.join(shlasseur);
  }

  reverseName(name){
    let hasPrefix;
    let prefix;
    let shlasseur = (FichierCustom.hasOwnProperty('separator')) ? FichierCustom.separator : " ";
    if(FichierCustom.hasOwnProperty('prefix')) if(FichierCustom.prefix.trim()!=="") hasPrefix = true;

    let arrName = name.split(shlasseur);
    let nameAndFirstNameOnly = (hasPrefix) ? arrName.splice(0, 3) : arrName.splice(0, 2);
    console.log(nameAndFirstNameOnly);
    let namesReversed = [];
    if(hasPrefix){
      prefix = nameAndFirstNameOnly.splice(0,1);
    }
    namesReversed[0] = nameAndFirstNameOnly[1].toLowerCase();
    namesReversed[1] = nameAndFirstNameOnly[0].toLowerCase();

    if(arrName.length>1 || arrName[0]!="") namesReversed = namesReversed.concat(arrName);

    let reversedArrName = this.upperCaseNorm(namesReversed);
    if(hasPrefix) reversedArrName = prefix.concat(reversedArrName);

    return this.joinWithSeparator(reversedArrName);
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
