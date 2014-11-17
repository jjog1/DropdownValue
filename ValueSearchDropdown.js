(function ($) {
var methods = {
	init: function (){
        var dropdownId = this.attr("id");
		
		//Start container
		var newBox = '<div id="'+ dropdownId + '-container" class="fullcontainer">'
		
		//Start inputcontainer
		newBox += '<div class="dropdownboxcontainer">'
		
		newBox += '<input type="textbox" id="'+ dropdownId + '-textbox" class="dropdowntextbox"/>';
		newBox += '<div class="glyphicon glyphicon-chevron-down"></div>';
		newBox += '<input type="textbox" id="'+ dropdownId + '-valueBox" class="dropdownvaluebox">';
		//Close inputcontainer
		newBox += '</div>'
		
		//Add dropdown box
		newBox+= '<div id="'+ dropdownId + '-dropdownbox" class="dropdownlistbox"><ul>';
		
		var o = this[0].options;
		for (var x = 0; x < o.length; x++)
        {
			newBox += '<li data-value="'+ o[x].value + '" class="newdropdownitem" onclick="$(#'+ dropdownId + 'textbox'+').val('+o[x].text+');$(#'+ dropdownId + '-valueBox'+').val('+o[x].value+')">'+o[x].text+'</li>';
		}
		//Close dropdown box
		newBox+= '</ul></div>';
		//Close container
		newBox += '</div>'
      
        this.replaceWith(newBox + this[0].outerHTML);
		
		//$('#'+dropdownId).hide();
		
		
		$('#'+ dropdownId + '-textbox').bind("keyup", function(){
			$(dropdownId).ValueSelectBox('predictFromText', $('#'+ dropdownId + '-textbox'),'#'+ dropdownId + '-dropdownbox');
		});
		
		$('#'+ dropdownId + '-container .dropdownboxcontainer div').bind("click", function(){
			$(this).toggleClass("glyphicon glyphicon-chevron-down").toggleClass("glyphicon glyphicon-chevron-up");
			$(dropdownId).ValueSelectBox('show','#'+ dropdownId + '-dropdownbox');
		});
		
		$('#'+ dropdownId + '-valueBox').bind("keyup", function(){
			$(dropdownId).ValueSelectBox('predictFromValue', $('#'+ dropdownId + '-valueBox'),'#'+ dropdownId + '-dropdownbox');
		});
		
		$('#'+ dropdownId + '-container .newdropdownitem').bind("click",function(){
			$(dropdownId).ValueSelectBox('populate', this, dropdownId);
		});
    },
	predictFromText: function (element, elementbox) {
		//The regular expression to match the value to the value entered
		//in the textbox
		$(elementbox).show();
		var reg = new RegExp(element[0].value, "i");
		var o =  $(elementbox + " ul li");
		for (var index = 0; index < o.length; index++){ 
			var x = o[index].innerText.trim();
			if (reg.test(x)) {
				o[index].hidden = false;
			}else{
				o[index].hidden = true;
			}
		}
	},
	predictFromValue:function PredictFromValue(element, elementbox) {
    //The regular expression to match the value to the value entered
    //in the textbox
	$(elementbox).show();
    var reg = new RegExp('^' + element[0].value, "i");
    var o =  $(elementbox + " ul li");
	for (var index = 0; index < o.length; index++){  
        if (reg.test(o[index].getAttribute("data-value"))) {
            o[index].hidden = false;
        }else{
            o[index].hidden = true;
        }
    }
	},
	populate: function (element, dropId){
		$('#'+ dropId + '-textbox').val(element.innerHTML);
		$('#'+ dropId + '-valueBox').val(element.getAttribute("data-value"));
		
		$('#'+ dropId).val(element.getAttribute("data-value"));
	},
	show: function displayDropdown(dropId){
		$(dropId).toggle();
		$(''+ dropId + '-container .dropdownboxcontainer').toggleClass("opendropdownbox");
		var o =  $(dropId + " ul li");
		o.each(function() { 
            this.hidden = false;
		});
	}	
	};
    
$.fn.ValueSelectBox = function(method) {
        if ( methods[method] ) {
			//Gets the function from the map.
			//Apply executes the function (this) with the associated parameters
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! methods ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist' );
        }    
    };
})(jQuery);


	

	

	