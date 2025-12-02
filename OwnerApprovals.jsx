import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";
import { motion } from "framer-motion";

// Dummy API simulation
const fetchOwners = async () => [
  { id: 1, name: "Ramesh", status: "pending" },
  { id: 2, name: "Suresh", status: "pending" },
];

const OwnersApproval = () => {
  const [owners, setOwners] = useState([]);

  useEffect(() => {
    fetchOwners().then(setOwners);
  }, []);

  const handleApproval = (id, decision) => {
    setOwners((prev) =>
      prev.map((o) =>
        o.id === id ? { ...o, status: decision } : o
      )
    );
  };

  return (
    <Grid container spacing={2}>
      {owners.map((owner) => (
        <Grid item xs={12} md={6} key={owner.id}>
          <Card
            component={motion.div}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <CardContent>
              <Typography variant="h6">{owner.name}</Typography>
              <Typography>Status: {owner.status}</Typography>
              {owner.status === "pending" && (
                <>
                  <Button
                    variant="contained"
                    color="success"
                    sx={{ mr: 1 }}
                    onClick={() => handleApproval(owner.id, "approved")}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleApproval(owner.id, "rejected")}
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

export default OwnersApproval;
