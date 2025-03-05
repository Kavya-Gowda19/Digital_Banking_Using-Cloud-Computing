// assets
import { IconKey } from '@tabler/icons';
import MenuBookIcon from '@mui/icons-material/MenuBook'; // Import the book icon

// constant
const icons = {
  IconKey,
  MenuBookIcon // Use the book icon here
};

const account = {
  id: 'maccount',
  title: 'Account',
  type: 'group',
  children: [
    {
      id: 'view-account',
      title: 'Manage Account',
      type: 'item',
      url: '/maccount/view-account',
      icon: icons.MenuBookIcon, // Use the book icon here
      breadcrumbs: false
    }
  ]
};

export default account;
