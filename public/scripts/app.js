const starRatingClass = {
  oneStar: 1,
  twoStar: 2,
  threeStar: 3,
  fourStar: 4,
  fiveStar: 5
};

$(() => {

  //////////// -------------------------------- LIKES -------------------------------------
  $("body").on('click', '.like-wrapper', function (event) {
    const $this = $(this);
    const { resourceId, likes } = $this.data(); // Get the ID of the resource from the ID of the thumbs up icon

    $.ajax({
      method: "POST",
      url: `/api/resources/${resourceId}/likes`,
      // data: 'id'
    }).done((users) => {
      $this.find('.likes').html(Number(likes) + 1);
      //$this.data('likes', Number(likes) + 1);
      console.log('success:', users);
    });


  });


  //////////// ----------------------- rating stars ----------------------------------


  $("body").on('click', '.ratingWrapper', function (event) {
    const $this = $(this);
    const { resourceId, rating } = $this.data();
    console.log('rating  star----->>>>', $this.data());
    $.ajax({
      method: "POST",
      url: `/api/resources/${resourceId}/star/ratings`,
    }).done((users) => {
      //$this.star[rating];
      $this.data('rating', Number(rating));
      //handleStarClick();
      console.log('success:', users);
    });


  });

  //////////// ----------------------- creator page redirect ----------------------------------

  $("body").on('click', '.creator', function (event) {
    //event.preventDefault();
    const $this = $(this);
    const creatorId = $this.children("span").attr("data-id");
    console.log('creator id in ajax -->>', creatorId);
    //event.preventDefault();
    $.ajax({
      method: "GET",
      url: `/api/creator/${creatorId}/creator`,
    }).done((users) => {
      console.log('success:', users);
    }).catch(err=> {
      console.log('error in creator  page', err);
    });
  });


  ////// ------------------------- change button to following ----------------
  console.log("hslkdhjfsdflkjds");
  $('#followButton').click(function () {
    var $this = $(this);
    console.log('here ', this)
    $this.toggleClass('followButton');
    console.log('here ', this)

    if ($this.hasClass('followButton')) {
      $this.text('Follow');
    } else {
      $this.text('Following');
    }
  });

  ////// ------------------------- change rating color ----------------
  console.log("hslkdhjfsdflkjds");
  $('.rating').click(function () {
    var $this = $(this);
    console.log('here ', this)
    $this.toggleClass('followButton');
    console.log('here ', this)

    if ($this.hasClass('followButton')) {
      $this.text('Follow');
    } else {
      $this.text('Following');
    }
  });





  $(document).ready(function () {
    // Check Radio-box
    $(".ratingss input:radio").attr("checked", false);

    $('.ratingss input').click(function () {
      $(".ratingss span").removeClass('checked');
      $(this).parent().addClass('checked');
    });

    $('input:radio').change(
      function () {
        var userRating = this.value;
        alert(userRating);
      });
  });






  const handleStarClick = function (starRating) {

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
  };


  //handleStarClick( 4 );
});
