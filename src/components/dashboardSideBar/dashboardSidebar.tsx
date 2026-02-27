import { AppBar, Box, CssBaseline, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField, Toolbar, Typography } from "@mui/material";

export default function DashboardContainerComponents() {
  
  
  return (
    <Box >
      <CssBaseline />
      <AppBar  sx={{ zIndex: (theme) => theme.zIndex.drawer + 1  }}>
        <Toolbar sx={{display:'flex', flexDirection:"row", gap:'30px'}}>
          <Typography variant="h5">💼
            داشبورد
          </Typography>
          <Box sx={{ width: 800, maxWidth: '100%' , ml:'55vh' }}>
      <TextField  fullWidth label="جستجو" id="fullWidth" />
    </Box>
    <Box>
      <Typography variant="h4" sx={{ml:"30vh"}} >مدیریت کاربران</Typography>
    </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {  boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{width:'45vh',}}>
          <List>
            {['کاربران', 'تسک ها'].map((text) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
      <Box >
        <Toolbar />
        
      </Box>
    </Box>
  );
}