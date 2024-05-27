import { getSession } from "next-auth/react";

export interface Client {
  id: string;
  name: string;
  cnpj: string | null;
  cpf: string | null;
}

const getToken = async () => {
  const session = await getSession();
  return session?.user.token;
};

const handleResponse = async <T>(response: Response) => {
  const data = await response.json();
  return data;
};

export async function getClients() {
  try {
    const url = `http://localhost:3001/clients`;
    const token = await getToken();

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return handleResponse<Client>(response);
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
}
