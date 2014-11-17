(function ($) {
var dropdownId;
var methods = {
	init: function (){
        dropdownId = this.attr("id");
		
		//Start container
		var newBox = '<div class="fullcontainer">'
		
		//Start inputcontainer
		newBox += '<div class="dropdownboxcontainer">'
		
		newBox += '<input type="textbox" id="textbox" class="dropdowntextbox" onkeyup="PredictFromText(this, ' + '#dropdownbox' + ');" style=""/>';
		newBox += '<div class="glyphicon glyphicon-chevron-down" onclick="displayDropdown('+'#dropdownbox'+');"></div>';
		newBox += '<input type="textbox" id="valueBox" class="dropdownvaluebox" onkeyup="PredictFromValue(this,'+'#dropdownbox'+');">';
		//Close inputcontainer
		newBox += '</div>'
		
		//Add dropdown box
		newBox+= '<div id="dropdownbox" class="dropdownlistbox"><ul>';
		
		var o = this[0].options;
		for (var x = 0; x < o.length; x++)
        {
			newBox += '<li data-value="'+ o[x].value + '" class="newdropdownitem" onclick="$('+'#textbox'+').val('+o[x].text+');$('+'#valueBox'+').val('+o[x].value+')">'+o[x].text+'</li>';
		}
		//Close dropdown box
		newBox+= '</ul></div>';
		//Close container
		newBox += '</div>'
      
        this.replaceWith(newBox + this[0].outerHTML);
		
		//$('#'+dropdownId).hide();
		
		
		$('#textbox').bind("keyup", function(){
			$(dropdownId).ValueSelectBox('predictFromText', $('#textbox'),'#dropdownbox');
		});
		
		$('.dropdownboxcontainer div').bind("click", function(){
			$(this).toggleClass("glyphicon glyphicon-chevron-down").toggleClass("glyphicon glyphicon-chevron-up");
			$(dropdownId).ValueSelectBox('show','#dropdownbox');
		});
		
		$('#valueBox').bind("keyup", function(){
			$(dropdownId).ValueSelectBox('predictFromValue', $('#valueBox'),'#dropdownbox');
		});
		
		$('.newdropdownitem').bind("click",function(){
			$(dropdownId).ValueSelectBox('populate', this);
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
	populate: function displayDropdown(element){
		$('#textbox').val(element.innerHTML);
		$('#valueBox').val(element.getAttribute("data-value"));
		
		$('#'+ dropdownId).val(element.getAttribute("data-value"));
	},
	show: function displayDropdown(dropdownId){
		$(dropdownId).toggle();
		$('.dropdownboxcontainer').toggleClass("opendropdownbox");
		var o =  $(dropdownId + " ul li");
		o.each(function() { 
            this.hidden = false;
		});
	}	
	};
    
$.fn.ValueSelectBox = function(method) {
        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! methods ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist' );
        }    
    };
})(jQuery);


	

	

	