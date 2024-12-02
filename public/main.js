function deleteProduct(id) {
  const result = confirm("ARE YOU SURE YOU WANT TO DELETE THE PRODUCT?");
  if (result) {
    fetch("/delete-product/" + id, {
      method: "POST",
    }).then((res) => {
      if (res.ok) {
        location.reload();
      }
    });
  }
}
