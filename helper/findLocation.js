import * as ausPostcode from '../components/MapView/australian_postcodes.json';

const findLocation = (postcode) => {
  const postcodes = ausPostcode.features;
  const location = postcodes.find((e) => e.postcode === postcode.toString());

  if (!location) {
    return 'Unknown';
  }
  return `${location.ced} ${location.state}`;
};

export default findLocation;
