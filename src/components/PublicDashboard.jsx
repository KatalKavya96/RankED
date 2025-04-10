import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const PublicDashboard = () => {
  const { username } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/dashboard/${username}`);
  }, [username]);

  return null;
};

export default PublicDashboard;
