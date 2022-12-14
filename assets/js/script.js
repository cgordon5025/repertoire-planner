//set the date for the recital
$(function () {
    $('#datepicker').datepicker({
        changeMonth: true,
        changeYear: true,
    });
});
var submitBtn = $('#submitInfo')
var nameThemeInfo = $('nameRecital')
var datePickerEl = $('datepicker')
var recitalDetailEl = $('#recitalInfo')
var dateContainerEl = $('#dateContainer')
var nameContainerEl = $('#nameContainer')
submitBtn.click(saveInfo)
var recitalInfoEl = $('#recitalInfo')
var listCompEl = $('#listofComposers')
function init(){
    if (!localStorage.getItem("myRecital")) {
        var recitalText = '';
    } else {
        recitalText = JSON.parse(localStorage.getItem("myRecital"));
        dateContainerEl.hide();
        nameContainerEl.hide()
    }
    renderInfo()
}
function saveInfo() {
    var recitalInfo = {
        nameText: nameThemeInfo.val(),
        dateText: datePickerEl.val()
    }
    localStorage.setItem("myRecital", JSON.stringify(recitalInfo))
    renderInfo()
}
function renderInfo() {
    recitalDetailEl.text(recitalText);
}
var apiURL = "https://api.openopus.org/composer/list/pop.json"
var composersList
function composers() {
    getCompAPI().then(function (res) {
        listComp(res)
    })
}
async function getCompAPI() {
    let compData = await fetch(apiURL)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data.composers)
            composersList = data.composers
            return composersList
        })
    return compData
}

function listComp(res) {
    for (var i = 0; i < res.length; i++) {
        var compLi = $('<option></options')
        compLi.text(res[i].name)
        listCompEl.append(compLi)
    }
}

composers()