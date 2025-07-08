import { Avatar, Box, IconButton, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import AxiosInstance from '../helper/AxiosInstance'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [profileUser, setProfileUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    getProfile()
  }, [])

  async function getProfile() {
    try {
      let res = await AxiosInstance.get("/users")
      setProfileUser(res.data[0]);
    } catch (error) {
      console.error(error);
    }
  }

  const getInitials = (name) => {
    if (!name) return "";
    const nameSplit = name.trim().split(" ");
    if (nameSplit.length === 1) return nameSplit[0][0];
    return nameSplit[0][0] + nameSplit[1][0];
  };

  if (!profileUser) return <Typography>Loading...</Typography>

  return (
    <>
      <Box sx={{ width: "100%", height: "90vh", marginTop: "8.8vh", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Box sx={{ display: "flex", alignItems: "center", width: "80%", justifyContent: "flex-start", mb: 2,mt:2 }}>
          <IconButton onClick={() => navigate("/")}>
            <KeyboardBackspaceIcon sx={{ color: "rgba(39,42,75,255)", fontSize: "3vh" }} />
          </IconButton>
          <Typography sx={{ fontSize: "2.5vh",color:"rgba(39,42,75,255)", fontWeight: "bold", marginLeft: "1vh" }}>
            Welcome, {profileUser.name}
          </Typography>

        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", padding: "4vh", height: "85%", borderRadius: "1vh", width: "75vw" }}>
          <Box sx={{display:"flex",justifyContent:"center",flexDirection:"column",width:"95%",padding:"5vh"}}>
          <Box sx={{ display: "flex", alignItems: "center", width: "25%", justifyContent: "space-between", mb: 3 }}>
            <Avatar sx={{ bgcolor: 'rgba(249,249,249,255)', color: "rgba(39,42,75,255)", width: 80, height: 80, fontSize: '2rem', fontWeight: 'bold' }}>
              {getInitials(profileUser.name)}
            </Avatar>
            <Box sx={{marginLeft:"1vh"}}>
            <Typography variant="h5" sx={{ fontSize: "3vh", fontWeight: "bold",color:"rgba(39,42,75,255)" }}>
              {profileUser.name}
            </Typography>
            <Typography sx={{ fontSize: "2vh",textAlign:"start", color:"gray", }}>
           {profileUser.email}
          </Typography>
          </Box>
          </Box>

          
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
              <Typography sx={{color:"gray"}}>User ID</Typography>
              <Box sx={{ backgroundColor: "#f5f5f5",marginLeft:"1vh",marginTop:"1vh", width: "80%", height: "4vh", padding: "1vh 2vh", borderRadius: "0.5vh", boxShadow: "0 2px 6px rgba(0,0,0,0.1)", mb: 3 }}>
                <Typography sx={{color: "rgba(39,42,75,255)",}}>{profileUser.id}</Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
              <Typography sx={{color:"gray"}}>Name</Typography>
              <Box sx={{ backgroundColor: "#f5f5f5",marginLeft:"1vh",marginTop:"1vh",  width: "80%", height: "4vh", padding: "1vh 2vh", borderRadius: "0.5vh", boxShadow: "0 2px 6px rgba(0,0,0,0.1)", mb: 3 }}>
                <Typography sx={{color: "rgba(39,42,75,255)",}}>{profileUser.name}</Typography>
              </Box>
            </Box>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
              <Typography sx={{color:"gray"}}>Email ID</Typography>
              <Box sx={{ backgroundColor: "#f5f5f5",marginLeft:"1vh",marginTop:"1vh",  width: "80%", height: "4vh", padding: "1vh 2vh", borderRadius: "0.5vh", boxShadow: "0 2px 6px rgba(0,0,0,0.1)", mb: 3 }}>
                <Typography sx={{color: "rgba(39,42,75,255)",}}>{profileUser.email}</Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
              <Typography sx={{color:"gray"}}>Address</Typography>
              <Box sx={{ backgroundColor: "#f5f5f5",marginLeft:"1vh",marginTop:"1vh",  width: "80%", height: "4vh", padding: "1vh 2vh", borderRadius: "0.5vh", boxShadow: "0 2px 6px rgba(0,0,0,0.1)", mb: 3 }}>
                <Typography sx={{color: "rgba(39,42,75,255)",}}>{profileUser.address?.street}</Typography>
              </Box>
            </Box>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
              <Typography sx={{color:"gray"}}>Phone</Typography>
              <Box sx={{ backgroundColor: "#f5f5f5",marginLeft:"1vh",marginTop:"1vh", width: "40%", height: "4vh", padding: "1vh 2vh", borderRadius: "0.5vh", boxShadow: "0 2px 6px rgba(0,0,0,0.1)", mb: 3 }}>
                <Typography sx={{color: "rgba(39,42,75,255)",}}>{profileUser.phone}</Typography>
              </Box>
            </Box>
          </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Profile
