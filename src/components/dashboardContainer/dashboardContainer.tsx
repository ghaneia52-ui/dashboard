// src/components/DashboardContainerComponents.tsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../store/store';
import { addTask, toggleTaskStatus, removeTask, Task } from '../../store/slice/addTaskSlice';
import type { Users } from '../../types/typeUsers';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Container,
  Divider,
  IconButton,
  Modal,
  Stack,
  Typography
} from "@mui/material";
import { useUsers } from '../../hooks/useUsers';

function DashboardContainerComponents() {
  const dispatch: AppDispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const [modalClick, setModalClick] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Users | null>(null);
  const [addTaskModal, setAddTaskModal] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDesc, setTaskDesc] = useState('');

  const { data, isLoading, isError } = useUsers();

  const handleClick = (user: Users) => {
    setSelectedUser(user);
    setModalClick(true);
  };

  const handleClose = () => {
    setModalClick(false);
    setSelectedUser(null);
  };

  const handleOpenAddTask = () => setAddTaskModal(true);
  const handleCloseAddTask = () => setAddTaskModal(false);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser || !taskTitle.trim()) return;
    dispatch(addTask({
      userId: selectedUser.id,
      title: taskTitle,
      description: taskDesc
    }));
    setTaskTitle('');
    setTaskDesc('');
    handleCloseAddTask();
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error!</p>;

  return (
    <Container fixed>
      <Box sx={{ bgcolor: '#cfe8fc', minHeight: '100vh' , ml:'15px', width:'160vh' }}>
        <Box sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" },
          gap: 4
        }}>
          {data?.map((user: Users) => (
            <Card key={user.id} sx={{ borderRadius: 4, overflow: "hidden", transition: "0.3s", boxShadow: "0 6px 20px rgba(0,0,0,0.06)" }}>
              <CardActionArea sx={{ flexGrow: 1, p: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                  <Avatar src={user.avatar} alt={user.name} sx={{ width: 95, height: 95, border: "4px solid #f1f5f9" }} />
                </Box>
                <CardContent sx={{ textAlign: "center", p: 0 }}>
                  <Typography variant="h6" fontWeight={700}>{user.name}</Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>{user.email}</Typography>
                </CardContent>
              </CardActionArea>
              <CardActions sx={{ justifyContent: "center", pb: 3 }}>
                <Button variant="contained" onClick={() => handleClick(user)}>تسک‌ها</Button>
              </CardActions>
            </Card>
          ))}
        </Box>

        {/* Modal نمایش تسک‌ها */}
        <Modal open={modalClick} onClose={handleClose}>
          <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 420, bgcolor: "background.paper", borderRadius: 4, boxShadow: 24, p: 3 }}>
            {selectedUser && (
              <>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar src={selectedUser.avatar} alt={selectedUser.name} sx={{ width: 60, height: 60 }} />
                    <Box>
                      <Typography variant="h6" fontWeight="bold">{selectedUser.name}</Typography>
                      <Typography variant="body2" color="text.secondary">{selectedUser.email}</Typography>
                    </Box>
                  </Stack>
                  <IconButton onClick={handleClose} />
                </Stack>

                <Divider sx={{ my: 2 }} />

                {/* نمایش لیست تسک‌ها */}
                <Box sx={{ maxHeight: 250, overflowY: 'auto', mb: 2 }}>
                  {tasks.filter(task => task.userId === selectedUser.id).map(task => (
                    <Box key={task.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography sx={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.title}</Typography>
                      <Stack direction="row" spacing={1}>
                        <Button size="small" onClick={() => dispatch(toggleTaskStatus(task.id))}>
                          {task.completed ? 'در حال انجام شدن' : 'انجام شده'}
                        </Button>
                        <Button size="small" color="error" onClick={() => dispatch(removeTask(task.id))}>حذف</Button>
                      </Stack>
                    </Box>
                  ))}
                </Box>

                <Button fullWidth variant="contained" onClick={handleOpenAddTask}>+ افزودن تسک</Button>

                {/* Modal افزودن تسک */}
                <Modal open={addTaskModal} onClose={handleCloseAddTask}>
                  <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: { xs: "90%", sm: 400 }, bgcolor: "background.paper", borderRadius: 4, boxShadow: 24, p: 4 }}>
                    <Typography variant="h6" fontWeight="bold" mb={2}>افزودن تسک جدید برای {selectedUser?.name}</Typography>
                    <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }} onSubmit={handleAddTask}>
                      <input type="text" placeholder="عنوان تسک" value={taskTitle} onChange={e => setTaskTitle(e.target.value)} style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ccc", width: "100%" }} />
                      <textarea placeholder="توضیحات تسک" rows={4} value={taskDesc} onChange={e => setTaskDesc(e.target.value)} style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ccc", width: "100%", resize: "none" }} />
                      <Button variant="contained" type="submit">ذخیره تسک</Button>
                    </Box>
                  </Box>
                </Modal>
              </>
            )}
          </Box>
        </Modal>
      </Box>
    </Container>
  );
}

export default DashboardContainerComponents;