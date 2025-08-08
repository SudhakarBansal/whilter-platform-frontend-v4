const ALLOWED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes

export function validateImageFile(file: File): string | null {
    // Check file type
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        return "Please select a valid image file (JPEG, PNG, GIF, or WebP)";
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
        return "File size must be less than 5MB";
    }

    // Additional check for file extension (extra security)
    const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
    const fileExtension = file.name
        .toLowerCase()
        .substring(file.name.lastIndexOf("."));
    if (!allowedExtensions.includes(fileExtension)) {
        return "Invalid file extension. Please use JPG, PNG, GIF, or WebP files";
    }

    return null; // No errors
}