import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-40 max-w-[60ch] w-full mx-auto">
        <div className="flex flex-col justify-center items-start py-4 md:py-0">
          <h1 className='text-4xl font-bold text-foreground'>Hey, I'm Subarna</h1>
          <p className='mt-2 text-lg text-muted-foreground'>I love networking and system security.</p>
          <Button className="mt-4">Reach Out</Button>
        </div>
        <div className="flex justify-center items-center">
          <Image
            src="/hero.png"
            alt="Hero Image"
            width={500}
            height={500}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
      {/* MAIN CONTENT */}
      <main className="mt-20 sm:mt-24 px-6 py-8 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold sm:text-5xl text-foreground mb-6">
          SuboDev
        </h1>
        <p className="text-lg text-muted-foreground mb-10">
          Welcome to my personal space on the web. I write about technology,
          projects, and random thoughts.
        </p>
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          Recent Posts
        </h2>
        <p className="text-muted-foreground">
          No posts yet, check back soon!
        </p>
      </main>
    </>
  );
}
