import './App.css';
import CommentDashboard from './component/dashboard/CommentDashboard';
import { Routes,Route } from 'react-router-dom';
import Navbar from './component/dashboard/Navbar';
import { Box } from '@mui/material';
import Profile from './component/dashboard/Profile';

function App() {
  return (
   <>
     <Box>
     <Navbar/>
      <Routes>
        <Route path="/" element={<CommentDashboard/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
      </Box>
   </>
  );
}

export default App;
