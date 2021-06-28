import React from 'react';
import Tilty from 'react-tilty';
import './Logo.css'
import brain from './logo.png'

const Logo = () => {
	return (
		<div className='ma4 mt0'>
			<Tilty className='br2 shadow-2' reverse axis="x" scale={1.0} perspective={900} reset={true}>
				<div className='Tilt-inner pa3'>
					<img src={brain} alt='brain-logo' style={{paddingTop: '5px'}} />
				</div>
			</Tilty>
		</div>
	);
}

export default Logo;


