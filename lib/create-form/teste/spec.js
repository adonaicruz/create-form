describe('Create Form', function() {

  var form;
  beforeEach(function() {
  	options = { 
		  'token':'62bb61431348e22850828a5829c4373faafe29c1'
		, 'secret':'51a266c2844ccd5cac83d88de88d82d05358aa51'
		, 'fields':{ 
			  'estado':['PR','SC','SP','RS']
			, 'nivel':['Iniciante','Intermediário', 'Avançado', 'Ninja'] 
		} 
	};
    form = $('<div></div>').createForm().find('form');
    form_opt = $('<div></div>').createForm(options).find('form');
  });

  it('Criar Formulário', function() {
    expect( form.length ).toEqual(1);
  });

  it('Criar Campos Obrigatórios', function() {
    expect( $('input#name',form).length ).toEqual(1);
    expect( $('input#email',form).length ).toEqual(1);
    expect( $('select#estado',form).length ).toEqual(0);
    expect( $('select#nivel',form).length ).toEqual(0);
  });

  it('Criar Campos Extras', function() {
    expect( $('select#estado',form_opt).length ).toEqual(1);
    expect( $('select#nivel',form_opt).length ).toEqual(1);
  });

});