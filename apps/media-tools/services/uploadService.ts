import type { UploadedFile } from "@/types";

export class UploadService {
    static async uploadFile(file: File): Promise<UploadedFile> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const mockS3Url = `https://example-bucket.s3.amazonaws.com/uploads/${file.name}`;
                resolve({ url: mockS3Url, name: file.name });
            }, 2000);
        });
    }
}