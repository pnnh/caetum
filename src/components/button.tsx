import { css, html } from 'react-strict-dom';

const styles2 = css.create({
  button: {
    backgroundColor: {
      default: 'green',
      ':hover': 'lightgray'
    },
    height: 50,
    width: 200, 
    color: 'green',
    padding: 20
  }
});

export function MyButton() {
  return (
    <html.div style={styles2.button}>
      A cross-platform button
    </html.div>
  );
}