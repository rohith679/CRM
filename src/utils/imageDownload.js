export const downloadImage = async (
  imageUrl,
  filename = "downloaded-image.jpg"
) => {
  try {
    const response = await fetch(imageUrl, { mode: "cors" });
    if (!response.ok) throw new Error("Failed to fetch image");

    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up the object URL
    URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("Image download failed:", error);
  }
};
