export function handleFetchError(status: number): string {
    if (status === 404) return 'Данные не найдены. Попробуйте позже.';
    if (status === 500) return 'Ошибка сервера. Повторите попытку позже.';
    if (status >= 400 && status < 500) return 'Ошибка запроса. Проверьте корректность введенных данных.';
    if (status >= 500) return 'Внутренняя ошибка. Мы уже чиним.';
    return 'Произошла неизвестная ошибка.';
}
