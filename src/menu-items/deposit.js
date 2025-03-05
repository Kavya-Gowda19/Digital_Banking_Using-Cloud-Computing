// assets
import { IconKey } from '@tabler/icons';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
// constant
const icons = {
  IconKey,
  AddToPhotosIcon
};

const deposit = {
  id: 'mdeposit',
  title: 'Deposit',
  type: 'group',
  children: [
    {
      id: 'add-deposit',
      title: 'Manage Deposit',
      type: 'item',
      url: '/mdeposit/add-deposit',
      icon: icons.AddToPhotosIcon,
      breadcrumbs: false
    }

  ]
};

export default deposit;
