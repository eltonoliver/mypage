// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
jQuery(document).foundation();
new Photostack( document.getElementById( 'photostack-1' ), {
	callback : function( item ) {
		//console.log(item)
	}
} );

jQuery(document).ready(function($){
	if (Modernizr.mq('only all and (max-width: 768px)')) { 
	}else{
		jQuery('#photostack-1, .left-block').innerHeight( jQuery('body').height() );
	}

	// ajax subscription for mailchimp
	jQuery('#subscribe-mailchimp').on('valid',function(e) {
		e.stopPropagation();
    	e.preventDefault();
	        var action = jQuery(this).attr('action');
			var email_address = jQuery(this).find('#email').val();
			jQuery(this).find('.button').val('Loading..').attr("disabled", "disabled");
			jQuery.ajax({
				url: action,
				type: 'POST',
				data: {
					email: email_address
				},
				success: function(data){
					if('Success' == data){
						jQuery('#subscribe-mailchimp .success').show();
						jQuery('#subscribe-mailchimp .button').val('Subscribe').removeAttr("disabled");
					}else{
						alert(data);
						jQuery('#subscribe-mailchimp .button').val('Subscribe').removeAttr("disabled");
					}
				},
				error: function(error) {
					alert(error);
					jQuery('#subscribe-mailchimp .button').val('Subscribe').removeAttr("disabled");
				}
			});
			
			return false;
	});

	jQuery('#subscribe-campaign').on('valid',function(e) {
		e.stopPropagation();
    	e.preventDefault();
    	jQuery(this).find('.button').val('Loading..').attr("disabled", "disabled");
    	jQuery.getJSON(
        this.action + "?callback=?",
        jQuery(this).serialize(),
        function (data) {
            if (data.Status === 400) {
                alert("Error: " + data.Message);
                jQuery('#subscribe-campaign .button').val('Subscribe').removeAttr("disabled");
            } else {
            	jQuery('#subscribe-campaign .success').html( data.Message + '<a href="#" class="close">&times;</a>' ).show();
            	jQuery('#subscribe-campaign .button').val('Subscribe').removeAttr("disabled");
                // alert("Success: " + data.Message);
            }
        });
    });
});