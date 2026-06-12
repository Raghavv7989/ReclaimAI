'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, ArrowLeft, Image as ImageIcon, UploadCloud } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const formSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  category: z.string().min(1, 'Please select a category'),
  dateLost: z.string().min(1, 'Please select a date'),
  locationLost: z.string().min(3, 'Location is required'),
  description: z.string().min(10, 'Please provide a detailed description'),
});

type FormValues = z.infer<typeof formSchema>;

export default function ReportLostPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      category: '',
      dateLost: '',
      locationLost: '',
      description: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      console.log('Submitted lost item:', { ...data, images: uploadedFiles.length });
      toast.success('Report submitted successfully!', {
        description: 'We will notify you if a potential match is found.',
      });
      
      router.push('/items');
    } catch (error) {
      toast.error('Failed to submit report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setUploadedFiles(prev => [...prev, ...newFiles]);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard" className={buttonVariants({ variant: "ghost", size: "icon" })}>
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Report Lost Item</h1>
          <p className="text-muted-foreground">
            Provide details about your lost item to help our AI find matches.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Item Details</CardTitle>
            <CardDescription>
              The more information you provide, the better our chances of finding it.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {/* Image Upload Mock Area */}
            <div className="space-y-2">
              <Label>Photos</Label>
              <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center bg-muted/20 hover:bg-muted/50 transition-colors cursor-pointer relative">
                <input 
                  type="file" 
                  multiple 
                  accept="image/*" 
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  onChange={handleFileChange}
                />
                <div className="flex flex-col items-center justify-center text-center space-y-2">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <UploadCloud className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-sm font-medium">Click to upload or drag and drop</div>
                  <div className="text-xs text-muted-foreground">SVG, PNG, JPG or GIF (max. 800x400px)</div>
                </div>
              </div>
              {uploadedFiles.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {uploadedFiles.map((file, i) => (
                    <div key={i} className="flex items-center gap-2 bg-muted px-3 py-1.5 rounded-md text-sm">
                      <ImageIcon className="h-4 w-4 text-muted-foreground" />
                      <span className="truncate max-w-[150px]">{file.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Item Title</Label>
              <Input
                id="title"
                placeholder="e.g., Blue iPhone 13 Pro"
                {...register('title')}
              />
              {errors.title && (
                <p className="text-sm text-destructive">{errors.title.message}</p>
              )}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select onValueChange={(val) => setValue('category', val as string)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="keys">Keys</SelectItem>
                    <SelectItem value="wallet">Wallets & Bags</SelectItem>
                    <SelectItem value="clothing">Clothing</SelectItem>
                    <SelectItem value="pets">Pets</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-sm text-destructive">{errors.category.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateLost">Date Lost</Label>
                <Input
                  id="dateLost"
                  type="date"
                  {...register('dateLost')}
                />
                {errors.dateLost && (
                  <p className="text-sm text-destructive">{errors.dateLost.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="locationLost">Location Lost</Label>
              <Input
                id="locationLost"
                placeholder="e.g., Central Park near the fountain"
                {...register('locationLost')}
              />
              {errors.locationLost && (
                <p className="text-sm text-destructive">{errors.locationLost.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Detailed Description</Label>
              <Textarea
                id="description"
                placeholder="Provide any distinguishing features, serial numbers, marks, or context..."
                className="min-h-[120px]"
                {...register('description')}
              />
              {errors.description && (
                <p className="text-sm text-destructive">{errors.description.message}</p>
              )}
            </div>

          </CardContent>
          <CardFooter className="flex justify-end gap-4 border-t pt-6">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => router.back()}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit Report
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
