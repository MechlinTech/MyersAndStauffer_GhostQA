import { styled } from '@mui/material/styles';

export const LockIcon = styled((props) => {
	const { className } = props;

	return (
		<div className={className}>
			<svg
				width='18'
				height='18'
				viewBox='0 0 18 18'
				fill='none'>
				<path
					d='M14.2346 7.76829C14.2898 7.45232 14.3202 7.12728 14.3202 6.795C14.3202 3.77436 11.9337 1.31665 9.00039 1.31665C6.06691 1.31665 3.68029 3.77436 3.68029 6.795C3.68029 7.12728 3.71085 7.45206 3.76615 7.76829C3.30424 8.06328 2.99707 8.57907 2.99707 9.16815V14.5312C2.99707 15.4486 3.74077 16.1922 4.65786 16.1922H13.3428C14.2596 16.1922 15.0032 15.4486 15.0032 14.5312H15.0037V9.16815C15.0037 8.5792 14.6968 8.06328 14.2346 7.76829ZM9.73321 12.4511V13.6166C9.73321 14.0217 9.40507 14.3498 9.00014 14.3498C8.5952 14.3498 8.26706 14.0217 8.26706 13.6166V12.4506C7.79685 12.1915 7.4779 11.6915 7.4779 11.1166C7.4779 10.2759 8.15944 9.59419 9.00039 9.59419C9.84134 9.59419 10.523 10.2759 10.523 11.1166C10.523 11.6918 10.2038 12.1921 9.73321 12.4511ZM12.2961 7.5071H5.70458C5.65939 7.27724 5.6353 7.03884 5.6353 6.795C5.6353 4.85216 7.14484 3.27166 9.00039 3.27166C10.8558 3.27166 12.3652 4.85203 12.3652 6.795C12.3652 7.03884 12.3414 7.27724 12.2961 7.5071Z'
					fill='#737373'
				/>
			</svg>
		</div>
	);
})`
	display: flex;
`;