// api.tsx

const BASE_URL = "http://localhost:3000";

// Define API endpoints for admin
const AdminBanners = `${BASE_URL}/api/admin/banner`;
const AdminUploadBanners = `${BASE_URL}/api/admin/upload-banner`;
const AdminTruckModels = `${BASE_URL}/api/admin/trucks`;
const AdminAboutContent = `${BASE_URL}/api/admin/about`;
const Enquiries = `${BASE_URL}/api/enquiries`;

export { AdminBanners, AdminTruckModels, AdminAboutContent ,Enquiries, AdminUploadBanners};
