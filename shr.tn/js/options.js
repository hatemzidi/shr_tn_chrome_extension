function initOptions() {
  	$('#username').val( getItem('shrtn_username') );
	$('#key').val( getItem('shrtn_key') );
	
	$('input:checkbox').each(function() {
		//TODO : clean this ugly test :(
		$(this).prop('checked', (getItem('shrtn_'+this.id) === "false" || getItem('shrtn_'+this.id) === null ) ? false : true );
	});

	$('#test').removeClass('green').addClass('red');
	$('#test').bind('click', testCredentials);

	// add change events for checkboxes
	$('input:checkbox').change(function() {
	  setItem('shrtn_'+this.id, $(this).is(":checked"));
	  return false;  
	});
}

function saveCredentials() {
	if ( $('#username').val() !== '' && $('#key').val() !== '' ) {
		setItem('shrtn_username', $('#username').val() );
		setItem('shrtn_key', $('#key').val());
		return true;
	} else {
		$('p#message').removeClass().addClass('error');
		$('p#message').html('Insert you username & key, please!');
		return false;
	}
 
}

function testCredentials() {
	$('#messageBox').hide();
	$('p#message').removeClass()
	$('p#message').html('');

	if (saveCredentials()) {
		_url  = "http://shr.tn/api/v1/short?long=" + encodeURIComponent("http://www.test-link.com");
		_url += "&format=txt&username=" + $('#username').val();
		_url += "&api_key=" + $('#key').val();
		
		$.getJSON( _url, function(data){
			if ( data.resp.status === 0 ) {
				$('p#message').removeClass().addClass('error');
				$('p#message').html('Oops! Please check your username or key.');
				$('input#test').removeClass('green').addClass('red');
				console.error('oops! error with credentials.')
			} else {
				$('p#message').removeClass().addClass('success');
				$('p#message').html('Horra ! all is ok !');
				$('input#test').removeClass('red').addClass('green');
			}
			}, "json");
	}

	$('#messageBox').fadeIn(500);	

}

// launch
initOptions();