import React from 'react';
import { LockBody, Picture, ReleaseBody, Spinner } from './styles/loading';

const Loading = ({ src, ...restProps }) => {
	return (
		<Spinner {...restProps}>
			<LockBody />
			<Picture src={`/images/users/${src}.png`} data-testid='loading-picture' />
		</Spinner>
	);
};

Loading.ReleaseBody = function LoadingReleaseBody() {
	return <ReleaseBody />;
};

export default Loading;
