import create from 'zustand';
import { persist } from 'zustand/middleware';
import { nanoid } from 'nanoid';

//  const [user, setUser] = useState(null);

const useStore = create(
  persist(
    (set, get) => {
      return {
        user: null,
        token: null,
        setUser: user => {
          set({
            user,
          });
        },
        setToken: token => {
          set({ token });
        },
        loans_: {
          data: [],
          error: null,
          loading: false,
        },
        loans: [],
        loansError: null,
        loansLoading: false,
        getAvailableLoans: async () => {
          set({ loansLoading: true });
          const token = get().token;
          try {
            const response = await fetch(
              'https://api.spacetraders.io/types/loans?token=' + token
            );
            const data = await response.json();
            console.log(data);
            set({
              loans: data.loans.map(loan => ({ ...loan, id: nanoid() })),
              loansLoading: false,
            });
          } catch (error) {
            set({ loansError: error, loansLoading: false });
            console.error('ERROR:', error);
          }
        },
        // fetchData: async (url, key) => {
        //   const response = await fetch(url);
        //   const data = await response.json();
        //   set({ [key]: data });
        // },
      };
    },
    { name: 'SpaceTraders' }
  )
);

export default useStore;
