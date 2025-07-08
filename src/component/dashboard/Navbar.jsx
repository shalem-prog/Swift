import { AppBar, Avatar, Box, Button, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AxiosInstance from '../helper/AxiosInstance'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const [profileUser, setProfileUser] = useState(null)
    const navigate = useNavigate()


    useEffect(() => {
        getProfile()
    }, [])

    async function getProfile() {
        try {
            let res = await AxiosInstance.get("/users")
            setProfileUser(res.data[0]);
            console.log("Fetched profile user:", res.data[0]);
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

    const handleProfileClick = () => {
        navigate("/profile");
    };

    return (
        <>
            <AppBar sx={{ backgroundColor: "rgba(39,42,75,255)", borderRadius: "0px", }}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between", width: "95%", marginLeft: "2vh", marginRight: "4vh" }}>
                    <Box sx={{display:"flex",alignItems:"center"}}>
                        {/* <img src="/swift1.jpg" alt="Swift Logo" style={{ backgroundColor: 'transparent', maxWidth: '15%', height: 'auto', display: 'block', }} /> */}
                        <img src="/st.webp" alt="Swift Logo" style={{ maxWidth: '100%', height: '4vh', display: 'block', }} />
                        <Typography>WIFT</Typography>
                    </Box>
                    <Box onClick={handleProfileClick} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "11%", }}>
                        <Avatar sx={{ bgcolor: 'rgba(254,254,254,255)', color: "rgba(99,110,117,255)", width: 40, height: 40, fontSize: '1rem', fontWeight: 'bold', }}>{getInitials(profileUser?.name)}</Avatar>
                        <Typography sx={{ color: "rgba(254,254,254,255)", }}>{profileUser?.name || ""}</Typography>
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar
