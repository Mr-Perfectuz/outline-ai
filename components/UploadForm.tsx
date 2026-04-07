'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Upload, ImageIcon } from 'lucide-react';
import {UploadSchema} from "@/lib/zod";
import { BookUploadFormValues } from '@/types';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ACCEPTED_PDF_TYPES, ACCEPTED_IMAGE_TYPES, DEFAULT_VOICE } from '@/lib/constants';
import FileUploader from './FileUploader';
import VoiceSelector from './VoiceSelector';
import LoadingOverlay from './LoadingOverlay';
import {useAuth, useUser} from "@clerk/nextjs";
import { toast } from 'sonner';
// import { checkBookExists, createBook, saveBookSegments } from "@/lib/actions/book.actions";
import {useRouter} from "next/navigation";
import {parsePDFFile} from "@/lib/utils";
import { upload } from "@vercel/blob/client";

const UploadForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const { userId } = useAuth();
    const router = useRouter()

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const form = useForm<BookUploadFormValues>({
        resolver: zodResolver(UploadSchema),
        defaultValues: {
            title: '',
            author: '',
            persona: '',
            pdfFile: undefined,
            coverImage: undefined,
        },
    });

    const onSubmit = async (data: BookUploadFormValues) => {
        if (!userId) {
            return toast.error("Please login to upload books");
        }

        setIsSubmitting(true);

        // PostHog -> Track Book Uploads...

    //     try {
    //         const existsCheck = await checkBookExists(data.title);

        //         if (existsCheck.exists && existsCheck.book) {
    //             toast.info("Book with same title already exists.");
    //             form.reset()
    //             router.push(`/books/${existsCheck.book.slug}`)
    //             return;
    //         }

    //         const fileTitle = data.title.replace(/\s+/g, '-').toLowerCase();
    //         const pdfFile = data.pdfFile;

    //         const parsedPDF = await parsePDFFile(pdfFile);

        //         if (parsedPDF.content.length === 0) {
    //             toast.error("Failed to parse PDF. Please try again with a different file.");
    //             return;
    //         }

    //         const uploadedPdfBlob = await upload(fileTitle, pdfFile, {
    //             access: 'public',
    //             handleUploadUrl: '/api/upload',
    //             contentType: 'application/pdf'
    //         });

    //         let coverUrl: string;

        //         if (data.coverImage) {
    //             const coverFile = data.coverImage;
    //             const uploadedCoverBlob = await upload(`${fileTitle}_cover.png`, coverFile, {
    //                 access: 'public',
    //                 handleUploadUrl: '/api/upload',
    //                 contentType: coverFile.type
    //             });
    //             coverUrl = uploadedCoverBlob.url;
    //         } else {
    //             const response = await fetch(parsedPDF.cover)
    //             const blob = await response.blob();

    //             const uploadedCoverBlob = await upload(`${fileTitle}_cover.png`, blob, {
    //                 access: 'public',
    //                 handleUploadUrl: '/api/upload',
    //                 contentType: 'image/png'
    //             });
    //             coverUrl = uploadedCoverBlob.url;
    //         }

    //         const book = await createBook({
    //             clerkId: userId,
    //             title: data.title,
    //             author: data.author,
    //             persona: data.persona,
    //             fileURL: uploadedPdfBlob.url,
    //             fileBlobKey: uploadedPdfBlob.pathname,
    //             coverURL: coverUrl,
    //             fileSize: pdfFile.size,
    //         });

        //         if (!book.success) {
    //             toast.error(book.error as string || "Failed to create book");
    //             if (book.isBillingError) {
    //                 router.push("/subscriptions");
    //             }
    //             return;
    //         }

        //         if (book.alreadyExists) {
    //             toast.info("Book with same title already exists.");
    //             form.reset()
    //             router.push(`/books/${book.data.slug}`)
    //             return;
    //         }

    //         const segments = await saveBookSegments(book.data._id, userId, parsedPDF.content);

        //         if (!segments.success) {
    //             toast.error("Failed to save book segments");
    //             throw new Error("Failed to save book segments");
    //         }

    //         form.reset();
    //         router.push('/');
    //     } catch (error) {
    //         console.error(error);

    //         toast.error("Failed to upload book. Please try again later.");
    //     } finally {
    //         setIsSubmitting(false);
    //     }
    };

    if (!isMounted) return null;

    return (
        <>
            {/* {isSubmitting && <LoadingOverlay />} */}

            <div className="new-book-wrapper">
                
            </div>
        </>
    );
};

export default UploadForm;
