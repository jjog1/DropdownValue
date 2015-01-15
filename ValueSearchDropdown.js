(function ($) {
    var methods = {
        init: function () {
            var dropdownId = this.attr("id");
            var sText = $('#'+dropdownId+' :selected').text();
            var sValue = this.val();
            //Start container
            var newBox = '<div id="' + dropdownId + '-container" class="fullcontainer">'

            //Start inputcontainer
            newBox += '<div class="dropdownboxcontainer">'

            newBox += '<input type="textbox" id="' + dropdownId + '-textbox" class="dropdowntextbox" value="'+sText+'"/>';
            newBox += '<div class="glyphicon glyphicon-chevron-down"></div>';
            newBox += '<input type="textbox" id="' + dropdownId + '-valueBox" class="dropdownvaluebox" value="'+sValue+'">';
            //Close inputcontainer
            newBox += '</div>'

            //Add dropdown box
            newBox += '<div id="' + dropdownId + '-dropdownbox" class="dropdownlistbox"><ul>';

            var o = this[0].options;
            for (var x = 0; x < o.length; x++) {
                newBox += '<li id="' +  dropdownId + '-value-'+ x +'" data-value="' + o[x].value + '" class="newdropdownitem" onclick="$(#' + dropdownId + 'textbox' + ').val(' + o[x].text + ');$(#' + dropdownId + '-valueBox' + ').val(' + o[x].value + ')">' + o[x].text + '</li>';
            }
            //Close dropdown box
            newBox += '</ul></div>';
            //Close container
            newBox += '</div>'

            this.replaceWith(newBox + this[0].outerHTML);

            $('#'+dropdownId).hide();


            $('#' + dropdownId + '-textbox').bind("keyup", function (e) {
                if (e.keyCode != 9) {
                    $(dropdownId).ValueSelectBox('predictFromText', $('#' + dropdownId + '-textbox'), dropdownId, e);
                }
                if (e.keyCode == 13) {
                    e.stopPropagation();
                }
            });

            $('#' + dropdownId + '-container .dropdownboxcontainer div').bind("click", function () {
                $(this).toggleClass("glyphicon glyphicon-chevron-down").toggleClass("glyphicon glyphicon-chevron-up");
                $(dropdownId).ValueSelectBox('show', '#' + dropdownId + '-dropdownbox');
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
            });
            $('#' + dropdownId + '-textbox').blur(function (e) {
                $('#' + dropdownId + '-dropdownbox').hide();
            });
        },
        predictFromText: function (element, elementId, e) {
            //The regular expression to match the value to the value entered
            //in the textbox
            $('#' + elementId + '-dropdownbox').show();
            $('#' + elementId + '-valueBox').val("");
            var reg = new RegExp(element[0].value, "i");

            var o = $('#' + elementId + '-dropdownbox' + " ul li");

            for (var index = 0; index < o.length; index++) {
                var x = o[index].innerText.trim();
                if (reg.test(x)) {
                    if (e.keyCode == 13) {
                        var selectedRow = $('#' + elementId + '-dropdownbox' + " ul .selectedItem");
                        if (selectedRow.length > 0) {
                            $('#' + elementId + '-dropdownbox').toggle();
                            $('#' + elementId + '-textbox').val(selectedRow[0].innerHTML);
                            $('#' + elementId + '-valueBox').val(selectedRow.attr("data-value"));
                            $('#' + elementId).val(selectedRow.attr("data-value"));
                        } else {
                            $('#' + elementId + '-dropdownbox').toggle();
                            $('#' + elementId + '-textbox').val(o[index].innerHTML);
                            $('#' + elementId + '-valueBox').val(o[index].getAttribute("data-value"));
                            $('#' + elementId).val(o[index].getAttribute("data-value"));
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
                        $('#' + elementId).val(element[0].value);
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






