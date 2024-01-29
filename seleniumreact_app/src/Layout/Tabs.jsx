
import { Tab, Tabs as MuiTabs } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';

export const Tabs = styled((props) => {
	const { className } = props;
	const navigate = useNavigate();
	const location = useLocation();

	

	return (
		<div className={className}>
			<MuiTabs
				// value={TABS_BY_ROUTES[location.pathname]}
				// onChange={handleTabChange}
				variant='fullWidth'>
				<Tab label='Funcational' />
				<Tab label='Api' />
				<Tab label='Performance' />
			</MuiTabs>
		</div>
	);
})``;