let $ = require('jquery');
let fs = require('fs');
let os = require('os');
let notespath = os.homedir() + '/tomboynotes/';

function createNavLink(filename, title) {
    return '<li class=\"nav-item\"><button class=\"btn btn-secondary\" onClick=\"openFile(this.id)\" id=\"'+notespath+filename+'\">'+title+'&nbsp;&nbsp;<span onClick=\"deleteFile(this.parentNode.id, this.parentNode.textContent);return false;\">[X]</span></button></li>';
}

function createTab(notepath, title) {
    return '<li class=\"nav-item\" id=\"'+title+'\"><a class=\"nav-link\" onClick=\"updateEditor(this.id)\" id=\"'+ notepath +'\">'+ title +'<button class="close closeTab" type="button" onClick=\"closeTab(this.parentNode.id); return false;\">X</button></a></li>';
}

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

    let newTab = createTab(notepath, title);
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
        let updatedList = createNavLink(file, title);
        $('#notes').append(updatedList);

        linkMap.set(notepath, title);
    });
}

function deleteFile(filepath, title) {
    console.log(filepath);
    if(confirm('Are you sure you want to delete ' + title.slice(0, title.length - 1) + '?')) {
        closeTab(filepath);
        fs.unlinkSync(filepath);
        updateDisplayNotes();
    } else {
        return;
    }
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