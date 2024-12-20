import React, { useState } from 'react';
import { PlusCircle, Edit, Trash2, Search } from 'lucide-react';

interface TruckModel {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  specifications: string;
}

const TruckModels = () => {
  const [truckModels, setTruckModels] = useState<TruckModel[]>([
    { id: 1, name: 'Heavy Duty Truck', description: 'Powerful truck for heavy loads', imageUrl: '/placeholder.svg', specifications: 'Engine: 500HP, Payload: 30 tons' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentModel, setCurrentModel] = useState<TruckModel | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const openModal = (model: TruckModel | null = null) => {
    setCurrentModel(model);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCurrentModel(null);
    setIsModalOpen(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission (create or update)
    closeModal();
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this truck model?')) {
      setTruckModels(truckModels.filter(model => model.id !== id));
    }
  };

  const filteredModels = truckModels.filter(model =>
    model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    model.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search truck models..."
            className="w-full border rounded-md pl-10 pr-4 py-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b">Name</th>
              <th className="px-6 py-3 border-b">Description</th>
              <th className="px-6 py-3 border-b">Image</th>
              <th className="px-6 py-3 border-b">Specifications</th>
              <th className="px-6 py-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredModels.map((model) => (
              <tr key={model.id}>
                <td className="px-6 py-4 border-b">{model.name}</td>
                <td className="px-6 py-4 border-b">{model.description}</td>
                <td className="px-6 py-4 border-b">
                  <img src={model.imageUrl} alt={model.name} className="w-20 h-20 object-cover" />
                </td>
                <td className="px-6 py-4 border-b">{model.specifications}</td>
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
                <label htmlFor="name" className="block mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full border rounded-md px-3 py-2"
                  defaultValue={currentModel?.name}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block mb-1">Description</label>
                <textarea
                  id="description"
                  className="w-full border rounded-md px-3 py-2"
                  defaultValue={currentModel?.description}
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="imageUrl" className="block mb-1">Image URL</label>
                <input
                  type="text"
                  id="imageUrl"
                  className="w-full border rounded-md px-3 py-2"
                  defaultValue={currentModel?.imageUrl}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="specifications" className="block mb-1">Specifications</label>
                <textarea
                  id="specifications"
                  className="w-full border rounded-md px-3 py-2"
                  defaultValue={currentModel?.specifications}
                  required
                ></textarea>
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

