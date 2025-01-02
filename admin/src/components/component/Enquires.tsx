import { useState, useEffect } from "react";
import { Eye } from "lucide-react";
import toast from "react-hot-toast";

interface Enquiry {
  id: number;
  name: string;
  country: string;
  contact: string;
  message: string;
  created_at: string;
  updated_at: string;
}

const Enquires = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/enquiries");
        if (!response.ok) {
          throw new Error("Failed to fetch enquiries");
        }
        const data = await response.json();
        console.log("Fetched data:", data);  // Log fetched data for debugging

        // Ensure the enquiries data exists and is an array
        if (data && Array.isArray(data.enquiries)) {
          setEnquiries(data.enquiries);
        } else {
          console.error("Fetched data is not in the expected format:", data);
          setEnquiries([]);  // Fallback to an empty array if the data is not in the expected format
          toast.error("Invalid data format");
        }
      } catch (error) {
        console.error("Error fetching enquiries:", error);
        toast.error("Failed to fetch enquiries");
        setEnquiries([]);  // Fallback to an empty array on error
      }
    };

    fetchEnquiries();
  }, []);

  const openDialog = (enquiry: Enquiry) => {
    setSelectedEnquiry(enquiry);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedEnquiry(null);
  };

  const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Enquiries</h1>
      {enquiries.length === 0 ? (
        <p className="text-gray-500">No enquiries available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Country</th>
                <th className="px-4 py-2 text-left">Contact</th>
                <th className="px-4 py-2 text-left">Message</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map((enquiry) => (
                <tr key={enquiry.id} className="border-t hover:bg-gray-100">
                  <td className="px-4 py-2">{enquiry.id}</td>
                  <td className="px-4 py-2">{enquiry.name}</td>
                  <td className="px-4 py-2">{enquiry.country}</td>
                  <td className="px-4 py-2">{enquiry.contact}</td>
                  <td className="px-4 py-2">{enquiry.message}</td>
                  <td className="px-4 py-2">{formatDate(enquiry.created_at)}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => openDialog(enquiry)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Eye size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isDialogOpen && selectedEnquiry && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeDialog}
        >
          <div
            className="bg-white rounded-lg p-6 shadow-lg w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Enquiry Details</h2>
            <p>
              <strong>ID:</strong> {selectedEnquiry.id}
            </p>
            <p>
              <strong>Name:</strong> {selectedEnquiry.name}
            </p>
            <p>
              <strong>Country:</strong> {selectedEnquiry.country}
            </p>
            <p>
              <strong>Contact:</strong> {selectedEnquiry.contact}
            </p>
            <p>
              <strong>Message:</strong> {selectedEnquiry.message}
            </p>
            <p>
              <strong>Date:</strong> {formatDate(selectedEnquiry.created_at)}
            </p>
            <div className="mt-4 text-right">
              <button
                onClick={closeDialog}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Enquires;
