import PropTypes from 'prop-types';

export const Button = (props) => (

  <button
    className={props.className}
    style={props.style}
    type={props.type}
    onClick={props.onClick}
    id={props.id}
  >

    {props.text}

  </button>

);

export const Input = (props) => (
  <p>
    {props.text}
    <input
      type={props.type}
      value={props.value}
      name={props.name}
      onChange={props.onChange}
      id={props.id}
      autoComplete={props.autoComplete}
    />
  </p>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};