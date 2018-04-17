$(function(){

/*TODO*/
// pour les mots à suppr, faire un split puis trim
/*OPTIMIZE*/
// faire une classe Fichier avec toutes les méthodes

  // startWithTests(); // A ENLEVER NORMALEMENT NON ?

let myNewReadyFiles = null;
let mesFichiersCustom = [];

  document.querySelector('#tester').addEventListener("click", startWithTests);
  function startWithTests(){
    $('#tester').attr("disabled",true);
    let files = [
      {
        name:"CV-TRAPARIC_David.pdf",
        size:2276,
        type:"application/pdf",
        lastModified: 1521831949827
      }
      // ,
      // {
      //   name:"traparic david.pdf",
      //   size:1452,
      //   type:"application/pdf",
      //   lastModified: 1521788145876
      // },
      // {
      //   name:"david traparic cv.pdf",
      //   size:45651213,
      //   type:"application/pdf",
      //   lastModified: 1521773778421
      // },
      // {
      //   name:"CV TRAPARIC David.pdf",
      //   size:145,
      //   type:"application/pdf",
      //   lastModified: 1521909934578
      // }
    ];

    traiterFiles(files);
  }

  document.querySelector('#dir_input').addEventListener("change", startFromInputs);
  function startFromInputs(){
    let files = $('#dir_input')[0].files;

    traiterFiles(files);
  }

  document.querySelector('#validate').addEventListener("click", validateNewNames);
  function validateNewNames(){
    // $('#datas').val(myNewReadyFiles);
    // if (myNewReadyFiles) {
    //   $.post( "action.php", {newFiles: myNewReadyFiles}, function( reponse ) {
    //     $('#dl').html(reponse);
    //     console.log(reponse);
    //   });
    // }else{
    //   console.log("ERROR : NOTHING IN myNewReadyFiles");
    // }
  }


  function resetTable($table = $('table')){
    $table.find($('#thnewname')).hide();
    // $('.tdnewname').remove();
    console.log( $table.find($('tbody tr')));
    $('table').find($('tbody tr')).remove();
  }

  function traiterFiles(files){
    forbiddens = $.map($('#forbidden').val().split(","), function(val, i){ return val.trim(); });
    console.log(forbiddens);
    prefix = $('#prefix').val();
    suffix = $('#suffix').val();
    FichierCustom.forbiddenWords = forbiddens;
    FichierCustom.prefix = prefix;
    FichierCustom.suffix = suffix;

    for (file of files) {
      mesFichiersCustom.push(new FichierCustom(file));
    }

    resetTable();
    showFiles(mesFichiersCustom);
    let myNames = [];
    console.log("tab de base : ");
    console.log(mesFichiersCustom);
    for (fichierCustom of mesFichiersCustom) {
      fichierCustom.generateNewName();
    }

    $('#thnewname').show();
    $firstCellsOfEachRowAvailable = $('td:first-child');

    let allNewNames = [];
    for (var i = 0; i < mesFichiersCustom.length; i++) {

      let cellHTML = '<td class="tdnewname">'+mesFichiersCustom[i].getWithoutExt(mesFichiersCustom[i].newName)+'</td>';
      $($firstCellsOfEachRowAvailable[i]).after(cellHTML);

      allNewNames.push(mesFichiersCustom[i].newName);
    }

    $('#datanames').val(JSON.stringify(allNewNames));
    $('#validate').show();
  }


  function showFiles(fichiersCustom){
    console.log(fichiersCustom);
    for (fichierCustom of fichiersCustom) {
      // console.log(file);
      //enlever le dernier element d'un split(".")

      // console.log(filenameWithoutExt);
      $('tbody').append("<tr><td>"+fichierCustom.getWithoutExt(fichierCustom.originalName)+"</td><td>"+fichierCustom.originalSize+"</td><td>"+file.type+"</td><td>"+new Date(file.lastModified)+"</td></tr>");
    }
  }

  function beautifyNames(arrNames){
    // for (let i = 0; i < arrNames.length; i++) {
    //   let tmpI = arrNames[i].indexOf("cv");
    //   if(tmpI!=-1) arrNames[i].splice(tmpI, 1);
    //   // Enlever des mots
    //
    //   // Mettre le premier mot (supposé NOM) en maj
    //   arrNames[i][0] = arrNames[i][0].toUpperCase();
    //   console.log(arrNames[i]);
    //   if (arrNames[i].length>=2) {
    //     // arrNames[i][1][0] = arrNames[i][1][0].toUpperCase(); //marche pas ???
    //     arrNames[i][1] = arrNames[i][1][0].toUpperCase()+arrNames[i][1].slice(1, arrNames[i][1].length);
    //     console.log(arrNames[i][1][0]);
    //   }
    // }

    // let tmpBeautifiedArrNames = [];
    // console.log("aha");
    // for (let i = 0; i < arrNames.length; i++) {
    //   tmpBeautifiedArrNames[i] = arrNames[i].join(' ');
    // }
    // return tmpBeautifiedArrNames;
  }


  // function getWithoutExt(str){
  //   strNoExt = str.split(".");
  //   strNoExt.splice(strNoExt.length-1,1);
  //   strNoExt = strNoExt.join(".");
  //   return strNoExt
  // }

});
