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
    const categoryParam = category ? `category=${category}&` : "";
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
const addToFavorite = async (favoriteId) => {
  try {
    const token = localStorage.getItem("token");
    console.log(favoriteId);
    const addProduct = await fetch(
      `${BASE_URL}/users/favorites/${favoriteId}`,
      {
        method: "POST",
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

export default {
  login,
  register,
  getBicyclesList,
  getFavoritesList,
  listItem,
  getBicycleInfo,
  addToFavorite,
  getUserInfo,
};
