function initOptions() {
  	$('#username').val( getItem('shrtn_username') );
	$('#key').val( getItem('shrtn_key') );
	
	$('#errors_box').hide();

	$('#login').bind('click', save);
	$('#test').removeClass('green').addClass('red');
	
	$('#test').bind('click', testCredentials);
	$('#login').removeClass('green').addClass('red');
}

function save() {
	$('#errors_box').hide();

	if ( $('#username').val() !== '' && $('#key').val() !== '' ) {
		setItem('shrtn_username', $('#username').val() );
		setItem('shrtn_key', $('#key').val());
		
		$('p#message').removeClass().addClass('success');
		$('p#message').html('Credentials saved!');
		$('#errors_box').show();
	} else {
		$('p#message').removeClass().addClass('error');
		$('p#message').html('Insert you username & key, please!');
		$('#errors_box').show();
	}
}

function testCredentials() {
	$('#errors_box').hide();

	_url  = "http://shr.tn/api/v1/short?long=" + encodeURIComponent("http://shr.tn");
	_url += "&format=txt&username=" + $('#username').val();
	_url += "&api_key=" + $('#key').val();
	
	$.getJSON( _url, function(data){
		$('#errors_box').show();
		   if ( !data.resp.status ) {
            	$('p#message').removeClass().addClass('error');
		   		$('p#message').html('Failure! please check your username or key.');
		   		$('input#test').removeClass('green').addClass('red');
		   } else {
				$('p#message').removeClass().addClass('success');
            	$('p#message').html('Horra ! all is ok !');
            	$('input#test').removeClass('red').addClass('green');
            }
	 	}, "json");

}

// launch
initOptions();