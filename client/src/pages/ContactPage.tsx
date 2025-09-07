// client/src/pages/ContactPage.tsx

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-cyan-400 mb-4">Contact & Location</h1>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <p className="text-lg"><strong>College Name:</strong> [Your College Name]</p>
          <p className="text-lg"><strong>Address:</strong> [Your College Address, Greater Noida]</p>
          <p className="text-lg"><strong>Email:</strong> contact@yourcollege.edu</p>
          <div className="mt-4">
            {/* You can embed a Google Maps iframe here */}
            <p>Google Map integration coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;