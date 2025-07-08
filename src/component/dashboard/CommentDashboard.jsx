import { Box, Button, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Select, MenuItem, } from "@mui/material";
import React, { useEffect, useState } from "react";
import AxiosInstance from "../helper/AxiosInstance";
import { IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import SearchIcon from '@mui/icons-material/Search';

const CommentDashboard = () => {
  const [comments, setComments] = useState([]);
  const [searchTerm, setSearchTerm] = useState(localStorage.getItem("searchTerm") || "");
  const [sortField, setSortField] = useState(localStorage.getItem("sortField") || "");
  const [sortOrder, setSortOrder] = useState(localStorage.getItem("sortOrder") || "none");
  const [page, setPage] = useState(Number(localStorage.getItem("page")) || 1);
  const [pageSize, setPageSize] = useState(Number(localStorage.getItem("pageSize")) || 10);

  useEffect(() => {
    getComments();
  }, []);

  useEffect(() => {
    localStorage.setItem("searchTerm", searchTerm);
    localStorage.setItem("sortField", sortField);
    localStorage.setItem("sortOrder", sortOrder);
    localStorage.setItem("page", page);
    localStorage.setItem("pageSize", pageSize);
  }, [searchTerm, sortField, sortOrder, page, pageSize]);

  async function getComments() {
    try {
      const { data } = await AxiosInstance.get("/comments");
      setComments(data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSort = (field) => {
    if (sortField !== field) {
      setSortField(field);
      setSortOrder("asc");
    } else {
      if (sortOrder === "none") {
        setSortOrder("asc");
      } else if (sortOrder === "asc") {
        setSortOrder("desc");
      } else if (sortOrder === "desc") {
        setSortOrder("none");
        setSortField("");
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setPage(1);
  };


  const filtered = comments.filter((item) => {
    const term = searchTerm.toLowerCase();
    return (
      item.name.toLowerCase().includes(term) ||
      item.email.toLowerCase().includes(term) ||
      (item.phone && item.phone.toLowerCase().includes(term))
    );
  });


  const sorted = [...filtered].sort((a, b) => {
    if (sortOrder === "none" || !sortField) return 0;
    if (a[sortField] < b[sortField]) return sortOrder === "asc" ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });


  const totalPages = Math.ceil(sorted.length / pageSize);
  const paginated = sorted.slice((page - 1) * pageSize, page * pageSize);

  const nextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <Box sx={{ width: "100%", height: "100vh", marginTop: "8.8vh", display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
      <Box sx={{ display: "flex", flexDirection: "column", width: "80%", marginTop: "4vh" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2, }}>
          <Box sx={{ width: "55%", display: "flex", gap: 1, alignItems: "center" }}>
            <Button variant="contained" sx={{ height: "78%", backgroundColor: "white", color: "black", width: "22%", fontSize: "2vh", textTransform: "capitalize", display: "flex", justifyContent: "space-between" }} onClick={() => handleSort("postId")}>Sort PostID <UnfoldMoreIcon sx={{ ml: 1, }} /></Button>
            <Button variant="contained" sx={{ height: "78%", backgroundColor: "white", color: "black", width: "22%", fontSize: "2vh", textTransform: "capitalize", display: "flex", justifyContent: "space-between" }} onClick={() => handleSort("name")}>Sort Name <UnfoldMoreIcon sx={{ ml: 1 }} /></Button>
            <Button variant="contained" sx={{ height: "78%", backgroundColor: "white", color: "black", width: "22%", fontSize: "2vh", textTransform: "capitalize", display: "flex", justifyContent: "space-between" }} onClick={() => handleSort("email")}>Sort Email <UnfoldMoreIcon sx={{ ml: 1 }} /></Button>
          </Box>

          <Box sx={{ position: "relative", marginRight: "3vh", display: "flex", alignItems: "center" }}>
            <SearchIcon sx={{ position: "absolute", left: "10px", color: "gray" }} />
            <input
              type="text"
              placeholder="Search name,email,comment,phone..."
              value={searchTerm}
              onChange={handleSearchChange}
              style={{ padding: "8px 8px 8px 35px", outline: "none", backgroundColor: "#ffffff", borderRadius: "4px", border: "2px solid #ccc", width: "18vw", height: "70%", fontSize: "1rem", color: "#000" }}
            />
          </Box>

        </Box>

        <TableContainer sx={{  maxHeight: "70vh", borderRadius: "1vh" }}>
          <Table stickyHeader sx={{ tableLayout: "fixed", width: "100%" }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ textAlign: "center", fontWeight: "bold", backgroundColor: "rgba(204,204,214,255)", color: "rgb(39,42,75,255)", width: "0%", }}>Post ID</TableCell>
                <TableCell sx={{ textAlign: "start", fontWeight: "bold", backgroundColor: "rgba(204,204,214,255)", color: "rgb(39,42,75,255)", width: "0%", }}>Name</TableCell>
                <TableCell sx={{ textAlign: "start", fontWeight: "bold", backgroundColor: "rgba(204,204,214,255)", color: "rgb(39,42,75,255)", width: "0%", }}>Email</TableCell>
                <TableCell sx={{ textAlign: "start", fontWeight: "bold", backgroundColor: "rgba(204,204,214,255)", color: "rgb(39,42,75,255)", width: "0%", }}>Comment</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginated.map((val, index) => (
                <TableRow key={index} hover sx={{ backgroundColor: "#ffffff", "&:hover": { backgroundColor: "lightgray" } }}>
                  <TableCell sx={{ textAlign: "center", fontSize: "12px", width: "0%",padding:"1.7vh"  }}>{val.postId}</TableCell>
                  <TableCell sx={{ textAlign: "start", fontSize: "12px", width: "0%",padding:"1.7vh"  }}><Box sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{val.name}</Box></TableCell>
                  <TableCell sx={{ textAlign: "start", fontSize: "12px", width: "0%",padding:"1.7vh"}}><Box sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{val.email}</Box></TableCell>
                  <TableCell sx={{ textAlign: "center", fontSize: "12px", width: "0%",padding:"1.7vh" }}><Box sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{val.body}</Box></TableCell>
                </TableRow>
              ))}
              {paginated.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} sx={{ textAlign: "center" }}>
                    No results found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", mt: 2 }}>
          <IconButton onClick={prevPage} disabled={page === 1}>
            <ArrowBackIosNewIcon />
          </IconButton>
          <Box sx={{ mx: 1 }}>
            Page {page} of {totalPages}
          </Box>
          <IconButton onClick={nextPage} disabled={page === totalPages}>
            <ArrowForwardIosIcon />
          </IconButton>
          <Box>
            <Select value={pageSize} onChange={handlePageSizeChange}>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
            </Select>
          </Box>
        </Box>

      </Box>

    </Box>
  );
};

export default CommentDashboard;
