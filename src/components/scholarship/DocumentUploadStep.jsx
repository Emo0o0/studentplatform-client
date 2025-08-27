import React from "react";
import { Paper, Typography, Grid, Button, List, ListItem, ListItemText, IconButton } from "@mui/material";
import { Delete as DeleteIcon, CloudUpload as CloudUploadIcon } from "@mui/icons-material";

export default function DocumentUploadStep({ formData, onChange, scholarshipType }) {
  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    onChange({
      ...formData,
      documents: [...(formData.documents || []), ...files],
    });
  };

  const removeDocument = (index) => {
    const documents = [...(formData.documents || [])];
    documents.splice(index, 1);
    onChange({ ...formData, documents });
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Прикачете необходимите документи
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button variant="outlined" component="label" startIcon={<CloudUploadIcon />} sx={{ mb: 2 }}>
            Прикачи документи
            <input type="file" multiple hidden onChange={handleFileSelect} accept=".pdf,.jpg,.jpeg,.png" />
          </Button>
        </Grid>

        <Grid item xs={12}>
          <List>
            {(formData.documents || []).map((doc, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <IconButton edge="end" onClick={() => removeDocument(index)}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText primary={doc.name} secondary={`${(doc.size / 1024).toFixed(2)} KB`} />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Paper>
  );
}
