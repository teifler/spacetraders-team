import create from 'zustand';
import { persist } from 'zustand/middleware';
import { nanoid } from 'nanoid';
import produce from 'immer';

// const fetchable = {
//   loading: false,
//   data: null,
//   error: null,
// };
// const initializeFetchable = () => ({
//   ...fetchable,
// });

const useStore = create(
  persist(
    (set, get) => {
      return {
        user: null,
        userError: false,
        token: null,
        tokenError: false,
        isUserNameTaken: false,
        getUserInfo: async () => {
          const token = get().token;
          try {
            const response = await fetch(
              'https://api.spacetraders.io/my/account?token=' + token
            );
            const data = await response.json();
            set({
              user: data.user,
            });
          } catch (error) {
            set({ userError: true });
            console.error('ERROR:', error);
          }
        },
        loginUser: async username => {
          set({ isUserNameTaken: false });
          const response = await fetch(
            `https://api.spacetraders.io/users/${username}/claim`,
            {
              method: 'POST',
            }
          ).catch(error => {
            console.log('ERROR', error.message);
            set({ tokenError: true });
          });

          if (response.ok) {
            const data = await response.json();
            set({
              user: data.user,
            });
            set({
              token: data.token,
            });
          } else {
            set({ isUserNameTaken: true });
          }
        },
        loans: [],
        loansError: false,
        //loansLoading: false,
        getAvailableLoans: async () => {
          const token = get().token;
          try {
            const response = await fetch(
              'https://api.spacetraders.io/types/loans?token=' + token
            );
            const data = await response.json();
            set({
              loans: data.loans.map(loan => ({ ...loan, id: nanoid() })),
              //loansLoading: false,
            });
          } catch (error) {
            set({ availableLoansError: true });
            console.error('ERROR:', error);
          }
        },
        takeOutLoan: async () => {
          const token = get().token;
          const type = get().loans[0].type;
          const user = get().user;
          try {
            const response = await fetch(
              `https://api.spacetraders.io/my/loans?token=${token}&type=${type}`,
              {
                method: 'POST',
              }
            );
            const data = await response.json();
            console.log(data);
            set(
              produce(state => {
                state.user.loans = [...user.loans, data.loan];
                state.user.credits = data.credits;
              })
            );
          } catch (error) {
            set({ loansError: true });
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
