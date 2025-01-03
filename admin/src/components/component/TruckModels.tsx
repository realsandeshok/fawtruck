import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface TruckModel {
  id: number;
  truck_name: string;
  truck_name_ar: string;
  image_url: string;
}

const TruckModels = () => {
  const [truckModels, setTruckModels] = useState<TruckModel[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentModel, setCurrentModel] = useState<TruckModel | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // File input state

  useEffect(() => {
    // Fetch truck data from API on component mount
    const fetchTruckModels = async () => {
      const token = localStorage.getItem('token'); // Retrieve token from local storage
      if (!token) {
        console.error('Token not found. User might need to log in.');
        toast.error('Session expired. Please log in again.');
        return;
      }
      try {
        const response = await fetch('http://localhost:3000/api/admin/trucks', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (response.ok && data.trucks) {
          setTruckModels(data.trucks);
          toast.success('Truck models fetched successfully!'); // Success toast
        } else {
          toast.error('Failed to fetch truck models.');
        }
      } catch (error) {
        console.error('Error fetching truck models:', error);
        toast.error('Error fetching truck models.');
      }
    };

    fetchTruckModels();
  }, []); // Empty dependency array to run only on mount

  const openModal = (model: TruckModel | null = null) => {
    // Check if the number of truck models is less than 5 and if it's a new model (model is null)
    if (model === null && truckModels.length >= 5) {
      toast.error('You can only add up to 5 truck models.');
      return;
    }
  
    setCurrentModel(model);
    setIsModalOpen(true);
    setSelectedFile(null); // Clear selected file when opening modal
  };

  const closeModal = () => {
    setCurrentModel(null);
    setIsModalOpen(false);
    setSelectedFile(null); // Clear selected file when closing modal
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]); // Set selected file
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = localStorage.getItem('token'); // Get the token from localStorage
    if (!token) {
      toast.error('Session expired. Please log in again.');
      return;
    }

    const formData = new FormData();
    formData.append('truck_name', ((e.target as HTMLFormElement).elements.namedItem('name') as HTMLInputElement)?.value || '');
    formData.append('truck_name_ar', ((e.target as HTMLFormElement).elements.namedItem('name_ar') as HTMLInputElement)?.value || '');
    if (selectedFile) {
      formData.append('image', selectedFile); // Append the image file
    }

    try {
      const url = currentModel
        ? `http://localhost:3000/api/admin/trucks/${currentModel.id}` // Update existing model
        : 'http://localhost:3000/api/admin/trucks'; // Create new model

      const method = currentModel ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`, // Include the token
        },
        body: formData,
      });

      if (response.ok) {
        // const updatedBanner = await response.json();
        // Refetch banners to ensure state is updated
        const data = await fetch('http://localhost:3000/api/admin/trucks', {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token
          },
        });
        if (data.ok) {
          const trucksData = await data.json();
          setTruckModels(trucksData.trucks); // Update state with latest banners
        }
        closeModal();
      } else {
        toast.error(`Error ${currentModel ? 'updating' : 'creating'} truck model.`);
      }
    } catch (error) {
      console.error('Error saving truck model:', error);
      toast.error('Error saving truck model.');
    }
  };


 const handleDelete = async (id: number) => {
  if (confirm('Are you sure you want to delete this truck model?')) {
    const token = localStorage.getItem('token'); // Get the token from localStorage
    if (!token) {
      toast.error('Session expired. Please log in again.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/admin/trucks/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in headers
        },
      });

      if (response.ok) {
        // Remove the deleted truck model from state
        setTruckModels((prevTruckModels) =>
          prevTruckModels.filter((model) => model.id !== id)
        );
      } else {
        const error = await response.json();
        console.error('Error response:', error);
        toast.error('Error deleting truck model.');
      }
    } catch (error) {
      console.error('Error deleting truck model:', error);
      toast.error('Error deleting truck model.');
    }
  }
};



  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Truck Models</h1>
        <button
          onClick={() => openModal()}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
        >
          <PlusCircle className="mr-2" size={20} />
          Add Truck Model
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b text-start">Name (English)</th>
              <th className="px-6 py-3 border-b text-start">Name (Arabic)</th>
              <th className="px-6 py-3 border-b text-start">Image</th>
              <th className="px-6 py-3 border-b text-start">Actions</th>
            </tr>
          </thead>
          <tbody>
            {truckModels.map((model) => (
              <tr key={model.id}>
                <td className="px-6 py-4 border-b">{model.truck_name}</td>
                <td className="px-6 py-4 border-b">{model.truck_name_ar}</td>
                <td className="px-6 py-4 border-b">
                  <img src={model.image_url} alt={model.truck_name} className="w-20 h-20 object-cover" />
                </td>
                <td className="px-6 py-4 border-b">
                  <button onClick={() => openModal(model)} className="text-blue-500 hover:text-blue-600 mr-2">
                    <Edit size={20} />
                  </button>
                  <button onClick={() => handleDelete(model.id)} className="text-red-500 hover:text-red-600">
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
            <h2 className="text-xl font-bold mb-4">{currentModel ? 'Edit Truck Model' : 'Add Truck Model'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block mb-1">Name (English)</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full border rounded-md px-3 py-2"
                  defaultValue={currentModel?.truck_name || ''}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="name_ar" className="block mb-1">Name (Arabic)</label>
                <input
                  type="text"
                  id="name_ar"
                  name="name_ar"
                  className="w-full border rounded-md px-3 py-2"
                  defaultValue={currentModel?.truck_name_ar || ''}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="imageUrl" className="block mb-1">Image</label>
                <input
                  type="file"
                  id="imageUrl"
                  name="image"
                  className="w-full border rounded-md px-3 py-2"
                  onChange={handleFileChange}
                />
              </div>
              <div className="flex justify-end">
                <button type="button" onClick={closeModal} className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md mr-2">
                  Cancel
                </button>
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
                  {currentModel ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TruckModels;
