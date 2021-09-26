jQuery(($) => {
  const amenitiesChecked = [];
  const url = 'http://0.0.0.0:5001/api/v1/';

  $.getJSON(`${url}status/`, data => {
    const apiStatus = $('#api_status');
    if (data.status === 'OK') {
      apiStatus.addClass('available');
    } else {
      apiStatus.removeClass('available');
    }
  });
  $.post({
    url: url + 'places_search/',
    contentType: 'application/json',
    data: JSON.stringify({}),
    dataType: 'json',
    success: data => {
      for (let place of data) {
	$('places').append(`<article>
	  <div class="title">

          <h2>${ place.name }</h2>
          <div class="price_by_night">

        ${ place.price_by_night }

          </div>
        </div>
        <div class="information">
          <div class="max_guest">
        <i class="fa fa-users fa-3x" aria-hidden="true"></i>

        <br />

        ${ place.max_guest } Guests

          </div>
          <div class="number_rooms">
        <i class="fa fa-bed fa-3x" aria-hidden="true"></i>

        <br />

        ${ place.number_rooms } Bedrooms
          </div>
          <div class="number_bathrooms">
        <i class="fa fa-bath fa-3x" aria-hidden="true"></i>

        <br />

        ${ place.number_bathrooms } Bathroom

          </div>
        </div>

        <!-- **********************
         USER
         **********************  -->

        <div class="user">

        </div>
        <div class="description">

          {{ place.description }}

        </div>

      </article>`);

      }
    }
  });

  $('input').change(() => {
    if ($(this).is(':checked')) {
      let amenityId = $(this).attr('data-name');
      amenitiesChecked.push(amenityId);
     } else {
      let amenityId = $(this).attr('data-name');
      amenitiesChecked.splice($.inArray(amenityId, amenitiesChecked, 1));
    }
    $('.amenities h4').text(amenitiesChecked);
  });

  $('#search-button').click(function() {
     $.post({
       url: url + 'places_search/',
       contentType: 'application/json',
       data: `{amenities: ${amenitiesChecked}}`,
       dataType: 'json',
       success: data => {
	 for (let place of data) {
	   console.log(place)
	   $('places').append(`<article>
			        <div class="title">
          <h2>${ place.name }</h2>
          <div class="price_by_night">
        ${ place.price_by_night }
          </div>
        </div>
        <div class="information">
          <div class="max_guest">
        <i class="fa fa-users fa-3x" aria-hidden="true"></i>
        <br />
        ${ place.max_guest } Guests
          </div>
          <div class="number_rooms">
        <i class="fa fa-bed fa-3x" aria-hidden="true"></i>
        <br />
        ${ place.number_rooms } Bedrooms
          </div>
          <div class="number_bathrooms">
        <i class="fa fa-bath fa-3x" aria-hidden="true"></i>
        <br />
        ${ place.number_bathrooms } Bathroom
          </div>
        </div>
        <!-- **********************
         USER
         **********************  -->
        <div class="user">
        </div>
        <div class="description">
          {{ place.description }}
        </div>
      </article>`);
	 }
       }
     });
  });
});
