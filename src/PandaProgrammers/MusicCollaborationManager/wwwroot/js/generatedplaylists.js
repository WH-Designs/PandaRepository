﻿
//https://stackoverflow.com/questions/11338774/serialize-form-data-to-json - Maciej Pyszyński's answer.
function getFormData($form) {
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function (n, i) {
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
}


$("#save-playlist-btn").click(function () {

    var $form = $("#playlist-form");
    var actualData = getFormData($form);
/*    console.log(actualData)*/

    console.log("LAST ENTRY: " + actualData["__RequestVerificationToken"]);
    delete actualData["__RequestVerificationToken"];

    let dataAsArray = [];
    $.each(actualData, function (index, item) {
        dataAsArray.push(item);
    });
    console.log(dataAsArray);

    $.ajax({
        method: "POST",
        url: "/api/spotifyauth/savegeneratedplaylist",
        dataType: "json",
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify(dataAsArray),
        success: savePlaylist,
        error: errorOnAjax
    });

});

function redirectToGenIndex() {
    //https://stackoverflow.com/questions/503093/how-do-i-redirect-to-another-webpage - Govind Singh's answer.
    $(window).attr('location', '/Generator/Index')

}


function savePlaylist(data) {
    //console.log("Result of 'SaveMCMGeneratedPlaylist': " + data);
    let text = "The playlist has been saved to your Spotify account";

    if (data === false) {
        text = "There was an error adding the playlist to your Spotify account";
    }
    

    let popUpMsg = `
    <div class="p-12 bg-coreback moon:bg-gray-500 classicpanda:bg-secondaryback rounded fixed">
            
            <p class=text-textback 
                revolution:text-white 
                autumn:text-white 
                classicpanda:text-textback">${text}. You will be redirected shortly...
            </p>
    </div>`;

    $("#explanation-title").append(popUpMsg);
    setTimeout(redirectToGenIndex, 4000);
}

function errorOnAjax(){
    console.log("Error on Ajax.");
}

let currentTheme = localStorage.theme;

$("#discard-playlist-btn").click(function () {
    let msg = `
    <div class="p-12 bg-coreback moon:bg-gray-500 classicpanda:bg-secondaryback rounded fixed">
            <p class="text-textback 
                revolution:text-white 
                autumn:text-white 
                classicpanda:text-textback">Playlist has been discarded. You will be redirected shortly...
            </p>
    </div>`;
    $("#explanation-title").append(msg);
    setTimeout(redirectToGenIndex, 3000);
});

//Playing indication (below)----------------

function removePlayingStatusText() {
    $("#playing-status-active").remove();
}

$(".playable-item").click(function () {


    $('#playing-status-active').remove();
    let trackHtmlID = $(this)[0].id;

    let playingStatus = '<p class="text-white" id="playing-status-active" style="font-family: Arial, sans-serif;">Playing...</p>'
    $(`#${trackHtmlID}`).append(playingStatus);

    setTimeout(removePlayingStatusText, 4000);

});