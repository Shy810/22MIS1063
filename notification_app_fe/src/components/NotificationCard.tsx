import React from 'react';
import { Card, CardContent, Typography, Box, Chip, IconButton } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import EventIcon from '@mui/icons-material/Event';
import { format } from 'date-fns';
import type { ScoredNotification } from '../api';

interface NotificationCardProps {
  notification: ScoredNotification;
  isViewed: boolean;
  onMarkViewed: (id: string) => void;
}

const getTypeColor = (type: string) => {
  switch (type) {
    case 'Placement': return 'primary';
    case 'Result': return 'secondary';
    case 'Event': return 'success';
    default: return 'default';
  }
};

const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Placement': return <WorkIcon fontSize="small" />;
      case 'Result': return <SchoolIcon fontSize="small" />;
      case 'Event': return <EventIcon fontSize="small" />;
      default: return null;
    }
  };

export const NotificationCard: React.FC<NotificationCardProps> = ({ notification, isViewed, onMarkViewed }) => {
  return (
    <Card 
      variant="outlined" 
      sx={{ 
        mb: 2, 
        bgcolor: isViewed ? 'background.default' : 'action.hover',
        borderColor: isViewed ? 'divider' : 'primary.main',
        transition: '0.3s',
        cursor: isViewed ? 'default' : 'pointer',
        '&:hover': {
          boxShadow: isViewed ? 1 : 3,
        }
      }}
      onClick={() => !isViewed && onMarkViewed(notification.ID)}
    >
      <CardContent sx={{ pb: '16px !important' }}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box display="flex" flexDirection="column" gap={1}>
            <Box display="flex" alignItems="center" gap={1}>
              <Chip 
                icon={getTypeIcon(notification.Type)} 
                label={notification.Type} 
                color={getTypeColor(notification.Type) as any} 
                size="small" 
              />
              {!isViewed && (
                <Chip label="New" color="error" size="small" variant="outlined" />
              )}
            </Box>
            <Typography variant={isViewed ? "body1" : "subtitle1"} fontWeight={isViewed ? 'normal' : 'bold'}>
              {notification.Message}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {format(new Date(notification.Timestamp), 'PPpp')}
            </Typography>
          </Box>
          <Box>
            <IconButton 
              size="small" 
              color={isViewed ? "default" : "primary"}
              onClick={(e) => {
                e.stopPropagation();
                onMarkViewed(notification.ID);
              }}
              aria-label="mark as viewed"
            >
              {isViewed ? <CheckCircleIcon color="disabled" /> : <CheckCircleOutlineIcon />}
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
