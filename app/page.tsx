import HeroSection from "@/components/ui/HeroSection";
import { sampleBooks } from "@/lib/constants";

export default function Page() {
  return (
    <main className="container wrapper">
      <HeroSection />

      <div className='library-hero-grid'>
        {sampleBooks.map((book) => (
          <div key={book._id} className='library-hero-card'>
            <img src={book.coverURL} alt={book.title} className='library-hero-image' />
            <div className='library-hero-content'>
              <h3 className='library-hero-title'>{book.title}</h3>
              <p className='library-hero-author'>{book.author}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
