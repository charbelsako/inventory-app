/* global $ */
// eslint-disable-next-line no-unused-vars
function addItem() {
  const name = $('#name').val()
  const price = $('#price').val()
  const quantity = $('#quantity').val()
  const expiry_date = $('#expiry_date').val()
  const for_sale = $('#for_sale').is(":checked")
  const category = $('#category').val()

  $.ajax({
    dataType: 'json',
    url: `/api/v1/item/add/`,
    type: 'POST',
    data: {name, price, quantity, expiry_date, for_sale, category},
    // eslint-disable-next-line no-unused-vars
    success: function(result) {
      console.log(result)
      if (result.error){
        // set the error
        $('#error').css('display', 'block')
        $('#error').text("couldn't add item. You probably have a missing field")
        return alert("couldn't add item. You probably have a missing field")
      }
      location.href = "/"
    },
});
}