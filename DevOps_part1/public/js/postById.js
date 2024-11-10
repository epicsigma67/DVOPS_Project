async function postItem(id, data) {
    try {
        const response = await fetch(`/api/post/${id}`, {
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

function handlePostItem() {
    // Fetch the existing products to get the last used ID
    fetch('/api/products')
        .then(response => response.json())
        .then(products => {
            // Get the last product's ID and increment it
            const lastProductId = products.length > 0 ? parseInt(products[products.length - 1]._id) : 0;
            const newId = (lastProductId + 1).toString();  // Increment the last ID by 1

            // Collect the product details from the form
            const name = document.getElementById("postName").value;
            const price = document.getElementById("postPrice").value;
            const description = document.getElementById("postDescription").value;

            // Now call postItem with the new ID and product details
            postItem(newId, { name, price, description }).then(response => {
                if (response && response.message) {
                    // Optionally display the response message on the page
                    document.getElementById("postResponse").textContent = response.message;
                } else {
                    document.getElementById("postResponse").textContent = "Error adding product.";
                }

                // Close the Add Product modal
                closeAddProductForm();

                // Optionally, refresh the product list after adding a new product
                fetchProducts();
            }).catch(error => {
                console.error("Error during post:", error);
            });
        })
        .catch(error => {
            console.error("Error fetching products:", error);
        });
}

document.getElementById("addProductForm").addEventListener("submit", function(event) {
    event.preventDefault();  // Prevent default form submission

    // Collect the data from the form
    const name = document.getElementById("postName").value;
    const price = document.getElementById("postPrice").value;
    const description = document.getElementById("postDescription").value;

    // Fetch the existing products to get the last used ID
    fetch('/api/products')
        .then(response => response.json())
        .then(products => {
            // Get the last product's ID and increment it
            const lastProductId = products.length > 0 ? parseInt(products[products.length - 1]._id) : 0;
            const newId = (lastProductId + 1).toString();  // Increment the last ID by 1

            // Call postItem with the new ID and product details
            postItem(newId, { name, price, description }).then(response => {
                if (response && response.message) {
                    document.getElementById("postResponse").textContent = response.message;
                } else {
                    document.getElementById("postResponse").textContent = "Error adding product.";
                }

                // Close the modal after adding the product
                closeAddProductForm();

                // Optionally refresh the product list
                fetchProducts();
            }).catch(error => {
                console.error("Error during post:", error);
            });
        })
        .catch(error => {
            console.error("Error fetching products:", error);
        });
});