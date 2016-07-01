/*!
 * jQuery Create Form
 * 
 * 
 * NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.
 * 
 * https://github.com/adonaicruz?tab=repositories
 * 
 */
 (function ( $ ) {
 	   var form;
 	   var settings;
	   var methods = {
	    init : function( options ) {
			settings = $.extend({
	            action: "api.php",
	            method: "POST"
	        }, options );

			//create form element
	        form = $("<form/>", {
					action: '#',
					method: settings.method,
					class:'create-form'
				});
	        form.append(
	        	$("<div/>",{class:'alert alert-success',role:'alert'}).css('display','none')
	    		,$("<div/>",{class:'alert alert-warning',role:'alert'}).css('display','none')
	        );
	        //create default elements
	        var eNome = $("<input/>", {type: 'text',id: 'name',name: 'name',placeholder: 'Seu Nome',required:'required'});
	        var eEmail = $("<input/>", {type: 'email',id: 'email',name: 'email',placeholder: 'Seu melhor e-mail',required:'required'});
	        form.append(formatElement(eNome,'*Nome:'),formatElement(eEmail,'*E-mail:'));

			//create dinamic elements
	        if(settings.fields){
		        if(settings.fields.estado && settings.fields.estado.length > 0){
		        	var eEstado = getDropDownList('estado', 'estado', settings.fields.estado);
		        	form.append(formatElement(eEstado,'Estado:'));
		        }
		        if(settings.fields.nivel && settings.fields.nivel.length > 0){
		        	var eNivel = getDropDownList('nivel', 'nivel', settings.fields.nivel) 
		        	form.append(formatElement(eNivel,'Nível:'));
		        }
	        }

	        //append submit button
			form.append(
	    		$("<button></button", {
					type: 'submit',
					id: 'submit',
					class:'btn btn-default'
				}).html('Enviar')
			);

			//append form to document
	    	this.append(
	    		$("<h3/>").text("Formulário")
	    		,$("<p/>").text("Este é só formulário simples e bonito!")
	    		,form
	    	);

	    	//set validate class
		    $(form).find('input:required').on('keyup',function(){
		    	if(this.checkValidity()){
		    		$(this).parent().addClass('has-success').removeClass('has-warning');
		    	}else{
		    		$(this).parent().addClass('has-warning').removeClass('has-success');
		    	}
		    });

		    //submit form
		    $(document).on('submit',form,function(){
		    	methods.submit();
		    	
				return false;
			});

		    return this;
	    },
	    submit : function(success,error) {
      		if(validateForm(form)){
	    		var values = {token:settings.token, secret:settings.secret, lead: serializeForm(form)};
				return $.post(
					settings.action
					,values
					,function(data,status){
						form[0].reset();
						$('.alert',form).hide();
						$('.alert-success',form).html('Formulário enviado com sucesso.').show();
						if(typeof success === "function"){
							success();
						}
			   		}
			   		,'json'
				).fail(function() {
					$('.alert',form).hide();
					$('.alert-warning',form).html('Não foi possível enviar o formulário.').show();
					if(typeof error === "function"){
						error();
					}
				});

	    	}else{
	    		if(typeof error === "function"){
					error();
				}

				$('.alert',form).hide();
				$('.alert-warning',form).html('Verifique se os campos obrigatórios foram preenchidos corretamente.').show();
	    	}
	    	
	    },
	  };

    $.fn.createForm = function(method) {
	    if ( methods[method] ) {
	      return methods[method].apply( this, Array.prototype.slice.call(arguments, 1 ));
	    } else if ( typeof method === 'object' || ! method ) {
	      return methods.init.apply( this, arguments );
	    } else {
	      $.error( 'Method ' +  method + ' does not exist on Plugin' );
	    }
    	
	};
	//convert jquery serialize to object format
	function serializeForm(form){
		var formObject = {};
		$.each(form.serializeArray(),
		function(i, v) {
		    formObject[v.name] = v.value;
		});
		return formObject;
	}

	function validateForm(form){

		if ($('#name',form).val().length > 0 && validateEmail($('#email',form).val()) === true) {
			return true;
		}else{
			return false;
		}
	}

	function validateEmail(email){
		var eReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
		return eReg.test(email); 
	}
	
	//function to mount select
	function getDropDownList(name, id, optionList) {
	    var combo = $("<select></select>").attr("id", id).attr("name", name);
		combo.append($("<option>Selecione</option>").val(''));
	    $.each(optionList, function (i, el) {
	        combo.append($("<option>" + el + "</option>").val(el));
	    });

	    return combo;
	}

	//format to bootstrap style
	function formatElement(el,label){
		var div = $('<div></div>',{class:'form-group'});
		var label = $('<label></label>',{for:el.attr('id'),class:'control-label'}).html(label);
		el.addClass('form-control');
		div.append(label,el);
		return div;
	}
 
}( jQuery ));
