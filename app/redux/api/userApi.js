export const fetchUserData = async () => {
  try {
    const response = await fetch("https://randomuser.me/api/?results=1&nat=us");
    const data = await response.json();
    // console.log("userAPI", data);
    return data;
  } catch (e) {
    console.log(e);
  }
};
