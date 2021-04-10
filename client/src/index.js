import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { PodcastProvider } from './context/PodcastContext';

ReactDOM.render(
	<PodcastProvider value={1}>
		<App />
	</PodcastProvider>,
	document.getElementById('root')
);
