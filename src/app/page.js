import HeroBanner from "@/components/home/HeroBanner";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <HeroBanner />
    </div>
  );
}
