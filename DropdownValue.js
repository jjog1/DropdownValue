(function ($) {
    $.fn.ValueSelectBox = function ()
    {
        var o = this[0].options;

        var dropdownId = this.attr("id");
        var newdropdown = '<select id="' + dropdownId + '" style="width:80%;" onclick="UpdateValueBox(this)">';//
        
        for (var x = 0; x < o.length; x++)
        {
            var option = "<option value=\"" + o[x].value +"\"";
            if(o[x].selected)
            {
                option += "selected=\"selected\"";   
            }

            option += ">" + o[x].text + "</option>";

            newdropdown += option;
        }
        newdropdown += "</select>";
        this.replaceWith('<div>' + newdropdown + '<input type="text" id="'+this.attr("id")+'-box" onkeyup=\'PredictValue(' + this.attr("id") + ', this)\' style="width:20%;"/></div>');
    };
}(jQuery))

function PredictValue(element, elementbox) {
    //The regular expression to match the value to the value entered
    //in the textbox
    var reg = new RegExp('^' + elementbox.value, "gi");
    var o = element.options;
    for (var x = 0; x < o.length; x++) {
        if (reg.test(o[x].value.toLowerCase())) {
            o[x].hidden = false;
        }
        else
        {
            o[x].hidden = true;
        }
    }
}

function UpdateValueBox(element)
{
    var val = element.selectedOptions[0].value;
    $('#' + element.id + '-box').text = val;
    $('#' + element.id + '-box').value = val;
    $('#' + element.id + '-box').val(val);
}