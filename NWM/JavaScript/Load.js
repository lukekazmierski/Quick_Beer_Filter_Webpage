//TODO- Review this next link for optimizing speed, this will help with text compression, google audit states 60-80% reduced bytes for network traffic
//https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer
//TODO- Review the Progress Web APP Checklist and look into this more
//https://developers.google.com/web/progressive-web-apps/checklist


$(document).ready(function () {
    Load_table_JQUERY_Ajax();
    $("#ABV").keypress(function (e) {
        if (e.which !== 8 && e.which !== 0 && (e.which < 48 || e.which > 57)) {
//display error message
            $("#errmsg").html("Digits Only").show().fadeOut("slow");
            return false;
        }
    });
    $("#ABV").keyup(function () {
        setTimeout(Load_table_JQUERY_Ajax(), 2000);
    });
    $("#beer").keyup(function () {
        setTimeout(Load_table_JQUERY_Ajax(), 2000);
    });
});
function Load_table_JS_Ajax() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            Generate_Beer_List(jQuery.parseJSON(this.responseText));
        }
    };
    xhttp.open("GET", "PHP/Primary_Data.php?DATE=" + "&ABV=10" + "&BEER=", true);
    xhttp.send();
}
function Load_table_JQUERY_Ajax() {
//http://api.jquery.com/jquery.ajax/
    $.ajax({
        type: "GET",
        url: "PHP/Primary_Data.php",
        dataType: "JSON",
        data: {
            DATE: "",
            ABV: $("#ABV").val(),
            BEER: $("#beer").val()
        },
        success: function (msg)
        {
            $("div").empty();
            Generate_Beer_List(sortResults(msg, 'name', true));
        }
    });
}

function sortResults(input_massage, prop, asc) {
    returned_array = input_massage.sort(function (a, b){
        if (asc) {
            return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
        } else {
            return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
        }
    });
    return returned_array;
}

function Generate_Beer_List(data) {
    //https://www.fancygrid.com/api/columns/text
    new FancyGrid({
        renderTo: 'container',
        height: 500,
        width: 800,
        paging: {
            pageSize: 10,
            pageSizeData: [10, 20, 40, 80]
        },
        data: data,
        defaults: {
            type: 'text',
            resizable: true,
            sortable: true,
            render: function (o) {
                o.style = {
                    'height': '40px',
                    'overflow': 'auto'
                };
                return o;
            }
        },
        columns: [{
                index: 'name',
                title: 'Name',
                width: 150,
                filter: {
                    header: true,
                    emptyText: 'Filter',
                    tip: [
                        'Contains: Lager</br>',
                        'Equal: =Pilsen Lager</br>',
                        'Not Equal: !=Pilsen Lager'
                    ].join("")
                }
            }, {
                index: 'description',
                title: 'Description',
                width: 240,

            }, {
                index: 'tagline',
                title: 'Tagline',
                width: 200,
            }, {
                index: 'first_brewed',
                title: 'First Brewed',
                sortable: false
            }, {
                type: 'number',
                index: 'abv',
                title: 'ABV'
            }]
    })

}