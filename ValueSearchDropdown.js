(function ($) {
    var dropdownchange = false,
        methods = {
        init: function () {
            var dropdownId = this.attr("id"),
                containerId =dropdownId + '-container',
                dropdownboxId = dropdownId + '-dropdownbox',
                glyphId =  dropdownId + '-glyph',
                valueboxId = dropdownId + '-valueBox' ,
                textboxId = dropdownId + '-textBox';
            var sText = $('#'+dropdownId+' :selected').text();
            var sValue = this.val();
            //Start container
            var newBox = '<div id="' + dropdownId + '-container" class="fullcontainer">'

            //Start inputcontainer
            newBox += '<div class="dropdownboxcontainer">'

            newBox += '<input type="textbox" id="' + dropdownId + '-textbox" class="dropdowntextbox" value="'+sText+'"/>';
            newBox += '<div class="glyphicon glyphicon-chevron-down" id="'+dropdownId + '-glyph"></div>';
            newBox += '<input type="textbox" id="' + dropdownId + '-valueBox" class="dropdownvaluebox" value="'+sValue+'">';
            //Close inputcontainer
            newBox += '</div>'

            //Add dropdown box
            newBox += '<div id="' + dropdownId + '-dropdownbox" class="dropdownlistbox"><ul>';

            var o = this[0].options;
            for (var x = 0; x < o.length; x++) {
                if (o[x].className.indexOf('ignore') <= 0) {
                    newBox += '<li id="' + dropdownId + '-value-' + x + '" data-value="' + o[x].value +
                        '" class="newdropdownitem"' +
                        'onclick="$(\'#' + dropdownId + '\').ValueSelectBox(\'setValue\', \'' + o[x].text + '\' ,\'' + o[x].value + '\', ' + dropdownId + ');">' + o[x].text + '</li>';
                }
            }

  

            //Close dropdown box +
            newBox += '</ul></div>';
            //Close container
            newBox += '</div>'

            this.replaceWith(newBox + this[0].outerHTML);

            if ($('#' + dropdownId).is(':disabled'))
            {
                $('#' + dropdownId + '-dropdownbox').prop('disabled', true);
                $('#' + dropdownId + '-valueBox').prop('disabled', true);
                $('#' + dropdownId + '-textBox').prop('disabled', true);
                $('#' + dropdownId + '-dropdownbox').prop('readonly', true);
                $('#' + dropdownId + '-valueBox').prop('readonly', true);
                $('#' + dropdownId + '-textBox').prop('readonly', true);
            }

            $('#' + dropdownId + '-dropdownbox').css('width', $('#' + dropdownId + '-container').css('width'));

            $('#'+dropdownId).hide();

            var x = $('#' + dropdownId);
            $('#' + dropdownId).on('change', function () {
                //If the dropdown is changed by an external script the value box and text box must be updated.
                // .change() needs to be called on the dropdown externally to trigger this function.
                if (!dropdownchange) {
                    $('#' + dropdownId + '-valueBox').val($('#' +dropdownId).val());
                    $(dropdownId).ValueSelectBox('predictFromValue', $('#' + dropdownId + '-valueBox'), dropdownId, 13);
                    $('#' + dropdownId + '-dropdownbox').hide();
                }
            });

            $('body').on('click', function (e) {
                if (e.target.id != containerId
                    && e.target.id != dropdownboxId
                    && e.target.id != valueboxId
                    && e.target.id != textboxId
                    && e.target.id != glyphId)
                {
                    if ($('#' + dropdownId + '-dropdownbox').is(':visible')) {
                        $('#' + dropdownId + '-dropdownbox').hide();
                        $('#' + dropdownId + '-container .dropdownboxcontainer div').toggleClass("glyphicon glyphicon-chevron-down").toggleClass("glyphicon glyphicon-chevron-up");
                    }
                }
            });

            $('#' + dropdownId + '-textbox').bind("keyup", function (e) {
                if (e.keyCode != 9) {
                    $(dropdownId).ValueSelectBox('predictFromText', $('#' + dropdownId + '-textbox'), dropdownId, e);
                }
                if (e.keyCode == 13) {
                    e.stopPropagation();
                }
            });

            $('#' + dropdownId + '-container .dropdownboxcontainer div').bind("click", function () {
                var isdis = $('#' + dropdownId + '-textbox').is(":disabled");
                if (!isdis) {
                    $(this).toggleClass("glyphicon glyphicon-chevron-down").toggleClass("glyphicon glyphicon-chevron-up");
                    var t = $('#' + dropdownId + '-container').scrollTop().top;
                    var l = $('#' + dropdownId + '-container').scrollLeft().left;
                    $('#' + dropdownId + '-dropdownbox').css('top', t);
                    $('#' + dropdownId + '-dropdownbox').css('left', l);
                    $(dropdownId).ValueSelectBox('show', '#' + dropdownId + '-dropdownbox');
                }
            });

            $('#' + dropdownId + '-valueBox').bind("keyup", function (e) {
                if (e.keyCode != 9) {
                    $(dropdownId).ValueSelectBox('predictFromValue', $('#' + dropdownId + '-valueBox'), dropdownId, e.keyCode);
                }
                if (e.keyCode == 13) {
                    e.stopPropagation();
                }
            });

            $('#' + dropdownId + '-container .newdropdownitem').bind("click", function () {
                $(dropdownId).ValueSelectBox('populate', this, dropdownId);
                
            });

            $('#' + dropdownId + '-container').bind("keyup", function (e) {
                $(dropdownId).ValueSelectBox('changeSelect', dropdownId, e);
            });

            $('#' + dropdownId + '-valueBox').blur(function (e) {
                $('#' + dropdownId + '-dropdownbox').hide();
                $('#' + dropdownId).val($('#' + dropdownId + '-valueBox').val());

            });
            $('#' + dropdownId + '-textbox').blur(function (e) {
                $('#' + dropdownId + '-dropdownbox').hide();
            });
        },
        setValue:function(text,v, ddid){
            $('#' + ddid.id + 'textbox').val(text);
            $('#' + ddid.id + '-valueBox').val(v);
            $('#' + ddid.id).val(v).change();
            var q = ddid.id + ' option[value="' + v + '"]';
            $('#' + q).prop('selected', true);
            $('#' + q).attr('selected', 'selected');

            $('#' + ddid.id + '-dropdownbox').toggle();
        },
        predictFromText: function (element, elementId, e) {
            //The regular expression to match the value to the value entered
            //in the textbox
            $('#' + elementId + '-dropdownbox').show();
            $('#' + elementId + '-valueBox').val("");
            var reg = new RegExp(element[0].value, "i");

            var o = $('#' + elementId + '-dropdownbox' + ' ul li:not(.ignore)');

            for (var index = 0; index < o.length; index++) {
                var x = o[index].innerText.trim();
                if (reg.test(x)) {
                    if (e.keyCode == 13) {
                        var selectedRow = $('#' + elementId + '-dropdownbox' + " ul .selectedItem");
                        if (selectedRow.length > 0) {
                            $('#' + elementId + '-dropdownbox').hide();
                            $('#' + elementId + '-textbox').val(selectedRow[0].innerHTML);
                            $('#' + elementId + '-valueBox').val(selectedRow.attr("data-value"));
                            dropdownchange = true;
                            $('#' + elementId).val(selectedRow.attr("data-value"));
                            dropdownchange = false;
                            
                        } else {
                            $('#' + elementId + '-dropdownbox').toggle();
                            $('#' + elementId + '-textbox').val(o[index].innerHTML);
                            $('#' + elementId + '-valueBox').val(o[index].getAttribute("data-value"));
                            dropdownchange = true;
                            $('#' + elementId).val(o[index].getAttribute("data-value"));
                            dropdownchange = false; 
                        }
                        break;
                    }
                    o[index].hidden = false;
                } else {
                    o[index].hidden = true;
                }
            }
        },
        predictFromValue: function PredictFromValue(element, elementId, keycode) {
            var o = $('#' + elementId + '-dropdownbox' + " ul li");
            $('#' + elementId + '-textbox').val("");
            if (keycode == 13) {
                for (var index = 0; index < o.length; index++) {
                    if (element[0].value == o[index].getAttribute("data-value")) {
                        $('#' + elementId + '-dropdownbox').toggle();
                        $('#' + elementId + '-textbox').val(o[index].innerHTML);
                        dropdownchange = true;
                        $('#' + elementId).val(element[0].value);
                        dropdownchange = false;
                        break;
                    }
                }
            }
            else {//The regular expression to match the value to the value entered
                //in the textbox
                $('#' + elementId + '-dropdownbox').show();
                var reg = new RegExp('^' + element[0].value, "i");

                for (var index = 0; index < o.length; index++) {
                    if (reg.test(o[index].getAttribute("data-value"))) {
                        o[index].hidden = false;
                    } else {
                        o[index].hidden = true;
                    }
                }
            }
        },
        populate: function (element, dropId) {
            $('#' + dropId + '-textbox').val(element.innerHTML);
            $('#' + dropId + '-valueBox').val(element.getAttribute("data-value"));
            $('#' + dropId).val(element.getAttribute("data-value"));
            $('#' + dropId + '-dropdownbox').css('top', $('#' + dropId + '-textbox').scrollTop().top);
            $('#' + dropId + '-dropdownbox').css('left', $('#' + dropId + '-textbox').scrollLeft().left);
            $('#' + dropId + '-dropdownbox').toggle();
            $('#' + dropId + '-container .dropdownboxcontainer div').toggleClass("glyphicon glyphicon-chevron-down").toggleClass("glyphicon glyphicon-chevron-up");
        },
        show: function (dropId) {
            $(dropId).toggle();
            $('' + dropId + '-container .dropdownboxcontainer').toggleClass("opendropdownbox");
            var o = $(dropId + " ul li");
            o.each(function () {
                this.hidden = false;
            });
        },
        changeSelect: function (elementId, e) {

            $('#' + elementId + '-dropdownbox').show();

            var o = $('#' + elementId + '-dropdownbox' + " ul li");

            if (e.keyCode == 40) {
                var selectedRow = $('#' + elementId + '-dropdownbox' + " ul .selectedItem");

                if (selectedRow.length == 0) {
                    o[0].className += " selectedItem";
                    $('#' + elementId + '-container .dropdownboxcontainer div').toggleClass("glyphicon glyphicon-chevron-down").toggleClass("glyphicon glyphicon-chevron-up");
                }
                else {
                    var next = selectedRow.nextAll('li:visible')[0];
                    next.className += " selectedItem";
                    selectedRow[0].className = selectedRow[0].className.replace('selectedItem', '');
                    $('#' + elementId + '-dropdownbox').scrollTop( $('#' + next.id).position().top);
                }
            }

            if (e.keyCode == 38) {
                var selectedRow = $('#' + elementId + '-dropdownbox' + " ul .selectedItem");

                if (selectedRow.length != 0) {
                    var next = selectedRow.prevAll('li:visible')[0];
                    if (next.length != 0) {
                        next.className += " selectedItem";
                        selectedRow[0].className = selectedRow[0].className.replace('selectedItem', '');
                        $('#' + elementId + '-dropdownbox').scrollTop( $('#' + next.id).position().top);
                    }
                }
            }
        }
    };

    $.fn.ValueSelectBox = function (method) {
        if (methods[method]) {
            //Gets the function from the map.
            //Apply executes the function (this) with the associated parameters
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !methods) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist');
        }
    };
})(jQuery);






