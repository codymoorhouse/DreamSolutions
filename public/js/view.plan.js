
$(document).ready(function() {
    var unsorted = true;
    var unfiltered = true;
    var filterDict = {};
    var filters = [];

    $('#bp-selector').change(function() {
        location.href = $(this).val() ? '?bp=' + $(this).val() : '?';
    });

    // add parser through the tablesorter addParser method 
    $.tablesorter.addParser({ 
        // set a unique id 
        id: 'priority', 
        is: function(s) { 
            // return false so this parser is not auto detected 
            return false; 
        }, 
        format: function(s, table, cell, cellIndex) {
        // format your data for normalization
        return s.replace(/H/,2)
                .replace(/M/,1)
                .replace(/L/,0);
        },
        // set type, either numeric or text 
        type: 'numeric' 
    });


    $('#download').click(function() {
        // tell the output widget do it's thing
        $('#view-plan-table').trigger('outputTable');
        console.log('clicked');
    });

    $("#view-plan-table").tablesorter({
        duplicateSpan: false,
        widgets : ["filter", "output"],
        widgetOptions: {
          output_delivery      : 'd',         // (p)opup, (d)ownload
          output_saveRows      : 'v',         // (a)ll, (v)isible, (f)iltered, jQuery filter selector (string only) or filter function
          output_duplicateSpans : false,
          output_ignoreColumns : [0, 1, 2, 5, 11],
          output_saveFileName : 'bp.csv'
        }
    });

    $('button#reset').click(function() {
        allowNesting(true);
        $('.hide-children').each(function() { $(this).removeClass('hide-children'); });
        $('.jq-dropdown :checkbox').each(function() { $(this).attr('checked', false); });
        $(".user-select-multiple").each(function () {
            if ($(this).val())
                $(this).val('').trigger('change');
        });
        $("#view-plan-table").trigger('sortReset').trigger('filterReset');
        expandAll();
        $('#goal-box').removeAttr('disabled');
        $('#objective-box').removeAttr('disabled');
        if ($('#goal-box').parent().parent().is("strike")) {
            $('#goal-box').parent().unwrap();
            $('#objective-box').parent().unwrap();
        }

        unsorted = true;
        unfiltered = true;
        filterDict = {};
        filters = [];
        return false;
    });

    $('#view-plan-table').bind('sortEnd', function() {
        if (unsorted) {
            allowNesting(false);
            expandAll();
            filters[0] = [];
            delete filterDict['0'];
            addFilters("0", ['A', 'T']);
            console.log(filters[0]);
            $('#goal-box').attr('disabled', true).parent().wrap("<strike>");
            $('#objective-box').attr('disabled', true).parent().wrap("<strike>");
            $('#action-box').prop('checked', true);
            $('#task-box').prop('checked', true);
            $('#view-plan-table').trigger('search', [filters]);
            unsorted = false;
        }
    });

    $('.jq-dropdown :checkbox').change(function() {
        if (unfiltered)
            allowNesting(false);

        if (this.checked) {
            addFilters($(this).attr('col'), [$(this).attr('filter')]);
            unfiltered = false;
        } else {
            removeFilters($(this).attr('col'), [$(this).attr('filter')]);
            if (allEmpty(filters) && unsorted) {
                unfiltered = true;
                allowNesting(true);
            }
        }

        if ( !unsorted && filters[0] == "") filters[0] = "A|T";
        $('#view-plan-table').trigger('search', [filters]);

    });

    $('.user-select-multiple').change(function() {
        if (unfiltered)
            allowNesting(false);

        var column = $(this).attr('col');

        if ($(this).val() === null) {
            removeFilters(column, Object.keys(filterDict[column]));
            if (allEmpty(filters) && unsorted) {
                unfiltered = true;
                allowNesting(true);
            }
        } else {
            delete filterDict[column];
            $.each($(this).val(), function(i, val) {
                addFilters(column, [val]);
            });
        }

        if ( !unsorted && filters[0] == "") filters[0] = "A|T";
        $('#view-plan-table').trigger('search', [filters]);
    });

    $('.date-filter').change(function() {
        if (unfiltered)
            allowNesting(false);

        var column = $(this).attr('col');
        delete filterDict[column];

        fromDate = $('#from-date').val();
        toDate = $('#to-date').val();

        filter = fromDate ?
        toDate ? fromDate + ' - ' + toDate :
        '>=' + fromDate :
        toDate ?
        '<=' + toDate :
        '';

        console.log(filter);

        addFilters(column, [filter]);

        if ( !unsorted && filters[0] == "") filters[0] = "A|T";
        $('#view-plan-table').trigger('search', [filters]);
    });

    function allEmpty($array) {
        var result = true;
        $.each($array, function(i, val) {
            if (val != "" && val != undefined) {
                result = false;
                return false;
            }
        });
        return result;
    }

    function allowNesting($bool) {
        if ($bool) {
            $('td.down-caret').each(function() { $(this).removeClass('down-caret'); } );
            $('td.no-caret').each(function() { $(this).removeClass('no-caret'); $(this).addClass('caret'); });
        } else {
            $('td.caret').each(function() { $(this).removeClass('caret'); $(this).addClass('no-caret'); })
        }
    }

    function addFilters($key, $values) {
        if ( !($key in filterDict) ) {
            filterDict[$key] = {};
        }

        $.each( $values, function(i, val) {
            filterDict[$key][val] = true;
        });

        filterDictToFilters();
    }

    function removeFilters($key, $values) {
        $.each( $values, function(i, val) {
            delete filterDict[$key][val];
        });

        filterDictToFilters();
    }

    function filterDictToFilters() {
    // flatten dictionary "set" into array
        var array = [];

        $.each(filterDict, function(i, val) {
            array[i] = Object.keys(val);
        });

        // connect different "set" elements with '|' (or)
        $.each(array, function(i, val) {
            if (array[i] != undefined) filters[i] = val.join('|');
        });
    }

    function expandAll() {
        $('#view-plan-table tbody').find('tr').each(function() {
            $(this).removeClass('hidden');
        });
    }

    function getHierarchy($row) {
        if      ($row.hasClass('goal')) return 0;
        else if ($row.hasClass('objective')) return 1;
        else if ($row.hasClass('action')) return 2;
        else if ($row.hasClass('task')) return 3;
    }


    $('.caret').click(function() {
        $parent = $(this).closest('tr');
        if (unsorted && unfiltered) {
            var show = true;
            $parent.toggleClass('hide-children');
            if ($parent.hasClass('hide-children'))
                show = false;

            $parent.children('td').eq(1).toggleClass('down-caret');
            $level = getHierarchy($parent);
            $row = $parent.next();
            while ( $level - getHierarchy($row) < 0 ) {
                if ($row.hasClass('hide-children') && show) {
                    $row.removeClass('hidden');
                    var skip_until = getHierarchy($row);
                    $row = $row.next();
                    while (skip_until - getHierarchy($row) < 0) $row = $row.next();
                } else {
                    $row.toggleClass('hidden', !show);
                    $row = $row.next();
                }
            }
        }
    });

    $(".user-select-multiple").select2({ placeholder: 'Select filters', width: '337px',  });

    // hack to prevent select2 menu from opening when clearing it
    // See https://github.com/select2/select2/issues/3320
    var $el = $('.user-select-multiple');
    $el.on('select2:unselecting', function(e) {
        $el.data('unselecting', true);
    }).on('select2:open', function(e) { // note the open event is important
        if ($el.data('unselecting')) {    
            $el.removeData('unselecting'); // you need to unset this before close
            $el.select2('close');
        }
    });

    $.featherlight.defaults.afterOpen = function() {
        $(".select-multiple").select2({ placeholder: 'Select users', width: '337px' });
    };
});