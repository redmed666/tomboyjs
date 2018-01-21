function search() { 
    let searchField = $('#search-field').val();
    if (searchField === "" || searchField === undefined) {
        alert('Search field is empty or undefined');
        return;
    }
    let newTab = '<li class=\"nav-item\"><a class=\"nav-link\" onClick=\"updateWindow(this.id)\" id=\"search_'+ searchField +'\">SEARCH: '+ searchField +'<button class="close closeTab" type="button" onClick=\"closeTab(this.parentNode.id)\">X</button></a></li>';
    $('#notes-opened').append(newTab);
    updateWindow(searchField);
}

function updateWindow(searchField) {
    let notefiles = fs.readdirSync(notespath);
    $('#found').empty();
    $('#main').css('display', 'none');
    $('#search').css('display', 'block');
    $("a").removeClass('active');
    $("a[id*='"+searchField+"']").addClass('active');

    notefiles.forEach((filename,index) => {
        let note = fs.readFileSync(notespath+filename);
        let noteXML = new DOMParser().parseFromString(note, 'application/xml');
        let content = noteXML.getElementsByTagName('content')[0].textContent.toLowerCase();
        let title = noteXML.getElementsByTagName('title')[0].textContent.replace('#','').trim();
        let indexOfSearch = content.indexOf(searchField.replace('search_', ''));

        if( indexOfSearch !== -1) {
            let updatedList = '<li><button class=\"btn btn-secondary\" onClick=\"openFile(this.id)\" id=\"'+notespath+filename+'\">'+title+'</button></li>';
            $('#found').append(updatedList);
        } 
    });
    $('#found').css('display', 'block');
}