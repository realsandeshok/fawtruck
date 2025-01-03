// api.tsx

const BASE_URL = "http://134.209.118.179:2001";

// Define API endpoints for admin
const AdminLogin = `${BASE_URL}/api/admin/login`;
const AdminBanners = `${BASE_URL}/api/admin/banner`;
const AdminUploadBanners = `${BASE_URL}/api/admin/upload-banner`;
const AdminTruckModels = `${BASE_URL}/api/admin/trucks`;
const AdminAboutContent = `${BASE_URL}/api/admin/about`;
const Enquiries = `${BASE_URL}/api/enquiries`;

export { AdminBanners, AdminTruckModels, AdminAboutContent ,Enquiries, AdminUploadBanners, AdminLogin};
