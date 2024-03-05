import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const BASE_URL = import.meta.env.VITE_BASE_URL;
// login
const login = async (email, password) => {
  try {
    const backendResponse = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const data = await backendResponse.json();

    return data;
  } catch (error) {
    console.error("Login error:", error.message);
  }
};
// registrarse
const register = async (values) => {
  try {
    const newUser = {
      firstName: values.firstName,
      secondName: values.secondName,
      email: values.email,
      password: values.password,
    };

    const backendResponse = await fetch(`${BASE_URL}/users`, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const data = await backendResponse.json();
    return data;
  } catch (error) {
    console.error("Register error:", error.message);
  }
};

//  la lista de productos en la home page
const getBicyclesList = async (category, minPrice, maxPrice, location) => {
  try {
    console.log(" mis params", category, minPrice, maxPrice, location);
    const categoryParam = category !== "all" ? `category=${category}&` : "";
    const minPriceParam = `minPrice=${minPrice}&`;
    const maxPriceParam = `maxPrice=${maxPrice}&`;
    const locationParam = location ? `location=${location}&` : "";

    const backendResponse = await fetch(
      `${BASE_URL}/bicycles/?${categoryParam}${minPriceParam}${maxPriceParam}${locationParam}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await backendResponse.json();

    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
};

// la lista de los productos favoritos
const getFavoritesList = async () => {
  try {
    const token = localStorage.getItem("token");
    const backendResponse = await fetch(`${BASE_URL}/users/favorites`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await backendResponse.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
};

// añadir a favorites
const addAndDeleterFavorits = async (favoriteId) => {
  try {
    const token = localStorage.getItem("token");
    console.log(favoriteId);
    const addProduct = await fetch(
      `${BASE_URL}/users/favorites/${favoriteId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: token,
        },
      }
    );

    const data = await addProduct.json();
    return data;
  } catch (error) {
    console.error("Listing error:", error.message);
  }
};

// agregar el producto a la lista de productos
const listItem = async (formData) => {
  try {
    const token = localStorage.getItem("token");
    const addProduct = await fetch(`${BASE_URL}/bicycles/add`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: token,
      },
    });

    const data = await addProduct.json();
    return data;
  } catch (error) {
    console.error("Listing error:", error.message);
  }
};

// info de un solo producto
const getBicycleInfo = async (userId) => {
  try {
    const backendResponse = await fetch(`${BASE_URL}/bicycles/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await backendResponse.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
};

// info del usuario
const getUserInfo = async (userId) => {
  try {
    const token = localStorage.getItem("token");
    const backendResponse = await fetch(`${BASE_URL}/users/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await backendResponse.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
};

const forgotPasswordEmail = async (values) => {
  const email = values.email;
  try {
    const response = await fetch(`${BASE_URL}/users/forgot-password`, {
      method: "PUT",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error.message);
  }
};

const passwordReset = async (values, singleToken) => {
  const password = values.password;
  try {
    const response = await fetch(
      `${BASE_URL}/users/reset-password/${singleToken}`,
      {
        method: "PUT",
        body: JSON.stringify({ password }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error.message);
  }
};

const getChats = async () => {
  try {
    const token = localStorage.getItem("token");
    const backendResponse = await fetch(`${BASE_URL}/chat/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await backendResponse.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
};

const getMessages = async (currentChat) => {
  try {
    const token = localStorage.getItem("token");
    const backendResponse = await fetch(
      `${BASE_URL}/messages/${currentChat._id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    const data = await backendResponse.json();

    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
};

const sendMessage = async (message) => {
  try {
    const token = localStorage.getItem("token");

    const backendResponse = await fetch(`${BASE_URL}/messages/`, {
      method: "POST",
      body: JSON.stringify(message),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await backendResponse.json();
    return data;
  } catch (error) {
    console.log("Error:", error);
  }
};

const createChat = async (receiver) => {
  try {
    const token = localStorage.getItem("token");

    const backendResponse = await fetch(`${BASE_URL}/chat/`, {
      method: "POST",
      body: JSON.stringify(receiver),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await backendResponse.json();
    return data;
  } catch (error) {
    console.log("Error:", error);
  }
};

const changePersonalInfo = async (userInfo, newValue) => {
  try {
    const token = localStorage.getItem("token");

    const backendResponse = await fetch(`${BASE_URL}/users/${userInfo._id}`, {
      method: "PATCH",
      body: JSON.stringify(newValue),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await backendResponse.json();
    return data;
  } catch (error) {
    console.error("Error:", error.message);
  }
};

const sendWelcomingEmail = async (registerData) => {
  try {
    const backendResponse = await fetch(`${BASE_URL}/users/send-email/`, {
      method: "POST",
      body: JSON.stringify(registerData.userToAdd),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const data = await backendResponse.json();
    return data;
  } catch (error) {
    console.log("Error:", error);
  }
};

const deleteBicycle = async (bicycle) => {
  try {
    const token = localStorage.getItem("token");
    const backendResponse = await fetch(`${BASE_URL}/bicycles/${bicycle._id}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    });

    const data = await backendResponse.json();
    return data;
  } catch (error) {
    console.error("Listing error:", error.message);
  }
};

const getMyBicycles = async () => {
  try {
    const token = localStorage.getItem("token");

    const backendResponse = await fetch(`${BASE_URL}/users/mybicycles`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await backendResponse.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
};

const bookBicycle = async (bicycleId, ownerId) => {
  try {
    const token = localStorage.getItem("token");
    console.log("owner id", ownerId);

    const bookBike = await fetch(`${BASE_URL}/users/book/${bicycleId}`, {
      method: "PUT",
      body: JSON.stringify({ownerId}),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await bookBike.json();
    return data;
  } catch (error) {
    console.error("Listing error:", error.message);
  }
};

export default {
  login,
  register,
  getBicyclesList,
  getFavoritesList,
  getChats,
  listItem,
  getBicycleInfo,
  addAndDeleterFavorits,
  getUserInfo,
  passwordReset,
  forgotPasswordEmail,
  getMessages,
  sendMessage,
  createChat,
  changePersonalInfo,
  sendWelcomingEmail,
  deleteBicycle,
  getMyBicycles,
  bookBicycle,
};
