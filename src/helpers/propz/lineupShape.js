import PropTypes from 'prop-types';

const lineupShape = PropTypes.shape({
  uid: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
});

const lineupOptionalShape = PropTypes.oneOfType([
  PropTypes.shape({
    nope: PropTypes.string.isRequired,
  }),
  lineupShape,
]);

export default { lineupShape, lineupOptionalShape };
