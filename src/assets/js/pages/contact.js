const encode = (data) => Object.keys(data)
  .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
  .join('&');

const loadedFiles = {};

function loadJsFile(filename) {
  if (loadedFiles[filename]) return;
  loadedFiles[filename] = true;
  const fileRef = document.createElement('script');
  fileRef.setAttribute('type', 'text/javascript');
  fileRef.setAttribute('src', filename);
  if (typeof fileRef != 'undefined') {
    document.getElementsByTagName('head')[0].appendChild(fileRef);
    loadedFiles[filename] = true;
  } else {
    loadedFiles[filename] = null;
  }
}

const handleSubmit = async (e) => {
  const currForm = document.querySelector('[name="contact"]');
  const formData = new FormData(currForm);
  const submitButton = currForm.querySelector('button');
  let newData = {};
  formData.forEach((v, k) => {
    newData = {
      ...newData,
      [k]: v,
    };
  });

  submitButton.disabled = true;

  const submitData = {
    'form-name': currForm.getAttribute('name'),
    ...newData,
  };

  localStorage.setItem('formData', JSON.stringify(submitData));

  const handleError = () => {
    submitButton.disabled = false;
    const confirm = window.confirm('There was an error submitting the form. The captcha may have expired and reloading the page may resolve this.\n\nReload the page now?\n\nNOTE: Your details and message have been saved locally and will be automatically reloaded.');
    if (confirm) {
      window.location.href = '/#frame-4';
    }
  };

  fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: encode(submitData),
  })
    .then((response) => {
      if (response.ok) {
        const success = document.querySelector('.contact__success');
        success.classList.remove('hidden');
        currForm.classList.add('hidden');
        localStorage.clear();
      } else {
        handleError();
      }
    })
    .catch(handleError);
};

window.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form[name="contact"]');
  window['handleContactSubmit'] = handleSubmit;

  let values = localStorage.getItem('formData');
  if (values) {
    values = JSON.parse(values);
    form.querySelectorAll('input,textarea')
      .forEach((f) => {
        if (f.name !== 'g-recaptcha-response') {
          f.value = values[f.name] || '';
        }
      });
  }

  window.addEventListener('scroll', () => {
    loadJsFile('https://www.google.com/recaptcha/api.js');
  });
});
