// Home.js

import React, { Component } from 'react';
import background from '../assets/eCommerce.jpg'

export default class Home extends Component {
    render() {

        return (
            <div style={{ backgroundImage: `url(${background})`, height: '93%', backgroundSize: 'contain', display: 'flex', justifyContent: 'center', alignItems: 'center', width:'100%' }}>

                <div style={{ color: 'white', height: '25%', width: '50%', textAlign:'center', fontSize:'3em' }}>
                    <h1>
                        Bienvenu sur notre application test
                    </h1>
                </div>
            </div>
        );
    }
}