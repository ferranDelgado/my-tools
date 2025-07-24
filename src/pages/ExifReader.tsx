import React, { useRef, useState } from "react";
import ExifReader from "exifreader";

function stripExifFromDataUrl(dataUrl: string, mimeType = "image/jpeg"): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = function () {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject("Canvas not supported");
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL(mimeType, 0.95));
    };
    img.onerror = reject;
    img.src = dataUrl;
  });
}

function arrayBufferToDataUrl(buffer: ArrayBuffer, mimeType = "image/jpeg"): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return `data:${mimeType};base64,${window.btoa(binary)}`;
}

const ExifReaderPage: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [exifData, setExifData] = useState<Record<string, any> | null>(null);
  const [error, setError] = useState<string>("");
  const [strippedUrl, setStrippedUrl] = useState<string | null>(null);
  const [strippedMPF, setStrippedMPF] = useState<{[idx: number]: string}>({});
  const [creating, setCreating] = useState<boolean>(false);
  const [creatingMPF, setCreatingMPF] = useState<{[idx: number]: boolean}>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleFile = async (file: File) => {
    setError("");
    setExifData(null);
    setStrippedUrl(null);
    setStrippedMPF({});
    setCreating(false);
    setCreatingMPF({});
    setFile(file);
    try {
      // Read image for preview
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Read EXIF data
      const arrayBuffer = await file.arrayBuffer();
      const tags = ExifReader.load(arrayBuffer);
      setExifData(tags && Object.keys(tags).length > 0 ? tags : null);
    } catch (err: any) {
      setError("Failed to read EXIF data: " + (err.message || err));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDownloadStripped = async () => {
    if (!image) return;
    setCreating(true);
    try {
      const url = await stripExifFromDataUrl(image);
      setStrippedUrl(url);
      setCreating(false);
      const a = document.createElement("a");
      a.href = url;
      a.download = "image-no-exif.jpg";
      a.click();
    } catch (err) {
      setError("Failed to strip EXIF: " + err);
      setCreating(false);
    }
  };

  const handleDownloadMPFStripped = async (idx: number, base64: string) => {
    setCreatingMPF((prev) => ({ ...prev, [idx]: true }));
    try {
      const dataUrl = `data:image/jpeg;base64,${base64}`;
      const url = await stripExifFromDataUrl(dataUrl);
      setStrippedMPF((prev) => ({ ...prev, [idx]: url }));
      setCreatingMPF((prev) => ({ ...prev, [idx]: false }));
      const a = document.createElement("a");
      a.href = url;
      a.download = `embedded-image-${idx + 1}-no-exif.jpg`;
      a.click();
    } catch (err) {
      setError("Failed to strip EXIF from embedded image: " + err);
      setCreatingMPF((prev) => ({ ...prev, [idx]: false }));
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">EXIF Reader</h1>
        <p className="text-muted-foreground text-base md:text-lg">Drop or select an image to view its EXIF metadata.</p>
      </div>
      <div
        className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer bg-muted hover:bg-muted/70 transition mb-6"
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />
        <div className="text-lg">Click or drag an image here</div>
      </div>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {image && (
        <div className="mb-6 flex flex-col items-center">
          <div
            className="relative group cursor-pointer"
            onClick={!strippedUrl ? handleDownloadStripped : undefined}
            style={{ outline: "none" }}
            tabIndex={0}
          >
            <img src={image} alt="Selected" className="max-h-64 rounded shadow mb-2 group-hover:opacity-80 transition" />
            <div className="absolute left-0 right-0 bottom-2 text-center w-full pointer-events-none">
              {strippedUrl ? (
                <a href={strippedUrl} download="image-no-exif.jpg" className="text-blue-600 underline text-sm">Download</a>
              ) : creating ? (
                <span className="bg-white/80 dark:bg-zinc-900/80 px-3 py-1 rounded text-sm font-semibold">Creating...</span>
              ) : (
                <span className="bg-white/80 dark:bg-zinc-900/80 px-3 py-1 rounded text-sm font-semibold">Download without EXIF</span>
              )}
            </div>
          </div>
        </div>
      )}
      {exifData && exifData.Images && Array.isArray(exifData.Images) && (
        <div className="mb-6">
          <h2 className="font-bold text-lg mb-2">Embedded Images (MPF)</h2>
          <div className="flex flex-wrap gap-4">
            {exifData.Images.map((img: any, idx: number) => (
              <div key={idx} className="flex flex-col items-center border p-2 rounded">
                <div
                  className="relative group cursor-pointer"
                  onClick={!strippedMPF[idx] ? () => handleDownloadMPFStripped(idx, img.base64) : undefined}
                  style={{ outline: "none" }}
                  tabIndex={0}
                >
                  <img
                    src={`data:image/jpeg;base64,${img.base64}`}
                    alt={`Embedded ${idx + 1}`}
                    className="max-h-32 mb-2 rounded group-hover:opacity-80 transition"
                  />
                  <div className="absolute left-0 right-0 bottom-2 text-center w-full pointer-events-none">
                    {strippedMPF[idx] ? (
                      <a href={strippedMPF[idx]} download={`embedded-image-${idx + 1}-no-exif.jpg`} className="text-blue-600 underline text-xs mt-1">Download</a>
                    ) : creatingMPF[idx] ? (
                      <span className="bg-white/80 dark:bg-zinc-900/80 px-2 py-0.5 rounded text-xs font-semibold">Creating...</span>
                    ) : (
                      <span className="bg-white/80 dark:bg-zinc-900/80 px-2 py-0.5 rounded text-xs font-semibold">Download without EXIF</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {exifData ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-border rounded-lg">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">Tag</th>
                <th className="px-4 py-2 border-b">Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(exifData).map(([key, value]) => (
                key !== "Images" && (
                  <tr key={key}>
                    <td className="px-4 py-2 border-b font-mono">{key}</td>
                    <td className="px-4 py-2 border-b font-mono">{typeof value === 'object' && value !== null && 'description' in value ? String(value.description) : String(value)}</td>
                  </tr>
                )
              ))}
            </tbody>
          </table>
        </div>
      ) : image ? (
        <div className="text-muted-foreground text-center">No EXIF data found or not yet loaded.</div>
      ) : null}
    </div>
  );
};

export default ExifReaderPage; 