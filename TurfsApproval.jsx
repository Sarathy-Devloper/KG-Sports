import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";
import { motion } from "framer-motion";

// Dummy API simulation
const fetchTurfs = async () => [
  { id: 1, name: "Elite Turf", status: "pending" },
  { id: 2, name: "City Sports Ground", status: "pending" },
];

const TurfsApproval = () => {
  const [turfs, setTurfs] = useState([]);

  useEffect(() => {
    fetchTurfs().then(setTurfs);
  }, []);

  const handleApproval = (id, decision) => {
    setTurfs((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: decision } : t
      )
    );
  };

  return (
    <Grid container spacing={2}>
      {turfs.map((turf) => (
        <Grid item xs={12} md={6} key={turf.id}>
          <Card
            component={motion.div}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <CardContent>
              <Typography variant="h6">{turf.name}</Typography>
              <Typography>Status: {turf.status}</Typography>
              {turf.status === "pending" && (
                <>
                  <Button
                    variant="contained"
                    color="success"
                    sx={{ mr: 1 }}
                    onClick={() => handleApproval(turf.id, "approved")}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleApproval(turf.id, "rejected")}
                  >
                    Reject
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default TurfsApproval;
