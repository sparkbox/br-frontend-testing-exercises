import App from '../js/App';

const render = (html) => document.querySelector('body').innerHTML = html;
const reset = () => render('');

afterEach(reset);

describe('App', () => {
  it('clears classification on startup', () => {
    render`
      <div id="classification">not a triangle</div>
    `;

    new App().start();

    const classification = document.querySelector('#classification');
    expect(classification.innerHTML).toEqual('');
  });

  xit('updates the classification on submit', () => {
    render`
      <form>
        <input type="text" id="sidea">
        <input type="text" id="sideb">
        <input type="text" id="sidec">
      </form>
      <div id="classification"></div>
    `;

    new App().start();

    // fill in the form
    const form = document.querySelector('form');
    form.elements.sidea.value = 1;
    form.elements.sideb.value = 1;
    form.elements.sidec.value = 1;

    // submit the form
    const event = new Event('submit');
    form.dispatchEvent(event);

    const classification = document.querySelector('#classification');
    expect(classification.innerHTML).toEqual('equilateral');
  });
});
