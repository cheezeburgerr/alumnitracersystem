import { Navigate } from "react-router-dom";

const RequireAuth = ({ children, user, redirectTo }) => {
  return user ? children : <Navigate to={redirectTo} />;
};

export default RequireAuth;
