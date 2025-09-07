// client/src/pages/GalleryPage.tsx

const GalleryPage = () => {
  // You would replace these with actual image URLs from your campus
  const images = [
    'https://via.placeholder.com/400x300',
    'https://via.placeholder.com/400x300',
    'https://via.placeholder.com/400x300',
    'https://via.placeholder.com/400x300',
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-cyan-400 mb-4">Campus Gallery</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((src, index) => (
            <img key={index} src={src} alt={`Campus view ${index + 1}`} className="rounded-lg shadow-lg" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;