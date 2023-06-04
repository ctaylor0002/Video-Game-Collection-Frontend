  async function getUsersInfo() {
    try {
      let usersResponse = await axios.get(
        "http://127.0.0.1:8000/api/auth/users/"
      );
      setUsers(usersResponse.data);
    } catch (error) {
      console.log(error.response.data);
    }
  }