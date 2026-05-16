import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, FormControl, InputLabel, Select, MenuItem, CircularProgress, Button } from '@mui/material';
import { fetchPriorityInbox } from '../api';
import type { ScoredNotification } from '../api';
import { NotificationCard } from '../components/NotificationCard';
import { useViewedNotifications } from '../hooks/useNotifications';

export const PriorityInbox: React.FC = () => {
  const [notifications, setNotifications] = useState<ScoredNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState<number>(10);
  const [typeFilter, setTypeFilter] = useState<string>('All');
  
  const { isViewed, markAsViewed, markAllAsViewed } = useViewedNotifications();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const params: any = { n: limit };
        if (typeFilter !== 'All') {
          params.notification_type = typeFilter;
        }
        const data = await fetchPriorityInbox(params);
        setNotifications(data.notifications);
      } catch (error) {
        console.error("Failed to load priority inbox", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [limit, typeFilter]);

  const handleMarkAllRead = () => {
    markAllAsViewed(notifications.map(n => n.ID));
}

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} flexWrap="wrap" gap={2}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Priority Inbox
        </Typography>
        
        <Box display="flex" gap={2}>
            <Button variant="outlined" onClick={handleMarkAllRead} disabled={notifications.length === 0}>Mark Page as Read</Button>
            <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Show Top</InputLabel>
                <Select
                value={limit}
                label="Show Top"
                onChange={(e) => setLimit(Number(e.target.value))}
                >
                <MenuItem value={5}>Top 5</MenuItem>
                <MenuItem value={10}>Top 10</MenuItem>
                <MenuItem value={15}>Top 15</MenuItem>
                <MenuItem value={20}>Top 20</MenuItem>
                </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>Type</InputLabel>
                <Select
                value={typeFilter}
                label="Type"
                onChange={(e) => setTypeFilter(e.target.value)}
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
          No priority notifications found.
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
        </Box>
      )}
    </Container>
  );
};
