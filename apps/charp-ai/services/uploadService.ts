import type { UploadedFile } from "../types/fileUploadWrapper.types";

export class UploadService {
  static async uploadFile(file: File): Promise<UploadedFile> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // const mockS3Url = `https://example-bucket.s3.amazonaws.com/uploads/${file.name}`;
        const mockS3Url =
          "https://whilter-platform-dev-media.s3.ap-south-1.amazonaws.com/Letter+for+ICC+members+-+Shabnam.pdf";
        resolve({ url: mockS3Url, name: file.name });
      }, 2000);
    });
  }
}
