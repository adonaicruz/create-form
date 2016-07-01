describe('Create Form', function() {

  var form;
  beforeEach(function() {
    form = $('<div></div>').createForm();
  });

  it('submit', function() {
    expect(hello.sayHi('Fabeni')).toEqual('my name is Fabeni and I\'m learning Jasmine!');
  });

});