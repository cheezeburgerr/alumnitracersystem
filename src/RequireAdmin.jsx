import { Navigate } from "react-router-dom";

const RequireAdmin = ({ children, admin, redirectTo }) => {
  return admin ? children : <Navigate to={redirectTo} />;
};

export default RequireAdmin;
