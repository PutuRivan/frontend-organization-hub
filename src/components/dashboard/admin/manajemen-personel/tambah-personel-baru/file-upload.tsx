'use client'

import { useRef, useState } from 'react'
import { Cloud, AlertCircle } from 'lucide-react'
import { cn } from '@/libs/utils/index'

interface FileUploadProps {
  onFileUpload: (file: File) => void
}

export function FileUpload({ onFileUpload }: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragActive, setIsDragActive] = useState(false)
  const [error, setError] = useState<string>('')

  const allowedFormats = ['SVG', 'PNG', 'JPG', 'GIF']
  const maxSize = 800 * 400 // pixels (max 800x400px)

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') setIsDragActive(true)
    else if (e.type === 'dragleave') setIsDragActive(false)
  }

  const validateFile = (file: File): boolean => {
    const fileExt = file.name.split('.').pop()?.toUpperCase()
    if (!fileExt || !allowedFormats.includes(fileExt)) {
      setError(`Format tidak didukung. Gunakan: ${allowedFormats.join(', ')}`)
      return false
    }
    if (file.size === 0) {
      setError('File tidak boleh kosong')
      return false
    }
    setError('')
    return true
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)
    const files = e.dataTransfer.files
    if (files && files[0] && validateFile(files[0])) onFileUpload(files[0])
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0] && validateFile(files[0])) onFileUpload(files[0])
  }

  const handleClick = () => fileInputRef.current?.click()

  return (
    <div
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={handleClick}
      className={cn(
        'mt-2 border-2 border-dashed rounded-lg p-6 sm:p-8 text-center cursor-pointer transition-colors w-full max-w-full',
        isDragActive ? 'border-blue-500 bg-blue-50 dark:bg-blue-950' : 'border-border hover:border-muted-foreground'
      )}
    >
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleChange}
        accept=".svg,.png,.jpg,.jpeg,.gif"
        className="hidden"
        aria-label="Upload file"
      />
      <div className="flex flex-col items-center gap-2">
        <Cloud className="w-12 h-12 text-muted-foreground" />
        <p className="text-foreground font-medium">Klik untuk mengunggah atau seret dan lepas</p>
        <p className="text-xs text-muted-foreground">SVG, PNG, JPG or GIF. MAX. 800x400px</p>
      </div>
      {error && (
        <div className="mt-4 flex items-center gap-2 text-destructive text-sm">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}
    </div>
  )
}
