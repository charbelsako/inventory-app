/* global $ */
// eslint-disable-next-line no-unused-vars
function addToCart(id) {
  $.ajax({
    dataType: 'json',
    url: `/api/v1/cart/add/${id}`,
    type: 'POST',
    // eslint-disable-next-line no-unused-vars
    success: function(result) {
      alert('added to cart')
    },

});
}