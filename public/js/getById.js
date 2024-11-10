async function getItem(id) {
    try {
        const response = await fetch(`/api/get/${id}`);
        return response.json();
    } catch (error) {
        console.error("Error getting item:", error);
    }
}
