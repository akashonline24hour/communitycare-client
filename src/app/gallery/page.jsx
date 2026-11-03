import Image from "next/image";

export default function GalleryPage() {
  const sampleImages = [
    {
      id: 1,
      title: "Community Clean Drive",
      url: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600",
    },
    {
      id: 2,
      title: "Tech & Networking Meetup",
      url: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600",
    },
    {
      id: 3,
      title: "Youth Leadership Workshop",
      url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600",
    },
    {
      id: 4,
      title: "Charity Food Marathon",
      url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-100 transition-colors duration-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white uppercase tracking-wider">
            Community Gallery
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
            Highlights and memorable moments from our past community events and
            gatherings.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sampleImages.map((img) => (
            <div
              key={img.id}
              className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden shadow-md group hover:shadow-xl transition-all"
            >
              <div className="relative w-full h-48">
                <Image
                  src={img.url}
                  alt={img.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-semibold text-sm text-gray-900 dark:text-white">
                  {img.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
