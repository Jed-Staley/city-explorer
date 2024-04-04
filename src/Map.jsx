import { When } from 'react-if';

function Map({ APIkey, location }) {
  return (
    <>
      <When condition={location && location.lat && location.lon}>
        <section>
          <h5>
            Latitude: {location.lat} Longitude: {location.lon}
          </h5>
          <img src={`https://maps.locationiq.com/v3/staticmap?key=${APIkey}&center=${location.lat},${location.lon}&size=500x440&zoom=10`} alt="Map" />
        </section>
      </When>
    </>
  );
}

export default Map;
