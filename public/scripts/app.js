$(() => {

  //////////// -------------------------------- LIKES -------------------------------------
  $("body").on('click', '.like-wrapper', function(event) {
    const $this = $(this);
    const { resourceId, likes } = $this.data(); // Get the ID of the resource from the ID of the thumbs up icon

    $.ajax({
      method: "POST",
      url: `/api/resources/${resourceId}/likes`,
      // data: 'id'
    }).done((users) => {
      console.log('success:', users);
    });

    $this.find('.likes').html(Number(likes) + 1)
    $this.data('likes', Number(likes) + 1)
  });


  //////////// ----------------------- rating stars ----------------------------------


  $("body").on('click', '.star', function(event) {
    const $this = $(this)


    console.log('star clicked --->>', event.target.id);
    handleStarClick(event.target.id);

    const resourceId = event.target.id.slice(event.target.id.indexOf('_') + 1); // Get the ID of the resource from the ID of the stars icon
    $.ajax({
      method: "POST",
      url: `/api/resources/${resourceId}/ratings`,
      // data: 'id'
    }).done((users) => {
      console.log('success:', users);
    });
    // gets button
    const $target = $(event.target);
    console.log('target --------------->>>>>>>>> ', $target);

  });

  function handleStarClick(starRating) {

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
