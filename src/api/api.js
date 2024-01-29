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

    if (!backendResponse.ok) {
      throw new Error(
        `Error: ${backendResponse.status} - ${backendResponse.statusText}`
      );
    }

    const data = await backendResponse.json();

    return data;
  } catch (error) {
    console.error(
      "Error en la operación de registrar un usuario:",
      error.message
    );

    const data = null;
    return data;
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

    if (!backendResponse.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await backendResponse.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
};

// agregar el producto a la lista de productos
const listItem = async (values) => {
  const token = window.localStorage.getItem("token");
  const addProduct = await fetch(`${BASE_URL}/bicycles/add`, {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  if (!addProduct.ok) {
    throw new Error(`Error: ${addProduct.status} - ${addProduct.statusText}`);
  }

  const data = await addProduct.json();
  return data;
};

export default {
  login,
  register,
  getBicyclesList,
  listItem,
};
