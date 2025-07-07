import axios from "axios";
export const fetchData = async (data, url: string) => {
  try {
    const response = await axios.get(
      `${url}`,
    );
    console.log(response.data);
    data(response.data);
  } catch (error: any) {
    alert(error.response?.data?.message || "Ошибка при получении данных");
    console.error(error);
  }
};
