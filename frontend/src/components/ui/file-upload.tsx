'use client';

import { useCallback, useRef, useState, type DragEvent, type ChangeEvent } from 'react';
import { cn } from '@/lib/utils';
import { Upload, X, FileImage } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
  maxFiles?: number;
  maxSizeMB?: number;
  accept?: string;
  className?: string;
}

export function FileUpload({
  onFilesSelected,
  maxFiles = 5,
  maxSizeMB = 10,
  accept = 'image/*',
  className,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [previews, setPreviews] = useState<{ file: File; url: string }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFiles = useCallback(
    (files: FileList | File[]) => {
      setError(null);
      const fileArray = Array.from(files);
      const maxBytes = maxSizeMB * 1024 * 1024;

      const valid: File[] = [];
      for (const file of fileArray) {
        if (previews.length + valid.length >= maxFiles) {
          setError(`Maximum ${maxFiles} files allowed`);
          break;
        }
        if (file.size > maxBytes) {
          setError(`${file.name} exceeds ${maxSizeMB}MB limit`);
          continue;
        }
        valid.push(file);
      }

      if (valid.length > 0) {
        const newPreviews = valid.map((file) => ({
          file,
          url: URL.createObjectURL(file),
        }));
        const updated = [...previews, ...newPreviews];
        setPreviews(updated);
        onFilesSelected(updated.map((p) => p.file));
      }
    },
    [maxFiles, maxSizeMB, previews, onFilesSelected]
  );

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      if (e.dataTransfer.files.length > 0) {
        processFiles(e.dataTransfer.files);
      }
    },
    [processFiles]
  );

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        processFiles(e.target.files);
      }
    },
    [processFiles]
  );

  const removeFile = useCallback(
    (index: number) => {
      const updated = previews.filter((_, i) => i !== index);
      URL.revokeObjectURL(previews[index].url);
      setPreviews(updated);
      onFilesSelected(updated.map((p) => p.file));
    },
    [previews, onFilesSelected]
  );

  return (
    <div className={cn('space-y-3', className)}>
      <div
        role="button"
        tabIndex={0}
        aria-label="Upload files by clicking or dragging"
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={cn(
          'flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-8 text-center transition-colors',
          isDragging
            ? 'border-primary bg-primary/5'
            : 'border-border hover:border-primary/50 hover:bg-muted/50'
        )}
      >
        <Upload className="h-8 w-8 text-muted-foreground" />
        <div>
          <p className="text-sm font-medium">
            Drop files here or <span className="text-primary">browse</span>
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Max {maxFiles} files, up to {maxSizeMB}MB each
          </p>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple
        className="sr-only"
        onChange={handleInputChange}
        aria-hidden="true"
        tabIndex={-1}
      />

      {error && <p className="text-sm text-destructive">{error}</p>}

      {previews.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {previews.map((preview, index) => (
            <div
              key={preview.url}
              className="group relative h-20 w-20 overflow-hidden rounded-lg border bg-muted"
            >
              {preview.file.type.startsWith('image/') ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={preview.url}
                  alt={preview.file.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <FileImage className="h-6 w-6 text-muted-foreground" />
                </div>
              )}
              <Button
                size="icon-xs"
                variant="destructive"
                className="absolute right-1 top-1 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(index);
                }}
                aria-label={`Remove ${preview.file.name}`}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
