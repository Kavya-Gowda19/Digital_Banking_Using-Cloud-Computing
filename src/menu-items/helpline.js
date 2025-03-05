import { IconKey } from '@tabler/icons';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark'; // New icon

// constant
const icons = {
  IconKey,
  AddToPhotosIcon,
  QuestionMarkIcon // Add new icon here
};

const helpline = {
    id: 'mhelpline',
    title: 'Quaries',
    type: 'group',
    children: [
      {
        id: 'view-helpline',
        title: 'Manage Quaries',
        type: 'item',
        url: '/mhelpline/view-helpline',
        icon: icons.QuestionMarkIcon, // Use the new icon
        breadcrumbs: false
      }
    ]
  };
  
  export default helpline;
  


