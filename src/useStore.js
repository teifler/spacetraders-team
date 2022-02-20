import create from 'zustand';
import { persist } from 'zustand/middleware';
import { nanoid } from 'nanoid';
import produce from 'immer';

const fetchable = {
  data: null,
  error: null,
};
const initializeFetchable = () => ({
  ...fetchable,
});

const useStore = create(
  persist(
    (set, get) => {
      return {
        user: initializeFetchable(),
        token: initializeFetchable(),
        isUserNameTaken: false,
        availableLoans: initializeFetchable(),
        getUserInfo: async () => {
          const token = get().token;
          try {
            const response = await fetch(
              'https://api.spacetraders.io/my/account?token=' + token
            );
            const data = await response.json();
            set(
              produce(state => {
                state.user.data = data.user;
              })
            );
          } catch (error) {
            set(
              produce(state => {
                state.user.error = true;
              })
            );
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
            set(
              produce(state => {
                state.token.error = true;
              })
            );
          });

          if (response.ok) {
            const data = await response.json();
            set(
              produce(state => {
                state.user.data = data.user;
              })
            );
            set(
              produce(state => {
                state.token.data = data.token;
              })
            );
          } else {
            set({ isUserNameTaken: true });
          }
        },
        getAvailableLoans: async () => {
          const token = get().token.data;
          try {
            const response = await fetch(
              'https://api.spacetraders.io/types/loans?token=' + token
            );
            const data = await response.json();
            set(
              produce(state => {
                state.availableLoans.data = data.loans.map(loan => ({
                  ...loan,
                  id: nanoid(),
                }));
              })
            );
          } catch (error) {
            set(
              produce(state => {
                state.availableLoans.error = true;
              })
            );
            console.error('ERROR:', error);
          }
        },
        takeOutLoan: async () => {
          const token = get().token.data;
          const type = get().availableLoans.data[0].type;
          const user = get().user;
          try {
            const response = await fetch(
              `https://api.spacetraders.io/my/loans?token=${token}&type=${type}`,
              {
                method: 'POST',
              }
            );
            const data = await response.json();
            set(
              produce(state => {
                state.user.data.loans = [...user.data.loans, data.loan];
                state.user.data.credits = data.credits;
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
