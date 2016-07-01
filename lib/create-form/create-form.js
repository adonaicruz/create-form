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
 
    $.fn.createForm = function(options) {
    	
    	var settings = $.extend({
            action: "api.php",
            method: "POST"
        }, options );

		//create form element
        var form = $("<form/>", {
				action: '#',
				method: settings.method,
				class:'create-form'
			});

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
	    	if(validateForm(form)){
	    		var values = {token:settings.token, secret:settings.secret, lead: serializeForm(form)};
				$.post(
					settings.action
					,values
					,function(data,status){
						form[0].reset();
						alert('Formulário enviado com sucesso.');
			   		}
			   		,'json'
				).fail(function() {
					alert('Não foi possível enviar o formulário.');
				});
	    	}else{
	    		alert('Verifique se os campos obrigatórios foram preenchidos corretamente.');
	    	}
	    	
			return false;
		});

	    return this;
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
		if (!form.checkValidity){
			return true;
		}
		if (form.checkValidity() && validateEmail(eEmail.val()) === true) {
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
