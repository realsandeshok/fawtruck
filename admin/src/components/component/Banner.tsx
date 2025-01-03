import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { AdminBanners, AdminUploadBanners } from '../../api/api';

interface Banner {
  id: number;
  file_name: string;
  description: string;
  image_url: string;
  // actionUrl: string;
}

const Banner = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBanner, setCurrentBanner] = useState<Banner | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Fetch banners from API when component mounts
  useEffect(() => {
    const fetchBanners = async () => {
      const token = localStorage.getItem('token'); // Retrieve token from local storage
      if (!token) {
        console.error('Token not found. User might need to log in.');
        toast.error('Session expired. Please log in again.');
        return;
      }
    
      try {
        const response = await fetch('http://localhost:3000/api/admin/banner', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        if (response.ok) {
          const data = await response.json();
          setBanners(data.banners); // Assuming the response contains a "banners" array
          toast.success('Banners fetched successfully!'); // Success toast
        } else {
          const errorText = await response.text();
          console.error(`Error fetching banners: ${response.status}`, errorText);
          toast.error('Failed to fetch banners.');
        }
      } catch (error) {
        console.error('Error fetching banners:', error);
        toast.error('Error occurred while fetching banners.');
      }
    };
    

    fetchBanners();
  }, []);

  const openModal = (banner: Banner | null = null) => {
    setCurrentBanner(banner);
    setSelectedFile(null); // Reset file input when opening the modal
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCurrentBanner(null);
    setSelectedFile(null);
    setIsModalOpen(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
  };

// Handle form submission for creating or updating a banner
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const token = localStorage.getItem('token'); // Get the token from localStorage
  if (!token) {
    toast.error('Session expired. Please log in again.');
    return;
  }

  const formData = new FormData();
  if (selectedFile) {
    formData.append('image', selectedFile);
  }

  try {
    const url = currentBanner
      ? `${AdminBanners}/${currentBanner.id}` // Update existing banner
      : AdminUploadBanners; // Create new banner

    const method = currentBanner ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in headers
      },
      body: formData,
    });

    if (response.ok) {
      const bannersResponse = await fetch(AdminBanners, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in headers
        },
      });
      if (bannersResponse.ok) {
        const bannersData = await bannersResponse.json();
        setBanners(bannersData.banners); // Update state with latest banners
        toast.success(currentBanner ? 'Banner updated successfully!' : 'Banner created successfully!');
      }
      closeModal();
    } else {
      const error = await response.json();
      console.error('Error response:', error);
      toast.error('Error saving banner');
    }
  } catch (error) {
    console.error('Error saving banner:', error);
    toast.error('Error saving banner');
  }
};

// Handle banner deletion
const handleDelete = async (id: number) => {
  if (confirm('Are you sure you want to delete this banner?')) {
    const token = localStorage.getItem('token'); // Get the token from localStorage
    if (!token) {
      toast.error('Session expired. Please log in again.');
      return;
    }

    try {
      const response = await fetch(`${AdminBanners}/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in headers
        },
      });

      if (response.ok) {
        setBanners(banners.filter((banner) => banner.id !== id));
        toast.success('Banner deleted successfully!');
      } else {
        const error = await response.json();
        console.error('Error response:', error);
        toast.error('Failed to delete banner.');
      }
    } catch (error) {
      console.error('Error deleting banner:', error);
      toast.error('Error occurred while deleting banner.');
    }
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
              <th className="px-6 py-3 border-b text-start">Title</th>
              {/* <th className="px-6 py-3 border-b">Description</th> */}
              <th className="px-6 py-3 border-b text-start">Image</th>
              <th className="px-6 py-3 border-b text-start">Actions</th>
            </tr>
          </thead>
          <tbody>
            {banners.map((banner) => (
              <tr key={banner.id}>
                <td className="px-6 py-4 border-b">{banner.file_name}</td>
                {/* <td className="px-6 py-4 border-b">{banner.description}</td> */}
                <td className="px-8 py-4 border-b">
                  <img src={banner.image_url} alt={banner.file_name} className="w-full h-20 object-cover" />
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
              {/* <div className="mb-4">
                <label htmlFor="title" className="block mb-1">Title</label>
                <input
                  type="text"
                  id="title"
                  className="w-full border rounded-md px-3 py-2"
                  defaultValue={currentBanner?.file_name}
                  required
                />
              </div> */}
              {/* <div className="mb-4">
                <label htmlFor="description" className="block mb-1">Description</label>
                <textarea
                  id="description"
                  className="w-full border rounded-md px-3 py-2"
                  defaultValue={currentBanner?.description}
                  required
                ></textarea>
              </div> */}
              <div className="mb-4">
                <label htmlFor="image" className="block mb-1">Image</label>
                <input
                  type="file"
                  id="image"
                  className="w-full border rounded-md px-3 py-2"
                  onChange={handleFileChange}
                  accept="image/*"
                  required={!currentBanner} // Only required for new banners
                />
              </div>
              {/* <div className="mb-4">
                <label htmlFor="actionUrl" className="block mb-1">Action URL</label>
                <input
                  type="text"
                  id="actionUrl"
                  className="w-full border rounded-md px-3 py-2"
                  defaultValue={currentBanner?.actionUrl}
                  required
                />
              </div> */}
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
