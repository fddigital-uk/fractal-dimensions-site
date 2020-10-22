import '../../css/pages/contact.scss';

function helloWorld() {
  return () => {
    console.log('Hello World!');
  };
}

const test = helloWorld();

test();
