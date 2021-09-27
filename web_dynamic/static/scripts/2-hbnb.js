let list_T = [];
let tex = []
function get() {
	$.get("http://0.0.0.0:5001/api/v1/status/", function(data) {
		if (data.status === "OK") {
			$("#api_status").addClass("available")
		}
		else {
			$("#api_status").removeClass("available")
		}
	});
}
$(document).ready(function(){
	get()
	if (list_T.length == 0) {
		$( "AM" ).css({padding:"15px"})
	}
	if (list_T.length > 3) {
		for( var i = 0; i < 3; i++){
			tex[i] = list_T[i]
		}
		tex[i] = "..."
	}
        $('input[type="checkbox"]').click(function(){
	if($(this).prop("checked") == true){
		list_T.push($(this).attr("data-name"))
		if (list_T > 3) {
			$( "AM" ).text( tex )
		}
		$( "#AM" ).text( list_T )
        }
        else {
		for( var i = 0; i < list_T.length; i++){
			if ( list_T[i] === $(this).attr("data-name")) {
				list_T.splice(i, 1);
			}
		}
		$( "#AM" ).text( list_T )
        }
        });
});