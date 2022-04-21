$('#submit').on('click', function(e) {
    e.preventDefault();
    $('#form').submit();
})

$('document').ready(function() {
    $.get('template.txt', function(result) {
        $('#resultCode').val(result);
    })
})

$(function()
{
    $(document).on('click', '.btn-add', function(e)
    {
        e.preventDefault();
        $id = $(this).data('id');
        var controlForm = $('.controls.dynamic#'+$id),
            currentEntry = $(this).parents('.entry:first'),
            newEntry = $(currentEntry.clone()).appendTo(controlForm);
        newEntry.find('input').val('');
        controlForm.find('.entry:not(:last) .btn-add')
            .removeClass('btn-add').addClass('btn-remove')
            .removeClass('btn-success').addClass('btn-danger')
            .html('<i class="fas fa-minus"></i>');
        $('input[name="protected[]"]').change(function() {
            $(this).val(toSnakeCase($(this).val()))
        });
    }).on('click', '.btn-remove', function(e)
    {
		$(this).parents('.entry:first').remove();

		e.preventDefault();
		return false;
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
                setTimeout(function(){$('#snackbar').removeClass('show');},1500)
            }
          });
	}).on('change', '#name',function() {
        $name = $('#name').val();
        if ($name != '' && $name != undefined && $name != null) {
            $name = toPascalCase($name);
            $('#name').val($name);
            $title = toTitleCase($name);
            $('#title').val($title+" Report").change();
        }
        $codes = $('#resultCode').val();
        $start_str = "/* _NAME_ ";
        $end_str = '/* _NAME_END_ ';
        $tabs = 0;
        $start = $codes.search($start_str);
        $end = $codes.search($end_str);
        $before = $codes.slice(0,($start+$start_str.length+$tabs+1));
        $after = $codes.slice($end-$tabs-3);
        $('#resultCode').val($before+$name+"Export"+$after);
        $('#routeCode').val("Route::get('/"+toKebabCase($name)+"', [$ControllerClass, '"+toCamelCase($name)+"'])->name('"+toKebabCase($name)+"');")
    }).on('change','input[name="protected[]"]', onProtectedChanged
    ).on('change','input[name="protectedVal[]"]', onProtectedChanged
    ).on('change','select[name="fontName[]"]', onFontChanged
    ).on('change','input[name="fontSize[]"]', onFontChanged
    ).on('change','input[name="fontBold[]"]', onFontChanged
    ).on('change','input[name="fontUnderline[]"]', onFontChanged
    ).on('change','input[name="fontColor[]"]', onFontChanged
    ).on('change','select[name="fillType[]"]', onFillChanged
    ).on('change','input[name="fillColor[]"]', onFillChanged
    ).on('change','select[name="borderTopStyles[]"]', onBorderChanged
    ).on('change','input[name="borderTopColors[]"]', onBorderChanged
    ).on('change','select[name="borderBottomStyles[]"]', onBorderChanged
    ).on('change','input[name="borderBottomColors[]"]', onBorderChanged
    ).on('change','select[name="borderLeftStyles[]"]', onBorderChanged
    ).on('change','input[name="borderLeftColors[]"]', onBorderChanged
    ).on('change','select[name="borderRightStyles[]"]', onBorderChanged
    ).on('change','input[name="borderRightColors[]"]', onBorderChanged
    ).on('change','select[name="horizontalAligns[]"]', onAlignChanged
    ).on('change','select[name="verticalAligns[]"]', onAlignChanged
    ).on('change','input[name="headers[]"]', onHeadersChanged
    ).on('change','input[name="widths[]"]', onWidthChanged
    ).on('change','input[name="widthCols[]"]', onWidthChanged
    ).on('change','input[name="heights[]"]', onHeightChanged
    ).on('change','input[name="heightRows[]"]', onHeightChanged
    ).on('change','input[name="startCol"]', onStartColChanged
    ).on('change','input[name="endCol"]', onEndColChanged
    ).on('change','input[name="freeze"]', onFreezeChanged
    ).on("keydown", ":input:not(textarea)", function(event) {
        if (event.key == "Enter") {
            event.preventDefault();
        }
    });;
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
function onProtectedChanged() {
    // Protecteds
    var routes = $("input[name='protected[]']")
            .map(function(){
            if ($(this).val())
                $(this).val(toSnakeCase($(this).val()));
            return $(this).val();
        }).get();
    var values = $("input[name='protectedVal[]']")
        .map(function(){return $(this).val();}).get();
    let $routeCode = '';
    routes.forEach((route, count) => {
        var value = values[count];
        if (route.length > 0) {
            $routeCode += "protected $"+route+" = '"+value+"';";
            $routeCode += "\n    ";
        }
    });
    $codes = $('#resultCode').val();
    $start_str = '//_PROTECTEDS_';
    $end_str = '//_PROTECTEDS_END_';
    $tabs = 4;
    $start = $codes.search($start_str);
    $end = $codes.search($end_str);
    $before = $codes.slice(0,($start+$start_str.length+$tabs+1));
    $after = $codes.slice($end);
    $('#resultCode').val($before+$routeCode+$after);
}
function onFontChanged() {
    // Protecteds
    var names = $("select[name='fontName[]']")
            .map(function(){
            return $(this).val();
        }).get();
    var sizes = $("input[name='fontSize[]']")
        .map(function(){return $(this).val();}).get();
    var colors = $("input[name='fontColor[]']")
        .map(function(){return $(this).val();}).get();
    var bolds = $("input[name='fontBold[]']")
        .map(function(){return $(this).is(':checked');}).get();
    var underlines = $("input[name='fontUnderline[]']")
        .map(function(){return $(this).is(':checked');}).get();
    let $fontsCode = '';
    $tabs = 16;
    names.forEach((name, count) => {
        var size = sizes[count];
        var bold = bolds[count];
        var underline = underlines[count];
        var color = colors[count];
        if (name.length > 0) {
            let var_name = toPascalCase(name)+size;
            if (bold)
                var_name += 'Bold';
            if (underline)
                var_name += 'Underline';
            $codes = "$font"+var_name+" = [\n"
                            +(" ".repeat($tabs+4))
                            +"'font' => [\n"
                            +(" ".repeat($tabs+8))
                            +"'name' => '"+toTitleCase(name)+"',\n"
                            +(" ".repeat($tabs+8))
                            +"'size' => "+size
                            +",\n"
                            +(" ".repeat($tabs+8))
                            +"'color' => ['rgb' => '"+color.replace('#','').toUpperCase()
                            +"'],\n";
            if (bold){
                $codes += (" ".repeat($tabs+8))
                            +"'bold' => true,\n";
            }
            if (underline){
                $codes += (" ".repeat($tabs+8))
                            +"'underline' => true\n";
            }
            $codes += (" ".repeat($tabs+4))
                        +"]\n"
                        +(" ".repeat($tabs))
                        +"];";
            $fontsCode += $codes;
            $fontsCode += "\n"+(" ".repeat($tabs));
        }
    });
    $codes = $('#resultCode').val();
    $start_str = '//_FONTS_';
    $end_str = '//_FONTS_END_';
    $start = $codes.search($start_str);
    $end = $codes.search($end_str);
    $before = $codes.slice(0,($start+$start_str.length+$tabs+1));
    $after = $codes.slice($end);
    $('#resultCode').val($before+$fontsCode+$after);
}
function onFillChanged() {
    // Protecteds
    var types = $("select[name='fillType[]']")
            .map(function(){
            return $(this).val();
        }).get();
    var colors = $("input[name='fillColor[]']")
        .map(function(){return $(this).val();}).get();
    let $finalCode = '';
    $tabs = 16;
    types.forEach((type, count) => {
        var color = colors[count].replace('#','');
        if (type.length > 0 && type != 'none') {
            let var_name = toPascalCase(type)+toPascalCase(color);
            $codes = "$fill"+var_name+" = [\n"
                            +(" ".repeat($tabs+4))
                            +"'fill' => [\n"
                            +(" ".repeat($tabs+8))
                            +"'fillType' => Fill::FILL_"+(type).toUpperCase()+",\n"
                            +(" ".repeat($tabs+8))
                            +"'color' => ['rgb' => '"+color.toUpperCase()
                            +"'],\n";
            $codes += (" ".repeat($tabs+4))
                        +"]\n"
                        +(" ".repeat($tabs))
                        +"];";
            $finalCode += $codes;
            $finalCode += "\n"+(" ".repeat($tabs));
        }
    });
    $codes = $('#resultCode').val();
    $start_str = '//_FILLS_';
    $end_str = '//_FILLS_END_';
    $start = $codes.search($start_str);
    $end = $codes.search($end_str);
    $before = $codes.slice(0,($start+$start_str.length+$tabs+1));
    $after = $codes.slice($end);
    $('#resultCode').val($before+$finalCode+$after);
}
function onBorderChanged() {
    // Protecteds
    var borderTopStyles = $("select[name='borderTopStyles[]']")
    .map(function(){
    return $(this).val();
    }).get();
    var borderBottomStyles = $("select[name='borderBottomStyles[]']")
        .map(function(){
        return $(this).val();
    }).get();
    var borderLeftStyles = $("select[name='borderLeftStyles[]']")
        .map(function(){
        return $(this).val();
    }).get();
    var borderRightStyles = $("select[name='borderRightStyles[]']")
        .map(function(){
        return $(this).val();
    }).get();
    var borderTopColors = $("input[name='borderTopColors[]']")
            .map(function(){
            return $(this).val().replace('#','');
        }).get();
    var borderBottomColors = $("input[name='borderBottomColors[]']")
            .map(function(){
            return $(this).val().replace('#','');
        }).get();
    var borderLeftColors = $("input[name='borderLeftColors[]']")
            .map(function(){
            return $(this).val().replace('#','');
        }).get();
    var borderRightColors = $("input[name='borderRightColors[]']")
            .map(function(){
            return $(this).val().replace('#','');
        }).get();
    borderStyles = [];
    borderColors = [];
    $.each(borderTopStyles, (count,_) => {
        $styles = [];
        $styles['top'] = borderTopStyles[count];
        $styles['bottom'] = borderBottomStyles[count];
        $styles['left'] = borderLeftStyles[count];
        $styles['right'] = borderRightStyles[count];
        $colors = [];
        $colors['top'] = borderTopColors[count];
        $colors['bottom'] = borderBottomColors[count];
        $colors['left'] = borderLeftColors[count];
        $colors['right'] = borderRightColors[count];
        borderStyles.push($styles);
        borderColors.push($colors);
    });
    let $finalCodes = '';
    $tabs = 16;
    $.each(borderStyles, (count, borders) => {
        var position = Object.keys(borders);
        var borderStyle = Object.values(borders);
        var borderColor = Object.values(borderColors[count]);
        let var_name = 'border';
        if (position.length > 0) {
            if ($.inArray('none', borderStyle) == -1) {
                var_name += 'All';
                if (unique(borderStyle).length == 1) {
                    var_name += toPascalCase(borderStyle[0]);
                    if (unique(borderColors).length == 1) {
                        var_name += toPascalCase(borderColor[0]);
                    } else {
                        unique(borderColor).forEach((color, _) => {
                            if (color != '000000')
                                var_name += (color).toUpperCase();
                        });
                    }
                }
            } else {
                position.forEach((pos, count) => {
                    if (borderStyle[count]!='none') {
                        var color = borderColor[count];
                        var_name += toPascalCase(pos);
                        var_name += toPascalCase(borderStyle[count]);
                        if (color != '000000')
                            var_name += (borderColor[count]).toUpperCase();
                    }
                });
            }
        }

        $codes = "$"+var_name+" = [\n"
                        +(" ".repeat($tabs+4))
                        +"'borders' => [\n";
        position.forEach((pos, count) => {
            if (borderStyle[count]!='none') {
                $codes += (" ".repeat($tabs+8))+"'"+pos+"' => [\n"
                    +(" ".repeat($tabs+12))
                    +"'borderStyle' => Border::BORDER_"+borderStyle[count].toUpperCase()+",\n"
                    +(" ".repeat($tabs+12))
                    +"'color' => ['rgb' => '"+borderColor[count].toUpperCase()
                    +"'],\n"
                    +(" ".repeat($tabs+8))
                    +"],\n";
            }
        });
        $codes += (" ".repeat($tabs+4))
                    +"]\n"
                    +(" ".repeat($tabs))
                    +"];";
        $finalCodes += $codes;
        $finalCodes += "\n"+(" ".repeat($tabs));
    });
    $codes = $('#resultCode').val();
    $start_str = '//_BORDERS_';
    $end_str = '//_BORDERS_END_';
    $start = $codes.search($start_str);
    $end = $codes.search($end_str);
    $before = $codes.slice(0,($start+$start_str.length+$tabs+1));
    $after = $codes.slice($end);
    $('#resultCode').val($before+$finalCodes+$after);
}
function onAlignChanged() {
    // Protecteds
    var verticalAligns = $("select[name='verticalAligns[]']")
            .map(function(){
            return $(this).val();
        }).get();
    var horizontalAligns = $("select[name='horizontalAligns[]']")
            .map(function(){
            return $(this).val();
        }).get();
    aligns = [];
    $.each(horizontalAligns, (count,_) => {
        $arr = [];
        $arr['horizontal'] = horizontalAligns[count];
        $arr['vertical'] = verticalAligns[count];
        aligns.push($arr);
    });
    let $finalCodes = '';
    $tabs = 16;
    $.each(aligns, (count, align) => {
        var keys = Object.keys(align);
        var values = Object.values(align);
        let var_name = 'align';
        if (keys.length > 0) {
            keys.forEach((key, count) => {
                var_name += toTitleCase(values[count]);
            });
        }

        $codes = "$"+var_name+" = [\n"
                        +(" ".repeat($tabs+4))
                        +"'alignment' => [\n";
        keys.forEach((key, count) => {
            $codes += (" ".repeat($tabs+8))+"'"+key+"' =>  Alignment::"+key.toUpperCase()+"_"+values[count].toUpperCase()+",\n";
        });
        $codes += (" ".repeat($tabs+4))
                    +"]\n"
                    +(" ".repeat($tabs))
                    +"];";
        $finalCodes += $codes;
        $finalCodes += "\n"+(" ".repeat($tabs));
    });
    $codes = $('#resultCode').val();
    $start_str = '//_ALIGNS_';
    $end_str = '//_ALIGNS_END_';
    $start = $codes.search($start_str);
    $end = $codes.search($end_str);
    $before = $codes.slice(0,($start+$start_str.length+$tabs+1));
    $after = $codes.slice($end);
    $('#resultCode').val($before+$finalCodes+$after);
}
function onFreezeChanged() {
    // Freeze
    var freeze = $("input[name='freeze']");
    if (freeze.val())
        freeze.val((freeze.val()).toUpperCase());
    var value = freeze.val();
    $freezeCode = '';
    if (value != '') {
        $freezeCode = "$event->sheet->freezePane('"+value+"');\n";
    }
    $codes = $('#resultCode').val();
    $start_str = '//_FREEZE_';
    $end_str = '//_FREEZE_END_';
    $tabs = 16;
    $start = $codes.search($start_str);
    $end = $codes.search($end_str);
    $before = $codes.slice(0,($start+$start_str.length+$tabs+1));
    $after = $codes.slice($end-$tabs);
    $('#resultCode').val($before+$freezeCode+$after);
}
function onStartColChanged() {
    // Input
    var input = $("input[name='startCol']");
    if (input.val())
        input.val((input.val()).toUpperCase());
    var value = input.val();
    $code = '';
    if (value != '') {
        $code = "$startCol = '"+value+"';\n";
    }
    if ($code.length > 0) {
        $codes = $('#resultCode').val();
        $start_str = '//_STARTCOL_';
        $end_str = '//_STARTCOL_END_';
        $tabs = 16;
        $start = $codes.search($start_str);
        $end = $codes.search($end_str);
        $before = $codes.slice(0,($start+$start_str.length+$tabs+1));
        $after = $codes.slice($end-$tabs);
        $('#resultCode').val($before+$code+$after);
    }
}
function onEndColChanged() {
    // Input
    var input = $("input[name='endCol']");
    if (input.val())
        input.val((input.val()).toUpperCase());
    var value = input.val();
    $code = '';
    if (value != '') {
        $code = "$endCol = '"+value+"';\n";
    }
    $codes = $('#resultCode').val();
    $start_str = '//_ENDCOL_';
    $end_str = '//_ENDCOL_END_';
    $tabs = 16;
    $start = $codes.search($start_str);
    $end = $codes.search($end_str);
    $before = $codes.slice(0,($start+$start_str.length+$tabs+1));
    $after = $codes.slice($end-$tabs);
    $('#resultCode').val($before+$code+$after);
}
function onWidthChanged() {
    // Protecteds
    var cols = $("input[name='widthCols[]']")
            .map(function(){
            if ($(this).val())
                $(this).val(($(this).val()).toUpperCase());
            return $(this).val();
        }).get();
    var widths = $("input[name='widths[]']")
        .map(function(){return $(this).val();}).get();
    let $finalCode = '';
    $tabs = 16;
    cols.forEach((col, count) => {
        var width = widths[count];
        if (col.length > 0) {
            $codes = "$event->sheet->getColumnDimension('"+col+"')->setAutoSize(false)->setWidth("+(parseFloat(width)+0.82).toFixed(2)+");";
            $finalCode += $codes;
            $finalCode += "\n"+(" ".repeat($tabs));
        }
    });
    $codes = $('#resultCode').val();
    $start_str = '//_SETWIDTH_';
    $end_str = '//_SETWIDTH_END_';
    $start = $codes.search($start_str);
    $end = $codes.search($end_str);
    $before = $codes.slice(0,($start+$start_str.length+$tabs+1));
    $after = $codes.slice($end);
    $('#resultCode').val($before+$finalCode+$after);
}
function onHeightChanged() {
    // Protecteds
    var rows = $("input[name='heightRows[]']")
            .map(function(){
            if ($(this).val())
                $(this).val(($(this).val()).toUpperCase());
            return $(this).val();
        }).get();
    var heights = $("input[name='heights[]']")
        .map(function(){return $(this).val();}).get();
    let $finalCode = '';
    $tabs = 16;
    rows.forEach((row, count) => {
        var height = heights[count];
        if (row.length > 0) {
            $codes ="$event->sheet->getRowDimension('"+row+"')->setRowHeight("+(parseFloat(height)+0.82).toFixed(2)+");"
            $finalCode += $codes;
            $finalCode += "\n"+(" ".repeat($tabs));
        }
    });
    $codes = $('#resultCode').val();
    $start_str = '//_SETHEIGHT_';
    $end_str = '//_SETHEIGHT_END_';
    $start = $codes.search($start_str);
    $end = $codes.search($end_str);
    $before = $codes.slice(0,($start+$start_str.length+$tabs+1));
    $after = $codes.slice($end);
    $('#resultCode').val($before+$finalCode+$after);
}
function onHeadersChanged() {
    // Protecteds
    var headers = $("input[name='headers[]']")
            .map(function(){
            if ($(this).val())
                $(this).val(toHeaderCase($(this).val()));
            return $(this).val();
        }).get();
    let $finalCode = '';
    $tabs = 16;
    $codes ="$headers = [";
    headers.forEach((header, count) => {
        if (header.length > 0) {
            $codes += "'"+header+"'"
            if (count+1 != headers.length) {
                $codes += ",";
            }
        }
    });
    $finalCode += $codes;
    $finalCode += "];\n"+(" ".repeat($tabs));
    $codes = $('#resultCode').val();
    $start_str = '//_HEADERS_';
    $end_str = '//_HEADERS_END_';
    $start = $codes.search($start_str);
    $end = $codes.search($end_str);
    $before = $codes.slice(0,($start+$start_str.length+$tabs+1));
    $after = $codes.slice($end);
    $('#resultCode').val($before+$finalCode+$after);
}