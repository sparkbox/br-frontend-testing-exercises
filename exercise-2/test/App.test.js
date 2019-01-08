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

    expect(document.querySelector('#classification').innerHTML).toEqual('');
  });
});
