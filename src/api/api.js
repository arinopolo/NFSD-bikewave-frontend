const BASE_URL = "http://localhost:3000";

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
    if (!backendResponse.ok) {
      throw new Error(
        `Error: ${backendResponse.status} - ${backendResponse.statusText}`
      );
    }

    const data = await backendResponse.json();
    return data;
  } catch (error) {
    console.error("Incorrect credentials:", error.message);
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

export default {
  login,
  register,
};
