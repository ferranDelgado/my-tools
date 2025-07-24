import React, { useRef, useState } from "react";
import ExifReader from "exifreader";

const ExifReaderPage: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [exifData, setExifData] = useState<Record<string, any> | null>(null);
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setError("");
    setExifData(null);
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
      console.log(tags)
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
          <img src={image} alt="Selected" className="max-h-64 rounded shadow mb-4" />
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
                <tr key={key}>
                  <td className="px-4 py-2 border-b font-mono">{key}</td>
                  <td className="px-4 py-2 border-b font-mono">{typeof value === 'object' && value !== null && 'description' in value ? String(value.description) : String(value)}</td>
                </tr>
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