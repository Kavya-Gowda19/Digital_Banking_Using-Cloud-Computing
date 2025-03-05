import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { ButtonBase, Link, Tooltip } from '@mui/material';

// project imports
import Avatar from '../extended/Avatar';

// ==============================|| CARD SECONDARY ACTION ||============================== //

const CardSecondaryAction = ({ title, link, icon }) => {
  const theme = useTheme();

  return (
    <Tooltip title={title || 'Reference'} placement="left">
      <ButtonBase disableRipple>
        {!icon && (
          <Avatar component={Link} href={link} target="_blank" alt="MUI Logo" size="badge" color="primary" outline>
          <svg width="92" height="32" viewBox="0 0 92 32" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M33.085 26.4841V12.3839H37.9541C39.6408 12.3839 40.9202 12.7131 41.7922 13.3717C42.6642 14.0237 43.1002 14.9825 43.1002 16.2478C43.1002 16.9387 42.9251 17.5488 42.5751 18.0782C42.225 18.6011 41.7381 18.9853 41.1143 19.2306C41.8272 19.4114 42.3873 19.7761 42.7947 20.3249C43.2084 20.8737 43.4152 21.5452 43.4152 22.3392C43.4152 23.695 42.9888 24.7215 42.1359 25.4188C41.283 26.1161 40.0673 26.4712 38.4888 26.4841H33.085Z"
        fill={theme.palette.grey[900]}
      />
      <path
        d="M10.987 31.5841C4.92849 31.5841 0 26.626 0 20.5323C0 14.4385 4.92899 9.48041 10.987 9.48041C17.045 9.48041 21.974 14.4385 21.974 20.5323C21.974 26.626 17.0459 31.5841 10.987 31.5841Z"
        fill={theme.palette.primary.main}
      />
      {/* Add additional path elements here with similar structure */}
    </svg>
          </Avatar>
        )}
        {icon && (
          <Avatar component={Link} href={link} target="_blank" size="badge" color="primary" outline>
            {icon}
          </Avatar>
        )}
      </ButtonBase>
    </Tooltip>
  );
};

CardSecondaryAction.propTypes = {
  icon: PropTypes.node,
  link: PropTypes.string,
  title: PropTypes.string
};

export default CardSecondaryAction;
