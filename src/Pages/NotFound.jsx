
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center">
            <h1 className="font-bold text-7xl">404</h1>
            <p className="font-semibold">Page not Found</p>
            <p className="mb-4">The page you are looking for does not exist.</p>

            <Button>
                <Link to={'/'}>
                Go Back Home
                </Link>
            </Button>
        </div>
    );
};

export default NotFound;
