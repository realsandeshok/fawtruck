import { useState, useEffect } from "react";
import { Eye } from "lucide-react";
import toast from "react-hot-toast";
import { Enquiries } from "../../api/api";
import Layout from "./Layout";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination"; // Import pagination components

interface Enquiry {
  id: number;
  name: string;
  country: string;
  contact: number;
  email: string; // Added email field
  message: string;
  created_at: string;
  updated_at: string;
}

const Enquires = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1); // State for the current page
  const [itemsPerPage] = useState(13);

  useEffect(() => {
    const fetchEnquiries = async () => {
      const token = localStorage.getItem("token"); // Get the token from localStorage
      if (!token) {
        toast.error("Session expired. Please log in again.");
        return;
      }
      try {
        const response = await fetch(Enquiries, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch enquiries");
        }
        const data = await response.json();
        console.log("Fetched data:", data);

        if (data && Array.isArray(data.enquiries)) {
          setEnquiries(data.enquiries);
        } else {
          console.error("Fetched data is not in the expected format:", data);
          setEnquiries([]);
          toast.error("Invalid data format received");
        }
      } catch (error) {
        console.error("Error fetching enquiries:", error);
        toast.error("Failed to fetch enquiries");
        setEnquiries([]);
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
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  // Calculate the total pages based on the enquiries length
  const totalPages = Math.ceil(enquiries.length / itemsPerPage);

  // Get current page enquiries (slice the data to show only the current page's records)
  const currentPageEnquiries = enquiries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="flex">


          <h1 className="text-2xl font-bold mb-4">Enquiries</h1>
          <Pagination>
            <PaginationContent className="flex justify-end w-full px-6">
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(currentPage - 1);
                  }}
                  size="sm"
                />
              </PaginationItem>

              {[...Array(totalPages)].map((_, index) => {
                // Only render the current page number
                if (currentPage === index + 1) {
                  return (
                    <PaginationItem key={index}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(index + 1);
                        }}
                        size="sm"
                        // className="bg-blue-500 text-white border-2 border-blue-600 py-2 px-3 rounded-md"
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }
                return null; // Hide other page numbers
              })}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(currentPage + 1);
                  }}
                  size="sm"
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>

        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                {/* <th className="px-4 py-2 text-left">ID</th> */}
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Country</th>
                <th className="px-6 py-3 text-left">Contact</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Message</th>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>

              {currentPageEnquiries.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-4 h-[75vh]">
                    No enquiries found.
                  </td>
                </tr>) : (
                currentPageEnquiries.map((enquiry) => (
                  <tr key={enquiry.id} className="border-t hover:bg-gray-100">
                    {/* <td className="px-4 py-2">{enquiry.id}</td> */}
                    <td className="px-4 py-2">{enquiry.name}</td>
                    <td className="px-4 py-2">{enquiry.country}</td>
                    <td className="px-4 py-2">{enquiry.contact}</td>
                    <td className="px-4 py-2">{enquiry.email}</td>
                    <td className="px-4 py-2">{enquiry.message}</td>
                    <td className="px-4 py-2">
                      {formatDate(enquiry.created_at)}
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => openDialog(enquiry)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <Eye size={20} />
                      </button>
                    </td>
                  </tr>
                )))}
            </tbody>
          </table>
        </div>




        {isDialogOpen && selectedEnquiry && (
          <div
            className="fixed inset-0 bg-gray-800 bg-opacity-85 flex items-center justify-center z-50"
            onClick={closeDialog}
          >
            <div
              className="bg-white text-white rounded-lg p-6 shadow-lg w-96"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold text-blue-600 mb-4">
                Enquiry Details
              </h2>
              <p className="text-black">
                <strong>ID:</strong> {selectedEnquiry.id}
              </p>
              <p className="text-black">
                <strong>Name:</strong> {selectedEnquiry.name}
              </p>
              <p className="text-black">
                <strong>Country:</strong> {selectedEnquiry.country}
              </p>
              <p className="text-black">
                <strong>Contact:</strong> {selectedEnquiry.contact}
              </p>
              <p className="text-black">
                <strong>Email:</strong> {selectedEnquiry.email}
              </p>
              <p className="text-black">
                <strong>Message:</strong> {selectedEnquiry.message}
              </p>
              <p className="text-black">
                <strong>Date:</strong> {formatDate(selectedEnquiry.created_at)}
              </p>
              <div className="mt-4 text-right">
                <button
                  onClick={closeDialog}
                  className="bg-blue-400 hover:bg-blue-500 text-black px-4 py-2 rounded-lg transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

    </Layout>
  );
};

export default Enquires;
