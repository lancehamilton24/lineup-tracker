import PropTypes from 'prop-types';

const lineupShape = PropTypes.shape({
  uid: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
});

const playerShape = PropTypes.shape({
  lineupId: PropTypes.string.isRequired,
  order: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  position: PropTypes.string.isRequired,
  atBats: PropTypes.number.isRequired,
  hits: PropTypes.number.isRequired,
  walks: PropTypes.number.isRequired,
  strikeouts: PropTypes.number.isRequired,
  inningsPitched: PropTypes.number.isRequired,
})

const lineupOptionalShape = PropTypes.oneOfType([
  PropTypes.shape({
    nope: PropTypes.string.isRequired,
  }),
  lineupShape,
]);

export default { lineupShape, playerShape, lineupOptionalShape };
