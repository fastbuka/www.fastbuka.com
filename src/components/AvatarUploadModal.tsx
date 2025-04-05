'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ArrowRight, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useStorage } from '@/hooks/storage';
import { Alert, AlertDescription } from '@/components/ui/alert';
interface AvatarUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  avatar: any;
  setAvatar?: any;
}

const preUploadedAvatars = [
  '/images/avatars/avatar-1.png',
  '/images/avatars/avatar-2.png',
  '/images/avatars/avatar-3.png',
  '/images/avatars/avatar-4.png',
  '/images/avatars/avatar-5.png',
  '/images/avatars/avatar-6.png',
  '/images/avatars/avatar-7.png',
  '/images/avatars/avatar-8.png',
  '/images/avatars/avatar-9.png',
  '/images/avatars/avatar-10.png',
  '/images/avatars/avatar-11.png',
  '/images/avatars/avatar-12.png',
];

export function AvatarUploadModal({
  isOpen,
  onClose,
  avatar,
  setAvatar,
}: AvatarUploadModalProps) {
  const { all, store } = useStorage();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [bucket, setBucket] = useState<[]>([]);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchBucket = useCallback(async () => {
    const response = await all();
    if (response.success) {
      setBucket(response.data.storage.data);
    }
  }, [all]);

  useEffect(() => {
    fetchBucket();
  }, [fetchBucket]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const [file, setFile] = useState<File | null>(null);

  const handleFile = (file: File) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {

      return (
        <Alert variant="destructive">
          <AlertDescription>
            Invalid file type. Allowed: JPEG, PNG, JPG, GIF.
          </AlertDescription>
        </Alert>
      );
    }

    setFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleFileUpload = async () => {
    if (!file) {
      return (
        <Alert variant="destructive">
          <AlertDescription>
            No file selected
          </AlertDescription>
        </Alert>
      );
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await store({ file });

      if (response.success) {
        setFile(null);
        return (
          <Alert variant="success">
            <AlertDescription>
              Upload successful
            </AlertDescription>
          </Alert>
        );
      } else {
        return (
          <Alert variant="destructive">
            <AlertDescription>
              {response.message}
            </AlertDescription>
          </Alert>
        );
      }
    } catch (error) {
      // console.error('Upload failed', error);
      return (
        <Alert variant="destructive">
          <AlertDescription>
            Upload failed
          </AlertDescription>
        </Alert>
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Change avatar</DialogTitle>
          <DialogDescription>
            Choose a new avatar or upload your own
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue='storage' className='w-full'>
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value='storage'>Storage</TabsTrigger>
            <TabsTrigger value='upload'>Upload</TabsTrigger>
          </TabsList>
          <TabsContent value='storage'>
            <ScrollArea className='h-[300px] w-full rounded-md border p-4'>
              <div className='flex flex-wrap gap-4'>
                {preUploadedAvatars.map((img, index) => (
                  <div
                    key={index}
                    className={`relative aspect-square w-16 overflow-hidden rounded-full cursor-pointer ${
                      avatar == img && 'border-green-600 border-2'
                    }`}
                    onClick={() => setAvatar(img)}
                  >
                    <Image
                      src={img || '/svg/placeholder.svg'}
                      alt={`Avatar ${index + 1}`}
                      className='object-cover'
                      fill
                    />
                  </div>
                ))}
                {bucket.map((item: any) => (
                  <div
                    key={item.path}
                    className={`relative aspect-square w-16 overflow-hidden rounded-full cursor-pointer ${
                      avatar == item && 'border-green-600 border-2'
                    }`}
                    onClick={() => setAvatar(item.base_url + '/' + item.path)}
                  >
                    <Image
                      src={
                        item.base_url + '/' + item.path ||
                        '/svg/placeholder.svg'
                      }
                      alt={`Avatar`}
                      className='object-cover'
                      fill
                    />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value='upload'>
            <div
              className={`relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors
                ${
                  dragActive
                    ? 'border-primary bg-primary/10'
                    : 'border-muted-foreground/25'
                }
                ${preview ? 'pt-4' : 'min-h-[200px]'}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {preview ? (
                <div className='relative aspect-square w-40 overflow-hidden rounded-full'>
                  {loading ? (
                    <>
                      <span className='border-x-2 animate-spin rounded-full'></span>
                    </>
                  ) : (
                    <Image
                      src={preview || '/placeholder.svg'}
                      alt='Avatar preview'
                      className='object-cover'
                      fill
                      priority
                    />
                  )}
                </div>
              ) : (
                <div className='flex flex-col items-center justify-center text-center'>
                  <Upload className='mb-4 h-8 w-8 text-muted-foreground' />
                  <p className='mb-2 text-sm font-medium'>
                    Drag and drop your image here
                  </p>
                  <p className='text-xs text-muted-foreground'>
                    PNG, JPG, or GIF up to 1MB
                  </p>
                </div>
              )}
              <Input
                ref={inputRef}
                type='file'
                accept='image/*'
                onChange={handleChange}
                className='hidden'
              />
            </div>
            <div className='flex gap-4 mt-4'>
              <Button
                onClick={() => inputRef.current?.click()}
                className='flex-1'
              >
                Choose File
              </Button>
              {preview && !loading && (
                <>
                  <Button
                    variant='outline'
                    size='icon'
                    onClick={handleFileUpload}
                    className='text-green-500 hover:text-black'
                  >
                    <ArrowRight className='h-4 w-4' />
                  </Button>
                  <Button
                    variant='outline'
                    size='icon'
                    onClick={() => setPreview(null)}
                    className='text-red-500 hover:text-black'
                  >
                    <X className='h-4 w-4' />
                  </Button>
                </>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
