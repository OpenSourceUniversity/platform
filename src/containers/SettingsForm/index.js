import React from 'react';
import {LernersSettings} from 'components/LernersSettings';
import AcademiaSettings from 'components/AcademiaSettings';

export default class SettingsForm extends React.Component {
	render() {
	  let settings = require('../../icons/account_settings.svg');

	  

    return (
    	<div>
    		<AcademiaSettings />
    	</div>
    );
	}
}