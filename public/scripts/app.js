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
});
