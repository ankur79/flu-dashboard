import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import L from "leaflet";
import GEOJSON from "./stateData.json";
import txs from "./texas.json";
import mi from "./michigan.json";
import michigan from "./michigan.json";
import county from "./country.json";

var info = L.control();
export default class MapView extends Component {
  state = {
    lat: 37.8,
    lng: -96,
    zoom: 4,
    data: [],
    stateData: [],
    defaultView: "country",
    crumbs: ["USA"]
  };
  componentDidMount() {
    this.addCountryMap();
    this.addTileLayer();
  }
  getColor(d) {
    return d > 1000
      ? "#800026"
      : d > 500
        ? "#BD0026"
        : d > 200
          ? "#E31A1C"
          : d > 100
            ? "#FC4E2A"
            : d > 50
              ? "#FD8D3C"
              : d > 20
                ? "#FEB24C"
                : d > 10
                  ? "#FED976"
                  : "#FFEDA0";
  }
  style(feature) {
    return {
      fillColor: this.getColor(feature.properties.density),
      weight: 2,
      opacity: 1,
      color: "white",
      dashArray: "3",
      fillOpacity: 0.7
    };
  }
  highlightFeature(feature, layer) {
    //var layer = e.target;
    this.refs.map.leafletElement.eachLayer(layer => {
      //console.log(layer);
    });
    layer.setStyle({
      weight: 5,
      color: "#666",
      dashArray: "",
      fillOpacity: 0.7
    });
    info.update(layer.feature.properties);
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
    }
  }
  resetHighlight(feature, layer) {
    layer.setStyle({
      weight: 2,
      opacity: 1,
      color: "white",
      dashArray: "3",
      fillOpacity: 0.7
    });
    info.update();
    //geojson.resetStyle(e.target);
  }
  addCountryMap() {
    L.geoJSON(GEOJSON.features, {
      onEachFeature: (feature, layer) => this.onEachFeature(feature, layer),
      style: feature => this.style(feature)
    }).addTo(this.refs.map.leafletElement);
    this.infoControl();
    this.displayLegend();
  }
  addStateMap(stateName) {
    const _stateName = stateName.toLowerCase();  
    //console.log(_stateName)
    //console.log(Object[_stateName])
    //fetch(`${_stateName}.json`).then(function(response) {return response;}).then(function(myJson) {console.log(myJson);});
    

    L.geoJSON(txs.features, {
      onEachFeature: (feature, layer) => this.onEachStateFeature(feature, layer)
    }).addTo(this.refs.map.leafletElement);
    this.addTileLayer();
    let crumbs = this.state.crumbs;
    crumbs.push("Texas");
    this.setState({ crumbs: crumbs });
    this.buildCrumbs();
  }
  addPointers() {
    var geojsonMarkerOptions = {};
    L.geoJSON(county.features, {
      pointToLayer: function(feature, latlng) {
        return L.marker(latlng, geojsonMarkerOptions);
      }
    }).addTo(this.refs.map.leafletElement);
    //L.geoJSON(county.features).addTo(this.refs.map.leafletElement);
    this.addTileLayer();

    let crumbs = this.state.crumbs;
    crumbs.push("County");
    this.setState({ crumbs: crumbs });
    this.buildCrumbs();
  }
  zoomToFeature(feature, layer) {
    this.refs.map.leafletElement.fitBounds(layer.getBounds());
    this.refs.map.leafletElement.eachLayer(layer => {
      this.refs.map.leafletElement.removeLayer(layer);
    });
    //console.log(feature)
    if (this.state.defaultView === "state") {
      this.addPointers();
      this.setState({ defaultView: "county" });
    }
    if (this.state.defaultView === "country") {
      this.addStateMap(feature.properties.name);
      this.setState({ defaultView: "state" });
    }
  }
  onEachFeature(feature, layer) {
    layer.on({
      mouseover: this.highlightFeature.bind(this, feature, layer),
      mouseout: this.resetHighlight.bind(this, feature, layer),
      click: this.zoomToFeature.bind(this, feature, layer)
    });
  }
  onEachStateFeature(feature, layer) {
    layer.on({
      click: this.zoomToFeature.bind(this, feature, layer)
    });
  }
  addTileLayer() {
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {}).addTo(
      this.refs.map.leafletElement
    );
  }
  buildCrumbs() {
    let crumbList = "";
    this.state.crumbs.forEach((item, index) => {
      if (index > 0) {
        crumbList += ` > ${item}`;
      } else {
        crumbList += item;
      }
    });
    this.props.breadCrumbs(crumbList);
  }
  infoControl() {
    info.onAdd = function() {
      this._div = L.DomUtil.create("div", "info"); // create a div with a class "info"
      this.update();
      return this._div;
    };

    // method that we will use to update the control based on feature properties passed
    info.update = function(props) {
      this._div.innerHTML =
        "<h4>US Flu Data</h4>" +
        (props
          ? "<b>" + props.name + "</b><br />" + props.density + " flu cases"
          : "Hover over a state");
    };

    info.addTo(this.refs.map.leafletElement);
  }
  displayLegend() {
    var legend = L.control({ position: "bottomright" });

    legend.onAdd = () => {
      var div = L.DomUtil.create("div", "info legend"),
        grades = [0, 10, 20, 50, 100, 200, 500, 1000],
        labels = [];

      // loop through our density intervals and generate a label with a colored square for each interval
      for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
          '<i style="background:' +
          this.getColor(grades[i] + 1) +
          '"></i> ' +
          grades[i] +
          (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
      }

      return div;
    };

    legend.addTo(this.refs.map.leafletElement);
  }
  render() {
    const position = [this.state.lat, this.state.lng];
    return <Map center={position} zoom={this.state.zoom} ref="map" />;
  }
}
