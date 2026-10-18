const STORAGE_KEY = 'feedback-form-state';

// Оголошення стан-об'єкта
const formState = {
  email: '',
  message: '',
};

const form = document.querySelector('.feedback-form');

// Відновлення даних із LocalStorage при завантаженні сторінки
function populateForm() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (!savedData) return;

  try {
    const parsedData = JSON.parse(savedData);

    formState.email = parsedData.email?.trim() || '';
    formState.message = parsedData.message?.trim() || '';

    form.elements.email.value = formState.email;
    form.elements.message.value = formState.message;
  } catch (error) {
    console.error('Помилка парсингу даних з LocalStorage:', error);
  }
}

populateForm();

// Обробка введення даних (подія input) з обрізанням пробілів
form.addEventListener('input', event => {
  const fieldName = event.target.name;
  if (fieldName in formState) {
    formState[fieldName] = event.target.value.trim();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formState));
  }
});

// Обробка відправки форми (подія submit)
form.addEventListener('submit', event => {
  event.preventDefault();

  const currentEmail = form.elements.email.value.trim();
  const currentMessage = form.elements.message.value.trim();

  // Перевірка на порожні поля
  if (!currentEmail || !currentMessage) {
    alert('Fill please all fields');
    return;
  }

  // Оновлюємо стан актуальними очищеними значеннями перед виводом
  formState.email = currentEmail;
  formState.message = currentMessage;

  console.log(formState);

  // Очищення даних
  localStorage.removeItem(STORAGE_KEY);
  formState.email = '';
  formState.message = '';
  form.reset();
});
