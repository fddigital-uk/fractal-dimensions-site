import '../../css/pages/contact.scss';

const encode = (data) => Object.keys(data)
  .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
  .join('&');

const handleSubmit = async (e) => {
    e.preventDefault();

    const currForm = document.querySelector('[name="contact"]');
    const formData = new FormData(currForm);
    let newData = {};
    formData.forEach((v, k) => {
      newData = {
        ...newData,
        [k]: v,
      };
    });

    console.dir({
      'form-name': currForm.getAttribute('name'),
      'g-recaptcha-response': '',
      ...newData,
    });

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': currForm.getAttribute('name'),
        'g-recaptcha-response': '',
        ...newData,
      }),
    })
      .then(() => {
        alert('Form successfully submitted!');
      })
      .catch(error => {
        alert(error);
        setSending(false);
      });
  }
;

window.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('[name="contact"]');
  form.addEventListener('submit', handleSubmit);
});
