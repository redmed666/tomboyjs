var editor = new tui.Editor({
    el: document.querySelector('#note-opened'),
    initialEditType: 'markdown',
    previewStyle: 'vertical',
    height: $(window).height()*0.9
});

$(window).on('resize', function(){
    editor.height($(window).height()*0.9);
});