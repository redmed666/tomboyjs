let $ = require('jquery');
let fs = require('fs');
let os = require('os');
let notespath = os.homedir() + '/tomboynotes/';

function openFile(notepath) {
    if (!fs.existsSync(notepath)) {
        alert('File doesn\'t exist! File requested = ' + notepath);
    }
    let note = fs.readFileSync(notepath);
    let noteXML = new DOMParser().parseFromString(note, 'application/xml');
    let title = noteXML.getElementsByTagName('title')[0].textContent.replace('#','').trim();
    
    if ($("a[id*='"+notepath+"']").length !== 0) {
        return;
    }

    save();

    let newTab = '<li class=\"nav-item\" id=\"'+title+'\"><a class=\"nav-link\" onClick=\"updateEditor(this.id)\" id=\"'+ notepath +'\">'+ title +'<button class="close closeTab" type="button" onClick=\"closeTab(this.parentNode.id)\">X</button></a></li>';
    $('#notes-opened').append(newTab);
    updateEditor(notepath);
}

function closeTab(tabname) {
    $("a[id*='"+tabname+"']").remove();
    $('#found').css('display', 'none');
    $('note-opened').css('display', 'none');
}

function updateEditor(notepath) {
    let note = fs.readFileSync(notepath);
    let noteXML = new DOMParser().parseFromString(note, 'application/xml');
    let content = noteXML.getElementsByTagName('content')[0].textContent;
    editor.setValue(content);
    $('#note-opened').attr('name',notepath);
    $("a").removeClass('active');
    $("a[id*='"+notepath+"']").addClass('active');
    $('#main').css('display', 'block');
    $('#found').css('display', 'none');
}

function updateDisplayNotes() {
    if(!fs.existsSync(notespath)) {
        fs.mkdirSync(notespath);
    }
    let files = fs.readdirSync(notespath);
    $('#notes').empty();
    files.forEach((file,index) => {
        let notepath = notespath+file;
        let note = fs.readFileSync(notepath);
        let noteXML = new DOMParser().parseFromString(note, 'application/xml');
        let title = noteXML.getElementsByTagName('title')[0].textContent.replace('#','').trim();
        let updatedList = '<li><button class=\"btn btn-secondary\" onClick=\"openFile(this.id)\" id=\"'+notespath+file+'\">'+title+'</button></li>';
        $('#notes').append(updatedList);

        linkMap.set(notepath, title);
    });
}

document.addEventListener('click', function (event) {
    if (event.target.tagName === 'A' && event.target.href.startsWith('file')) {
        event.preventDefault();
        if(os.platform().toString() !== 'win32' ) {
            openFile(event.target.href.replace('file:///','/'));
        } else {
            openFile(event.target.href.replace('file:///',''));   
        }
    }
});

$(document).ready(function(){
    $('.li a').click(function() {
        $(this).siblings('a').removeClass('active');
        $(this).addClass('active');
    });
});

updateDisplayNotes();