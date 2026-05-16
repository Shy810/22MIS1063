import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, FormControl, InputLabel, Select, MenuItem, Pagination, CircularProgress, Button } from '@mui/material';
import { fetchAllNotifications } from '../api';
import type { Notification } from '../api';
import { NotificationCard } from '../components/NotificationCard';
import { useViewedNotifications } from '../hooks/useNotifications';

export const AllNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [total, setTotal] = useState(0);
  const limit = 10;
  
  const { isViewed, markAsViewed, markAllAsViewed } = useViewedNotifications();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const params: any = { page, limit };
        if (typeFilter !== 'All') {
          params.notification_type = typeFilter;
        }
        const data = await fetchAllNotifications(params);
        setNotifications(data.notifications);
        setTotal(data.total);
      } catch (error) {
        console.error("Failed to load notifications", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [page, typeFilter]);

  const handleMarkAllRead = () => {
      markAllAsViewed(notifications.map(n => n.ID));
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          All Notifications
        </Typography>
        <Box display="flex" gap={2} alignItems="center">
            <Button variant="outlined" onClick={handleMarkAllRead} disabled={notifications.length === 0}>Mark Page as Read</Button>
            <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Type</InputLabel>
            <Select
                value={typeFilter}
                label="Type"
                onChange={(e) => {
                setTypeFilter(e.target.value);
                setPage(1);
                }}
            >
                <MenuItem value="All">All Types</MenuItem>
                <MenuItem value="Placement">Placement</MenuItem>
                <MenuItem value="Result">Result</MenuItem>
                <MenuItem value="Event">Event</MenuItem>
            </Select>
            </FormControl>
        </Box>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" my={5}>
          <CircularProgress />
        </Box>
      ) : notifications.length === 0 ? (
        <Typography variant="body1" color="text.secondary" align="center" my={5}>
          No notifications found.
        </Typography>
      ) : (
        <Box>
          {notifications.map((notif) => (
            <NotificationCard
              key={notif.ID}
              notification={notif}
              isViewed={isViewed(notif.ID)}
              onMarkViewed={markAsViewed}
            />
          ))}
          
          <Box display="flex" justifyContent="center" mt={4}>
            <Pagination 
              count={Math.ceil(total / limit)} 
              page={page} 
              onChange={(_, value) => setPage(value)} 
              color="primary" 
            />
          </Box>
        </Box>
      )}
    </Container>
  );
};
