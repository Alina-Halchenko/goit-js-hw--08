import throttle from "lodash.throttle";

const refs = {
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector('.feedback-form textarea'),
  formEmail: document.querySelector('.feedback-form input'),
}
let localStorageData = {};
const STORAGE_KEY = 'feedback-form-state';


populateFormData();

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onTextareaInput, 500));

function onFormSubmit(evt){
  evt.preventDefault();
  const {
    elements: { email, message }
  } = evt.currentTarget;

  console.log(email.value, message.value);

  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
};

function onTextareaInput(evt){
if(evt.currentTarget){
  const {
    elements: { email, message }
  } = evt.currentTarget;

  localStorageData.email = email.value
  localStorageData.message = message.value;

    return localStorage.setItem(STORAGE_KEY, JSON.stringify(localStorageData));
}
};

function populateFormData(){
  const savedFormData = localStorage.getItem(STORAGE_KEY);
  const parsedFormData = JSON.parse(savedFormData);

    if(savedFormData){
      console.log('there is something');
      refs.textarea.value = parsedFormData['message'];
      refs.formEmail.value = parsedFormData['email'];
  };
}

