import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import RequireAuth from "./RequireAuth";
import RequireAdmin from "./RequireAdmin";

// Components
import Home from "./Pages/Home";
import Contact from "./Pages/Contact";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";
import EmploymentForm from "./Pages/EmploymentForm";
import EmploymentDetails from "./Pages/EmploymentDetails";
import AdminLogin from "./Pages/Admin/AdminLogin";
import Dashboard from "./Pages/Admin/Dashboard";
import MasterList from "./Pages/Admin/MasterList/MasterList";
import Archive from "./Pages/Admin/Archive/Archive";
import ViewAlumni from "./Pages/Admin/ViewAlumni";
import HomeCalendar from "./Pages/Admin/Calendar";
import NotFound from "./Pages/NotFound"; // 404 Page Component
import { ThemeProvider } from "./Components/theme-provider";
import Settings from "./Pages/AlumniProfile/Settings";
import SettingsProfilePage from "./Pages/AlumniProfile/ProfilePage";
import DetailsPage from "./Pages/AlumniProfile/DetailsPage";
import { AccountForm } from "./Pages/Admin/AccountForm";
import Account from "./Pages/Admin/Account";
import Security from "./Pages/Admin/Security";
import SecurityPage from "./Pages/AlumniProfile/Security";
import AlumniAnalytics from "./Pages/Admin/Analytics/AlumniAnalytics";
import OfficialList from "./Pages/Admin/OfficialList/OfficialList";
import EmploymentHistory from "./Pages/Admin/EmploymentHistory";
import AlumniEmploymentDetails from "./Pages/Admin/AlumniEmploymentDetails";
import AlumniEmploymentHistory from "./Pages/Admin/AlumniEmploymentHistory";
import Announcements from "./Pages/Admin/Announcements/Announcements";
import AnnouncementsArchive from "./Pages/Admin/Announcements/AnnounceArchive";
import AddAnnouncement from "./Pages/Admin/Announcements/AddAnnouncement";
import ViewAnnouncement from "./Pages/Admin/Announcements/ViewAnnouncement";
import AnnouncementPage from "./Pages/AnnouncementPage";
import Courses from "./Pages/Admin/Courses/Courses";
import AccountActivation from "./Pages/AccountActivation";
import RequestNewLink from "./Pages/RequestNewLink";

const UserRoutes = ({ user }) => {
  return (
    <RequireAuth user={user} redirectTo="/">
      <Outlet />
    </RequireAuth>
  );
};

const AdminRoutes = ({ admin }) => {
  return (
    <RequireAdmin admin={admin} redirectTo="/admin/login">
      <Outlet />
    </RequireAdmin>
  );
};



const AppRoutes = ({ user, admin }) => {
  return (
    <div>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/announcements" element={<AnnouncementPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account/activate/:token" element={<AccountActivation />} />
          <Route path="/request-new-link" element={<RequestNewLink />} />
          {/* User Protected Routes */}
          <Route path="/profile" element={<UserRoutes user={user} />}>
            <Route index element={<Profile />} />
            <Route path="edit" element={<SettingsProfilePage/>}/>
            <Route path="edit/details" element={<DetailsPage/>}/>
            <Route path="edit/security" element={<SecurityPage/>}/>
            <Route path="employmentform" element={<EmploymentForm />} />
            <Route path="employment-history" element={<EmploymentHistory />} />
            <Route path="employment-details/:id" element={<EmploymentDetails />} />
          </Route>

          {/* Admin Protected Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          
          <Route path="/admin" element={<AdminRoutes admin={admin} />}>
            <Route path="analytics/alumni" element={<AlumniAnalytics/>}/>
            <Route path="account" element={<Account />}/>
            <Route path="security" element={<Security />}/>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="masterlist" element={<MasterList />} />
            <Route path="officiallist" element={<OfficialList />} />
            <Route path="archive" element={<Archive />} />

            <Route path="programs" element={<Courses />} />
            <Route path="announcements/active" element={<Announcements />} />
            <Route path="announcements/archive" element={<AnnouncementsArchive />} />
            <Route path="announcements/view/:id" element={<ViewAnnouncement />} />
            {/* <Route path="announcements/add" element={<AddAnnouncement />} /> */}
            <Route path="view-alumni/:id" element={<ViewAlumni />} />
            <Route path="employment-details/:id" element={<AlumniEmploymentDetails />} />
            <Route path="employment-history/:id" element={<AlumniEmploymentHistory />} />
            <Route path="calendar" element={<HomeCalendar />} />
          </Route>

          {/* Catch-All Route for Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
};

export default AppRoutes;
