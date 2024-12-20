import React, { useState } from 'react';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

interface Banner {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  actionUrl: string;
}

const Banner = () => {
  const [banners, setBanners] = useState<Banner[]>([
    { id: 1, title: 'Summer Sale', description: 'Get 20% off on all trucks', imageUrl: '/placeholder.svg', actionUrl: '/sale' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBanner, setCurrentBanner] = useState<Banner | null>(null);

  const openModal = (banner: Banner | null = null) => {
    setCurrentBanner(banner);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCurrentBanner(null);
    setIsModalOpen(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission (create or update)
    closeModal();
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this banner?')) {
      setBanners(banners.filter(banner => banner.id !== id));
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Banners</h1>
        <button
          onClick={() => openModal()}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
        >
          <PlusCircle className="mr-2" size={20} />
          Add Banner
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b">Title</th>
              <th className="px-6 py-3 border-b">Description</th>
              <th className="px-6 py-3 border-b">Image</th>
              <th className="px-6 py-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {banners.map((banner) => (
              <tr key={banner.id}>
                <td className="px-6 py-4 border-b">{banner.title}</td>
                <td className="px-6 py-4 border-b">{banner.description}</td>
                <td className="px-6 py-4 border-b">
                  <img src={banner.imageUrl} alt={banner.title} className="w-20 h-20 object-cover" />
                </td>
                <td className="px-6 py-4 border-b">
                  <button onClick={() => openModal(banner)} className="text-blue-500 hover:text-blue-600 mr-2">
                    <Edit size={20} />
                  </button>
                  <button onClick={() => handleDelete(banner.id)} className="text-red-500 hover:text-red-600">
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">{currentBanner ? 'Edit Banner' : 'Add Banner'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="title" className="block mb-1">Title</label>
                <input
                  type="text"
                  id="title"
                  className="w-full border rounded-md px-3 py-2"
                  defaultValue={currentBanner?.title}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block mb-1">Description</label>
                <textarea
                  id="description"
                  className="w-full border rounded-md px-3 py-2"
                  defaultValue={currentBanner?.description}
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="imageUrl" className="block mb-1">Image URL</label>
                <input
                  type="text"
                  id="imageUrl"
                  className="w-full border rounded-md px-3 py-2"
                  defaultValue={currentBanner?.imageUrl}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="actionUrl" className="block mb-1">Action URL</label>
                <input
                  type="text"
                  id="actionUrl"
                  className="w-full border rounded-md px-3 py-2"
                  defaultValue={currentBanner?.actionUrl}
                  required
                />
              </div>
              <div className="flex justify-end">
                <button type="button" onClick={closeModal} className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md mr-2">
                  Cancel
                </button>
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
                  {currentBanner ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;

