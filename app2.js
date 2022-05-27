var Template = '';
$('#submit').on('click', function(e) {
    e.preventDefault();
    $('#form').submit();
})

$('document').ready(function() {
    $.get('template2.txt', function(result) {
        $('#resultCode').val(result);
        Template = result;
    })
})

$(function()
{
    $(document).on('change', '#name',function() {
        $name = $('#name').val();
        if ($name != '' && $name != undefined && $name != null) {
            $name = toKebabCase($name);
            $('#name').val($name);
        }
        $resultCode = Template.replaceAll('_short-name_', toKebabCase($name)).replaceAll('_full-name_', toTitleCase($name));
        $routeCode = "Route::get('/"+toKebabCase($name)+"', [$ControllerClass, '"+toCamelCase($name)+"'])->name('"+toKebabCase($name)+"');\n";
        $('#resultCode').val($resultCode);
        $('#routeCode').val($routeCode);
    }).on('click', '.btn-copy', function(e)
    {
        e.preventDefault();
        navigator.permissions.query({name: "clipboard-write"}).then(result => {
            if (result.state == "granted" || result.state == "prompt") {
                navigator.clipboard.writeText($(this).siblings('textarea').val()).then(function() {
                    $('#snackbar').html('Copied successfully.')
                  }, function() {
                    $('#snackbar').html('Copy failed.')
                  });
                $('#snackbar').addClass('show');
                setTimeout(function(){$('#snackbar').removeClass('show');},1500);
            } else {
                $('#snackbar').html('Clipboard permission not granted.');
                $('#snackbar').addClass('show');
                setTimeout(function(){$('#snackbar').removeClass('show');},1500);
            }
          });
	})
});


const toPascalCase = str =>
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase())
    .join('');
const toTitleCase = str =>
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.charAt(0).toUpperCase() + x.slice(1))
    .join(' ');
const toHeaderCase = str =>
  str
    .match(/[A-Z]{2,}(?=[A-Z.<>()%/-][a-z.<>()%/-]+[0-9.<>()%/-]*|\b)|[A-Z.<>()%/-]?[a-z.<>()%/-]+[0-9.<>()%/-]*|[A-Z.<>()%/-]|[0-9.<>()%/-]+/g)
    .map(x => x.charAt(0).toUpperCase() + x.slice(1))
    .join(' ');
const toCamelCase = str => {
  const s =
    str &&
    str
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
      )
      .map(x => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
      .join('');
  return s.slice(0, 1).toLowerCase() + s.slice(1);
};
const toKebabCase = str =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('-');
const toSnakeCase = str =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('_');
const unique = arr => arr.filter(function(itm, i, a) {
    return i == a.indexOf(itm);
}).sort();