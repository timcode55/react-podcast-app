import React, { createContext, useState } from 'react';

export const PodcastContext = createContext();

export const PodcastProvider = (props) => {
	const [ state, setState ] = useState([ {} ]);
	return <PodcastContext.Provider value={[ state, setState ]}>{props.children}</PodcastContext.Provider>;
};

export default PodcastContext;
