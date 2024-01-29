import { styled } from '@mui/material/styles';

export const DeleteIcon = styled((props) => {
	const { className } = props;

	return (
		<div className={className}>
			<svg
				width='30'
				height='30'
				viewBox='0 0 18 18'
				fill='none'>
				<path
					d='M5.25 15.75C4.8375 15.75 4.48425 15.603 4.19025 15.309C3.89625 15.015 3.7495 14.662 3.75 14.25V4.5H3V3H6.75V2.25H11.25V3H15V4.5H14.25V14.25C14.25 14.6625 14.103 15.0157 13.809 15.3097C13.515 15.6038 13.162 15.7505 12.75 15.75H5.25ZM6.75 12.75H8.25V6H6.75V12.75ZM9.75 12.75H11.25V6H9.75V12.75Z'
					fill='#654DF7'
				/>
			</svg>
		</div>
	);
})`
	display: flex;
`;
