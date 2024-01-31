import { styled } from '@mui/material';

export const MenuIcon = styled((props) => {
	const { className } = props;

	return (
		<div className={className}>
			<svg
				width='24'
				height='24'
				viewBox='0 0 24 24'
				fill='none'>
				<path
					d='M12 12H12.01V12.01H12V12ZM12 5H12.01V5.01H12V5ZM12 19H12.01V19.01H12V19Z'
					stroke='#737373'
					strokeWidth='5'
					strokeLinejoin='round'
				/>
			</svg>
		</div>
	);
})`
	display: flex;
`;