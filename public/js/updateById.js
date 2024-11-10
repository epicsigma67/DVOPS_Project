async function updateItem(id, data) {
    try {
        const response = await fetch(`/api/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error updating item:', error);
        return null;
    }
}

function updateProduct() {
    const id = document.getElementById("editProductId").value;
    const name = document.getElementById("editProductName").value;
    const price = document.getElementById("editProductPrice").value;
    const description = document.getElementById("editProductDescription").value;

    const updatedData = { name, price, description };

    // Call the function to update the product on the server
    updateItem(id, updatedData).then(response => {
        if (response && response.message) {
            // Success: Close modal and refresh the product list
            alert(response.message);
            closeEditProductForm();
            fetchProducts();  // Refresh the product list to show the updated product
        } else {
            alert("Error updating product");
        }
    }).catch(error => {
        console.error("Error during update:", error);
    });
}

// Ensure this function is triggered on the form submission
document.getElementById("editProductForm").addEventListener("submit", function(event) {
    event.preventDefault();  // Prevent the default form submission
    updateProduct();  // Call the update function
});