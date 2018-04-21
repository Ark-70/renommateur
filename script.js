$(function(){
  // BUG qui va rester : NOMS & PRÉNOMS COMPOSÉS

/*NOTE REVIEW*/
// faire une classe Fichier avec toutes les méthodes
// pour les mots à suppr, faire un split puis trim
// reset table
// BetterSize
// prefix
// suffix
// faire un bouton d'échange Nom/Prénom
//
/*TODO*/
// Full bug pour choper le 3e newName de test
// le séparateur marche pas du tout
// this.betterDate()
// Vraiment apply sur ce qu'il y a dans les inputs
// Montages des profs à dl dans les tests
/*BUG*/
/*OPTIMIZE*/
//

  // startWithTests(); // A ENLEVER NORMALEMENT NON ?

let mesFichiersCustom = [];
let modeIsTesting = false;

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
        lastModified: 1521773778
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
    modeIsTesting = true;
    $('#mode').val("testing");
    $("tbody").empty();
    $('table').show();
    traiterFiles(files);
  }

  document.querySelector('#dir_input').addEventListener("change", startFromInputs);
  function startFromInputs(){
    let files = $('#dir_input')[0].files;
    // $('table').empty();
    modeIsTesting = false;
    $('#mode').val("uploaded");
    $("tbody").empty();
    $('table').show();
    traiterFiles(files);
  }

  document.querySelector('#apply').addEventListener("click", function(){
    if(modeIsTesting) startWithTests(); else startFromInputs();
  });

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
    for (let i = 0; i < mesFichiersCustom.length; i++) {
      // on affiche dans la table les nouveaux noms
      let cellHTML = '<td class="tdnewname" style="text-align:center;"><input type="text" style="width:95%;" size="'+(mesFichiersCustom[i].newName.length+5)+'" value="'+mesFichiersCustom[i].newName+'"></td>';
      $($firstCellsOfEachRowAvailable[i]).after(cellHTML);

      // on ajoute l'extension nécessaire pour le php

    }

    // $('#datanames').val(JSON.stringify(allNewNames));
    $('#apply').show();
    $('#validate').show();
  }

  function showFiles(fichiersCustom){
    for (fichierCustom of fichiersCustom) {
      myDate = new Date(fichierCustom.originalDate);
      $('tbody').append("<tr>"
      +"<td>"+fichierCustom.getWithoutExt(fichierCustom.originalName)+"</td>"
      +"<td><button type='button' style='font-size:1.1em; width:100%; line-height:1.1em; padding:0;'>⇄</button></td>"
      +"<td>"+fichierCustom.getBetterSize()+"</td>"
      +"<td>"+fichierCustom.originalType+"</td>"
      +"<td>"+myDate.toLocaleDateString()+" "+myDate.toLocaleTimeString()+"</td></tr>");
    }
  }

  $( "tbody" ).on( "click", "tr button", function() {
    // console.log(this);
    // console.log($('tbody tr button'));
    let indexTmp = $('tbody tr button').toArray().indexOf(this);
    let inputTmp = $('.tdnewname input')[indexTmp];
    let name = $(inputTmp).val();
    let reversedName = mesFichiersCustom[indexTmp].reverseName(name);
    $(inputTmp).val(reversedName);
  });

  document.querySelector('#validate').addEventListener("click", insertDataBeforePost);
  function insertDataBeforePost() {
    let allNewNames = [];
    let $inputsNewName = $('.tdnewname input');
    for (let i = 0; i < $inputsNewName.length; i++) {

      allNewNames.push( $($inputsNewName[i]).val()+mesFichiersCustom[i].getExt() );
    }
    $('#datanames').val(JSON.stringify(allNewNames));
  }



});
