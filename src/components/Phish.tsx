import * as React from "react";
import * as moment from "moment";
import { countries } from "typed-countries";
import { find } from "lodash";

export interface PhishProps {
    id: number;
    time: string;
    url: string;
    target: string;
    country: string;
    onHover: Function;
    onMouseOut: Function;
    onCountryClick: Function;
    onTargetClick: Function;
}

export class Phish extends React.Component<PhishProps, any> {
    constructor(props: PhishProps) {
        super(props)
    
        // This binding is necessary to make `this` work in the callback
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
        this.handleCountryClick = this.handleCountryClick.bind(this);
        this.handleTargetClick = this.handleTargetClick.bind(this);
    }

    public handleMouseOver(): void {
        this.props.onHover(this.props.id);
    }

    public handleMouseOut(): void {
        this.props.onMouseOut();
    }

    public handleCountryClick(): void {
        this.props.onCountryClick(this.props.country);
    }

    public handleTargetClick(): void {
        this.props.onTargetClick(this.props.target);
    }

    public getCountryName(countryCode: string): string {
        return find(countries, { "iso": countryCode }).name
    }

    public render() {
        return (
            <div className="phish" onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
                <span className="phish_time">
                    <strong>{moment(this.props.time).format('YYYY/MM/DD - HH:mm:ss')}</strong>
                </span><br />
                <span className="phish_url">
                    <small><a href={this.props.url}>{this.props.url}</a></small>
                </span><br />
                <span className="target pull-left" onClick={this.handleTargetClick}>
                    <small>
                        <strong>
                            <a className="filter-link" href='#' onClick={this.handleTargetClick}>{this.props.target}</a>
                        </strong>
                    </small>
                </span>
                <span className="country pull-right">
                    <small>
                        <strong>
                            <a className="filter-link" href='#' onClick={this.handleCountryClick}>{this.getCountryName(this.props.country)}</a>
                        </strong>
                    </small>
                </span>
            </div>
        )
    }
}