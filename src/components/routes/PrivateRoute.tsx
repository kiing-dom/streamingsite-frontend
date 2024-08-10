import { Navigate } from 'react-router-dom';

interface PrivateRouteProps{
    children: React.ReactNode;
    allowedRoles?: string[]
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, allowedRoles = [] }) => {
    const userRole = localStorage.getItem('userRole');


    if(!userRole) {
        return <Navigate to="/login" replace />
    }

    if(allowedRoles.length > 0 && !allowedRoles.includes) {
        return <Navigate to="/home" replace />
    }

    return <>{children}</>;

}

export default PrivateRoute;