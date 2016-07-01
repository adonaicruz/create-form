# create-form
Jquery plugin to create a lead form

## How it works
The create-form plugin build a form using a hash of options insite a HTML div, validate and send by ajax/post.

## Installation
Include script after the jQuery library (unless you are packaging scripts somehow else)
```html
<script src="path/to/create-form.js"></script>
```
You can find the source files in the directory:
```
/lib/create-form
```

### Style (optional)
Include the css file into your HEAD tag

`If you use the Bootstrap framework this file is not required.`
```html
<link href="path/to/create-form.css" rel="stylesheet">
```
### Requires
* jQuery
* bootstrap (optional)
 
## Usage
Create a DIV where you want to put the form
```html
<div id="lead_form"></div>
```
Create the form:
```javascript
options = { 
	  'token':'YOUR_API_TOKEN' //required
	, 'secret':'YOUR_SECRET_KEY' //required
	//optional params
	, 'fields':{ 
		  'estado':['PR','SC','SP','RS']
		, 'nivel':['Iniciante','Intermediário', 'Avançado', 'Ninja'] 
	} 
};
$('#lead_form').createForm(options); 
```
## Testing
You can find the jasmine automated tests in the directory: 
```
/lib/create-form/teste
```
## License
This plugin is available under the [MIT license](http://mths.be/mit).
## Authors
[Adonai Cruz](https://github.com/adonaicruz)