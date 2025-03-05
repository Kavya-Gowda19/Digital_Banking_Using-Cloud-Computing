// assets
import { IconKey } from '@tabler/icons';
import RemoveIcon from '@mui/icons-material/Remove'; // Import the minus icon

// constant
const icons = {
  IconKey,
  RemoveIcon // Use the minus icon here
};

const withdraw = {
  id: 'mwithdraw',
  title: 'Withdraw',
  type: 'group',
  children: [
    {
      id: 'add-withdraw',
      title: 'Manage Withdraw',
      type: 'item',
      url: '/mwithdraw/add-withdraw',
      icon: icons.RemoveIcon, // Use the minus icon here
      breadcrumbs: false
    }
  ]
};

export default withdraw;
