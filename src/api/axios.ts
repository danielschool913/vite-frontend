import axios from 'axios';

// Створення окремого інстансу Axios
const api = axios.create({
	baseURL: import.meta.env["VITE_API_BASE_URL"],
	headers: {
		"Content-Type": "application/json",
	},
});

// Якщо токен доступний у змінній середовища -- додаємо в Authorization
const token = localStorage.getItem("token");
if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Інтерцептор для відповіді (обробка помилок)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Тут можна додати глобальну обробку помилок, наприклад:
        console.error('API error:', error.response?.data || error.message);

        // Можна також виводити повідомлення користувачу через toast
        // toast.error(error.response?.data?.message || 'Unknown error');

        return Promise.reject(error);
    }
);

export default api;
