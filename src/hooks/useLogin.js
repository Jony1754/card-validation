import axios from 'axios';

export const useLogin = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const login = async (user, pasw) => {
    setLoading(true);
    try {
      const loginData = await axios.post('http://localhost:3005/Login/Login', {
        user,
        pasw,
      });

      setUser(loginData.data);
      setError(false);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { user, error, loading, loginData };
};
