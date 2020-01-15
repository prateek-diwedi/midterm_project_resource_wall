$(() => {


  $("body").on('click', '.fa-thumbs-up', (event) => {
    $.ajax({
      method: "POST",
      url: "/api/like",
      data: 'id'
    }).done((users) => {

    });
    // gets button
    const $target = $(event.target);
    console.log('target --------------->>>>>>>>> ', $target);

    // gets current like count
    const currentLikes = Number($target.html());

    // updates current like count
    $target.html(currentLikes + 1);


  });
});
