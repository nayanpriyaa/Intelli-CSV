import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { UploadCloud, CheckCircle } from "lucide-react";
import Papa from "papaparse";
import DataAnalyzer from "./DataAnalyzer";
import DataTable from "./DataTable";

function CsvUploader({ onUpload }) {
  const [csvData, setCsvData] = useState(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [uploadedPath, setUploadedPath] = useState("");

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (!file) return;

      if (!file.name.endsWith(".csv")) {
        setError("Upload valid CSV");
        return;
      }

      setLoading(true);
      setError("");
      setFileName(file.name);

      try {
        /* ---------- 1. SEND FILE TO BACKEND ---------- */
        const formData = new FormData();
        formData.append("file", file);

        const uploadRes = await fetch("http://localhost:4000/api/uploads", {
          method: "POST",
          body: formData,
        });

        const uploadData = await uploadRes.json();
        setUploadedPath(uploadData.filePath); // saved path

        /* ---------- 2. PARSE CSV LOCALLY ---------- */
        Papa.parse(file, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: (result) => {
            if (result.errors.length) {
              setError("CSV parse failed");
              setLoading(false);
              return;
            }

            setCsvData(result.data);

            // send parsed data to parent
            onUpload(result.data, file, uploadData.filePath);

            setLoading(false);
          },
          error: () => {
            setError("CSV parse failed");
            setLoading(false);
          },
        });
      } catch (err) {
        console.error(err);
        setError("Upload failed. Is backend running?");
        setLoading(false);
      }
    },
    [onUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "text/csv": [".csv"] },
    multiple: false,
  });

  return (
    <div className="space-y-8">
      {/* DROP AREA */}
      <motion.div
        {...getRootProps()}
        className={`border border-dashed rounded-2xl p-10 cursor-pointer transition ${
          isDragActive
            ? "border-cyan-400 bg-cyan-400/5"
            : "border-white/15 hover:border-cyan-400/60"
        }`}
      >
        <input {...getInputProps()} />

        <div className="flex flex-col items-center gap-4 text-center">
          <div className="w-14 h-14 rounded-full bg-cyan-500/10 flex items-center justify-center">
            <UploadCloud className="text-cyan-400" size={28} />
          </div>

          <div>
            <p className="text-white font-medium">
              {isDragActive ? "Drop CSV here" : "Upload CSV file"}
            </p>
            <p className="text-white/50 text-sm">
              Drag & drop or click
            </p>
          </div>
        </div>
      </motion.div>

      {/* ERROR */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* LOADING */}
      {loading && (
        <div className="flex items-center gap-3 text-white/60">
          <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
          Uploading & processing CSV...
        </div>
      )}

      {/* SUCCESS */}
      {csvData && !loading && (
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="flex items-center gap-3 text-green-400">
            <CheckCircle size={18} />
            <span className="text-sm">
              {fileName} uploaded & saved to server
            </span>
          </div>

          {uploadedPath && (
            <div className="text-xs text-white/40">
              Stored at: {uploadedPath}
            </div>
          )}

          <DataAnalyzer data={csvData} />
          <DataTable data={csvData} maxRows={8} />
        </motion.div>
      )}
    </div>
  );
}

export default CsvUploader;
