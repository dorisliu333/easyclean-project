import React, { useEffect, useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';
import requestApi from '../../api/fetchDetails';
import Button from '../Button';
import * as ausPostcode from './australian_postcodes.json';
import mapStyles from './mapStyles';
import '@reach/combobox/styles.css';

const FunctionBar = styled.div`
  height: 48px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;
const DropDownMenu = styled.div`
  background: #ffffff;
  border-radius: 8px;
  position: absolute;
  top: 60px;
  width: 300px;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-20px);
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
  z-index: 999;
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
`;
const DropDownMenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  border: 1px solid #ccc;
  list-style-type: none;
  width: 100%;
  display: inline-block;
`;
const DropDownMenuListItem = styled.li`
  border-bottom: 1px solid #dddddd;
  text-decoration: none;
  color: #333333;
  padding: 15px 20px;
  display: block;
`;
const MenuContainer = styled.div`
  float: left;
  position: relative;
  display: inline-flex;
  flex-direction: column;
`;
const SearchBox = styled.div`
  float: right;
  > input {
    width: 48px;
    height: 48px;
    border-radius: 16px;
    box-shadow: none;
    box-sizing: border-box;
    font-size: 14px;
    height: 32px;
    margin: 0;
    min-height: 32px;
    padding: 0;
  }
`;
const TaskInfoWindow = styled.div`
  background-color: #fff;
  height: 100%;
  margin: auto 0;
  position: relative;
  width: 100%;
`;
const TaskInfoWindowTop = styled.div`
  height: 50%;
  width: 100%;
  flex: auto;
`;
const TaskTitle = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 2rem;
`;
const PriceTage = styled.div`
  background-color: #f3f3f3;
  border: 1px solid #bbc2dc;
  height: 126px;
  width: 122px;
  font-weight: bold;
  font-size: 3rem;
  text-align: center;
  line-height: 7.5rem;
  float: right;
`;
const TaskDetails = styled.div`
  width: 45%;
  float: left;
  padding-top: 1.5rem;
  font-size: 1.2rem;
  font-family: 'YaHei';
  text-align: center;
  word-spacing: 0.25px;
  word-wrap: break-word;
`;
const TaskInfoWindowBottom = styled.div`
  height: 50%;
  width: 100%;
  flex: auto;
`;
const center = {
  lat: -33.86882,
  lng: 151.20929,
};
const libraries = ['places'];
const mapContainerStyle = {
  width: '100%',
  height: '93%',
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};
const ausPostCode = ausPostcode.features;
const postcodeArr = [];
(() => {
  requestApi.get(`/tasks`).then((res) => {
    for (let j = 0; j < res.data.length; j += 1) {
      const temp = res.data[j].postCode;
      const allKeys = ausPostCode.find((tempExpress) =>
        tempExpress ? tempExpress.postcode === temp.toString() : null,
      );
      postcodeArr.push({
        // eslint-disable-next-line no-underscore-dangle
        taskId: res.data[j]._id,
        title: res.data[j].title,
        price: res.data[j].priceBudget,
        postAt: res.data[j].createdAt,
        postcode: res.data[j].postCode,
        details: res.data[j].detail,
        latitude: allKeys.lat,
        longitude: allKeys.long,
      });
    }
  });
})();
export default function MapView(props) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCyncjzcjWSDA81hLZb_G_YfMFd8KcLyRs',
    libraries,
  });
  const ref = useRef();
  const { getTaskId } = props;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', checkIfClickedOutside);
    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [isMenuOpen]);

  const [selected, setSelected] = useState(null);
  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);
  const panTo = useCallback(({ lat, lng, zoomLevel = 14 }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(zoomLevel);
  }, []);
  if (!isLoaded) return 'Loading map';
  return (
    <div className="map-container">
      <FunctionBar>
        <MenuContainer>
          <Button variant="mapDropdownButton" onClick={() => setIsMenuOpen(true)}>
            Near Me
          </Button>
          {isMenuOpen && (
            <DropDownMenu>
              <DropDownMenuList ref={ref}>
                <DropDownMenuListItem>
                  <Button
                    variant="mapDropdown"
                    onClick={() => {
                      navigator.geolocation.getCurrentPosition(
                        (position) => {
                          panTo({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                            zoomLevel: 16,
                          });
                        },
                        () => null,
                      );
                    }}
                  >
                    10KM
                  </Button>
                </DropDownMenuListItem>
                <DropDownMenuListItem>
                  <Button
                    variant="mapDropdown"
                    onClick={() => {
                      navigator.geolocation.getCurrentPosition(
                        (position) => {
                          panTo({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                            zoomLevel: 14,
                          });
                        },
                        () => null,
                      );
                    }}
                  >
                    50KM
                  </Button>
                </DropDownMenuListItem>
                <DropDownMenuListItem>
                  <Button
                    variant="mapDropdown"
                    onClick={() => {
                      navigator.geolocation.getCurrentPosition(
                        (position) => {
                          panTo({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                            zoomLevel: 12,
                          });
                        },
                        () => null,
                      );
                    }}
                  >
                    100KM
                  </Button>
                </DropDownMenuListItem>
              </DropDownMenuList>
            </DropDownMenu>
          )}
        </MenuContainer>
        <Search panTo={panTo} />
      </FunctionBar>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        onLoad={onMapLoad}
      >
        {postcodeArr.map((position) => (
          <Marker
            key={position.taskId}
            position={{
              lat: position.latitude,
              lng: position.longitude,
              zoom: 12,
            }}
            onClick={() => {
              setSelected(position);
            }}
          />
        ))}
        {selected ? (
          <InfoWindow
            position={{
              lat: selected.latitude,
              lng: selected.longitude,
            }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <Router>
              <TaskInfoWindow>
                <TaskInfoWindowTop>
                  <TaskTitle onClick={() => getTaskId(selected.taskId)}>
                    <Link to={`/browse-tasks/${selected.taskId}`}>{selected.title}</Link>
                  </TaskTitle>
                  <PriceTage>${selected.price}</PriceTage>
                </TaskInfoWindowTop>
                <TaskInfoWindowBottom>
                  <TaskDetails>Description: {selected.details}</TaskDetails>
                </TaskInfoWindowBottom>
              </TaskInfoWindow>
            </Router>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
  // eslint-disable-next-line no-shadow
  function Search({ panTo }) {
    const {
      ready,
      value,
      suggestions: { status, data },
      setValue,
      clearSuggestions,
    } = usePlacesAutocomplete({
      requestOptions: {
        location: {
          lat: () => -33.86882,
          lng: () => 151.20929,
        },
        radius: 200 * 1000,
      },
    });
    return (
      <SearchBox>
        <Combobox
          onSelect={async (address) => {
            setValue(address, false);
            clearSuggestions();
            try {
              const results = await getGeocode({ address });
              const { lat, lng } = await getLatLng(results[0]);
              return panTo({ lat, lng });
            } catch (err) {
              return err;
            }
          }}
        >
          <ComboboxInput
            style={{ width: 180, height: 35 }}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            disabled={!ready}
            placeholder="Please enter an address"
          />
          <ComboboxPopover>
            <ComboboxList>
              {status === 'OK' &&
                data.map(({ id, description }) => <ComboboxOption key={id} value={description} />)}
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>
      </SearchBox>
    );
  }
}
