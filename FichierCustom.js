class FichierCustom {
  constructor(fileObj) {
    // variables partagées entre toutes les instances de la classes, qui ne changeront pas
    static this.prefix = undefined;
    static this.suffix = undefined;
    static this.forbiddenWords = [];


    this.originalName = fileObj.name;
    this.originalSize = fileObj.size;
    this.originalDate = fileObj.name;
  }

  get newName(){
    return generateNewName();
  }

  generateNewName(){
    return
  }
}
