import React, { PureComponent } from "react";
import { PropTypes } from "prop-types";
import { withGoogleMap, GoogleMap, Circle, Polygon } from "react-google-maps";
import SearchBox from "react-google-maps/lib/components/places/SearchBox";
import { Row, Col } from "reactstrap";
// import geolib from "geolib";
import _ from "lodash";

const INPUT_STYLE = {
  boxSizing: `border-box`,
  MozBoxSizing: `border-box`,
  border: `1px solid transparent`,
  width: `240px`,
  height: `30px`,
  marginTop: `10px`,
  padding: `0 12px`,
  borderRadius: `1px`,
  boxShadow: `0 5px 6px rgba(0, 0, 0, 0.3)`,
  fontSize: `14px`,
  outline: `none`,
  textOverflow: `ellipses`
};

const SearchBoxExampleGoogleMap = withGoogleMap(props => {
  return (
    <GoogleMap
      ref={props.onMapMounted}
      defaultZoom={props.zoom}
      center={props.center}
      onBoundsChanged={props.onBoundsChanged}
      onClick={props.onMapClick}
    >
      <SearchBox
        ref={props.onSearchBoxMounted}
        bounds={props.bounds}
        controlPosition={google.maps.ControlPosition.TOP_LEFT}
        onPlacesChanged={props.onPlacesChanged}
      >
        <input
          type="text"
          placeholder="البحث عن المنطقة"
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `240px`,
            height: `32px`,
            marginTop: `10px`,
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`
          }}
        />
      </SearchBox>

      <Circle
        center={props.center}
        radius={props.radius}
        options={{
          fillColor: `red`,
          fillOpacity: 0.2,
          strokeColor: `red`,
          strokeOpacity: 1,
          strokeWeight: 1
        }}
      />
    </GoogleMap>
  );
});

export default class Maps extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      bounds: null,
      center:
        this.props.center && this.props.center.lat && this.props.center.lng
          ? this.props.center
          : this.props.defaultLocation,
      zoom: 15
    };
    this.handleMapMounted = this.handleMapMounted.bind(this);
    this.handleBoundsChanged = this.handleBoundsChanged.bind(this);
    this.handleSearchBoxMounted = this.handleSearchBoxMounted.bind(this);
    this.handlePlacesChanged = this.handlePlacesChanged.bind(this);
    this.handleMapClick = this.handleMapClick.bind(this);
    this.handleLocation = this.handleLocation.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.center) {
      this.setState({
        center: nextProps.center
      });
    }

    // if (nextProps.reset) {
    //   this.setState({
    //     center: {}
    //   });
    //   this.props.isClear(false);
    // }
  }

  handlePlacesChanged() {
    const places = this._searchBox.getPlaces();

    // Add a marker for each place returned from search bar
    const markers = places.map(place => ({
      position: place.geometry.location
    }));

    // Set markers; set map center to first search result
    const mapCenter =
      markers.length > 0 ? markers[0].position : this.state.center;

    this.setState({
      center: mapCenter,
      zoom: 18
    });
  }

  handleMapMounted(map) {
    this._map = map;
  }

  handleBoundsChanged() {
    // console.log(this._map.getCenter())
    this.setState({
      bounds: this._map.getBounds()
      // center: this._map.getCenter()
    });
  }

  handleSearchBoxMounted(searchBox) {
    this._searchBox = searchBox;
  }

  handleMapClick(event) {
    const path = { lat: event.latLng.lat(), lng: event.latLng.lng() };
    this.setState({
      center: path,
      zoom: 18
    });

    this.props.onChange(this.state);
  }

  handleLocation(event) {
    this.props.location(event);
  }

  render() {
    const props = this.props;
    return (
      <SearchBoxExampleGoogleMap
        containerElement={<div style={{ height: `450px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        center={this.state.center}
        zoom={this.state.zoom}
        paths={props.paths}
        radius={props.radius}
        onMapClick={this.handleMapClick}
        onMapMounted={this.handleMapMounted}
        onBoundsChanged={this.handleBoundsChanged}
        onSearchBoxMounted={this.handleSearchBoxMounted}
        bounds={this.state.bounds}
        onPlacesChanged={this.handlePlacesChanged}
        locatMe={this.locatMe}
      />
    );
  }
}
Map.propTypes = {
  center: PropTypes.object,
  defaultLocation: PropTypes.object,
  onChange: PropTypes.func,
  isClear: PropTypes.func,
  reset: PropTypes.bool
};
