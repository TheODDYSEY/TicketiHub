'use client'

import { useCallback, Dispatch, SetStateAction } from 'react'
import { useDropzone } from '@uploadthing/react/hooks'
import { generateClientDropzoneAccept } from 'uploadthing/client'

import { Button } from '@/components/ui/button'
import { convertFileToUrl } from '@/lib/utils'

interface FileWithPath extends File {
  path: string;
}

type FileUploaderProps = {
  onFieldChange: (url: string) => void
  imageUrl: string
  setFiles: Dispatch<SetStateAction<File[]>>
}

export function FileUploader({ imageUrl, onFieldChange, setFiles }: FileUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const filesWithPath = acceptedFiles as FileWithPath[];
    setFiles(filesWithPath)
    onFieldChange(convertFileToUrl(filesWithPath[0]))
  }, [onFieldChange, setFiles])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: generateClientDropzoneAccept(['image/*']),
  })

  return (
    <div
      {...getRootProps()}
      className={`flex-center bg-dark-3 flex h-72 cursor-pointer flex-col overflow-hidden rounded-2xl bg-grey-50 border-2 border-dashed transition-all ${
        isDragActive 
          ? 'border-primary-500 bg-primary-50 scale-105' 
          : 'border-gray-300 hover:border-primary-400 hover:bg-gray-100'
      }`}
    >
      <input {...getInputProps()} className="cursor-pointer" />

      {imageUrl ? (
        <div className="flex h-full w-full flex-1 justify-center relative group">
          <img
            src={imageUrl}
            alt="image"
            width={250}
            height={250}
            className="w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="text-center text-white space-y-2">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="font-semibold">Click or drag to replace</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-center flex-col py-5 text-grey-500">
          <div className="mb-4">
            <img src="/assets/icons/upload.svg" width={77} height={77} alt="file upload" />
          </div>
          <h3 className="mb-2 mt-2 text-lg font-bold text-gray-900">Drag photo here</h3>
          <p className="p-medium-12 mb-4 text-gray-600">SVG, PNG, JPG</p>
          <Button type="button" className="rounded-full bg-primary-600 hover:bg-primary-700 shadow-md transition-all">
            Select from computer
          </Button>
        </div>
      )}
    </div>
  );
}