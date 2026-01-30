
import React, { useRef, useState } from 'react';
import { Upload, FileText, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Dataset, DataRow } from '../types';

interface FileUploadProps {
  onUpload: (dataset: Dataset) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = async (file: File) => {
    setIsProcessing(true);
    setError(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        let data: DataRow[] = [];
        let columns: string[] = [];

        if (file.name.endsWith('.json')) {
          const parsed = JSON.parse(content);
          data = Array.isArray(parsed) ? parsed : [parsed];
          if (data.length > 0) {
            columns = Object.keys(data[0]);
          }
        } else if (file.name.endsWith('.csv')) {
          const lines = content.split('\n');
          if (lines.length > 0) {
            columns = lines[0].split(',').map(c => c.trim());
            data = lines.slice(1).filter(line => line.trim() !== '').map(line => {
              const values = line.split(',');
              const row: DataRow = {};
              columns.forEach((col, idx) => {
                let val: any = values[idx]?.trim();
                // Basic type detection
                if (!isNaN(Number(val)) && val !== '') val = Number(val);
                row[col] = val;
              });
              return row;
            });
          }
        } else {
          throw new Error('Format file tidak didukung. Gunakan .csv atau .json');
        }

        if (data.length === 0) throw new Error('File kosong atau tidak valid.');

        onUpload({
          name: file.name,
          columns,
          data
        });
      } catch (err: any) {
        setError(err.message || 'Gagal memproses file.');
      } finally {
        setIsProcessing(false);
      }
    };

    reader.onerror = () => {
      setError('Gagal membaca file.');
      setIsProcessing(false);
    };

    reader.readAsText(file);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div 
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-3xl p-10 transition-all duration-300
          flex flex-col items-center justify-center text-center cursor-pointer
          ${isDragging 
            ? 'border-blue-500 bg-blue-50 scale-[1.02]' 
            : 'border-slate-200 bg-white hover:border-blue-400 hover:bg-slate-50'}
        `}
        onClick={() => fileInputRef.current?.click()}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={onFileChange} 
          className="hidden" 
          accept=".csv,.json"
        />
        
        <div className={`
          p-5 rounded-2xl mb-6 shadow-xl transition-colors
          ${isProcessing ? 'bg-blue-600 text-white animate-pulse' : 'bg-blue-100 text-blue-600'}
        `}>
          <Upload size={32} />
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold text-slate-800">
            {isProcessing ? 'Memproses Data...' : 'Seret file ke sini atau klik'}
          </h3>
          <p className="text-sm text-slate-500">Mendukung file .CSV dan .JSON (Maks 10MB)</p>
        </div>

        <div className="mt-8 flex items-center space-x-4">
          <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-100 rounded-full text-[11px] font-bold text-slate-600 uppercase tracking-tight">
            <FileText size={12} />
            <span>CSV</span>
          </div>
          <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-100 rounded-full text-[11px] font-bold text-slate-600 uppercase tracking-tight">
            <FileText size={12} />
            <span>JSON</span>
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center text-red-600 text-sm animate-in fade-in slide-in-from-top-2">
          <AlertCircle size={18} className="mr-3 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <div className="mt-8 bg-slate-100/50 p-6 rounded-2xl border border-slate-100">
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Cara Kerja</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start space-x-3">
            <div className="bg-white p-1.5 rounded-lg border border-slate-200 shadow-sm text-blue-600">
              <CheckCircle2 size={16} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-700 mb-1">Upload</p>
              <p className="text-[10px] text-slate-500 leading-relaxed">Impor data mentah Anda dalam sekejap.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="bg-white p-1.5 rounded-lg border border-slate-200 shadow-sm text-blue-600">
              <CheckCircle2 size={16} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-700 mb-1">Analyze</p>
              <p className="text-[10px] text-slate-500 leading-relaxed">AI kami mempelajari pola data Anda.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="bg-white p-1.5 rounded-lg border border-slate-200 shadow-sm text-blue-600">
              <CheckCircle2 size={16} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-700 mb-1">Insight</p>
              <p className="text-[10px] text-slate-500 leading-relaxed">Dapatkan visualisasi & laporan cerdas.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
