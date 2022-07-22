import { authenticationService } from "~/_services/authentication.service";

// функция обработчик ответа сервера
export function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    // если ответ не 200, то выкидываем ошибку и не логинимся
    if (!response.ok) {
      if ([401, 403].indexOf(response.status) !== -1) {
        authenticationService.logout();
        location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    // если ответ успешный - возвращаем данные из ответа сервера
    return data;
  });
}
