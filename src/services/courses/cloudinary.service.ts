

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;
const CHUNK_SIZE = 20 * 1024 * 1024; // 20MB

type UploadOptions = {
    folder?: string;
};

export async function uploadCloudinaryFiles(
    file: File,
    options: UploadOptions = {}
) {
    const { folder = "" } = options;

    const resourceType = file.type.startsWith("video")
        ? "video"
        : file.type.startsWith("image")
            ? "image"
            : "raw";

    // Small files don't need chunk upload
    if (file.size <= CHUNK_SIZE) {
        const formData = new FormData();

        formData.append("file", file);
        formData.append("upload_preset", UPLOAD_PRESET);

        if (folder) {
            formData.append("folder", folder);
        }

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.open(
                "POST",
                `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`
            );

            // xhr.upload.onprogress = (e) => {
            //     if (e.lengthComputable && onProgress) {
            //         onProgress(Math.round((e.loaded / e.total) * 100));
            //     }
            // };

            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    reject(new Error(xhr.responseText));
                }
            };

            xhr.onerror = () => reject(new Error("Upload failed"));

            xhr.send(formData);
        });
    }

    // Large files (videos)
    const uniqueUploadId = `upload-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2)}`;

    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
    let uploadedBytes = 0;
    let finalResult: any = null;

    for (let i = 0; i < totalChunks; i++) {
        const start = i * CHUNK_SIZE;
        const end = Math.min(start + CHUNK_SIZE, file.size);

        const chunk = file.slice(start, end);

        const formData = new FormData();
        formData.append("file", chunk);
        formData.append("upload_preset", UPLOAD_PRESET);

        if (folder) {
            formData.append("folder", folder);
        }

        finalResult = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.open(
                "POST",
                `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`
            );

            xhr.setRequestHeader("X-Unique-Upload-Id", uniqueUploadId);
            xhr.setRequestHeader(
                "Content-Range",
                `bytes ${start}-${end - 1}/${file.size}`
            );

            // xhr.upload.onprogress = (e) => {
            //     if (e.lengthComputable && onProgress) {
            //         const loaded = uploadedBytes + e.loaded;
            //         onProgress(Math.round((loaded / file.size) * 100));
            //     }
            // };

            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    reject(new Error(xhr.responseText));
                }
            };

            xhr.onerror = () => reject(new Error("Chunk upload failed"));

            xhr.send(formData);
        });

        uploadedBytes = end;
    }
    return finalResult;
}
