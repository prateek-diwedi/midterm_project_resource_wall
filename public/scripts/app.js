$(() => {


  $("body").on('click', '.fa-thumbs-up', (event) => {
    $.ajax({
      method: "POST",
      url: "/api/like"
    }).done((users) => {

    });
    // gets button
    const $target = $(event.target);

    // gets current like count
    const currentLikes = Number($target.html());

    // updates current like count
    $target.html(currentLikes + 1);


  });
});
