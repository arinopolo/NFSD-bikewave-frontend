import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const BASE_URL = import.meta.env.VITE_BASE_URL;

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

// obtenemos la lista de productos en la home page
const getBicyclesList = async () => {
  try {
    const backendResponse = await fetch(`${BASE_URL}/bicycles/`, {
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

const getBicycleInfo = async () => {
  try {
    const backendResponse = await fetch(`${BASE_URL}/bicycles/${userid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await backendResponse.json();
    return data;

    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
};

export default {
  login,
  register,
  getBicyclesList,
  listItem,
  getBicycleInfo,
};
