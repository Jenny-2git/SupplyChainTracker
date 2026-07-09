import {
  Card,
  CardContent,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

export default function RecentActivity({ events }) {
  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>

        <Typography
          variant="h6"
          gutterBottom
        >
          Recent Blockchain Activity
        </Typography>

        <List>

          {events.length === 0 && (
            <Typography color="text.secondary">
              No recent activity.
            </Typography>
          )}

          {events.map((event, index) => (

            <div key={index}>

              <ListItem>

                <ListItemText
                  primary={event.title}
                  secondary={event.description}
                />

              </ListItem>

              {index !== events.length - 1 && (
                <Divider />
              )}

            </div>

          ))}

        </List>

      </CardContent>
    </Card>
  );
}