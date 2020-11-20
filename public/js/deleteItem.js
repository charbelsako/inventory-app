/* global $ */
// eslint-disable-next-line no-unused-vars
function deleteItem(id) {
  $.ajax({
    dataType: 'text',
    url: `/api/v1/item/delete/${id}`,
    type: 'DELETE',
    // eslint-disable-next-line no-unused-vars
    success: function(result) {
      console.log("whatever");
      location.href = "/"
    },
});
}