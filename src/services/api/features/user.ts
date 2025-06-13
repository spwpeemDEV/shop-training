import { instance } from "../instance";
import { handleApiError } from "../helper";

export interface User {
  id: number;
  email: string;
  username: string;
  password: string;
  name: {
    firstname: string;
    lastname: string;
  };
  address: {
    city: string;
    street: string;
    number: number;
    zipcode: string;
    geolocation: {
      lat: string;
      long: string;
    };
  };
  phone: string;
}

export default {
  async getById(id: number): Promise<User | undefined> {
    try {
      const response = await instance.get<User>(`/users/${id}`);
      return response.data;
    } catch (err) {
      handleApiError(err, "get user by id");
    }
  },
};
