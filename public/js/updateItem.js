/* global $ */
// eslint-disable-next-line no-unused-vars
function updateItem(id) {

  const name = $('#name').val()
  const price = $('#price').val()
  const quantity = $('#quantity').val()
  const expiry_date = $('#expiry_date').val()
  const for_sale = $('#for_sale').is(":checked")
  console.log(for_sale)
  const category = $('#category').val()

  $.ajax({
    dataType: 'text',
    url: `/api/v1/item/edit/${id}`,
    type: 'PUT',
    data: {name, price, quantity, expiry_date, for_sale, category},
    // eslint-disable-next-line no-unused-vars
    success: function(result) {
      console.log("whatever");
      location.href = "/"
    },
});
}