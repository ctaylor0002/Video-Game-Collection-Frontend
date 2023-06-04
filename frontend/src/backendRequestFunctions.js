import axios from "axios";

export async function getUsersInfo() {
  try {
    let usersResponse = await axios.get(
      "http://127.0.0.1:8000/api/auth/users/"
    );
    return(usersResponse.data);
    // setUsers(usersResponse.data); 
  } catch (error) {
    console.log(error.response.data);
  }
}

export const fetchPosts = async (user, startUp, setPosts) => {
  try {
    let response = await axios.get(
      `http://127.0.0.1:8000/api/posts/${user.id}/`
    );
    console.log(response.data)
    // setPosts(response.data);
    startUp();
    return(response.data)
  } catch (error) {
    console.log(error.response.data);
  }
};
