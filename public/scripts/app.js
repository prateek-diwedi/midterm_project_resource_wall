$(() => {

  $("body").on('click', '.fa-thumbs-up', (event) => {
    console.log('event target ID:', event.target.id);
    const resourceId = event.target.id.slice(event.target.id.indexOf('_') + 1); // Get the ID of the resource from the ID of the thumbs up icon
    $.ajax({
      method: "POST",
      url: `/api/resources/${resourceId}/likes`,
      // data: 'id'
    }).done((users) => {
      console.log('success:', users);
    });
    // gets button
    const $target = $(event.target);
    console.log('target --------------->>>>>>>>> ', $target);

    // // gets current like count
    // const currentLikes = Number($target.html());

    // // updates current like count
    // $target.html(currentLikes);


  });

//////////// ----------------------- rating stars ----------------------------------


  $("body").on('click', '.star', (event) => {
    console.log('star clicked --->>', event.target.id);
    handleStarClick(event.target.id);
 });

  function handleStarClick( starRating ) {

    if (starRating === "1") {
      $(".oneStar").css("color", "gold");
    }

    if (starRating === "2") {
      $(".oneStar").css("color", "gold");
      $(".twoStar").css("color", "gold");
    }

    if (starRating === "3") {
      $(".oneStar").css("color", "gold");
      $(".twoStar").css("color", "gold");
      $(".threeStar").css("color", "gold");
    }

    if (starRating === "4") {
      $(".oneStar").css("color", "gold");
      $(".twoStar").css("color", "gold");
      $(".threeStar").css("color", "gold");
      $(".fourStar").css("color", "gold");
    }

    if (starRating === "5") {
      $(".oneStar").css("color", "gold");
      $(".twoStar").css("color", "gold");
      $(".threeStar").css("color", "gold");
      $(".fourStar").css("color", "gold");
      $(".fiveStar").css("color", "gold");
    }
  }


  //handleStarClick( 4 );
});
