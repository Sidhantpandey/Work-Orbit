import React, { useEffect ,useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from './context/user.context';
import axios from './config/axios';

function RefreshHandler({ setIsAuthenticated }) { 
    const navigate = useNavigate();
    const location = useLocation();
    const { setUser } = useContext(UserContext);
    const [project, setProject] = useState([]);


    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (token && storedUser) {
            const user = JSON.parse(storedUser);
            setUser(user);
            setIsAuthenticated(true);

            // Only fetch projects and redirect if we're on the login page or root
            if (location.pathname === '/login' || location.pathname === '/') {
                if (user) { 
                    axios.get('/projects/all')
                    .then((res) => {
                      setProject(res.data.projects);
                    })
                    .catch((err) => { 
                      console.error(err);
                      toast.error("Failed to fetch projects", { position: "top-right" });
                    });
                  }
            }
        } else {
            setIsAuthenticated(false);
            if (location.pathname !== '/login' && location.pathname !== '/register') {
                navigate('/login');
            }
        }
    }, [navigate, setIsAuthenticated, setUser, location.pathname]);

    return null;
}

export default RefreshHandler;