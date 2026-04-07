import mongoose, { Schema, Types } from 'mongoose';
import { IBookSegment } from '@/types';

const BookSegmentSchema = new Schema<IBookSegment>(
    {
        clerkId: { type: String, required: true, index: true },
        bookId: { type: Schema.Types.ObjectId, ref: 'Book', required: true, index: true },
        content: { type: String, required: true },
        segmentIndex: { type: Number, required: true },
        pageNumber: { type: Number },
        wordCount: { type: Number, required: true },
    },
    { timestamps: true }
);

BookSegmentSchema.index({ bookId: 1, segmentIndex: 1 });
BookSegmentSchema.index({ content: 'text' });

const BookSegment =
    mongoose.models.BookSegment ||
    mongoose.model<IBookSegment>('BookSegment', BookSegmentSchema);

export default BookSegment;
