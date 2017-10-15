import * as React from "react"
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLng, Icon } from 'leaflet';
import { isEmpty, map } from "lodash";
import * as moment from "moment";

const stamenTonerTiles = 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.png';
const stamenTonerAttr = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';

Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export interface PhishMapProps {
    phishlist: Array<any>
}
export interface PhishMapState {
    lat: number,
    lon: number,
    zoom: number
}

export class PhishMap extends React.Component<PhishMapProps, PhishMapState> {
    constructor() {
        super();
        this.state = {
            lat: 20,
            lon: 10,
            zoom: 3
        };
    }

    public render() {
        let center = new LatLng(this.state.lat, this.state.lon);
        var that = this;
        let markers = (!isEmpty(this.props.phishlist)) ? (
            <div>
            {
                map(this.props.phishlist, function (phish, index) {
                    return (
                        <Marker key={phish.phish_id} position={new LatLng(phish.lat, phish.lon)}>
                            <Popup>
                                <span>
                                    {moment(phish.submission_time).format('YYYY/MM/DD - HH:mm:ss')}<br />
                                    <a href={phish.url}>{phish.url}</a><br />
                                    Target: {phish.target}<br />
                                </span>
                            </Popup>
                        </Marker>    
                    );       
                })        
            }
            </div>
        ) : null;

        return (
            <div>
                <Map
                    center={center}
                    zoom={this.state.zoom}
                >
                    <TileLayer
                        attribution={stamenTonerAttr}
                        url={stamenTonerTiles}
                    />
                    {markers}
               </Map>
            </div>
        )
    }
}