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
        shipList: initializeFetchable(),
        error: { loansError: false, shipsError: false },
        getUserInfo: async () => {
          set(
            produce(state => {
              state.user.error = false;
            })
          );
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
          set(
            produce(state => {
              state.token.error = false;
            })
          );
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
          set(
            produce(state => {
              state.availableLoans.error = false;
            })
          );
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
          set(
            produce(state => {
              state.error.loansError = false;
            })
          );
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
            set(
              produce(state => {
                state.error.loansError = true;
              })
            );
            console.error('ERROR:', error);
          }
        },
        getShipList: async () => {
          set(
            produce(state => {
              state.shipList.error = false;
            })
          );
          const token = get().token.data;

          try {
            const response = await fetch(
              `https://api.spacetraders.io/systems/OE/ship-listings?token=${token}&class=MK-I`
            );
            const data = await response.json();
            set(
              produce(state => {
                state.shipList.data = data.shipListings.map(ship => ({
                  ...ship,
                  id: nanoid(),
                }));
              })
            );
          } catch (error) {
            set(
              produce(state => {
                state.shipList.error = true;
              })
            );
            console.error('ERROR:', error);
          }
        },
        getShip: async (location, type) => {
          const token = get().token.data;
          const user = get().user;

          try {
            const response = await fetch(
              `https://api.spacetraders.io/my/ships?token=${token}&location=${location}&type=${type}`,
              {
                method: 'POST',
              }
            );
            const data = await response.json();

            set(
              produce(state => {
                state.user.data.ships = [...user.data.ships, data.ship];
                state.user.data.credits = data.credits;
              })
            );
          } catch (error) {
            set(
              produce(state => {
                state.error.shipsError = true;
              })
            );
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
