var editor = new tui.Editor({
    el: document.querySelector('#note-opened'),
    initialEditType: 'markdown',
    previewStyle: 'vertical',
    height: $(window).height()*0.85,
    exts: ['scrollSync', 'uml', 'chart', 'mark', 'table', 'taskCounter']
});

$(window).on('resize', function(){
    editor.height($(window).height()*0.85);
});