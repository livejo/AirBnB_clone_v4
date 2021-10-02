let list_T = [];
let tex = [];
let id_A = [];
let clon = id_A.slice();
function search_and_display() {
	$.get("http://127.0.0.1:5001/api/v1/status/", function(data) {
		if (data.status === "OK") {
			$("#api_status").addClass("available")
		}
		else {
			$("#api_status").removeClass("available")
		}
	});
}

function display_all_or_filter(id_A) {
	$.ajax({
		url:"http://127.0.0.1:5001/api/v1/places_search",
		type:"POST",
		data: JSON.stringify({"amenities":id_A}),
		contentType:"application/json",
		dataType:"json",
		success: function(data){
			$.each(data, function(i, place) {
				Guest = "Guests"
				Bedroom = "Bedrooms"
				Bathroom = "Bathrooms"
				if (place.max_guest === 1) {
					Guest = "Guest"
				}
				if (place.number_rooms === 1) {
					Bedroom = "Bedroom"
				}
				if (place.number_bathrooms === 1) {
					Bathroom = "Bathroom"
				}
				$(".places").append(`<article><div class="title_box"><h2>${place.name}</h2><div class="price_by_night">${place.price_by_night}$</div></div><div class="information"><div class="max_guest">${place.max_guest}${Guest}</div><div class="number_rooms">${place.number_rooms}${Bedroom}</div><div class="number_bathrooms">${place.number_bathrooms}${Bathroom}</div></div><div class="description">${place.description}</div></article>`)
			})
		}
	})
}
function select() {
	$('input[type="checkbox"]').click(function(){
		if($(this).prop("checked") == true){
			list_T.push($(this).attr("data-name"))
			id_A.push($(this).attr("data-id"))
			if (list_T > 3) {
				$( "AM" ).text( tex )
			}
			else {
			$( "#AM" ).text( list_T )
			}
		}
		else {
			for( var i = 0; i < list_T.length; i++){
				if ( list_T[i] === $(this).attr("data-name")) {
					list_T.splice(i, 1);
					id_A.splice(i, 1)
				}
			}
			if (list_T > 3) {
				$( "AM" ).text( tex )
			}
			else {
			$( "#AM" ).text( list_T )
			}
		}
		shorten()
		});
}
function shorten() {
	if (list_T.length === 0) {
		$("div.amenities h4").html("&nbsp;");
	}
	if (list_T.length > 3) {
		for( var i = 0; i < 3; i++){
			tex[i] = list_T[i]
		}
		tex[i] = list_T[i][0] + "..."
		$( "#AM" ).text( tex )
	}
}
$(document).ready(function(){
	$(".places").html("")
	display_all_or_filter([])
	search_and_display()
	select()
});