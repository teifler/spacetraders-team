import create from 'zustand';
import { persist } from 'zustand/middleware';

//  const [user, setUser] = useState(null);

const useStore = create(
  persist(
    (set, get) => {
      return {
        user: null,
        token: null,
        setUser: user => {
          set(state => {
            return {
              user: user,
            };
          });
        },
        setToken: token => {
          set(state => {
            return {
              token: token,
            };
          });
        },
        loans: [],
        setAvailableLoans: loans => {
          set(state => {
            return {
              loans: loans,
            };
          });
        },
        // fetchData: async (url, key) => {
        //   const response = await fetch(url);
        //   const data = await response.json();
        //   set({ [key]: data });
        // },
      };
    },
    { name: 'data' }
  )
);

export default useStore;
