$(function(){
  // BUG qui va rester : NOMS & PRÉNOMS COMPOSÉS

/*NOTE REVIEW*/
// faire une classe Fichier avec toutes les méthodes
// pour les mots à suppr, faire un split puis trim
// reset table
// BetterSize
// prefix
// suffix
//
/*TODO*/
// faire un bouton d'échange Nom/Prénom
/*BUG*/
/*OPTIMIZE*/
//

  // startWithTests(); // A ENLEVER NORMALEMENT NON ?

let myNewReadyFiles = null;
let mesFichiersCustom = [];

  document.querySelector('#tester').addEventListener("click", startWithTests);
  function startWithTests(){
    // $('#tester').attr("disabled",true);
    $('table').find('tbody').empty();
    let files = [
      {
        name:"CV-TRAPARIC-David.pdf",
        size:2276,
        type:"application/pdf",
        lastModified: 1521831949827
      }
      ,
      {
        name:"TRAPARIC_DAVID_DÉVELOPPEMENT.pdf",
        size:1452,
        type:"application/pdf",
        lastModified: 1521788145876
      },
      {
        name:"david.traparic.cv.pdf",
        size:45651213,
        type:"application/pdf",
        lastModified: 1521773778421
      },
      {
        name:"CV TRAPARIC David 2K18.pdf",
        size:145,
        type:"application/pdf",
        lastModified: 1521909934578
      },
      {
        name:"CV Lettre de motivation - TRAPARIC David - domaine de la programmation.pdf",
        size:18574,
        type:"application/pdf",
        lastModified: 1521909934578
      }
    ];

    $("tbody").empty();
    traiterFiles(files);
  }

  document.querySelector('#dir_input').addEventListener("change", startFromInputs);
  function startFromInputs(){
    let files = $('#dir_input')[0].files;
    // $('table').empty();
    $('table').find('tbody').empty();
    $("tbody").empty();
    traiterFiles(files);
  }

  function traiterFiles(files){
    forbiddens = $.map($('#forbidden').val().toLowerCase().trim().replace(/\,$/g, '').split(","), function(val, i){ return val.trim(); });
    prefix = $('#prefix').val();
    suffix = $('#suffix').val();
    FichierCustom.forbiddenWords = forbiddens;
    FichierCustom.prefix = prefix;
    FichierCustom.suffix = suffix;

    mesFichiersCustom = []
    for (file of files) {
      mesFichiersCustom.push(new FichierCustom(file));
    }

    showFiles(mesFichiersCustom);
    let myNames = [];
    console.log("tab de base : ");
    console.log(mesFichiersCustom);
    for (fichierCustom of mesFichiersCustom) {
      fichierCustom.generateNewName();
    }

    $firstCellsOfEachRowAvailable = $('td:first-child');

    let allNewNames = [];
    for (var i = 0; i < mesFichiersCustom.length; i++) {

      let cellHTML = '<td class="tdnewname">'+mesFichiersCustom[i].newName+'</td>';
      $($firstCellsOfEachRowAvailable[i]).after(cellHTML);

      allNewNames.push(mesFichiersCustom[i].newName);
    }

    $('#datanames').val(JSON.stringify(allNewNames));
    $('#apply').show();
    $('#validate').show();
  }


  function showFiles(fichiersCustom){
    for (fichierCustom of fichiersCustom) {
      $('tbody').append("<tr>"
      +"<td>"+fichierCustom.getWithoutExt(fichierCustom.originalName)+"</td>"
      +"<td>"+fichierCustom.getBetterSize()+"</td>"
      +"<td>"+file.type+"</td>"
      +"<td>"+new Date(file.lastModified)+"</td></tr>");
    }
  }


});
