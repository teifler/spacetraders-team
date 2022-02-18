import create from 'zustand';

//  const [user, setUser] = useState(null);

const useStore = create(set => {
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
    fetchData: async (url, key) => {
      const response = await fetch(url);
      const data = await response.json();
      set({ [key]: data });
    },
  };
});

export default useStore;
