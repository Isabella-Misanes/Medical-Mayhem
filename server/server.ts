import app from ".";

export const PORT = process.env.PORT || 4000;

// PUT THE SERVER IN LISTENING MODE
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))