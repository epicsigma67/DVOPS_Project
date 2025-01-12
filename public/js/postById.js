async function postItem(data) {
    try {
        const response = await fetch('/api/post', {  // Updated URL to remove the ID parameter
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            return response.json();
        } else {
            console.error("Error response:", response);
            throw new Error("Unexpected response format or server error");
        }
    } catch (error) {
        console.error("Error posting item:", error);
    }
}


document.getElementById("addProductForm").addEventListener("submit", function(event) {
    event.preventDefault();  // Prevent default form submission

    // Collect the data from the form
    const name = document.getElementById("postName").value;
    const price = document.getElementById("postPrice").value;
    const description = document.getElementById("postDescription").value;

    // Now call postItem with the product details (no need to calculate ID here)
    postItem({ name, price, description }).then(response => {

        // Close the modal after adding the product
        closeAddProductForm();

        // Optionally refresh the product list
        fetchProducts();
    }).catch(error => {
        console.error("Error during post:", error);
    });
});
