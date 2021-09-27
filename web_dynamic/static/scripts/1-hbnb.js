let list_T = [];
let tex = []
$(document).ready(function(){
        $('input[type="checkbox"]').click(function(){
	if (list_T.length == 0) {
		$( "AM" ).css({padding:"15px"})
	}
	if (list_T.length > 3) {
		for( var i = 0; i < 3; i++){
			tex[i] = list_T[i]
		}
		tex[i] = "..."
	}
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