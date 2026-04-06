import Image from "next/image";
import Link from "next/link";

const steps = [
  { number: 1, title: "Upload PDF", description: "Add your book file" },
  { number: 2, title: "AI Processing", description: "We analyze the content" },
  { number: 3, title: "Voice Chat", description: "Discuss with AI" },
];

export default function Page() {
  return (
    <main className="container wrapper">
      {/* Hero Card */}
      <div
        className="w-full rounded-2xl overflow-hidden"
        style={{ backgroundColor: "var(--bg-secondary)" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-6 px-10 py-12">

          {/* Left — text + CTA */}
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <h1
                className="text-4xl font-bold font-serif leading-tight"
                style={{ color: "var(--text-primary)" }}
              >
                Your Library
              </h1>
              <p
                className="text-base leading-relaxed max-w-xs"
                style={{ color: "var(--text-secondary)" }}
              >
                Convert your books into interactive AI conversations.
                Listen, learn, and discuss your favorite reads.
              </p>
            </div>

            <Link
              href="/books/new"
              className="flex items-center gap-2 w-fit px-6 py-3 rounded-full font-semibold text-sm transition-opacity hover:opacity-80"
              style={{
                backgroundColor: "var(--bg-card)",
                color: "var(--text-primary)",
                boxShadow: "var(--shadow-soft-sm)",
              }}
            >
              <span className="text-lg leading-none">+</span>
              Add new book
            </Link>
          </div>

          {/* Center — illustration */}
          <div className="flex justify-center items-end">
            <Image
              src="/assets/hero-illustration.png"
              alt="Vintage books and globe illustration"
              width={380}
              height={300}
              style={{ height: "auto", objectFit: "contain" }}
              priority
            />
          </div>

          {/* Right — steps card */}
          <div className="flex justify-end">
            <div
              className="rounded-2xl p-6 flex flex-col gap-5 w-64"
              style={{
                backgroundColor: "var(--bg-card)",
                boxShadow: "var(--shadow-soft-md)",
              }}
            >
              {steps.map(({ number, title, description }) => (
                <div key={number} className="flex items-start gap-4">
                  <span
                    className="flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center text-sm font-semibold"
                    style={{
                      borderColor: "var(--border-medium)",
                      color: "var(--text-primary)",
                    }}
                  >
                    {number}
                  </span>
                  <div className="flex flex-col gap-0.5">
                    <span
                      className="font-semibold text-sm"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {title}
                    </span>
                    <span
                      className="text-xs"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {description}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
