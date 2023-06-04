import { atom, selector, selectorFamily } from "recoil";


// define a family of selectors
// export const fetchProfilePic = selectorFamily({
//     key: 'fetchProfilePic',
//     get: (userId) => async ({get}) => {
//       const response = await fetch(`http://127.0.0.1:8000/api/profile/${userId}/`);
//       const data = await response.json();
//       //  console.log(" DATA HERE", data);
//       return data;
//     },
//   });

// export const fetchUserData = selectorFamily({
//   key: 'fetchUserData',
//   get: (username) => async ({get}) => {
//     const response = await fetch(`http://127.0.0.1:8000/api/auth/${username}/`);
//     const data = await response.json();
//     // console.log(" DATA HERE", data[0]);
//     return data[0];
//   }
// })

export const fetchPosts = selectorFamily({
  key: 'fetchPosts',
  get: (user) => async ({get}) => {
    const response = await fetch(`http://127.0.0.1:8000/api/posts/${user.id}/`);
    const data = await response.json();
    // console.log(" DATA HERE", data[0]);
    return data;
  }
})
  

// define an atom that uses the selector to set its default value
// export const profilePicState = atom({
//   key: "profilePicState",
//   default: fetchProfilePic,
// });

// export const userDataState = atom({
//   key: "userDataState",
//   default: fetchUserData,
// })

export const postDataState = atom({
  key: "fetchPosts",
  default: fetchPosts,
})
