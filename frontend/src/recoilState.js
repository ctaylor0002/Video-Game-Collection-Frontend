import { atom, selector, selectorFamily } from "recoil";
// define a selector that fetches data
// const fetchProfilePic = selector({
//   key: "fetchProfilePic",
//   get: async (userId) => {
//     const response = await fetch(
//       `http://127.0.0.1:8000/api/profile/${userId}/`
//     ); // put your url here
//     const data = await response.json();
//     console.log(" DATA HERE", data);
//     return data;
//   },
// });

// define a family of selectors
export const fetchProfilePic = selectorFamily({
    key: 'fetchProfilePic',
    get: (userId) => async ({get}) => {
      const response = await fetch(`http://127.0.0.1:8000/api/profile/${userId}/`);
      const data = await response.json();
    //   console.log(" DATA HERE", data);
      return data;
    },
  });
  

// define an atom that uses the selector to set its default value
export const profilePicState = atom({
  key: "profilePicState",
  default: fetchProfilePic,
});
