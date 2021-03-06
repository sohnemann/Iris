
import React, { memo } from 'react';
import Link from './Link';

export default memo((props) => {

	var to = null;
	var uri = props.uri;
	if (!props.unencoded){
		uri = encodeURIComponent(uri);
	}

	switch (props.type){			
		case 'playlist':
			to = '/playlist/'+uri;
			break;
		
		case 'artist':
			to = '/artist/'+uri;
			break;

		case 'album':
			to = '/album/'+uri;
			break;

		case 'track':
			to = '/track/'+uri;
			break;

		case 'user':
			to = '/user/'+uri;
			break;

		case 'browse':
			to = '/library/browse/'+uri;
			break;

		case 'recommendations':
			to = '/discover/recommendations/'+uri;
			break;

		case 'search':
			var exploded = uri.split('%3A');
			to = '/search/'+exploded[1]+'/'+exploded[2];
			break;

		default:
			to = null;
	}

	if (uri){
		return (
			<Link 
				className={props.className ? props.className : null} 
				to={to}
				onContextMenu={e => (props.handleContextMenu ? props.handleContextMenu(e) : null)}>
					{props.children}
			</Link>
		);
	} else {
		return (
			<span className={props.className ? props.className : null}>
				{props.children}
			</span>
		);
	}
});