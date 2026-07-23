const CLOUD_NAME = "dgcjvvlwf";
const UPLOAD_PRESET = "Projects";
const CHUNK_SIZE = 20 * 1024 * 1024; // 20MB
const CHUNK_THRESHOLD = 20 * 1024 * 1024; // chunk only above this size
const MAX_RETRIES = 3;

type CloudinaryResourceType = "video" | "image" | "raw";

export interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  resource_type: string;
  format: string;
  duration?: number;
  bytes: number;
  [key: string]: unknown;
}

interface UploadOptions {
  folder?: string;
  onProgress?: (progress: number) => void;
  signal?: AbortSignal;
}

function getResourceType(file: File): CloudinaryResourceType {
  if (file.type.startsWith("video/")) return "video";
  if (file.type.startsWith("image/")) return "image";
  return "raw"; // pdf, docs, etc. — Cloudinary's "raw" endpoint
}

export async function uploadCloudinaryFiles(
  file: File,
  options: UploadOptions = {},
): Promise<CloudinaryUploadResult> {
  const resourceType = getResourceType(file);
  const { folder, onProgress, signal } = options;

  // Chunked upload only matters for large videos; images/PDFs go straight through.
  if (resourceType === "video" && file.size > CHUNK_THRESHOLD) {
    return uploadInChunks(file, resourceType, folder, onProgress, signal);
  }

  return uploadSingle(file, resourceType, folder, onProgress, signal);
}

function attachAbort(xhr: XMLHttpRequest, signal?: AbortSignal) {
  if (!signal) return;
  if (signal.aborted) {
    xhr.abort();
    return;
  }
  signal.addEventListener("abort", () => xhr.abort());
}

function uploadSingle(
  file: File,
  resourceType: CloudinaryResourceType,
  folder: string | undefined,
  onProgress: ((p: number) => void) | undefined,
  signal: AbortSignal | undefined,
): Promise<CloudinaryUploadResult> {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    if (folder) formData.append("folder", folder);

    const xhr = new XMLHttpRequest();
    xhr.open(
      "POST",
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`,
    );

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject(new Error(`Upload failed: ${xhr.status} - ${xhr.responseText}`));
      }
    };
    xhr.onerror = () => reject(new Error("Network error during upload"));
    xhr.onabort = () => reject(new Error("Upload cancelled"));

    attachAbort(xhr, signal);
    xhr.send(formData);
  });
}

interface ChunkUploadArgs {
  chunk: Blob;
  start: number;
  end: number;
  totalSize: number;
  resourceType: CloudinaryResourceType;
  folder?: string;
  uniqueUploadId: string;
  signal?: AbortSignal;
  onChunkProgress: (loaded: number) => void;
}

function uploadChunk(args: ChunkUploadArgs): Promise<CloudinaryUploadResult> {
  const { chunk, start, end, totalSize, resourceType, folder, uniqueUploadId, signal, onChunkProgress } = args;
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("file", chunk);
    formData.append("upload_preset", UPLOAD_PRESET);
    if (folder) formData.append("folder", folder);

    const xhr = new XMLHttpRequest();
    xhr.open(
      "POST",
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`,
    );
    xhr.setRequestHeader("X-Unique-Upload-Id", uniqueUploadId);
    xhr.setRequestHeader("Content-Range", `bytes ${start}-${end - 1}/${totalSize}`);

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) onChunkProgress(e.loaded);
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject(new Error(`Chunk upload failed: ${xhr.status} - ${xhr.responseText}`));
      }
    };
    xhr.onerror = () => reject(new Error("Network error during chunk upload"));
    xhr.onabort = () => reject(new Error("Upload cancelled"));

    attachAbort(xhr, signal);
    xhr.send(formData);
  });
}

async function uploadChunkWithRetry(
  args: ChunkUploadArgs,
): Promise<CloudinaryUploadResult> {
  let lastError: Error | null = null;
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await uploadChunk(args);
    } catch (err) {
      lastError = err as Error;
      if (args.signal?.aborted) throw lastError;
      if (attempt < MAX_RETRIES) {
        await new Promise((r) => setTimeout(r, 1000 * attempt)); // backoff
      }
    }
  }
  throw lastError ?? new Error("Chunk upload failed");
}

async function uploadInChunks(
  file: File,
  resourceType: CloudinaryResourceType,
  folder: string | undefined,
  onProgress: ((p: number) => void) | undefined,
  signal: AbortSignal | undefined,
): Promise<CloudinaryUploadResult> {
  const uniqueUploadId = `uqid-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
  let uploadedBytes = 0;
  let finalResult: CloudinaryUploadResult | null = null;

  for (let i = 0; i < totalChunks; i++) {
    const start = i * CHUNK_SIZE;
    const end = Math.min(start + CHUNK_SIZE, file.size);
    const chunk = file.slice(start, end);

    finalResult = await uploadChunkWithRetry({
      chunk,
      start,
      end,
      totalSize: file.size,
      resourceType,
      folder,
      uniqueUploadId,
      signal,
      onChunkProgress: (loaded) => {
        if (onProgress) {
          const overall = uploadedBytes + loaded;
          onProgress(Math.round((overall / file.size) * 100));
        }
      },
    });

    uploadedBytes = end;
  }

  if (!finalResult) throw new Error("Upload failed: no result returned");
  return finalResult;
}